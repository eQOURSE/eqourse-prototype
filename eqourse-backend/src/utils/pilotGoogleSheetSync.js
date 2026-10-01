const crypto = require("crypto");
const PilotQuery = require("../model/pilot");
const logger = require("./logger");

const PILOT_HEADERS = [
  "_id",
  "name",
  "email",
  "phone",
  "company",
  "role",
  "serviceInterest",
  "projectScope",
  "timeline",
  "languages",
  "message",
  "source",
  "attachment",
  "internal_notes",
  "status",
  "createdAt",
  "updatedAt",
];

const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API_BASE = "https://sheets.googleapis.com/v4/spreadsheets";
const MAX_RETRIES = 3;
const RETRY_BASE_MS = 500;

let accessTokenCache = null;
let changeStream = null;
let reconnectTimer = null;
let stopping = false;

function getConfig() {
  return {
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    privateKey: process.env.GOOGLE_PRIVATE_KEY,
    tabName: process.env.GOOGLE_SHEET_TAB_1 || "Pilot Queries",
  };
}

function isConfigured() {
  const { spreadsheetId, serviceAccountEmail, privateKey } = getConfig();
  return Boolean(spreadsheetId && serviceAccountEmail && privateKey);
}

function normalizePrivateKey(value) {
  return String(value || "").replace(/\\n/g, "\n").replace(/^"|"$/g, "");
}

