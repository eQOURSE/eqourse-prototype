# eQourse — Backend Integration Guide

This document is for the backend vendor team. It defines the **API contract**, **data models**, **auth flow**, and **file storage workflow** the frontend (React + Vite, already built) expects.

The frontend is already wired against a mock API layer in `src/admin/lib/api.ts`. To go live, replace the implementation of that file with `fetch` calls against the real backend — function signatures stay identical.

**Stack assumed**: Node.js (Express or Fastify) + MongoDB (Mongoose) + S3-compatible object storage for files.

---

## 1. High-level architecture

```
                 ┌────────────────────────┐
   Public site ──▶  GET /api/blogs        │
   (visitors)      GET /api/case-studies  │
                    GET /api/sample-       │
                    categories             │
                    POST /api/contact      │  ┌──── MongoDB ────┐
                    POST /api/free-pilot   │  │ collections:     │
                                            │  │  users           │
   Admin site  ──▶  POST /api/admin/login  │──▶│  contactQueries  │
   (/admin)         GET/POST/PATCH/DELETE  │  │  pilotQueries    │
                    /api/admin/*           │  │  blogs           │
                                            │  │  caseStudies     │
                                            │  │  sampleCategories│
                                            │  │  samples         │
                                            │  └──────────────────┘
                                            │
                                            ▼
                                       S3 / object store
                                       (images, attachments, sample files)
```

Two route prefixes:

- **`/api/*`** — public, unauthenticated. Used by the marketing site.
- **`/api/admin/*`** — JWT-protected. Used by the admin dashboard.

CORS: allow the website origin (e.g. `https://eqourse.com`) and the admin origin if separate.

---

## 2. Authentication

Single role for now: **admin**. Multiple admin users allowed.

### 2.1 Login

`POST /api/admin/login`

```json
// Request
{ "email": "admin@eqourse.com", "password": "********" }

// Response 200
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": "...", "email": "admin@eqourse.com", "name": "Admin" }
}
// Response 401 — invalid credentials
{ "error": "Invalid email or password" }
```

JWT payload: `{ sub, email, role: "admin", iat, exp }`. Expiry: **8 hours**. Sign with `process.env.JWT_SECRET`.

### 2.2 Auth header

All `/api/admin/*` routes require:

```
Authorization: Bearer <token>
```

Return `401` on missing/invalid/expired token. Frontend will redirect to `/admin/login` on 401.

### 2.3 Get current user (optional but recommended)

`GET /api/admin/me` → `{ user: { id, email, name } }`

### 2.4 Bootstrap

