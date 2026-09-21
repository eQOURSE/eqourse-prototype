import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import * as pdfjs from "pdfjs-dist";
import type { PDFDocumentProxy } from "pdfjs-dist";
// Vite resolves `?url` to the emitted asset path, which keeps the worker a
// separate file instead of inlining ~1 MB into this chunk.
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { sampleErrorMessage } from "../sampleAsset";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

/**
 * PDF renderer for the sample viewer.
 *
 * Deliberately renders each page to a <canvas> through pdf.js rather than using
 * `<iframe src="...pdf">`. The browser's built-in PDF viewer ships a download
 * button and a print control that cannot be removed, which would defeat the
 * view-only requirement. Canvas rendering means the visitor receives pixels and
 * the viewer owns every control on screen.
 *
 * This module is imported lazily by SampleViewer so pdf.js only reaches visitors
 * who actually open a PDF.
 */

/** Cap the work a single document can demand of the main thread. */
const MAX_RENDER_SCALE = 2;

export default function PdfSampleView({ url, title }: { url: string; title: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const documentRef = useRef<PDFDocumentProxy | null>(null);
  const renderTaskRef = useRef<{ cancel: () => void } | null>(null);

  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  // Load the document once per URL.
  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setPageNumber(1);

    const loadTask = pdfjs.getDocument({ url, isEvalSupported: false });
    loadTask.promise.then(
      (pdf) => {
        if (cancelled) {
          void pdf.destroy();
          return;
        }
        documentRef.current = pdf;
        setPageCount(pdf.numPages);
        setStatus("ready");
      },
      (error: unknown) => {
        if (cancelled) return;
        setErrorMessage(sampleErrorMessage(error));
        setStatus("error");
      },
    );

    return () => {
      cancelled = true;
      void loadTask.destroy();
      documentRef.current = null;
    };
  }, [url]);

  const renderPage = useCallback(async () => {
    const pdf = documentRef.current;
    const canvas = canvasRef.current;
    if (!pdf || !canvas) return;

    // A page render in flight holds the canvas; cancelling avoids the
    // "canvas is already in use" error when paging quickly.
    renderTaskRef.current?.cancel();

    const page = await pdf.getPage(pageNumber);
    const available = containerRef.current?.clientWidth ?? 800;
    const unscaled = page.getViewport({ scale: 1 });
    const scale = Math.min(available / unscaled.width, MAX_RENDER_SCALE);
    const viewport = page.getViewport({ scale });

    // Render at device resolution so text stays crisp on high-DPI screens,
    // while CSS keeps the element at layout size.
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(viewport.width * ratio);
    canvas.height = Math.floor(viewport.height * ratio);
    canvas.style.width = `${Math.floor(viewport.width)}px`;
    canvas.style.height = `${Math.floor(viewport.height)}px`;

    const context = canvas.getContext("2d");
    if (context) context.setTransform(ratio, 0, 0, ratio, 0, 0);

    // pdf.js v6 takes `canvas`; `canvasContext` is the legacy form.
    const task = page.render({ canvas, viewport });
    renderTaskRef.current = task;
    try {
      await task.promise;
    } catch (error) {
      // A cancelled render is expected when the visitor pages onward.
      if ((error as { name?: string })?.name !== "RenderingCancelledException") {
        setErrorMessage(sampleErrorMessage(error));
        setStatus("error");
      }
    }
  }, [pageNumber]);

  useEffect(() => {
    if (status !== "ready") return;
    void renderPage();
  }, [status, renderPage]);

  // Re-render on resize so the page keeps filling the dialog.
  useEffect(() => {
    if (status !== "ready") return;
    let frame = 0;
    const onResize = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => void renderPage());
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [status, renderPage]);

  useEffect(() => () => renderTaskRef.current?.cancel(), []);

  if (status === "error") {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center text-sm text-muted-foreground">
        {errorMessage}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div ref={containerRef} className="flex-1 overflow-auto bg-muted/30 p-4">
        {status === "loading" && (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            <span className="ml-2 text-sm">Loading document…</span>
          </div>
        )}
        <canvas
          ref={canvasRef}
          // Suppresses the browser's "Save image as…" affordance on the rendered page.
          onContextMenu={(event) => event.preventDefault()}
          className="mx-auto shadow-sm"
          role="img"
          aria-label={`${title}, page ${pageNumber} of ${pageCount}`}
        />
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-4 border-t border-border/40 bg-background/60 p-3">
          <button
            type="button"
            onClick={() => setPageNumber((value) => Math.max(1, value - 1))}
            disabled={pageNumber <= 1}
            className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" /> Previous
          </button>
          <span className="text-xs font-medium text-muted-foreground" aria-live="polite">
            Page {pageNumber} of {pageCount}
          </span>
          <button
            type="button"
            onClick={() => setPageNumber((value) => Math.min(pageCount, value + 1))}
            disabled={pageNumber >= pageCount}
            className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
