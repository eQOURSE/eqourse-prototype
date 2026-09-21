const crypto = require("crypto");
const path = require("path");
const { AwsClient } = require("aws4fetch");

/**
 * Cloudflare R2 object storage for public sample media.
 *
 * R2 exposes an S3-compatible API, so writes are signed SigV4 requests against
 * `https://<account>.r2.cloudflarestorage.com/<bucket>/<key>`. aws4fetch is used
 * rather than @aws-sdk/client-s3 because this module needs exactly two
 * operations and the AWS SDK would add ~10 MB to a backend that shares a VPS.
 * The native `env.BUCKET.put()` binding is not an option — that only exists
 * inside a Cloudflare Worker, and this is an Express app on Utho.
 *
 * Reads never come through here. Objects are served straight from the bucket's
 * Custom Domain (R2_PUBLIC_BASE_URL, e.g. https://cdn.eqourse.com) so they are
 * cached at the edge and never touch this origin. See docs/SAMPLES_CDN.md for
 * the Cloudflare-side setup, including the Transform Rule that re-adds the CSP
 * sandbox header for interactive HTML samples — a Custom Domain only emits the
 * object's stored HTTP metadata, so that header cannot be set at upload time.
 *
 * ─── Safety boundary ────────────────────────────────────────────────────────
 * Only kinds in R2_ELIGIBLE_KINDS may be written here, and the caller is
 * responsible for enforcing that. The bucket is world-readable, and the upload
 * middleware is shared with POST /api/free-pilot, which is public and
 * unauthenticated with an attacker-controlled `kind` field. Routing uploads to
 * R2 by default would publish pilot attachments and, if `kind` were spoofed,
 * candidate resumes. Default-deny is deliberate.
 */

/**
 * Upload kinds that are safe to place in a public bucket. Everything else —
 * "general" (used by the public pilot form), "resumes", "vendor-registration"
 * and "vendor-tax" — stays on local disk behind blockPrivateUploads.
 */
const R2_ELIGIBLE_KINDS = new Set(["sample-file", "sample-thumbnail"]);

const ONE_YEAR_SECONDS = 31536000;

function config() {
  return {
    accountId: process.env.R2_ACCOUNT_ID,
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    bucket: process.env.R2_BUCKET || "eqourse",
    publicBaseUrl: process.env.R2_PUBLIC_BASE_URL,
  };
}

/**
 * True only when every value needed to both write and serve is present.
 * When false, callers fall back to local disk, which keeps development and any
 * deploy that lands before the credentials do fully working.
 */
function isR2Enabled() {
  const { accountId, accessKeyId, secretAccessKey, bucket, publicBaseUrl } = config();
  return Boolean(accountId && accessKeyId && secretAccessKey && bucket && publicBaseUrl);
}

let cachedClient = null;

function client() {
  if (!cachedClient) {
    const { accessKeyId, secretAccessKey } = config();
    cachedClient = new AwsClient({
      accessKeyId,
      secretAccessKey,
      service: "s3",
      region: "auto", // R2 is single-region; "auto" is what Cloudflare documents.
    });
  }
  return cachedClient;
}

function objectUrl(key) {
  const { accountId, bucket } = config();
  return `https://${accountId}.r2.cloudflarestorage.com/${bucket}/${encodeKey(key)}`;
}

/** Percent-encodes each path segment while keeping the separators intact. */
function encodeKey(key) {
  return String(key).split("/").map(encodeURIComponent).join("/");
}

/**
 * Builds the object key. Mirrors the on-disk layout (`<kind>/<name><ext>`) so a
 * record's URL shape is recognisable whichever backend stored it.
 *
 * Names are random rather than derived from the uploaded filename: the original
 * name is attacker-influenced, and a content-independent unique name makes every
 * object immutable, which is what lets responses be cached for a year.
 */
function buildObjectKey(kind, originalName) {
  const extension = path.extname(String(originalName || "")).toLowerCase().slice(0, 12);
  const unique = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}`;
  return `${kind}/${unique}${extension}`;
}

/**
 * Stores a buffer and returns its public CDN URL.
 *
 * Cache-Control, Content-Type and Content-Disposition are written as object
 * metadata because the Custom Domain replays exactly these on every read — this
 * is the only opportunity to set them. `inline` keeps samples view-only by
 * telling the browser to render rather than save.
 */
async function putObject({ kind, buffer, contentType, originalName }) {
  if (!isR2Enabled()) throw new Error("R2 is not configured");
  if (!R2_ELIGIBLE_KINDS.has(kind)) {
    // Defence in depth: the caller already checks, but a public bucket is not
    // somewhere to rely on a single gate.
    throw new Error(`Upload kind "${kind}" is not eligible for public object storage`);
  }

  const key = buildObjectKey(kind, originalName);
  const response = await client().fetch(objectUrl(key), {
    method: "PUT",
    body: buffer,
    headers: {
      "Content-Type": contentType || "application/octet-stream",
      "Content-Length": String(buffer.length),
      "Cache-Control": `public, max-age=${ONE_YEAR_SECONDS}, immutable`,
      "Content-Disposition": "inline",
    },
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`R2 upload failed (${response.status}): ${detail.slice(0, 300)}`);
  }

  return { key, url: publicUrlFor(key) };
}

async function deleteObject(key) {
  if (!isR2Enabled()) throw new Error("R2 is not configured");
  const response = await client().fetch(objectUrl(key), { method: "DELETE" });
  // S3 delete is idempotent; 404 means the goal state is already reached.
  if (!response.ok && response.status !== 404) {
    throw new Error(`R2 delete failed (${response.status})`);
  }
}

function publicUrlFor(key) {
  const { publicBaseUrl } = config();
  return `${String(publicBaseUrl).replace(/\/+$/, "")}/${encodeKey(key)}`;
}

module.exports = {
  isR2Enabled,
  putObject,
  deleteObject,
  publicUrlFor,
  buildObjectKey,
  R2_ELIGIBLE_KINDS,
};
