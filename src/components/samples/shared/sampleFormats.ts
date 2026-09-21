import {
  Database,
  FileArchive,
  FileCode,
  FileImage,
  FileMusic,
  FileSpreadsheet,
  FileText,
  FileVideo,
  Link2,
  MonitorPlay,
  type LucideIcon,
} from "lucide-react";

/**
 * Format resolution for the sample viewer.
 *
 * Why this module exists: `SampleItem.fileType` is a *display badge* that admins
 * can set to any string via the "Custom…" option in SampleFileEditor, so it can
 * never be trusted to decide how a file is rendered. The authoritative signal is
 * `mimeType`, captured from multer at upload time. Legacy rows created before
 * that field existed — and every external link — have no mimeType, so the URL
 * extension is the documented fallback.
 *
 * Agreed format policy: all image, all audio, all video, PDF, DOCX, Excel, CSV,
 * TXT, JSON, interactive HTML, and source files (CSS/JS). Every document format
 * except PowerPoint. PPT/PPTX/ODP are rejected on purpose — see REJECTED_*.
 */

export type SampleRenderKind =
  | "image"
  | "video"
  | "audio"
  | "pdf"
  /** Plain text, JSON, XML and the data-annotation formats. */
  | "text"
  /** Source files shown read-only with syntax highlighting, never executed. */
  | "code"
  /** Word-processor documents rendered to HTML client-side. */
  | "document"
  /** Excel and delimited data rendered as a table. */
  | "spreadsheet"
  /** Self-contained HTML that runs in a sandboxed frame (3D/interactive demos). */
  | "interactive"
  /** Zip/SCORM bundle. Needs server-side unpacking before it can be shown. */
  | "bundle"
  /** Disallowed by policy (PowerPoint). */
  | "rejected"
  /** Third-party link; we do not control it and cannot enforce view-only. */
  | "external"
  | "unsupported";

export interface SampleFileLike {
  mimeType?: string;
  fileUrl: string;
  isExternal?: boolean;
}

export interface ResolvedSampleFormat {
  kind: SampleRenderKind;
  /** Normalised media type, or "" when unknown. */
  mimeType: string;
  /** Lowercase extension without the dot, or "" when the URL has none. */
  extension: string;
  /** Whether the viewer can render this inline. */
  isViewable: boolean;
  /** Prism-style language hint for `kind === "code"`. */
  codeLanguage?: string;
  /** Shown to the user when `isViewable` is false. */
  unavailableReason?: string;
}

/** Text and code previews are fetched into memory, so they need a hard ceiling. */
export const MAX_TEXT_PREVIEW_BYTES = 512 * 1024;

/** Spreadsheet parsing is CPU-bound on the main thread; cap the input. */
export const MAX_SPREADSHEET_BYTES = 8 * 1024 * 1024;

/**
 * PowerPoint is excluded by product decision, not by technical limitation.
 * Enforced at upload time in eqourse-backend/src/controller/uploadController.js;
 * recognised here so legacy rows render an honest message instead of a blank box.
 */
export const REJECTED_EXTENSIONS: readonly string[] = ["ppt", "pptx", "pps", "ppsx", "odp"];
export const REJECTED_MIME_TYPES: readonly string[] = [
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.oasis.opendocument.presentation",
];

/**
 * Word-processor formats we can actually render in the browser. `.docx` converts
 * cleanly to HTML client-side; the legacy binary `.doc`, `.rtf` and `.odt` have no
 * viable browser renderer, so they resolve to a "convert to DOCX or PDF" message
 * rather than pretending to work.
 */
const RENDERABLE_DOCUMENT_EXTENSIONS: readonly string[] = ["docx"];
const LEGACY_DOCUMENT_EXTENSIONS: readonly string[] = ["doc", "rtf", "odt"];

/** `.xlsx` parses in the browser. Legacy binary `.xls` and `.ods` do not. */
const RENDERABLE_SPREADSHEET_EXTENSIONS: readonly string[] = ["xlsx", "csv", "tsv"];
const LEGACY_SPREADSHEET_EXTENSIONS: readonly string[] = ["xls", "ods"];

