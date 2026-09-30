import { useEffect, useMemo, useState } from "react";
import { ExternalLink, FileWarning, Loader2 } from "lucide-react";
import type { PreviewFile } from "@/lib/publicApi";

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

const normalizedType = (file: PreviewFile) => {
  const value = (file.mimeType || file.fileType || "").trim().toLowerCase().replace(/^\./, "");
  return value || extensionOf(file.fileUrl);
};

const matches = (value: string, types: string[]) =>
  types.some((type) => value === type || value.startsWith(`${type}/`));

const resolveUrl = (url: string) => {
  if (/^(https?:|blob:|data:)/i.test(url)) return url;
  const base = (import.meta.env.VITE_API_BASE_URL as string) || "";
  return `${base}${url}`;
};

const isTextType = (type: string) => matches(type, [
  "text", "txt", "text/plain", "csv", "tsv", "xml", "html", "htm", "md",
  "markdown", "log", "srt", "vtt", "rtf", "yaml", "yml", "json", "jsonl",
  "ndjson", "application/json", "application/ld+json", "application/xml",
]);

const isJsonType = (type: string) => matches(type, [
  "json", "jsonl", "ndjson", "application/json", "application/ld+json",
]);

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
    return <img src={url} alt={file.title} draggable={false} onContextMenu={(event) => event.preventDefault()} className="max-h-[60vh] max-w-full rounded-lg object-contain select-none" />;
  }

  if (isAudioType(type)) {
    return <audio className="w-full" controls controlsList="nodownload" preload="metadata" src={url} onContextMenu={(event) => event.preventDefault()}>Your browser cannot play this audio format.</audio>;
  }

  if (isVideoType(type)) {
    return <video className="max-h-[62vh] w-full rounded-lg bg-black" controls controlsList="nodownload" disablePictureInPicture playsInline preload="metadata" src={url} onContextMenu={(event) => event.preventDefault()}>Your browser cannot play this video format.</video>;
  }

  if (isPdfType(type)) {
    return <iframe title={file.title} src={url} onContextMenu={(event) => event.preventDefault()} className="h-[62vh] w-full rounded-lg border bg-white" />;
  }

  if (isHtmlType(type)) {
    return <iframe title={file.title} src={url} sandbox="allow-forms allow-modals allow-popups allow-presentation" onContextMenu={(event) => event.preventDefault()} className="h-[62vh] w-full rounded-lg border bg-white" />;
  }

  if (isTextType(type)) {
    if (loading) return <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Loading preview…</div>;
    if (error) return <PreviewFallback message={error} url={url} />;
    return <pre onContextMenu={(event) => event.preventDefault()} className="max-h-[62vh] w-full overflow-auto rounded-lg bg-slate-950 p-4 text-left text-xs leading-5 text-slate-100 select-none">{textPreview}</pre>;
  }

  return <PreviewFallback message="This format is not supported for inline preview." url={url} />;
}

function PreviewFallback({ message, url }: { message: string; url: string }) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border p-6 text-center">
      <FileWarning className="h-8 w-8 text-muted-foreground" />
      <p className="max-w-md text-sm text-muted-foreground">{message}</p>
      <div className="flex flex-wrap justify-center gap-2">
        <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium">
          <ExternalLink className="h-4 w-4" /> Open file
        </a>
      </div>
    </div>
  );
}
