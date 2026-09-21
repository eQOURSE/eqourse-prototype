/**
 * Accept filter for sample uploads.
 *
 * This is a convenience filter for the file picker only. The enforced policy
 * lives in eqourse-backend/src/controller/uploadController.js (`fileFilter`);
 * keep the two in step. PowerPoint is absent on purpose — it is rejected
 * server-side with a message telling the admin to export a PDF.
 */
export const SAMPLE_FILE_ACCEPT = [
  // Whole media families
  "image/*",
  "audio/*",
  "video/*",
  // Documents
  ".pdf", ".docx", ".doc", ".rtf", ".odt",
  // Spreadsheets and delimited data
  ".xlsx", ".xls", ".ods", ".csv", ".tsv",
  // Text and data
  ".txt", ".json", ".jsonl", ".ndjson", ".xml", ".md", ".log",
  ".yaml", ".yml", ".rttm", ".textgrid", ".conll", ".srt", ".vtt",
  // Interactive HTML samples and their source files
  ".html", ".htm", ".css", ".scss", ".less", ".js", ".mjs", ".jsx", ".ts", ".tsx",
  ".glsl", ".vert", ".frag",
  // Bundled interactive samples
  ".zip", ".scorm",
].join(",");

/** Shown under the upload control so admins know what will be accepted. */
export const SAMPLE_FILE_ACCEPT_HINT =
  "Images, audio and video (any format), PDF, DOCX, Excel, CSV, TXT, JSON, "
  + "interactive HTML, and source files. PowerPoint is not supported — export the deck as PDF.";
