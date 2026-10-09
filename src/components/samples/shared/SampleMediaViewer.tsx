import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Download, ExternalLink, FileWarning, Loader2 } from "lucide-react";
import type { PreviewFile } from "@/lib/publicApi";
import * as pdfjsLib from "pdfjs-dist";
import PdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?worker";
import mammoth from "mammoth";
import * as XLSX from "xlsx";
import DOMPurify from "dompurify";

pdfjsLib.GlobalWorkerOptions.workerPort = new PdfWorker();

interface SampleMediaViewerProps {
  file: PreviewFile;
}

const MAX_TEXT_BYTES = 2 * 1024 * 1024;
const MAX_TFRECORD_BYTES = 8 * 1024 * 1024;
const MAX_TFRECORD_RECORDS = 50;

const extensionOf = (url: string) => {
  try {
    const pathname = new URL(url, window.location.href).pathname;
    return pathname.split(".").pop()?.toLowerCase() ?? "";
  } catch {
    return url.split(/[?#]/)[0].split(".").pop()?.toLowerCase() ?? "";
  }
};

const typeCandidates = (file: PreviewFile) => [
  extensionOf(file.fileUrl),
  file.fileType,
  file.mimeType,
  extensionOf(file.thumbnailUrl || ""),
]
  .filter(Boolean)
  .map((value) => value!.trim().toLowerCase().replace(/^\./, ""));

const canonicalType = (value: string) => ({
  "audio/x-wav": "wav",
  "audio/wave": "wav",
  "audio/vnd.wave": "wav",
  "audio/x-m4a": "m4a",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
}[value] || value);

const normalizedType = (file: PreviewFile) => {
  const candidates = typeCandidates(file).map(canonicalType);
  const known = candidates.find((value) => [
    "image", "jpg", "jpeg", "png", "gif", "webp", "svg", "avif", "bmp", "ico", "tif", "tiff",
    "audio", "mp3", "wav", "ogg", "oga", "m4a", "aac", "flac", "opus", "aiff", "wma",
    "video", "mp4", "webm", "mov", "m4v", "ogv", "avi", "mkv", "mpeg", "mpg", "3gp", "wmv",
    "pdf", "application/pdf", "doc", "docx", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "xls", "xlsx", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "json", "jsonl", "ndjson", "csv", "tsv", "conll", "text/csv", "text",
    "txt", "text/plain", "xml", "sitemap", "application/xml", "text/xml", "html", "html5", "htm", "text/html", "md", "markdown",
  ].includes(value) || value.startsWith("image/") || value.startsWith("audio/") || value.startsWith("video/"));
  return known || candidates[0] || "";
};

const matches = (value: string, types: string[]) =>
  types.some((type) => value === type || value.startsWith(`${type}/`));

const resolveUrl = (url: string) => {
  const base = (import.meta.env.VITE_API_BASE_URL as string) || "";
  const apiBase = base.replace(/\/+$/, "");

  const toApiUploadPath = (pathname: string) => {
    if (pathname.startsWith("/api/uploads/")) return pathname;
    if (pathname.startsWith("/uploads/")) return `/api${pathname}`;
    return null;
  };

  if (base) {
    try {
      const parsed = new URL(url, window.location.href);
      // Uploads are written by the API server. If the CDN has not yet
      // reloaded its Nginx config, preview them through the API origin.
      const apiPath = toApiUploadPath(parsed.pathname);
      if (apiPath && (parsed.hostname === "cdn.eqourse.com" || !/^https?:/i.test(url))) {
        return `${apiBase}${apiPath}${parsed.search}`;
      }
    } catch {
      // Fall through to the original URL for malformed or relative values.
    }
  }
  if (/^(https?:|blob:|data:)/i.test(url)) return url;
  return `${base}${url}`;
};

const isTextType = (type: string) => matches(type, [
  "text", "txt", "text/plain", "csv", "tsv", "xml", "sitemap", "html", "htm", "md",
  "markdown", "log", "srt", "vtt", "rtf", "yaml", "yml", "json", "jsonl", "conll",
  "ndjson", "application/json", "application/ld+json", "application/xml",
]);

const isJsonType = (type: string) => matches(type, [
  "json", "jsonl", "ndjson", "application/json", "application/ld+json",
]);

const isCsvType = (type: string) => matches(type, ["csv", "tsv", "text/csv", "text/tab-separated-values"]);

const isImageType = (type: string) => matches(type, [
  "image", "jpg", "jpeg", "png", "gif", "webp", "svg", "avif", "bmp", "ico", "tif", "tiff",
]);

const isAudioType = (type: string) => matches(type, [
  "audio", "mp3", "wav", "ogg", "oga", "m4a", "aac", "flac", "opus", "aiff", "wma",
]);

const isVideoType = (type: string) => matches(type, [
  "video", "mp4", "webm", "mov", "m4v", "ogv", "avi", "mkv", "mpeg", "mpg", "3gp", "wmv",
]);

const isPdfType = (type: string) => matches(type, ["pdf", "application/pdf"]);
const isHtmlType = (type: string) => matches(type, ["html", "html5", "htm", "text/html"]);
const isWordType = (type: string) => matches(type, [
  "doc",
  "docx",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const isSpreadsheetType = (type: string) => matches(type, [
  "xls",
  "xlsx",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]);

const isTfRecordType = (type: string) => matches(type, ["tfrecord", "tfrecords"]);

type TfRecordFeature = { kind: "bytes" | "float" | "int64" | "unknown"; values: string[] };
type TfRecordPreview = { index: number; byteLength: number; features: Record<string, TfRecordFeature>; raw: boolean };

class ProtoReader {
  private offset = 0;

  constructor(private readonly bytes: Uint8Array) {}

  get done() { return this.offset >= this.bytes.length; }

  varint() {
    let value = 0n;
    let shift = 0n;
    while (!this.done && shift <= 63n) {
      const byte = this.bytes[this.offset++];
      value |= BigInt(byte & 0x7f) << shift;
      if ((byte & 0x80) === 0) return value;
      shift += 7n;
    }
    throw new Error("Invalid protobuf varint");
  }

  bytesValue() {
    const length = Number(this.varint());
    if (!Number.isSafeInteger(length) || length < 0 || this.offset + length > this.bytes.length) throw new Error("Invalid protobuf length");
    const value = this.bytes.slice(this.offset, this.offset + length);
    this.offset += length;
    return value;
  }

  skip(wireType: number) {
    if (wireType === 0) { this.varint(); return; }
    if (wireType === 1) { this.offset += 8; return; }
    if (wireType === 2) { this.bytesValue(); return; }
    if (wireType === 5) { this.offset += 4; return; }
    throw new Error("Unsupported protobuf wire type");
  }
}

const utf8 = (bytes: Uint8Array) => new TextDecoder().decode(bytes);
const displayBytes = (bytes: Uint8Array) => {
  const decoded = utf8(bytes);
  const hasUnreadableCharacters = Array.from(decoded).some((character) => {
    const code = character.charCodeAt(0);
    return code === 0xfffd || (code < 32 && code !== 9 && code !== 10 && code !== 13);
  });
  return decoded && !hasUnreadableCharacters
    ? decoded
    : `binary (${bytes.byteLength} bytes)`;
};

const parsePackedNumbers = (bytes: Uint8Array, kind: "float" | "int64") => {
  const values: string[] = [];
  if (kind === "float") {
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    for (let offset = 0; offset + 4 <= bytes.byteLength; offset += 4) values.push(String(view.getFloat32(offset, true)));
  } else {
    const reader = new ProtoReader(bytes);
    while (!reader.done) values.push(String(reader.varint()));
  }
  return values;
};

const parseFeatureList = (bytes: Uint8Array, kind: "bytes" | "float" | "int64") => {
  const reader = new ProtoReader(bytes);
  const values: string[] = [];
  while (!reader.done) {
    const tag = Number(reader.varint());
    const field = tag >>> 3;
    const wireType = tag & 7;
    if (field !== 1) { reader.skip(wireType); continue; }
    if (kind === "bytes" && wireType === 2) {
      const value = reader.bytesValue();
      values.push(displayBytes(value));
    } else if (kind === "float" && wireType === 2) {
      values.push(...parsePackedNumbers(reader.bytesValue(), "float"));
    } else if (kind === "int64" && wireType === 2) {
      values.push(...parsePackedNumbers(reader.bytesValue(), "int64"));
    } else {
      reader.skip(wireType);
    }
  }
  return values;
};

const parseFeature = (bytes: Uint8Array): TfRecordFeature => {
  const reader = new ProtoReader(bytes);
  while (!reader.done) {
    const tag = Number(reader.varint());
    const field = tag >>> 3;
    const wireType = tag & 7;
    if (wireType !== 2) { reader.skip(wireType); continue; }
    const value = reader.bytesValue();
    if (field === 1) return { kind: "bytes", values: parseFeatureList(value, "bytes") };
    if (field === 2) return { kind: "float", values: parseFeatureList(value, "float") };
    if (field === 3) return { kind: "int64", values: parseFeatureList(value, "int64") };
  }
  return { kind: "unknown", values: [] };
};

const parseFeatureEntry = (bytes: Uint8Array) => {
  const reader = new ProtoReader(bytes);
  let key = "";
  let feature: TfRecordFeature | null = null;
  while (!reader.done) {
    const tag = Number(reader.varint());
    const field = tag >>> 3;
    const wireType = tag & 7;
    if (wireType !== 2) { reader.skip(wireType); continue; }
    const value = reader.bytesValue();
    if (field === 1) key = utf8(value);
    if (field === 2) feature = parseFeature(value);
  }
  return key && feature ? [key, feature] as const : null;
};

const parseExample = (bytes: Uint8Array) => {
  const reader = new ProtoReader(bytes);
  const features: Record<string, TfRecordFeature> = {};
  while (!reader.done) {
    const tag = Number(reader.varint());
    const field = tag >>> 3;
    const wireType = tag & 7;
    if (wireType !== 2) { reader.skip(wireType); continue; }
    const value = reader.bytesValue();
    if (field !== 1) continue;
    // Features.feature is a repeated map-entry field. Each field-1 payload
    // is one complete { key, value } entry, not a container of entries.
    const entry = parseFeatureEntry(value);
    if (entry) features[entry[0]] = entry[1];
  }
  return Object.keys(features).length ? features : null;
};

const parseTfRecords = (buffer: ArrayBuffer): TfRecordPreview[] => {
  const bytes = new Uint8Array(buffer);
  const view = new DataView(buffer);
  const records: TfRecordPreview[] = [];
  let offset = 0;
  while (offset + 16 <= bytes.length && records.length < MAX_TFRECORD_RECORDS) {
    const length = Number(view.getBigUint64(offset, true));
    if (!Number.isSafeInteger(length) || length < 0 || offset + 16 + length > bytes.length) break;
    const payload = bytes.slice(offset + 12, offset + 12 + length);
    let features: Record<string, TfRecordFeature> | null = null;
    try { features = parseExample(payload); } catch { features = null; }
    records.push({ index: records.length + 1, byteLength: length, features: features || {}, raw: !features });
    offset += 16 + length;
  }
  return records;
};

const formatJson = (source: string, type: string) => {
  if (matches(type, ["jsonl", "ndjson"])) {
    return source
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        try { return JSON.stringify(JSON.parse(line), null, 2); }
        catch { return line; }
      })
      .join("\n\n");
  }

  try { return JSON.stringify(JSON.parse(source), null, 2); }
  catch { return source; }
};

export default function SampleMediaViewer({ file }: SampleMediaViewerProps) {
  const url = resolveUrl(file.fileUrl);
  const type = normalizedType(file);
  const [text, setText] = useState<string | null>(null);
  const [tfRecords, setTfRecords] = useState<TfRecordPreview[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const textPreview = useMemo(
    () => text === null ? null : isJsonType(type) ? formatJson(text, type) : text,
    [text, type],
  );

  useEffect(() => {
    if (!isTextType(type) || isHtmlType(type)) return;

    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setText(null);

    fetch(url, { signal: controller.signal, cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error(`Preview request failed (${response.status})`);
        const length = Number(response.headers.get("content-length") || 0);
        if (length > MAX_TEXT_BYTES) throw new Error("This text file is too large to preview.");
        return response.arrayBuffer();
      })
      .then((buffer) => {
        if (buffer.byteLength > MAX_TEXT_BYTES) throw new Error("This text file is too large to preview.");
        setText(new TextDecoder().decode(buffer));
      })
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === "AbortError") return;
        setError(reason instanceof Error ? reason.message : "The file could not be previewed.");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [type, url]);

  useEffect(() => {
    if (!isTfRecordType(type)) return;

    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setTfRecords(null);

    fetch(url, { signal: controller.signal, cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error(`Preview request failed (${response.status})`);
        const length = Number(response.headers.get("content-length") || 0);
        if (length > MAX_TFRECORD_BYTES) throw new Error("This TFRecord file is too large to preview. Download it to inspect the full dataset.");
        return response.arrayBuffer();
      })
      .then((buffer) => {
        if (buffer.byteLength > MAX_TFRECORD_BYTES) throw new Error("This TFRecord file is too large to preview. Download it to inspect the full dataset.");
        const records = parseTfRecords(buffer);
        if (!records.length) throw new Error("No complete TFRecord entries were found in this file.");
        setTfRecords(records);
      })
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === "AbortError") return;
        setError(reason instanceof Error ? reason.message : "The TFRecord file could not be previewed.");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [type, url]);

  if (isImageType(type)) {
    return <MediaWithDownload file={file} url={url}><img src={url} alt={file.title} draggable={false} onContextMenu={(event) => event.preventDefault()} className="max-h-[60vh] max-w-full rounded-lg object-contain select-none" /></MediaWithDownload>;
  }

  if (isAudioType(type)) {
    return <MediaWithDownload file={file} url={url}><audio className="w-full" controls controlsList={file.allowDownload ? undefined : "nodownload"} preload="metadata" src={url} onContextMenu={(event) => event.preventDefault()}>Your browser cannot play this audio format.</audio></MediaWithDownload>;
  }

  if (isVideoType(type)) {
    return <MediaWithDownload file={file} url={url}><video className="max-h-[62vh] w-full rounded-lg bg-black" controls controlsList={file.allowDownload ? undefined : "nodownload"} disablePictureInPicture={!file.allowDownload} playsInline preload="metadata" src={url} onContextMenu={(event) => event.preventDefault()}>Your browser cannot play this video format.</video></MediaWithDownload>;
  }

  if (isWordType(type)) {
    if (matches(type, ["doc", "application/msword"])) {
      return (
        <PreviewFallback
          message="Legacy .doc files cannot be rendered in the browser. Please upload a .docx copy for preview."
          url={url}
          allowDownload={file.allowDownload === true}
        />
      );
    }
    return <DocxPreview file={file} url={url} />;
  }

  if (isSpreadsheetType(type)) {
    return <SpreadsheetPreview file={file} url={url} />;
  }

  if (isPdfType(type)) {
    return <PdfJsViewer file={file} url={url} />;
  }

  if (isHtmlType(type)) {
    const externalOrigin = (() => {
      try { return new URL(url, window.location.href).origin; }
      catch { return ""; }
    })();
    const crossOriginHostedHtml = file.isExternal && externalOrigin && externalOrigin !== window.location.origin;
    const sandbox = `allow-scripts allow-forms allow-modals allow-popups allow-presentation${crossOriginHostedHtml ? " allow-same-origin" : ""}`;
    return <MediaWithDownload file={file} url={url}><iframe title={file.title} src={url} sandbox={sandbox} allow="autoplay; fullscreen; xr-spatial-tracking; web-share" allowFullScreen onContextMenu={(event) => event.preventDefault()} className="h-[62vh] w-full rounded-lg border bg-white" /></MediaWithDownload>;
  }

  if (isTfRecordType(type)) {
    if (loading) return <LoadingPreview />;
    if (error) return <PreviewFallback message={error} url={url} allowDownload={file.allowDownload === true} />;
    return <TfRecordPreviewPanel records={tfRecords || []} file={file} url={url} />;
  }

  if (isTextType(type)) {
    if (loading) return <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Loading preview…</div>;
    if (error) return <PreviewFallback message={error} url={url} allowDownload={file.allowDownload === true} />;
    if (isCsvType(type)) {
      return <CsvPreview value={textPreview || ""} file={file} url={url} />;
    }
    return <MediaWithDownload file={file} url={url}><pre onContextMenu={(event) => event.preventDefault()} className="max-h-[62vh] w-full overflow-auto rounded-lg bg-slate-950 p-4 text-left text-xs leading-5 text-slate-100 select-none">{textPreview}</pre></MediaWithDownload>;
  }

  return <PreviewFallback message="This format is not supported for inline preview." url={url} allowDownload={file.allowDownload === true} />;
}

function parseDelimited(value: string, delimiter: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    const next = value[index + 1];
    if (character === '"' && quoted && next === '"') { cell += '"'; index += 1; continue; }
    if (character === '"') { quoted = !quoted; continue; }
    if (character === delimiter && !quoted) { row.push(cell); cell = ""; continue; }
    if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && next === "\n") index += 1;
      row.push(cell); cell = "";
      if (row.some((item) => item.trim())) rows.push(row);
      row = [];
      continue;
    }
    cell += character;
  }
  if (cell || row.length) { row.push(cell); if (row.some((item) => item.trim())) rows.push(row); }
  return rows;
}

