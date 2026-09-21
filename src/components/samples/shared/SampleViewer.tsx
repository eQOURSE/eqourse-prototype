import { Suspense, lazy, useEffect, useState } from "react";
import { ExternalLink, Loader2, MailQuestion, MonitorPlay } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fetchSampleText, sampleErrorMessage } from "./sampleAsset";
import { resolveSampleFormat, type SampleFileLike } from "./sampleFormats";

/**
 * View-only viewer for a single sample file.
 *
 * Replaces the old behaviour in PreviewFilesModal, which built an `<a download>`
 * and forced a browser download — the opposite of the view-only requirement.
 *
 * What "view-only" means here, precisely: no download affordance is offered, the
 * browser is told to render rather than save, native save/print controls are not
 * surfaced, and PDFs are rasterised rather than handed to the browser's built-in
 * viewer. It is not DRM. Anything a browser renders has already been delivered to
 * the browser, so a determined visitor with developer tools can still retrieve
 * the bytes. The goal is to make casual saving impractical, not impossible.
 *
 * The three heavyweight renderers are code-split: pdf.js, mammoth and the
 * spreadsheet parsers only reach visitors who open that kind of file.
 */

const PdfSampleView = lazy(() => import("./renderers/PdfSampleView"));
const DocumentSampleView = lazy(() => import("./renderers/DocumentSampleView"));
const SpreadsheetSampleView = lazy(() => import("./renderers/SpreadsheetSampleView"));

export interface SampleViewerFile extends SampleFileLike {
  title: string;
  description?: string;
  fileType?: string;
}

interface Props {
  file: SampleViewerFile | null;
  onClose: () => void;
  accentHsl?: string;
}

/** Blocks the context menu without stopping keyboard or assistive access. */
const blockContextMenu = (event: React.MouseEvent) => event.preventDefault();

function ViewerFallback({ label }: { label: string }) {
  return (
    <div className="flex h-full items-center justify-center text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
      <span className="ml-2 text-sm">{label}</span>
    </div>
  );
}

/** Shown for bundles, PowerPoint, legacy Office formats and unknown types. */
function UnavailableNotice({ reason }: { reason: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
      <MailQuestion className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
      <p className="max-w-md text-sm text-muted-foreground">{reason}</p>
    </div>
  );
}

function TextSampleView({ url, language }: { url: string; language?: string }) {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    fetchSampleText(url, controller.signal).then(
      (text) => {
        if (cancelled) return;
        setContent(text);
        setStatus("ready");
      },
      (error: unknown) => {
        if (cancelled || controller.signal.aborted) return;
        setErrorMessage(sampleErrorMessage(error));
        setStatus("error");
      },
    );

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [url]);

  if (status === "loading") return <ViewerFallback label="Loading file…" />;
  if (status === "error") return <UnavailableNotice reason={errorMessage} />;

  return (
    <div className="h-full overflow-auto bg-muted/20 p-4">
      {language && (
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {language}
        </p>
      )}
      {/*
        Rendered as text, never executed. CSS/JS samples are source listings —
        the only executable sample kind is `interactive`, which is framed.
      */}
      <pre
        onContextMenu={blockContextMenu}
        className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-foreground select-none"
      >
        {content}
      </pre>
    </div>
  );
}

