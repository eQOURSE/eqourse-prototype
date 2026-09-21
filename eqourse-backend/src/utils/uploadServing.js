const path = require("path");

/**
 * Response headers for statically served uploads.
 *
 * Three jobs, in order of importance:
 *
 * 1. Contain uploaded HTML. Interactive samples are admin-uploaded HTML/CSS/JS
 *    that we deliberately execute in the browser. `<iframe sandbox>` only
 *    applies while a document is framed, but `/api/uploads/...` paths are
 *    published by the unauthenticated GET /api/samples/files, so anyone can
 *    navigate to one directly. Served from www.eqourse.com without this header
 *    that HTML runs as a first-party page and can read the admin JWT that the
 *    admin panel keeps in localStorage under `eqourse_admin_token`.
 *    `Content-Security-Policy: sandbox` applies on direct navigation too, which
 *    closes that hole. The sandbox directive restricts capabilities, not network
 *    origins, so interactive samples can still load Tailwind, cdnjs and Google
 *    Fonts from their CDNs.
 *
 *    This is a mitigation, not a substitute for origin isolation. Serving
 *    interactive samples from a separate hostname is the durable fix; see
 *    docs/SAMPLES_CDN.md.
 *
 * 2. Keep samples view-only. `Content-Disposition: inline` means a browser
 *    renders rather than saves, and `nosniff` stops a mislabelled file being
 *    reinterpreted as something executable.
 *
 * 3. Make the files cacheable at the edge. multer names every upload
 *    `<timestamp>-<random><ext>` and never overwrites, so a URL always refers to
 *    the same bytes and can be marked immutable. Without an explicit
 *    Cache-Control, express.static sends only ETag/Last-Modified and Cloudflare
 *    falls back to its per-extension defaults.
 */

const ONE_YEAR_SECONDS = 31536000;

/** Executable-in-browser documents that must never run with our origin's rights. */
const SANDBOXED_EXTENSIONS = new Set([".html", ".htm", ".xhtml", ".svg", ".xml"]);

function setUploadHeaders(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();

  res.setHeader("Cache-Control", `public, max-age=${ONE_YEAR_SECONDS}, immutable`);
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Content-Disposition", "inline");
  // Uploads are samples, never pages we want indexed on their own.
  res.setHeader("X-Robots-Tag", "noindex, nofollow");

  if (SANDBOXED_EXTENSIONS.has(ext)) {
    // allow-scripts is required for interactive 3D/animated samples to run.
    // Deliberately omitting allow-same-origin: combined with allow-scripts it
    // would let the document remove its own sandbox.
    res.setHeader("Content-Security-Policy", "sandbox allow-scripts allow-popups");
  }
}

module.exports = { setUploadHeaders, SANDBOXED_EXTENSIONS };