function CsvPreview({ value, file, url }: { value: string; file: PreviewFile; url: string }) {
  const delimiter = value.split(/\r?\n/, 1)[0]?.includes("\t") ? "\t" : ",";
  const rows = parseDelimited(value, delimiter);
  const headers = rows[0] || [];
  const body = rows.slice(1);

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div onContextMenu={(event) => event.preventDefault()} className="max-h-[62vh] w-full overflow-auto rounded-lg border bg-white text-left text-xs text-slate-800 select-none">
        <table className="min-w-full border-collapse">
        <thead className="sticky top-0 z-10 bg-slate-100 text-left font-semibold text-slate-700">
          <tr>
            <th className="border-b border-r px-3 py-2 text-center text-slate-400">#</th>
            {headers.map((header, index) => <th key={index} className="border-b border-r px-3 py-2 whitespace-nowrap">{header || `Column ${index + 1}`}</th>)}
          </tr>
        </thead>
        <tbody>
          {body.map((row, rowIndex) => (
            <tr key={rowIndex} className="even:bg-slate-50 hover:bg-primary/5">
              <td className="border-b border-r px-3 py-2 text-center text-slate-400">{rowIndex + 1}</td>
              {headers.map((_, columnIndex) => <td key={columnIndex} className="border-b border-r px-3 py-2 whitespace-nowrap">{row[columnIndex] || ""}</td>)}
            </tr>
          ))}
        </tbody>
        </table>
        {!rows.length && <p className="p-6 text-center text-muted-foreground">No tabular data available.</p>}
      </div>
      {file.allowDownload && <DownloadLink url={url} />}
    </div>
  );
}

