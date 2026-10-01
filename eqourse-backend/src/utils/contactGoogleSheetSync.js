const crypto = require("crypto");
const ContactQuery = require("../model/contact_us_queries");
const logger = require("./logger");

const CONTACT_HEADERS = [
  "_id", "name", "email", "phone", "phone_code", "company", "designation",
  "subject", "message", "source", "attachment", "internal_notes", "status",
  "createdAt", "updatedAt",
];
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API_BASE = "https://sheets.googleapis.com/v4/spreadsheets";
const MAX_RETRIES = 3;
let tokenCache = null;
let stream = null;
let reconnectTimer = null;
let stopping = false;

function config() {
  return {
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    tab: process.env.GOOGLE_SHEET_TAB_2 || "Contact Queries",
  };
}

function configured() {
  const { spreadsheetId, email, key } = config();
  return Boolean(spreadsheetId && email && key);
}

function b64(value) {
  return Buffer.from(value).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function jwt() {
  const { email, key } = config();
  const now = Math.floor(Date.now() / 1000);
  const head = b64(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const body = b64(JSON.stringify({
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  }));
  const unsigned = `${head}.${body}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsigned);
  const privateKey = String(key).replace(/\\n/g, "\n").replace(/^"|"$/g, "");
  return `${unsigned}.${b64(signer.sign(privateKey))}`;
}

async function accessToken() {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) return tokenCache.value;
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt(),
    }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(`Google auth failed (${response.status}): ${result.error_description || result.error || "unknown error"}`);
  tokenCache = { value: result.access_token, expiresAt: Date.now() + Number(result.expires_in || 3600) * 1000 };
  return tokenCache.value;
}

async function request(path, options = {}, attempt = 0) {
  try {
    const response = await fetch(`${API_BASE}/${path}`, {
      ...options,
      headers: { Authorization: `Bearer ${await accessToken()}`, "Content-Type": "application/json", ...(options.headers || {}) },
    });
    const text = await response.text();
    let result;
    try { result = text ? JSON.parse(text) : {}; } catch { result = { raw: text }; }
    if (response.ok) return result;
    if (response.status === 401 && attempt === 0) { tokenCache = null; return request(path, options, 1); }
    throw new Error(`Google Sheets API failed (${response.status}): ${result.error?.message || result.raw || "unknown error"}`);
  } catch (error) {
    if (attempt >= MAX_RETRIES - 1) throw error;
    await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** attempt));
    return request(path, options, attempt + 1);
  }
}

function range(tab, cells) {
  return `'${String(tab).replace(/'/g, "''")}'!${cells}`;
}

function cell(value) {
  if (value === undefined || value === null) return "";
  if (value instanceof Date) return value.toISOString();
  return typeof value === "object" ? JSON.stringify(value) : String(value);
}

function mapContactQueryToSheetRow(query) {
  const doc = typeof query.toObject === "function" ? query.toObject() : query;
  return [
    cell(doc._id), cell(doc.name), cell(doc.email), cell(doc.phone), cell(doc.phone_code),
    cell(doc.company), cell(doc.designation), cell(doc.subject), cell(doc.message),
    cell(doc.source), cell(doc.attachment), cell(doc.internal_notes), cell(doc.status),
    cell(doc.createdAt), cell(doc.updatedAt),
  ];
}

async function ensureContactHeaders() {
  if (!configured()) return false;
  const { spreadsheetId, tab } = config();
  const target = range(tab, "A1:O1");
  const current = await request(`${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(target)}`);
  if ((current.values?.[0] || []).every((header, index) => header === CONTACT_HEADERS[index])) return true;
  await request(`${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(target)}?valueInputOption=RAW`, {
    method: "PUT", body: JSON.stringify({ range: target, majorDimension: "ROWS", values: [CONTACT_HEADERS] }),
  });
  logger.info(`Contact Google Sheet headers ensured in tab "${tab}"`);
  return true;
}

async function existingIds() {
  const { spreadsheetId, tab } = config();
  const result = await request(`${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range(tab, "A2:A"))}`);
  return new Set((result.values || []).map((row) => row[0]).filter(Boolean));
}

async function syncContactQuery(query) {
  if (!configured()) {
    logger.warn("Contact Google Sheet sync disabled: Google Sheet credentials are missing");
    return { synced: false, skipped: true };
  }
  const id = String(query._id || query.id || "");
  if (!id) throw new Error("Contact query cannot be synced without an _id");
  if ((await existingIds()).has(id)) return { synced: true, duplicate: true };
  const { spreadsheetId, tab } = config();
  const target = range(tab, "A:O");
  await request(`${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(target)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, {
    method: "POST", body: JSON.stringify({ majorDimension: "ROWS", values: [mapContactQueryToSheetRow(query)] }),
  });
  logger.info(`Contact query synced to Google Sheet: ${id}`);
  return { synced: true, duplicate: false };
}

async function backfillContactQueries({ batchSize = 100 } = {}) {
  if (!configured()) return { synced: 0, failed: 0, skipped: true };
  let lastId = null; let synced = 0; let failed = 0;
  while (true) {
    const filter = lastId ? { _id: { $gt: lastId } } : {};
    const queries = await ContactQuery.find(filter).sort({ _id: 1 }).limit(batchSize).lean();
    if (!queries.length) break;
    for (const query of queries) {
      try {
        const result = await syncContactQuery(query);
        if (result.synced && !result.duplicate) synced += 1;
      } catch (error) {
        failed += 1;
        logger.error(`Contact Google Sheet backfill failed for ${query._id}: ${error.message}`);
      }
    }
    lastId = queries[queries.length - 1]._id;
  }
  logger.info(`Contact Google Sheet backfill complete: ${synced} added, ${failed} failed`);
  return { synced, failed, skipped: false };
}

function reconnect() {
  if (stopping || reconnectTimer) return;
  reconnectTimer = setTimeout(() => { reconnectTimer = null; openStream(); }, 5000);
}

function openStream() {
  if (stopping || stream || !configured()) return;
  try {
    stream = ContactQuery.watch([{ $match: { operationType: "insert" } }], { fullDocument: "default" });
    stream.on("change", (change) => syncContactQuery(change.fullDocument).catch((error) =>
      logger.error(`Contact Google Sheet change-stream sync failed for ${change.documentKey?._id}: ${error.message}`)));
    stream.on("error", (error) => { logger.error(`Contact Google Sheet change stream error: ${error.message}`); stream = null; reconnect(); });
    stream.on("close", () => { stream = null; reconnect(); });
    logger.info("Contact Google Sheet change stream started");
  } catch (error) {
    logger.warn(`Contact Google Sheet change stream unavailable: ${error.message}`);
    reconnect();
  }
}

async function startContactQuerySheetSync() {
  if (!configured()) {
    logger.warn("Contact Google Sheet sync disabled: configure GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, and GOOGLE_PRIVATE_KEY");
    return;
  }
  try {
    await ensureContactHeaders();
    openStream();
    await backfillContactQueries();
  } catch (error) {
    logger.error(`Contact Google Sheet sync startup failed: ${error.message}`);
  }
}

async function stopContactQuerySheetSync() {
  stopping = true;
  if (reconnectTimer) clearTimeout(reconnectTimer);
  if (stream) await stream.close();
  stream = null;
}

module.exports = {
  CONTACT_HEADERS,
  mapContactQueryToSheetRow,
  ensureContactHeaders,
  syncContactQuery,
  backfillContactQueries,
  startContactQuerySheetSync,
  stopContactQuerySheetSync,
};