Seed one admin via a CLI script or env-driven first-run (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`). Passwords stored as **bcrypt hashes**, never plaintext.

---

## 3. Public endpoints (used by the marketing site)

### 3.1 Submit contact form

`POST /api/contact` — `multipart/form-data` (because attachments allowed)

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | yes | |
| `email` | string | yes | |
| `phone` | string | no | |
| `company` | string | no | |
| `subject` | string | yes | |
| `message` | string | yes | |
| `attachment` | file | no | Single file, ≤25 MB. Allowed: pdf, doc(x), xls(x), zip, png, jpg |

Response `201`:
```json
{ "id": "65f...", "createdAt": "2026-04-25T10:32:00.000Z" }
```

Server side:
- Validate fields, sanitize.
- If `attachment`, upload to S3 under `attachments/contact/{id}/{originalName}`. Store `{ url, originalName, size, mimeType }` on the document.
- Send notification email to `content.research@eqourse.com` (or configurable).
- Persist to `contactQueries` collection.

### 3.2 Submit free-pilot form

`POST /api/free-pilot` — `multipart/form-data`. Same shape as contact but with extra fields:

| Field | Type | Required |
|---|---|---|
| `name` | string | yes |
| `email` | string | yes |
| `phone` | string | no |
| `company` | string | yes |
| `role` | string | no |
| `serviceInterest` | string | yes — one of: `ai-data`, `edtech`, `localization`, `other` |
| `projectScope` | string | yes |
| `timeline` | string | no |
| `attachment` | file | no |

### 3.3 Read published content

These power the public website. Only **published** documents are returned.

```
GET  /api/blogs                          → BlogPost[]   (list, summary fields only)
GET  /api/blogs/:slug                    → BlogPost     (full body)
GET  /api/case-studies                   → CaseStudy[]
GET  /api/case-studies/:slug             → CaseStudy
GET  /api/sample-categories              → SampleCategory[] (with sample counts)
GET  /api/sample-categories/:slug        → SampleCategory & { samples: Sample[] }
GET  /api/samples/:id                    → Sample
```

Cache headers: `Cache-Control: public, max-age=300` is fine.

---

## 4. Admin endpoints

All require `Authorization: Bearer <jwt>`.

### 4.1 Queries (read-only + status updates + export)

```
GET    /api/admin/contact-queries?status=&from=&to=&q=&page=&pageSize=
GET    /api/admin/contact-queries/:id
PATCH  /api/admin/contact-queries/:id          → body: { status, internalNotes }
DELETE /api/admin/contact-queries/:id
GET    /api/admin/contact-queries/:id/attachment   → 302 redirect to signed S3 URL

GET    /api/admin/pilot-queries?...           (same shape)
GET    /api/admin/pilot-queries/:id
PATCH  /api/admin/pilot-queries/:id
DELETE /api/admin/pilot-queries/:id
GET    /api/admin/pilot-queries/:id/attachment
```

`status` enum: `new` | `in_progress` | `contacted` | `closed`.

List response shape:
```json
{
  "items": [ /* ContactQuery[] */ ],
  "total": 142,
  "page": 1,
  "pageSize": 25
}
```

**Export to Excel**: the frontend builds the .xlsx client-side from the JSON response (no separate endpoint needed). Make sure the list endpoint accepts `pageSize=10000` (or `?all=true`) so the admin can export everything in one call. Cap at e.g. 50,000 rows for safety.

### 4.2 Analytics for dashboard

`GET /api/admin/analytics/summary?from=&to=`

```json
{
  "totals": {
    "contactQueries": 142,
    "pilotQueries": 38,
    "blogs": 24,
    "caseStudies": 9,
    "samples": 47
  },
  "deltas": {                       // % change vs previous equal period
    "contactQueries": 12.5,
    "pilotQueries": -3.0
  },
  "queriesOverTime": [              // daily buckets in range
    { "date": "2026-04-01", "contact": 4, "pilot": 1 },
    { "date": "2026-04-02", "contact": 6, "pilot": 2 }
  ],
  "serviceInterestBreakdown": [     // for pilot queries
    { "label": "ai-data", "count": 14 },
    { "label": "edtech", "count": 18 },
    { "label": "localization", "count": 4 },
    { "label": "other", "count": 2 }
  ],
  "statusFunnel": [
    { "status": "new", "count": 50 },
    { "status": "in_progress", "count": 30 },
    { "status": "contacted", "count": 40 },
    { "status": "closed", "count": 22 }
  ]
}
```

Default range: last 30 days. Aggregations should run via Mongo aggregation pipelines — these will be hot, so consider compound indexes on `createdAt` and `status`.

### 4.3 Blogs CRUD

```
GET    /api/admin/blogs?status=&q=&page=&pageSize=
POST   /api/admin/blogs                  → body: BlogPostInput        → returns BlogPost
GET    /api/admin/blogs/:id
PATCH  /api/admin/blogs/:id              → body: Partial<BlogPostInput>
DELETE /api/admin/blogs/:id
POST   /api/admin/blogs/:id/publish      → flips status to "published", sets publishedAt
POST   /api/admin/blogs/:id/unpublish
```

### 4.4 Case Studies CRUD

```
GET    /api/admin/case-studies?...
POST   /api/admin/case-studies           → CaseStudyInput
GET    /api/admin/case-studies/:id
PATCH  /api/admin/case-studies/:id
DELETE /api/admin/case-studies/:id
POST   /api/admin/case-studies/:id/publish
POST   /api/admin/case-studies/:id/unpublish
```

### 4.5 Sample Categories CRUD

```
GET    /api/admin/sample-categories
POST   /api/admin/sample-categories      → { name, slug, description, thumbnailUrl, order }
GET    /api/admin/sample-categories/:id
PATCH  /api/admin/sample-categories/:id
DELETE /api/admin/sample-categories/:id  → 409 if it has samples (require force=true to cascade)
```

### 4.6 Samples CRUD (nested under category)

```
GET    /api/admin/sample-categories/:categoryId/samples
POST   /api/admin/sample-categories/:categoryId/samples  → SampleInput
GET    /api/admin/samples/:id
PATCH  /api/admin/samples/:id
DELETE /api/admin/samples/:id
PATCH  /api/admin/samples/:id/reorder    → body: { order: number }
```

### 4.7 File upload

The admin dashboard uses a generic upload endpoint for blog covers, case study heroes, sample thumbnails, and sample files.

`POST /api/admin/uploads` — `multipart/form-data`

| Field | Type | Notes |
|---|---|---|
| `file` | file | required |
| `kind` | string | one of `blog-cover`, `case-study-hero`, `case-study-inline`, `sample-thumbnail`, `sample-file`, `category-thumbnail` |

Response:
```json
{
  "url": "https://cdn.eqourse.com/blog-covers/65f.../hero.jpg",
  "originalName": "hero.jpg",
  "size": 184320,
  "mimeType": "image/jpeg"
}
```

Validate `mimeType` per `kind`:
- images: `image/jpeg`, `image/png`, `image/webp` — max 5 MB
- documents: `application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.*`, `application/zip` — max 50 MB

Strip EXIF on images. Generate a stable random filename; never trust the original.

> **Alternative (recommended for scale):** issue **pre-signed S3 PUT URLs** so the file never traverses your Node server. Endpoint `POST /api/admin/uploads/presign` returns `{ uploadUrl, fileUrl }`. Frontend can be adapted to that pattern in 30 minutes.

---

## 5. Data models (Mongoose-style)

### 5.1 `users`

```ts
{
  _id: ObjectId,
  email: string,         // unique, lowercased
  passwordHash: string,  // bcrypt
  name: string,
  role: "admin",
  createdAt: Date,
  updatedAt: Date
}
```

### 5.2 `contactQueries`

```ts
{
  _id: ObjectId,
  name: string,
  email: string,
  phone?: string,
  company?: string,
  subject: string,
  message: string,
  attachment?: {
    url: string,            // S3 key or full URL
    originalName: string,
    size: number,
    mimeType: string
  },
  status: "new" | "in_progress" | "contacted" | "closed",
  internalNotes?: string,
  source?: string,          // referrer / utm
  ipAddress?: string,
  userAgent?: string,
  createdAt: Date,
  updatedAt: Date
}
```

Indexes: `{ createdAt: -1 }`, `{ status: 1, createdAt: -1 }`, text index on `name + email + subject + message`.

### 5.3 `pilotQueries`

```ts
{
  _id: ObjectId,
  name: string,
  email: string,
  phone?: string,
  company: string,
  role?: string,
  serviceInterest: "ai-data" | "edtech" | "localization" | "other",
  projectScope: string,
  timeline?: string,
  attachment?: { url, originalName, size, mimeType },
  status: "new" | "in_progress" | "contacted" | "closed",
  internalNotes?: string,
  source?: string,
  createdAt: Date,
  updatedAt: Date
}
```

### 5.4 `blogs`

```ts
{
  _id: ObjectId,
  title: string,
  slug: string,                  // unique, kebab-case
  excerpt: string,               // ≤300 chars
  coverImageUrl: string,
  body: string,                  // HTML or Markdown — pick one and stick to it
  bodyFormat: "html" | "markdown",
  tags: string[],
  author: { name: string, avatarUrl?: string },
  seo: { title?: string, description?: string, ogImageUrl?: string },
  status: "draft" | "published",
  publishedAt?: Date,
  readingMinutes?: number,       // auto-compute: ceil(words / 200)
  createdAt: Date,
  updatedAt: Date
}
```

Indexes: `{ slug: 1 }` unique, `{ status: 1, publishedAt: -1 }`.

### 5.5 `caseStudies`

```ts
{
  _id: ObjectId,
  title: string,
  slug: string,                  // unique
  client: string,
  industry: string,              // free text or enum
  heroImageUrl: string,
  summary: string,
  challenge: string,             // rich text section
  solution: string,
  results: string,
  metrics: Array<{ label: string, value: string }>,   // e.g. {label: "Accuracy", value: "98.7%"}
  tags: string[],
  bodyFormat: "html" | "markdown",
  seo: { title?: string, description?: string, ogImageUrl?: string },
  status: "draft" | "published",
  publishedAt?: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 5.6 `sampleCategories`

```ts
{
  _id: ObjectId,
  name: string,                  // "Kindergarten to K5"
  slug: string,                  // "kindergarden-to-k5-samples" — unique
  description?: string,
  thumbnailUrl?: string,
  order: number,                 // for sorting on listing page
  createdAt: Date,
  updatedAt: Date
}
```

### 5.7 `samples`

```ts
{
  _id: ObjectId,
  categoryId: ObjectId,          // ref sampleCategories
  title: string,                 // "Sample 2 of 3" can be derived; store the descriptive title
  type: string,                  // "Course Book" | "Lesson Plan" | "Workbook" | custom
  description?: string,
  thumbnailUrl: string,
  fileUrl: string,               // pdf or zip
  fileSize?: number,
  order: number,                 // 1-indexed within category — used to display "Sample N of M"
  createdAt: Date,
  updatedAt: Date
}
```

The "Sample N of M" label shown on the public site is computed: `M = count(samples where categoryId=...)`, `N = sample.order`. The admin reorder endpoint maintains `order` integrity.

---

## 6. Validation rules (must be enforced server-side too)

- `email` — RFC-compliant, lowercased.
- `slug` — lowercase, alphanumeric + hyphens, unique per collection. Auto-suggest from title in admin UI; vendor must enforce uniqueness on save (return `409 Conflict` with `{ error: "slug_taken" }`).
- All HTML/markdown body fields — **sanitize** server-side (e.g. `sanitize-html`) to prevent stored XSS. Strip `<script>`, event handlers, etc.
- File uploads — verify mime by **magic bytes** (e.g. `file-type` lib), not just the `Content-Type` header. Reject mismatches.
- Rate-limit public POST endpoints (`/contact`, `/free-pilot`) per IP — e.g. 10/hour. Add hCaptcha or Cloudflare Turnstile on the public forms (frontend already has space to slot in a token field).

---

## 7. Error response format

Use this shape consistently:

```json
{ "error": "human readable message", "code": "machine_code", "details": { ... } }
```

Common codes the frontend reacts to: `unauthorized`, `forbidden`, `not_found`, `validation_failed`, `slug_taken`, `payload_too_large`.

HTTP statuses: 200, 201, 204 (delete), 400, 401, 403, 404, 409, 413, 422, 429, 500.

---

## 8. Environment variables

```
PORT=4000
MONGO_URI=mongodb://...
JWT_SECRET=...
JWT_EXPIRES_IN=8h
S3_BUCKET=eqourse-assets
S3_REGION=ap-south-1
S3_ACCESS_KEY=...
S3_SECRET_KEY=...
S3_PUBLIC_BASE=https://cdn.eqourse.com
SMTP_HOST=...
SMTP_USER=...
SMTP_PASS=...
NOTIFY_EMAIL=content.research@eqourse.com
ADMIN_EMAIL=admin@eqourse.com         # for first-run bootstrap
ADMIN_PASSWORD=<used once, rotated>
PUBLIC_SITE_ORIGIN=https://eqourse.com
ADMIN_SITE_ORIGIN=https://eqourse.com  # admin lives at /admin on same origin
RATE_LIMIT_WINDOW_MS=3600000
RATE_LIMIT_MAX=10
```

---

## 9. Frontend → backend swap-in checklist

The frontend already exists and works against a mock. To go live, the vendor only needs to:

1. **Implement endpoints** above and confirm they match shapes exactly.
2. In `src/admin/lib/api.ts`, replace each `mockApi.*` function body with a `fetch()` call. Function signatures don't change — types in `src/admin/lib/types.ts` are the source of truth.
3. Add an `.env` to the frontend:
   ```
   VITE_API_BASE_URL=https://api.eqourse.com
   ```
4. Confirm public-site components (`BlogSection.tsx`, `CaseStudiesSection.tsx`, sample pages) read from `/api/*` endpoints instead of static data — frontend dev (Tutrain) will handle the wire-up once endpoints are live.
5. Set up an admin user via the bootstrap script.
6. CORS: allow the production frontend origin.

---

## 10. Open questions for the vendor

- Confirm **file storage** target — S3, DigitalOcean Spaces, or something else.
- Confirm **email transport** — SES, SendGrid, SMTP relay?
- Should the **admin dashboard** live on a subdomain (`admin.eqourse.com`) or under `/admin` of the main site? Frontend works for either.
- Multi-admin or single-admin for v1? (Frontend supports either.)
- Audit log requirement? (e.g. who edited which blog when — easy to add as a `auditLogs` collection.)

— End of guide —
