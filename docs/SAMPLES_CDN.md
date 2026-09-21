# eQOURSE Samples — R2 Storage + Cloudflare CDN

How sample files are stored, delivered and previewed. Two halves: Cloudflare
configuration (dashboard, no code) and the application code that writes objects.

---

## What changed

| | Before | Now |
|---|---|---|
| Storage | `eqourse-backend/uploads/sample-file/` on the Utho VPS | Cloudflare R2 bucket |
| Delivery | `express.static` via a single PM2 process | `cdn.eqourse.com`, cached at the edge |
| Preview | forced a browser download | inline view-only viewer |
| Formats | icon lookup only | rendered per format |

Delivery no longer touches the origin, which removes Express static serving from
the hot path — it was the weakest link in the stack.

---

## 1. Cloudflare setup

### 1.1 Create the bucket

R2 → **Create bucket** → `eqourse`. Pick a location hint near your
audience. Leave public access off for now.

### 1.2 Create an S3 API token

R2 → **Manage R2 API Tokens** → Create token.

- Permission: **Object Read & Write**
- Scope: the `eqourse` bucket only, not the whole account

Record the Access Key ID and Secret Access Key — the secret is shown once. These
become `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY`. Your Account ID is on the
R2 overview page and becomes `R2_ACCOUNT_ID`.

### 1.3 Attach a Custom Domain

Bucket → Settings → **Public access → Custom Domains → Connect Domain** →
`cdn.eqourse.com`.