const EXTENSIONS_BY_KIND: Partial<Record<SampleRenderKind, readonly string[]>> = {
  image: ["png", "jpg", "jpeg", "gif", "webp", "avif", "svg", "bmp", "ico", "tif", "tiff", "heic", "heif"],
  video: ["mp4", "webm", "ogv", "mov", "m4v", "avi", "mkv", "mpeg", "mpg", "3gp", "flv", "wmv"],
  audio: ["mp3", "wav", "ogg", "oga", "m4a", "aac", "flac", "opus", "weba", "aiff", "wma"],
  pdf: ["pdf"],
  // Includes the data-annotation formats the samples catalogue actually uses
  // (rttm, textgrid, conll) — all plain text despite the unusual extensions.
  text: [
    "txt", "json", "jsonl", "ndjson", "xml", "md", "markdown", "log",
    "rttm", "textgrid", "conll", "srt", "vtt", "yaml", "yml", "ini", "env",
  ],
  code: ["css", "scss", "sass", "less", "js", "mjs", "cjs", "jsx", "ts", "tsx", "glsl", "vert", "frag"],
  interactive: ["html", "htm", "xhtml"],
  bundle: ["zip", "tar", "gz", "tgz", "rar", "7z", "scorm"],
};

const CODE_LANGUAGES: Record<string, string> = {
  css: "css", scss: "scss", sass: "sass", less: "less",
  js: "javascript", mjs: "javascript", cjs: "javascript", jsx: "jsx",
  ts: "typescript", tsx: "tsx",
  glsl: "glsl", vert: "glsl", frag: "glsl",
};

const DOCUMENT_MIME_TYPES = new Set([
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/rtf",
  "application/vnd.oasis.opendocument.text",
]);

const SPREADSHEET_MIME_TYPES = new Set([
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.oasis.opendocument.spreadsheet",
  "text/csv",
  "text/tab-separated-values",
]);

const BUNDLE_MIME_TYPES = new Set([
  "application/zip",
  "application/x-zip-compressed",
  "multipart/x-zip",
  "application/x-tar",
  "application/gzip",
  "application/x-7z-compressed",
  "application/vnd.rar",
]);

const TEXT_MIME_TYPES = new Set([
  "application/json",
  "application/ld+json",
  "application/xml",
  "application/x-ndjson",
  "application/yaml",
]);

const CODE_MIME_TYPES = new Set([
  "text/css",
  "text/javascript",
  "application/javascript",
  "application/x-javascript",
  "text/x-scss",
  "text/x-less",
]);

const INTERACTIVE_MIME_TYPES = new Set([
  "text/html",
  "application/xhtml+xml",
]);

const UNAVAILABLE_REASONS: Partial<Record<SampleRenderKind, string>> = {
  bundle:
    "This sample is a packaged bundle, so there's nothing to display on screen yet. Contact us for a guided walkthrough.",
  rejected:
    "PowerPoint samples aren't published here. Contact us and we'll share this deck directly.",
  unsupported:
    "This file format can't be displayed in the browser. Contact us and we'll walk you through this sample.",
};

const LEGACY_FORMAT_REASON =
  "This older file format can't be displayed in the browser. Contact us and we'll share a PDF version.";

/**
 * Extracts a lowercase extension from a path or absolute URL, ignoring any
 * query string or fragment (`/a/b/file.pdf?v=2#page=3` → `pdf`).
 */