function base64Url(value) {
  return Buffer.from(value).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function createServiceAccountAssertion(email, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64Url(JSON.stringify({
    iss: email,
    scope: SHEETS_SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  }));
  const unsigned = `${header}.${payload}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsigned);
  return `${unsigned}.${base64Url(signer.sign(normalizePrivateKey(privateKey)))}`;
}

async function getAccessToken() {
  if (accessTokenCache && accessTokenCache.expiresAt > Date.now() + 60_000) {
    return accessTokenCache.value;
  }

  const { serviceAccountEmail, privateKey } = getConfig();
  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion: createServiceAccountAssertion(serviceAccountEmail, privateKey),
  });
  const response = await fetch(TOKEN_URL, { method: "POST", body });
  const result = await response.json();
  if (!response.ok) throw new Error(`Google auth failed (${response.status}): ${result.error_description || result.error || "unknown error"}`);

  accessTokenCache = {
    value: result.access_token,
    expiresAt: Date.now() + Number(result.expires_in || 3600) * 1000,
  };
  return accessTokenCache.value;
}

async function googleRequest(path, options = {}, attempt = 0) {
  try {
    const token = await getAccessToken();
    const response = await fetch(`${API_BASE}/${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    const text = await response.text();
    let result;
    try { result = text ? JSON.parse(text) : {}; } catch { result = { raw: text }; }

    if (response.ok) return result;
    if (response.status === 401 && attempt === 0) {
      accessTokenCache = null;
      return googleRequest(path, options, attempt + 1);
    }
    throw new Error(`Google Sheets API failed (${response.status}): ${result.error?.message || result.raw || "unknown error"}`);
  } catch (error) {
    if (attempt >= MAX_RETRIES - 1) throw error;
    await new Promise((resolve) => setTimeout(resolve, RETRY_BASE_MS * 2 ** attempt));
    return googleRequest(path, options, attempt + 1);
  }
}

function toCellValue(value) {
  if (value === undefined || value === null) return "";
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function mapPilotQueryToSheetRow(query) {
  const doc = typeof query.toObject === "function" ? query.toObject() : query;
  return [
    toCellValue(doc._id),
    toCellValue(doc.name),
    toCellValue(doc.email),
    toCellValue(doc.phone),
    toCellValue(doc.company),
    toCellValue(doc.role),
    toCellValue(doc.serviceInterest),
    toCellValue(doc.projectScope),
    toCellValue(doc.timeline),
    toCellValue(doc.languages),
    toCellValue(doc.message),
    toCellValue(doc.source),
    toCellValue(doc.attachment),
    toCellValue(doc.internal_notes),
    toCellValue(doc.status),
    toCellValue(doc.createdAt),
    toCellValue(doc.updatedAt),
  ];
}

function a1Tab(tabName) {
  return `'${String(tabName).replace(/'/g, "''")}'`;
}

async function ensurePilotHeaders() {
  if (!isConfigured()) return false;
  const { spreadsheetId, tabName } = getConfig();
  const range = `${a1Tab(tabName)}!A1:Q1`;
  const result = await googleRequest(`${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}`);
  const existing = result.values?.[0] || [];
  if (PILOT_HEADERS.every((header, index) => existing[index] === header)) return true;

  await googleRequest(`${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}?valueInputOption=RAW`, {
    method: "PUT",
    body: JSON.stringify({ range, majorDimension: "ROWS", values: [PILOT_HEADERS] }),
  });
  logger.info(`Pilot Google Sheet headers ensured in tab "${tabName}"`);
  return true;
}

async function existingPilotIds() {
  const { spreadsheetId, tabName } = getConfig();
  const range = `${a1Tab(tabName)}!A2:A`;
  const result = await googleRequest(`${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}`);
  return new Set((result.values || []).map((row) => row[0]).filter(Boolean));
}

async function syncPilotQuery(query) {
  if (!isConfigured()) {
    logger.warn("Pilot Google Sheet sync skipped: GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, or GOOGLE_PRIVATE_KEY is missing");
    return { synced: false, skipped: true };
  }

  const id = String(query._id || query.id);
  if (!id) throw new Error("Pilot query cannot be synced without an _id");
  const ids = await existingPilotIds();
  if (ids.has(id)) return { synced: true, duplicate: true };

  const { spreadsheetId, tabName } = getConfig();
  const range = `${a1Tab(tabName)}!A:Q`;
  await googleRequest(`${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, {
    method: "POST",
    body: JSON.stringify({ majorDimension: "ROWS", values: [mapPilotQueryToSheetRow(query)] }),
  });
  logger.info(`Pilot query synced to Google Sheet: ${id}`);
  return { synced: true, duplicate: false };
}

async function backfillPilotQueries({ batchSize = 100 } = {}) {
  if (!isConfigured()) return { synced: 0, failed: 0, skipped: true };
  let synced = 0;
  let failed = 0;
  let lastId = null;

  while (true) {
    const filter = lastId ? { _id: { $gt: lastId } } : {};
    const queries = await PilotQuery.find(filter).sort({ _id: 1 }).limit(batchSize).lean();
    if (!queries.length) break;
    for (const query of queries) {
      try {
        const result = await syncPilotQuery(query);
        if (result.synced && !result.duplicate) synced += 1;
      } catch (error) {
        failed += 1;
        logger.error(`Pilot Google Sheet backfill failed for ${query._id}: ${error.message}`);
      }
    }
    lastId = queries[queries.length - 1]._id;
  }

  logger.info(`Pilot Google Sheet backfill complete: ${synced} added, ${failed} failed`);
  return { synced, failed, skipped: false };
}

function scheduleChangeStreamReconnect() {
  if (stopping || reconnectTimer) return;
  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    openChangeStream();
  }, 5000);
}

function openChangeStream() {
  if (stopping || changeStream || !isConfigured()) return;
  try {
    changeStream = PilotQuery.watch([{ $match: { operationType: "insert" } }], { fullDocument: "default" });
    changeStream.on("change", (change) => {
      syncPilotQuery(change.fullDocument).catch((error) => {
        logger.error(`Pilot Google Sheet change-stream sync failed for ${change.documentKey?._id}: ${error.message}`);
      });
    });
    changeStream.on("error", (error) => {
      logger.error(`Pilot Google Sheet change stream error: ${error.message}`);
      changeStream = null;
      scheduleChangeStreamReconnect();
    });
    changeStream.on("close", () => {
      changeStream = null;
      scheduleChangeStreamReconnect();
    });
    logger.info("Pilot Google Sheet change stream started");
  } catch (error) {
    logger.warn(`Pilot Google Sheet change stream unavailable: ${error.message}`);
    scheduleChangeStreamReconnect();
  }
}

async function startPilotQuerySheetSync() {
  if (!isConfigured()) {
    logger.warn("Pilot Google Sheet sync disabled: configure GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, and GOOGLE_PRIVATE_KEY");
    return;
  }
  try {
    await ensurePilotHeaders();
    openChangeStream();
    await backfillPilotQueries();
  } catch (error) {
    logger.error(`Pilot Google Sheet sync startup failed: ${error.message}`);
  }
}

async function stopPilotQuerySheetSync() {
  stopping = true;
  if (reconnectTimer) clearTimeout(reconnectTimer);
  if (changeStream) await changeStream.close();
  changeStream = null;
}

module.exports = {
  PILOT_HEADERS,
  mapPilotQueryToSheetRow,
  ensurePilotHeaders,
  syncPilotQuery,
  backfillPilotQueries,
  startPilotQuerySheetSync,
  stopPilotQuerySheetSync,
};
