import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { Loader2 } from "lucide-react";
import { fetchSampleBuffer, sampleErrorMessage } from "../sampleAsset";

/**
 * DOCX renderer for the sample viewer.
 *
 * mammoth converts the document's semantic structure to HTML in the browser, so
 * the original .docx is never re-hosted and no server-side conversion step is
 * needed. Fidelity is structural rather than pixel-exact: headings, lists,
 * tables and emphasis survive, complex page layout does not. For pixel-accurate
 * output the file should be published as a PDF instead.
 *
 * The generated HTML is passed through DOMPurify before it reaches the DOM.
 * mammoth's output is derived from an admin-uploaded file, which makes it
 * untrusted input, and dompurify is already a project dependency.
 *
 * Imported lazily by SampleViewer so mammoth only loads for visitors who open a
 * Word document.
 */

/** Maps Word styles onto semantic HTML so the prose styles below apply. */
const STYLE_MAP = [
  "p[style-name='Title'] => h1.doc-title:fresh",
  "p[style-name='Subtitle'] => p.doc-subtitle:fresh",
  "p[style-name='Quote'] => blockquote:fresh",
  "p[style-name='Intense Quote'] => blockquote:fresh",
];

export default function DocumentSampleView({ url, title }: { url: string; title: string }) {
  const [html, setHtml] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    (async () => {
      setStatus("loading");
      try {
        const buffer = await fetchSampleBuffer(url, controller.signal);
        // Loaded here rather than at module scope so the parser stays in this
        // lazily-imported chunk.
        const mammoth = await import("mammoth/mammoth.browser.min.js");
        const result = await mammoth.convertToHtml({ arrayBuffer: buffer }, { styleMap: STYLE_MAP });
        if (cancelled) return;

        const clean = DOMPurify.sanitize(result.value, {
          // Word documents can embed images as data: URIs, which mammoth inlines.
          ALLOWED_URI_REGEXP: /^(?:data:image\/(?:png|jpe?g|gif|webp);base64,|https?:|mailto:|#)/i,
          FORBID_TAGS: ["style", "script", "iframe", "object", "embed", "form"],
          FORBID_ATTR: ["style", "srcset"],
        });
        setHtml(clean);
        setStatus("ready");
      } catch (error) {
        if (cancelled || controller.signal.aborted) return;
        setErrorMessage(sampleErrorMessage(error));
        setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [url]);

  if (status === "loading") {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
        <span className="ml-2 text-sm">Loading document…</span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center text-sm text-muted-foreground">
        {errorMessage}
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto bg-background p-6">
      <article
        // Sanitised immediately above; mammoth output is untrusted by origin.
        dangerouslySetInnerHTML={{ __html: html }}
        onContextMenu={(event) => event.preventDefault()}
        aria-label={title}
        className="prose prose-sm dark:prose-invert mx-auto max-w-3xl select-none [&_img]:max-w-full [&_table]:w-full [&_table_td]:border [&_table_td]:border-border/60 [&_table_td]:p-2 [&_table_th]:border [&_table_th]:border-border/60 [&_table_th]:p-2"
      />
    </div>
  );
}