export function fileExtensionFromUrl(url: string): string {
  const withoutQuery = String(url || "").split(/[?#]/)[0];
  const lastSegment = withoutQuery.split("/").pop() ?? "";
  const dotIndex = lastSegment.lastIndexOf(".");
  if (dotIndex <= 0 || dotIndex === lastSegment.length - 1) return "";
  return lastSegment.slice(dotIndex + 1).toLowerCase();
}

/** Strips parameters and casing: `Text/CSV; charset=utf-8` → `text/csv`. */
function normaliseMimeType(value?: string): string {
  return String(value || "").split(";")[0].trim().toLowerCase();
}

function kindFromMimeType(mimeType: string): SampleRenderKind | null {
  if (!mimeType) return null;
  if (REJECTED_MIME_TYPES.includes(mimeType)) return "rejected";
  if (mimeType === "application/pdf") return "pdf";
  if (INTERACTIVE_MIME_TYPES.has(mimeType)) return "interactive";
  if (CODE_MIME_TYPES.has(mimeType)) return "code";
  if (DOCUMENT_MIME_TYPES.has(mimeType)) return "document";
  if (SPREADSHEET_MIME_TYPES.has(mimeType)) return "spreadsheet";
  if (BUNDLE_MIME_TYPES.has(mimeType)) return "bundle";
  if (TEXT_MIME_TYPES.has(mimeType)) return "text";
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("audio/")) return "audio";
  if (mimeType.startsWith("text/")) return "text";
  return null;
}

function kindFromExtension(extension: string): SampleRenderKind | null {
  if (!extension) return null;
  if (REJECTED_EXTENSIONS.includes(extension)) return "rejected";
  if (RENDERABLE_DOCUMENT_EXTENSIONS.includes(extension)) return "document";
  if (LEGACY_DOCUMENT_EXTENSIONS.includes(extension)) return "document";
  if (RENDERABLE_SPREADSHEET_EXTENSIONS.includes(extension)) return "spreadsheet";
  if (LEGACY_SPREADSHEET_EXTENSIONS.includes(extension)) return "spreadsheet";
  for (const [kind, extensions] of Object.entries(EXTENSIONS_BY_KIND)) {
    if (extensions?.includes(extension)) return kind as SampleRenderKind;
  }
  return null;
}

/**
 * Word and Excel resolve by mime type, but only some of their extensions have a
 * browser renderer. Mime type alone can't tell `.docx` from `.doc`, so the final
 * viewability call always consults the extension.
 */
function isLegacyOfficeFormat(kind: SampleRenderKind, extension: string): boolean {
  if (kind === "document") {
    return !RENDERABLE_DOCUMENT_EXTENSIONS.includes(extension);
  }
  if (kind === "spreadsheet") {
    return !RENDERABLE_SPREADSHEET_EXTENSIONS.includes(extension);
  }
  return false;
}

export function resolveSampleFormat(file: SampleFileLike): ResolvedSampleFormat {
  const extension = fileExtensionFromUrl(file.fileUrl);
  const mimeType = normaliseMimeType(file.mimeType);

  // External links are somebody else's document. We can't set headers on them,
  // can't strip their download affordances, and shouldn't frame them, so they
  // stay an explicit new-tab hand-off rather than a viewer surface.
  if (file.isExternal) {
    return { kind: "external", mimeType, extension, isViewable: false };
  }

  const kind = kindFromMimeType(mimeType) ?? kindFromExtension(extension) ?? "unsupported";

  if (isLegacyOfficeFormat(kind, extension)) {
    return { kind, mimeType, extension, isViewable: false, unavailableReason: LEGACY_FORMAT_REASON };
  }

  const isViewable = kind === "image" || kind === "video" || kind === "audio"
    || kind === "pdf" || kind === "text" || kind === "code"
    || kind === "document" || kind === "spreadsheet" || kind === "interactive";

  return {
    kind,
    mimeType,
    extension,
    isViewable,
    codeLanguage: kind === "code" ? (CODE_LANGUAGES[extension] ?? "plaintext") : undefined,
    unavailableReason: isViewable ? undefined : UNAVAILABLE_REASONS[kind],
  };
}

const ICONS_BY_KIND: Record<SampleRenderKind, LucideIcon> = {
  image: FileImage,
  video: FileVideo,
  audio: FileMusic,
  pdf: FileText,
  text: FileCode,
  code: FileCode,
  document: FileText,
  spreadsheet: FileSpreadsheet,
  interactive: MonitorPlay,
  bundle: FileArchive,
  rejected: FileText,
  external: Link2,
  unsupported: Database,
};

/** Icon for a resolved format, refined by extension where it helps. */
export function sampleIconFor(format: ResolvedSampleFormat): LucideIcon {
  if (format.kind === "text" && ["csv", "tsv"].includes(format.extension)) {
    return FileSpreadsheet;
  }
  return ICONS_BY_KIND[format.kind];
}
