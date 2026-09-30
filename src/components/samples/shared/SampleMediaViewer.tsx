import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Download, ExternalLink, FileWarning, Loader2 } from "lucide-react";
import type { PreviewFile } from "@/lib/publicApi";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

interface SampleMediaViewerProps {
  file: PreviewFile;
}

const MAX_TEXT_BYTES = 2 * 1024 * 1024;

const extensionOf = (url: string) => {
  try {
    const pathname = new URL(url, window.location.href).pathname;
    return pathname.split(".").pop()?.toLowerCase() ?? "";
  } catch {
    return url.split(/[?#]/)[0].split(".").pop()?.toLowerCase() ?? "";
  }
};

const typeCandidates = (file: PreviewFile) => [
  file.mimeType,
  file.fileType,
  extensionOf(file.fileUrl),
  extensionOf(file.thumbnailUrl || ""),
]
  .filter(Boolean)
  .map((value) => value!.trim().toLowerCase().replace(/^\./, ""));

const normalizedType = (file: PreviewFile) => {
  const candidates = typeCandidates(file);
  const known = candidates.find((value) => [
    "image", "jpg", "jpeg", "png", "gif", "webp", "svg", "avif", "bmp", "ico", "tif", "tiff",
    "audio", "mp3", "wav", "ogg", "oga", "m4a", "aac", "flac", "opus", "aiff", "wma",
    "video", "mp4", "webm", "mov", "m4v", "ogv", "avi", "mkv", "mpeg", "mpg", "3gp", "wmv",
    "pdf", "application/pdf", "json", "jsonl", "ndjson", "csv", "tsv", "text/csv", "text",
    "txt", "text/plain", "xml", "sitemap", "application/xml", "text/xml", "html", "htm", "text/html", "md", "markdown",
  ].includes(value) || value.startsWith("image/") || value.startsWith("audio/") || value.startsWith("video/"));
  return known || candidates[0] || "";
};

const matches = (value: string, types: string[]) =>
  types.some((type) => value === type || value.startsWith(`${type}/`));

const resolveUrl = (url: string) => {
  if (/^(https?:|blob:|data:)/i.test(url)) return url;
  const base = (import.meta.env.VITE_API_BASE_URL as string) || "";
  return `${base}${url}`;
};

const isTextType = (type: string) => matches(type, [
  "text", "txt", "text/plain", "csv", "tsv", "xml", "sitemap", "html", "htm", "md",
  "markdown", "log", "srt", "vtt", "rtf", "yaml", "yml", "json", "jsonl",
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
const isHtmlType = (type: string) => matches(type, ["html", "htm", "text/html"]);

const formatJson = (source: string, type: string) => {
  if (type === "jsonl" || type === "ndjson") {
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

    fetch(url, { signal: controller.signal })
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

  if (isImageType(type)) {
    return <MediaWithDownload file={file} url={url}><img src={url} alt={file.title} draggable={false} onContextMenu={(event) => event.preventDefault()} className="max-h-[60vh] max-w-full rounded-lg object-contain select-none" /></MediaWithDownload>;
  }

  if (isAudioType(type)) {
    return <MediaWithDownload file={file} url={url}><audio className="w-full" controls controlsList={file.allowDownload ? undefined : "nodownload"} preload="metadata" src={url} onContextMenu={(event) => event.preventDefault()}>Your browser cannot play this audio format.</audio></MediaWithDownload>;
  }

  if (isVideoType(type)) {
    return <MediaWithDownload file={file} url={url}><video className="max-h-[62vh] w-full rounded-lg bg-black" controls controlsList={file.allowDownload ? undefined : "nodownload"} disablePictureInPicture={!file.allowDownload} playsInline preload="metadata" src={url} onContextMenu={(event) => event.preventDefault()}>Your browser cannot play this video format.</video></MediaWithDownload>;
  }

  if (isPdfType(type)) {
    return <PdfJsViewer file={file} url={url} />;
  }

  if (isHtmlType(type)) {
    return <MediaWithDownload file={file} url={url}><iframe title={file.title} src={url} sandbox="allow-forms allow-modals allow-popups allow-presentation" onContextMenu={(event) => event.preventDefault()} className="h-[62vh] w-full rounded-lg border bg-white" /></MediaWithDownload>;
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

function PdfJsViewer({ file, url }: { file: PreviewFile; url: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const documentRef = useRef<Awaited<ReturnType<typeof pdfjsLib.getDocument>>["promise"] extends Promise<infer T> ? T : never>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setPage(1);
    documentRef.current = null;

    pdfjsLib.getDocument(url).promise
      .then((document) => {
        if (!active) return;
        documentRef.current = document;
        setTotalPages(document.numPages);
      })
      .catch(() => active && setError("The PDF could not be loaded."))
      .finally(() => active && setLoading(false));

    return () => { active = false; };
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