function MediaWithDownload({ file, url, children }: { file: PreviewFile; url: string; children: ReactNode }) {
  return <div className="flex w-full flex-col items-center gap-3">{children}{file.allowDownload && <DownloadLink url={url} />}</div>;
}

function DownloadLink({ url }: { url: string }) {
  return <a href={url} download className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium"><Download className="h-4 w-4" /> Download</a>;
}

function PreviewFallback({ message, url, allowDownload }: { message: string; url: string; allowDownload: boolean }) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border p-6 text-center">
      <FileWarning className="h-8 w-8 text-muted-foreground" />
      <p className="max-w-md text-sm text-muted-foreground">{message}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {allowDownload && <DownloadLink url={url} />}
        <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium">
          <ExternalLink className="h-4 w-4" /> Open file
        </a>
      </div>
    </div>
  );
}

function DocxPreview({ file, url }: { file: PreviewFile; url: string }) {
  const [html, setHtml] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setHtml("");
    setError("");
    void fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load document (${response.status})`);
        return response.arrayBuffer();
      })
      .then((arrayBuffer) => mammoth.convertToHtml({ arrayBuffer }))
      .then((result) => setHtml(DOMPurify.sanitize(result.value, { USE_PROFILES: { html: true } })))
      .catch((reason: unknown) => {
        if ((reason as Error)?.name !== "AbortError") setError(reason instanceof Error ? reason.message : "Unable to render this document.");
      });
    return () => controller.abort();
  }, [url]);

  if (error) return <PreviewFallback message={error} url={url} allowDownload={file.allowDownload === true} />;
  if (!html) return <LoadingPreview />;
  return (
    <MediaWithDownload file={file} url={url}>
      <article className="prose prose-sm max-h-[62vh] w-full max-w-none overflow-auto rounded-lg bg-white p-6 text-left" dangerouslySetInnerHTML={{ __html: html }} />
    </MediaWithDownload>
  );
}

function SpreadsheetPreview({ file, url }: { file: PreviewFile; url: string }) {
  const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);
  const [sheetName, setSheetName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setWorkbook(null);
    setError("");
    void fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load spreadsheet (${response.status})`);
        return response.arrayBuffer();
      })
      .then((arrayBuffer) => {
        const nextWorkbook = XLSX.read(arrayBuffer, { type: "array" });
        setWorkbook(nextWorkbook);
        setSheetName(nextWorkbook.SheetNames[0] ?? "");
      })
      .catch((reason: unknown) => {
        if ((reason as Error)?.name !== "AbortError") setError(reason instanceof Error ? reason.message : "Unable to render this spreadsheet.");
      });
    return () => controller.abort();
  }, [url]);

  if (error) return <PreviewFallback message={error} url={url} allowDownload={file.allowDownload === true} />;
  if (!workbook || !sheetName) return <LoadingPreview />;
  const rows = XLSX.utils.sheet_to_json<unknown[]>(workbook.Sheets[sheetName], { header: 1, defval: "" });
  return (
    <MediaWithDownload file={file} url={url}>
      <div className="w-full overflow-hidden rounded-lg bg-white text-left">
        {workbook.SheetNames.length > 1 && (
          <div className="border-b bg-slate-50 p-2">
            <select className="rounded border px-2 py-1 text-sm" value={sheetName} onChange={(event) => setSheetName(event.target.value)}>
              {workbook.SheetNames.map((name) => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>
        )}
        <div className="max-h-[62vh] overflow-auto">
          <table className="min-w-full border-collapse text-sm"><tbody>
            {rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex} className="whitespace-pre-wrap border px-3 py-2 align-top">{String(cell ?? "")}</td>)}</tr>)}
          </tbody></table>
        </div>
      </div>
    </MediaWithDownload>
  );
}