export const SampleViewer = ({ file, onClose, accentHsl = "220 85% 55%" }: Props) => {
  const accent = `hsl(${accentHsl})`;
  const format = file ? resolveSampleFormat(file) : null;

  const renderBody = () => {
    if (!file || !format) return null;

    switch (format.kind) {
      case "image":
        return (
          <div className="flex h-full items-center justify-center overflow-auto bg-muted/30 p-4">
            {/*
              SVG samples are rendered through <img> on purpose: an SVG embedded
              via <img> runs in a restricted mode where script and external
              references are inert. Never swap this for <object> or <iframe>.
            */}
            <img
              src={file.fileUrl}
              alt={file.title}
              draggable={false}
              onContextMenu={blockContextMenu}
              className="max-h-full max-w-full object-contain select-none"
            />
          </div>
        );

      case "video":
        return (
          <div className="flex h-full items-center justify-center bg-black p-2">
            <video
              key={file.fileUrl}
              src={file.fileUrl}
              controls
              // Removes the download and playback-rate items from the native
              // control set. A hint to the browser, not a guarantee.
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
              playsInline
              preload="metadata"
              onContextMenu={blockContextMenu}
              className="max-h-full max-w-full"
            >
              Your browser cannot play this sample format.
            </video>
          </div>
        );

      case "audio":
        return (
          <div className="flex h-full flex-col items-center justify-center gap-4 bg-muted/30 p-8">
            <MonitorPlay className="h-10 w-10" style={{ color: accent }} aria-hidden="true" />
            <p className="text-sm font-medium text-foreground">{file.title}</p>
            <audio
              key={file.fileUrl}
              src={file.fileUrl}
              controls
              controlsList="nodownload"
              preload="metadata"
              onContextMenu={blockContextMenu}
              className="w-full max-w-md"
            >
              Your browser cannot play this sample format.
            </audio>
          </div>
        );

      case "pdf":
        return (
          <Suspense fallback={<ViewerFallback label="Loading document viewer…" />}>
            <PdfSampleView url={file.fileUrl} title={file.title} />
          </Suspense>
        );

      case "document":
        return (
          <Suspense fallback={<ViewerFallback label="Loading document viewer…" />}>
            <DocumentSampleView url={file.fileUrl} title={file.title} />
          </Suspense>
        );

      case "spreadsheet":
        return (
          <Suspense fallback={<ViewerFallback label="Loading data viewer…" />}>
            <SpreadsheetSampleView
              url={file.fileUrl}
              title={file.title}
              extension={format.extension}
            />
          </Suspense>
        );

      case "text":
      case "code":
        return <TextSampleView url={file.fileUrl} language={format.codeLanguage} />;

      case "interactive":
        return (
          /*
            Interactive samples are admin-uploaded HTML that we intentionally
            execute. `sandbox` without `allow-same-origin` gives the frame an
            opaque origin, so it cannot read this page's localStorage — which is
            where the admin JWT lives. Adding allow-same-origin alongside
            allow-scripts would let the document remove its own sandbox.
            allow-pointer-lock is present because the 3D demos use it.
          */
          <iframe
            key={file.fileUrl}
            src={file.fileUrl}
            title={file.title}
            sandbox="allow-scripts allow-pointer-lock"
            referrerPolicy="no-referrer"
            loading="lazy"
            className="h-full w-full border-0 bg-white"
          />
        );

      case "external":
        return (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
            <ExternalLink className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
            <p className="max-w-md text-sm text-muted-foreground">
              This sample is hosted externally and opens in a new tab.
            </p>
            <a
              href={file.fileUrl}
              target="_blank"
              rel="noopener noreferrer external"
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: accent }}
            >
              Open sample <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        );

      default:
        return (
          <UnavailableNotice
            reason={format.unavailableReason ?? "This sample can't be displayed in the browser."}
          />
        );
    }
  };

  // A watermark over static renderings is a deterrent against screenshot reuse.
  // Excluded from media and interactive samples, where an overlay would sit on
  // top of the controls even with pointer-events disabled in some browsers.
  const showWatermark = format
    ? ["image", "pdf", "document", "spreadsheet", "text", "code"].includes(format.kind)
    : false;

  return (
    <Dialog open={!!file} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex h-[92vh] w-full max-w-[95vw] flex-col gap-0 overflow-hidden p-0 lg:max-w-[1100px]">
        <DialogHeader className="border-b border-border/40 bg-background/80 p-4 backdrop-blur-md">
          <DialogTitle className="truncate pr-8 text-base font-semibold">
            {file?.title}
          </DialogTitle>
          <DialogDescription className="truncate text-xs">
            {file?.description?.trim()
              ? file.description
              : "Preview only — this sample is not available for download."}
          </DialogDescription>
        </DialogHeader>

        <div className="relative flex-1 overflow-hidden">
          {renderBody()}

          {showWatermark && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
            >
              <span className="rotate-[-24deg] text-5xl font-bold uppercase tracking-[0.3em] text-foreground/[0.05] select-none">
                eQOURSE
              </span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
