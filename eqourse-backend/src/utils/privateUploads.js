const fs = require("fs/promises");
const path = require("path");

const UPLOAD_DIR = path.join(__dirname, "../../uploads");
const PRIVATE_UPLOAD_FOLDERS = new Set(["resumes", "vendor-registration", "vendor-tax"]);

function uploadFolderFromRequest(requestPath) {
  try {
    const decoded = decodeURIComponent(String(requestPath || "")).replace(/\\/g, "/");
    return decoded.split("/").filter(Boolean)[0] || "";
  } catch {
    return "";
  }
}

function isPrivateUploadRequest(requestPath) {
  return PRIVATE_UPLOAD_FOLDERS.has(uploadFolderFromRequest(requestPath));
}

function resolveStoredAttachment(attachment, allowedFolders = PRIVATE_UPLOAD_FOLDERS) {
  const storedUrl = String(attachment?.url || "").replace(/\\/g, "/");
  const parts = storedUrl.split("/").filter(Boolean);
  if (parts.length < 2) return null;

  const folder = parts.at(-2);
  const storedName = parts.at(-1);
  if (!allowedFolders.has(folder) || !storedName || path.basename(storedName) !== storedName) return null;

  const folderRoot = path.resolve(UPLOAD_DIR, folder);
  const absolutePath = path.resolve(folderRoot, storedName);
  if (!absolutePath.startsWith(`${folderRoot}${path.sep}`)) return null;
  return absolutePath;
}

async function sendStoredAttachment(res, attachment, allowedFolders) {
  const filePath = resolveStoredAttachment(attachment, allowedFolders);
  if (!filePath) return res.status(404).json({ success: false, message: "Document not found." });
  try {
    await fs.access(filePath);
    return res.download(filePath, attachment.originalName || path.basename(filePath));
  } catch {
    return res.status(404).json({ success: false, message: "Document not found." });
  }
}

async function removeStoredAttachments(attachments) {
  const files = (Array.isArray(attachments) ? attachments : [attachments])
    .map((attachment) => resolveStoredAttachment(attachment))
    .filter(Boolean);
  await Promise.allSettled(files.map((filePath) => fs.unlink(filePath)));
}

async function removeUploadedFiles(files) {
  const flattened = Array.isArray(files)
    ? files
    : Object.values(files || {}).flat();
  await Promise.allSettled(flattened.filter(Boolean).map((file) => fs.unlink(file.path)));
}

module.exports = {
  PRIVATE_UPLOAD_FOLDERS,
  isPrivateUploadRequest,
  resolveStoredAttachment,
  sendStoredAttachment,
  removeStoredAttachments,
  removeUploadedFiles,
};