function LoadingPreview() {
  return <div className="flex h-40 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>;
}

function TfRecordPreviewPanel({ records, file, url }: { records: TfRecordPreview[]; file: PreviewFile; url: string }) {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>Showing {records.length} record{records.length === 1 ? "" : "s"} from the preview window</span>
        {file.allowDownload && <DownloadLink url={url} />}
      </div>
      <div className="max-h-[62vh] w-full overflow-auto rounded-lg border bg-white text-left text-xs text-slate-800">
        {records.map((record) => (
          <details key={record.index} className="border-b last:border-b-0" open={record.index === 1}>
            <summary className="cursor-pointer px-3 py-2 font-semibold hover:bg-slate-50">
              Record {record.index} <span className="ml-2 font-normal text-slate-500">{record.byteLength.toLocaleString()} bytes</span>
            </summary>
            {record.raw ? (
              <p className="px-3 pb-3 text-slate-500">Serialized payload detected, but it is not a standard <code>tf.train.Example</code> message.</p>
            ) : (
              <div className="overflow-x-auto px-3 pb-3">
                <table className="min-w-full border-collapse">
                  <thead className="bg-slate-100 text-left font-semibold text-slate-700"><tr><th className="border px-3 py-2">Feature</th><th className="border px-3 py-2">Type</th><th className="border px-3 py-2">Value</th></tr></thead>
                  <tbody>{Object.entries(record.features).map(([name, feature]) => <tr key={name}><td className="border px-3 py-2 font-medium">{name}</td><td className="border px-3 py-2">{feature.kind}</td><td className="border px-3 py-2 whitespace-pre-wrap">{feature.values.join(", ")}</td></tr>)}</tbody>
                </table>
              </div>
            )}
          </details>
        ))}
      </div>
    </div>
  );
}

