const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { UPLOAD_DIR } = require("../utils/uploadStorage");
const { toPublicAssetUrl } = require("../utils/publicAssetUrl");

// ─── Storage config ─────────────────────────────────────────
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

const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    // Images
    "image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml",
    // Documents
    "application/pdf",
    "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv", "text/tab-separated-values", "text/plain", "application/json",
    // JSON Lines files are commonly reported by browsers as one of these MIME types.
    "application/jsonl", "application/x-ndjson", "application/ndjson",
    "text/html", "application/xhtml+xml",
    "text/markdown", "text/x-markdown", "application/markdown",
    "application/xml", "text/xml",
    // Archives
    "application/zip", "application/x-zip-compressed", "multipart/x-zip",
    // Video
    "video/mp4", "video/webm", "video/ogg", "video/quicktime", "video/x-msvideo",
    // Audio
    "audio/mpeg", "audio/wav", "audio/ogg", "audio/mp3",
  ];
  const extensionAllowed = [
    ".md", ".markdown", ".txt", ".log", ".xml", ".sitemap", ".tsv", ".html", ".htm",
    ".jsonl", ".ndjson", ".conll",
    ".tfrecord", ".tfrecords",
  ]
    .includes(path.extname(file.originalname).toLowerCase());
  if (allowedMimes.includes(file.mimetype) || extensionAllowed || file.mimetype.startsWith("video/") || file.mimetype.startsWith("audio/")) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${file.mimetype} is not allowed`), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB; keep this aligned with the admin UI
});

// ─── Upload middleware ──────────────────────────────────────
const uploadMiddleware = upload.single("file");

/**
 * POST /api/admin/uploads
 * Admin — upload a single file
 */
const uploadFile = (req, res) => {
  uploadMiddleware(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
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

    // Build the public URL — the frontend will use this to display the file
    const actualKind = path.basename(req.file.destination);
    const fileUrl = toPublicAssetUrl(`/api/uploads/${actualKind}/${req.file.filename}`);

    return res.json({
      success: true,
      data: {
        url: fileUrl,
        originalName: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype,
      },
    });
  });
};

module.exports = { uploadFile, uploadMiddleware, UPLOAD_DIR };
