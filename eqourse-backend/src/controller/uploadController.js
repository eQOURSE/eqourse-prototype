const multer = require("multer");
const path = require("path");
const fs = require("fs");
const logger = require("../utils/logger");
const { isPrivateUploadRequest } = require("../utils/privateUploads");
const { isR2Enabled, putObject, R2_ELIGIBLE_KINDS } = require("../utils/r2Storage");

// ─── Storage config ─────────────────────────────────────────
const UPLOAD_DIR = path.join(__dirname, "../../uploads");

// Ensure uploads directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const kind = req.body.kind || "general";
    const kindDir = path.join(UPLOAD_DIR, kind);
    if (!fs.existsSync(kindDir)) {
      fs.mkdirSync(kindDir, { recursive: true });
    }
    cb(null, kindDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

// ─── Upload format policy ───────────────────────────────────
// Agreed policy: every image, audio and video format; PDF; DOCX; Excel; CSV;
// TXT; JSON; interactive HTML; source files (CSS/JS); and every other document
// format EXCEPT PowerPoint.
//
// PowerPoint is rejected deliberately, so it is checked before the allowlist:
// browsers cannot render a deck, and the product decision is to share those
// directly rather than publish them as samples. The public viewer mirrors this
// in src/components/samples/shared/sampleFormats.ts (REJECTED_MIME_TYPES) so a
// legacy record shows an honest message instead of a blank frame.
const REJECTED_MIMES = new Set([
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.oasis.opendocument.presentation",
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
]);
const REJECTED_EXTENSIONS = new Set([".ppt", ".pptx", ".pps", ".ppsx", ".odp"]);

const ALLOWED_MIMES = new Set([
  // Documents
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/rtf",
  "application/vnd.oasis.opendocument.text",
  // Spreadsheets
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.oasis.opendocument.spreadsheet",
  // Data and text
  "application/json", "application/ld+json", "application/x-ndjson",
  "application/xml", "application/yaml",
  // Interactive HTML samples and their source files
  "application/xhtml+xml", "application/javascript", "application/x-javascript",
  // Archives (bundled interactive samples)
  "application/zip", "application/x-zip-compressed", "multipart/x-zip",
  "application/x-tar", "application/gzip", "application/x-7z-compressed",
  "application/vnd.rar",
]);

// Browsers and operating systems disagree on the mime type for several sample
// formats — .textgrid and .rttm usually arrive as "" or octet-stream, and .js
// varies by platform. Fall back to the extension so valid uploads are not
// rejected on a technicality.
const ALLOWED_EXTENSIONS = new Set([
  ".pdf", ".docx", ".doc", ".rtf", ".odt",
  ".xlsx", ".xls", ".ods", ".csv", ".tsv",
  ".txt", ".json", ".jsonl", ".ndjson", ".xml", ".md", ".log",
  ".yaml", ".yml", ".rttm", ".textgrid", ".conll", ".srt", ".vtt",
  ".html", ".htm", ".xhtml", ".css", ".scss", ".sass", ".less",
  ".js", ".mjs", ".cjs", ".jsx", ".ts", ".tsx", ".glsl", ".vert", ".frag",
  ".zip", ".tar", ".gz", ".tgz", ".rar", ".7z", ".scorm",
]);

const fileFilter = (req, file, cb) => {
  const mime = String(file.mimetype || "").split(";")[0].trim().toLowerCase();
  const ext = path.extname(file.originalname || "").toLowerCase();

  if (REJECTED_MIMES.has(mime) || REJECTED_EXTENSIONS.has(ext)) {
    return cb(new Error("PowerPoint files are not supported. Export the deck as PDF and upload that instead."), false);
  }

  // Whole media families are allowed, so match on the type prefix.
  const isMediaFamily = mime.startsWith("image/") || mime.startsWith("audio/") || mime.startsWith("video/");
  if (isMediaFamily || mime.startsWith("text/") || ALLOWED_MIMES.has(mime) || ALLOWED_EXTENSIONS.has(ext)) {
    return cb(null, true);
  }

  return cb(new Error(`File type ${file.mimetype || ext || "unknown"} is not allowed`), false);
};

const FILE_SIZE_LIMIT = 100 * 1024 * 1024; // 100MB

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: FILE_SIZE_LIMIT },
});

/**
 * Disk-backed middleware. Still used by pilotRouter for POST /api/free-pilot,
 * which is public and unauthenticated — deliberately left on local disk so those
 * attachments can never reach the world-readable R2 bucket.
 */
const uploadMiddleware = upload.single("file");

/**
 * Memory-backed middleware for the authenticated admin endpoint. The destination
 * cannot be decided inside multer here, because whether a file belongs in R2 or
 * on disk depends on `kind`, and diskStorage would have already committed the
 * bytes by the time that is known.
 */
const adminUploadMiddleware = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: FILE_SIZE_LIMIT },
}).single("file");

/** Writes a buffer to `uploads/<kind>/<unique><ext>` and returns the served path. */
function writeToDisk(kind, file) {
  const kindDir = path.join(UPLOAD_DIR, kind);
  if (!fs.existsSync(kindDir)) fs.mkdirSync(kindDir, { recursive: true });

  const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${unique}${path.extname(file.originalname || "")}`;
  fs.writeFileSync(path.join(kindDir, filename), file.buffer);

  return `/api/uploads/${kind}/${filename}`;
}

/**
 * Restricts `kind` to a single safe path segment. It arrives from the request
 * body, so without this an upload could traverse out of UPLOAD_DIR or be aimed
 * at a private folder such as `resumes`.
 */
function normalizeKind(value) {
  const kind = String(value || "general").trim().toLowerCase();
  if (!/^[a-z0-9][a-z0-9-]{0,40}$/.test(kind)) return "general";
  if (isPrivateUploadRequest(`${kind}/placeholder`)) return "general";
  return kind;
}

/**
 * POST /api/admin/uploads
 * Admin — upload a single file.
 *
 * Sample media goes to Cloudflare R2 and is served from the CDN Custom Domain;
 * everything else stays on local disk. Records store whatever absolute or
 * root-relative URL is returned here, so both storage backends coexist and
 * existing `/api/uploads/...` values keep working after the switch.
 */
const uploadFile = (req, res) => {
  adminUploadMiddleware(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        // Keep this in step with FILE_SIZE_LIMIT above.
        return res.status(400).json({ success: false, message: "File too large. Maximum size is 100MB." });
      }
      return res.status(400).json({ success: false, message: err.message });
    }
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const kind = normalizeKind(req.body.kind);
    const useObjectStorage = isR2Enabled() && R2_ELIGIBLE_KINDS.has(kind);

    let fileUrl;
    try {
      if (useObjectStorage) {
        const stored = await putObject({
          kind,
          buffer: req.file.buffer,
          contentType: req.file.mimetype,
          originalName: req.file.originalname,
        });
        fileUrl = stored.url;
      } else {
        fileUrl = writeToDisk(kind, req.file);
      }
    } catch (storageError) {
      logger.error(`Upload storage failed (kind=${kind}, r2=${useObjectStorage}): ${storageError.message}`);
      return res.status(502).json({
        success: false,
        message: "The file could not be stored. Please try again.",
      });
    }

    return res.json({
      success: true,
      data: {
        url: fileUrl,
        originalName: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype,
        storage: useObjectStorage ? "r2" : "local",
      },
    });
  });
};

module.exports = { uploadFile, uploadMiddleware, adminUploadMiddleware, UPLOAD_DIR };