function PdfJsViewer({ file, url }: { file: PreviewFile; url: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const documentRef = useRef<Awaited<ReturnType<typeof pdfjsLib.getDocument>>["promise"] extends Promise<infer T> ? T : never>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    let loadedDocument: Awaited<ReturnType<typeof pdfjsLib.getDocument>>["promise"] extends Promise<infer T> ? T : never;
    setLoading(true);
    setError(null);
    setPage(1);
    documentRef.current = null;

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`PDF request failed (${response.status})`);
        return response.arrayBuffer();
      })
      .then((buffer) => {
        const bytes = new Uint8Array(buffer);
        if (bytes.length < 5 || String.fromCharCode(...bytes.slice(0, 5)) !== "%PDF-") {
          throw new Error("The response is not a valid PDF file.");
        }
        return pdfjsLib.getDocument({ data: bytes }).promise;
      })
      .then((document) => {
        if (!active) return;
        loadedDocument = document;
        documentRef.current = document;
        setTotalPages(document.numPages);
      })
      .catch((reason: unknown) => {
        if (active && (reason as Error)?.name !== "AbortError") {
          setError(reason instanceof Error ? reason.message : "The PDF could not be loaded.");
        }
      })
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
      controller.abort();
      void loadedDocument?.destroy();
    };
  }, [url]);

  useEffect(() => {
    let active = true;
    const render = async () => {
      const document = documentRef.current;
      const canvas = canvasRef.current;
      if (!document || !canvas) return;
      try {
        const pdfPage = await document.getPage(page);
        const viewport = pdfPage.getViewport({ scale: 1.35 });
        const context = canvas.getContext("2d");
        if (!context) return;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await pdfPage.render({ canvasContext: context, viewport }).promise;
      } catch {
        if (active) setError("This PDF page could not be rendered.");
      }
    };
    void render();
    return () => { active = false; };
  }, [page, totalPages]);

  if (loading) return <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Loading PDF…</div>;
  if (error) return <PreviewFallback message={error} url={url} allowDownload={file.allowDownload === true} />;

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div onContextMenu={(event) => event.preventDefault()} className="max-h-[58vh] max-w-full overflow-auto rounded-lg border bg-slate-100 p-2">
        <canvas ref={canvasRef} className="max-w-full" aria-label={`${file.title}, page ${page} of ${totalPages}`} />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
        <button type="button" disabled={page <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))} className="rounded-md border px-3 py-1.5 disabled:opacity-40">Previous</button>
        <span className="text-muted-foreground">Page {page} of {totalPages}</span>
        <button type="button" disabled={page >= totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))} className="rounded-md border px-3 py-1.5 disabled:opacity-40">Next</button>
        {file.allowDownload && <DownloadLink url={url} />}
      </div>
    </div>
  );
}