This is the step that matters for CDN caching. [Attaching a Custom Domain is what
puts R2 objects behind Cloudflare's cache](https://developers.cloudflare.com/cache/interaction-cloudflare-products/r2/);
without it, every read goes to the bucket directly.

**Do not use the `r2.dev` URL in production.** It is rate-limited and intended
for testing, and it is not served through the cache.

### 1.4 Cache Rule

Rules → Cache Rules → Create, on the `eqourse.com` zone:

- **If** `Hostname equals cdn.eqourse.com`
- **Then** Cache eligibility: *Eligible for cache*, Edge TTL: **1 month**,
  Browser TTL: *Respect origin*

Object names are unique per upload and never reused, so the backend already
stores `Cache-Control: public, max-age=31536000, immutable` as object metadata.
The rule exists because [R2 Custom Domains have been reported returning
`cf-cache-status: DYNAMIC` regardless of object metadata](https://community.cloudflare.com/t/r2-custom-domain-never-cached-cache-rules-and-page-rules-both-have-no-effect-cf/957754).
Verify with `curl` in §4 rather than assuming it works.

### 1.5 Transform Rule — required for interactive HTML samples

**This is a security control, not an optimisation.**

Interactive samples are admin-uploaded HTML/CSS/JS that the viewer executes on
purpose. An `<iframe sandbox>` attribute only applies while a document is framed,
but sample URLs are published by the unauthenticated `GET /api/samples/files`, so
anyone can navigate to one directly. The backend used to send a
`Content-Security-Policy: sandbox` header for this, but **an R2 Custom Domain only
replays the object's stored HTTP metadata** — it cannot emit arbitrary headers. So
the protection has to be re-created at the edge.

Rules → Transform Rules → **Modify Response Header** → Create:

- **If** `Hostname equals cdn.eqourse.com` and `URI Path ends with .html`
  (add `.htm`, `.xhtml`, `.svg` as *or* conditions)
- **Then** Set static:
  - `Content-Security-Policy` = `sandbox allow-scripts allow-popups`
  - `X-Content-Type-Options` = `nosniff`

`sandbox` restricts capabilities, not network origins, so interactive samples can
still load Tailwind, cdnjs and Google Fonts from their CDNs.

Serving from `cdn.eqourse.com` rather than `www.eqourse.com` is itself the main
mitigation: a different origin cannot reach the admin JWT that the admin panel
keeps in `localStorage` on the www origin. The header is defence in depth.

### 1.6 Optional hardening

- **Tiered Cache** (Caching → Tiered Cache) improves global hit ratio. Free.
- **Hotlink Protection** stops other sites embedding your samples.
- A **Rate limiting rule** on `/api/samples/files` — that endpoint is
  unauthenticated and enumerable, and lists every sample URL.

---

## 2. Backend configuration

Add to `eqourse-backend/.env` (see `.env.example`):

```
R2_ACCOUNT_ID=<account id>
R2_ACCESS_KEY_ID=<access key id>
R2_SECRET_ACCESS_KEY=<secret access key>
R2_BUCKET=eqourse
R2_PUBLIC_BASE_URL=https://cdn.eqourse.com
```

Then `pm2 restart eqourse --update-env`. The `--update-env` flag is required —
without it PM2 reuses the old environment and uploads keep going to disk.

**All five values must be present.** `isR2Enabled()` checks for every one and
falls back to local disk if any is missing, so a partial configuration fails
quietly rather than erroring. That fallback is deliberate: development and any
deploy that lands before the credentials do keep working unchanged.

### Which uploads go to R2

Only `sample-file` and `sample-thumbnail` (`R2_ELIGIBLE_KINDS` in
`src/utils/r2Storage.js`).

This allowlist is a safety boundary, not a convenience. `pilotRouter` reuses the
same upload middleware for `POST /api/free-pilot`, which is **public,
unauthenticated, and takes `kind` from the request body**. Routing uploads to a
world-readable bucket by default would publish pilot attachments, and a spoofed
`kind` could expose candidate resumes. Three layers prevent that:

1. `normalizeKind()` rejects anything that isn't a single safe path segment and
   maps private folder names back to `general`.
2. The admin endpoint checks `R2_ELIGIBLE_KINDS` before calling `putObject`.
3. `putObject` re-checks and throws.

`careerRouter` has its own multer writing resumes and vendor documents to disk,
behind `blockPrivateUploads`. That path is untouched.

### Legacy files keep working

Existing records hold root-relative `/api/uploads/...` URLs; new uploads get
absolute `https://cdn.eqourse.com/...` URLs. `SampleItem.fileUrl` is used
verbatim by the frontend and `express.static` is still mounted, so both coexist.
**No data migration is required.** To move old files later, copy
`uploads/sample-file/*` into the bucket under the same `sample-file/` prefix and
rewrite the stored URLs.

---

## 3. How the viewer works

`src/components/samples/shared/sampleFormats.ts` resolves each file to a render
kind. It dispatches on `mimeType` (captured from multer at upload, stored on
`SampleItem`) and falls back to the URL extension for legacy rows and external
links. It deliberately ignores `fileType`, which is a free-text display badge an
admin can set to anything.

| Kind | Renderer | Notes |
|---|---|---|
| image | `<img>` | SVG included — `<img>`-embedded SVG cannot execute script. Never switch to `<object>`/`<iframe>` |
| video | `<video controlsList="nodownload">` | all formats; playability is the browser's call |
| audio | `<audio controlsList="nodownload">` | all formats |
| pdf | pdf.js → `<canvas>` | **not** `<iframe src=*.pdf>`, whose native viewer has an unremovable download button |
| document | mammoth → sanitised HTML | `.docx` only; structural fidelity, not pixel-exact |
| spreadsheet | read-excel-file / papaparse | `.xlsx`, `.csv`, `.tsv`; 500 rows × 40 cols |
| text / code | `<pre>` | TXT, JSON, XML, CSS, JS — displayed, never executed |
| interactive | `<iframe sandbox="allow-scripts allow-pointer-lock">` | the 3D/animated HTML samples |
| bundle, rejected, unsupported | notice | explicit message, no download offered |

pdf.js, mammoth and the spreadsheet parsers are code-split and only load for
visitors who open that kind of file.

### Formats that are accepted but cannot be previewed

`.doc`, `.rtf`, `.odt`, `.xls` and `.ods` have no dependable browser renderer, so
they upload successfully but show a "contact us for a PDF version" notice. Tell
admins to publish `.docx`/`.xlsx` or PDF. PowerPoint is rejected at upload.

### Multi-file interactive samples are not supported yet

Uploads land in a flat namespace with randomised names, so an `index.html`
referencing `./style.css` will 404. Single self-contained HTML works — which is
what `public/motion-graphics/*.html` already is. Multi-file bundles need zip
upload plus server-side unpacking, with zip-slip, zip-bomb, file-count and
total-size protections. Not built.

### On "view-only"

No download affordance is offered, `Content-Disposition: inline` tells browsers to
render rather than save, native save/print controls are not surfaced, and PDFs are
rasterised. **This is not DRM.** Anything a browser renders has already been
delivered to the browser, so a determined visitor with developer tools can still
retrieve the bytes. Interactive HTML samples are weaker still — source is
inspectable by definition. The goal is to make casual saving impractical.

If stronger guarantees are needed, the next steps are a Worker validating a
short-lived signed cookie in front of the bucket, and Cloudflare Stream for video
(segmented delivery, signed URLs, no single-file URL).

---

## 4. Verification

After configuring, upload a sample through the admin panel and confirm the
returned URL is on `cdn.eqourse.com`. The upload response includes
`"storage": "r2"` or `"storage": "local"`, which is the quickest way to tell
whether the environment was picked up.

```bash
# Object is served, inline, immutable
curl -I https://cdn.eqourse.com/sample-file/<key>

#   expect: HTTP/2 200
#           content-disposition: inline
#           cache-control: public, max-age=31536000, immutable

# Second request should be a cache HIT
curl -I https://cdn.eqourse.com/sample-file/<key> | grep -i cf-cache-status

# Interactive HTML must carry the sandbox CSP (§1.5)
curl -I https://cdn.eqourse.com/sample-file/<key>.html | grep -i content-security-policy

# Private uploads must still 404 on the origin
curl -I https://www.eqourse.com/api/uploads/resumes/anything.pdf   # expect 404
```

If `cf-cache-status` stays `DYNAMIC` on repeat requests, re-check the Cache Rule
in §1.4 — this is a known R2 Custom Domain issue, not a misconfiguration of the
object metadata.

In the browser: open a sample of each kind and confirm no download begins, the
context menu is suppressed on rendered content, and a video plays with no
download item in its control menu.

---

## 5. Known constraints

- **Uploads still route through the origin.** The admin panel POSTs to
  `/api/admin/uploads` and the backend forwards to R2, so large files traverse
  Cloudflare's proxy (100 MB body cap on Free/Pro, unadjustable 30-second proxy
  write timeout) and consume origin bandwidth twice. `FileUpload` caps the client
  at 50 MB, comfortably inside that. For routine large video, switch to a
  presigned `PUT` so the browser uploads straight to R2 — the storage layer is
  already isolated in `r2Storage.js` for this.
- **Deletes are not wired up.** `deleteObject()` exists but no controller calls
  it, so removing a sample record leaves the object in the bucket. R2 has no
  egress fee, but storage accrues.
- **`.xls`/`.ods`/`.doc`/`.rtf`/`.odt`** upload but do not preview (§3).
- **Cloudflare's terms restrict serving large volumes of non-HTML media**,
  video especially, outside Stream. Worth checking the current self-serve
  agreement before pushing significant video volume.
