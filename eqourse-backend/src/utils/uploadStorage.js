const path = require("path");

// Production uses the persistent CDN origin directory for all form uploads.
// Keep the project-local fallback for local development and tests.
const localUploadDir = path.join(__dirname, "../../uploads");
const UPLOAD_DIR = process.env.UPLOAD_DIR
  || (process.env.EVENT_MEDIA_DISK_ROOT
    ? path.join(process.env.EVENT_MEDIA_DISK_ROOT, "uploads")
    : localUploadDir);

module.exports = { UPLOAD_DIR };
