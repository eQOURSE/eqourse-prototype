# Event photos on the existing Utho disk / Google CDN

Backend environment (the local backend .env has been updated with the supplied path):

```
EVENT_MEDIA_DISK_ROOT=/var/www/eqourse-cdn
EVENT_CDN_BASE_URL=https://cdn.eqourse.com
# Keep the existing strong JWT_SECRET. A separate EVENT_UPLOAD_TOKEN_SECRET is optional.
FRONTEND_DIST_DIR=/opt/eqourse-prototype/dist
```

Deploy the backend and frontend together. The backend process must have write access to `/var/www/eqourse-cdn/events`. This persistent origin directory must remain outside frontend build directories. Google CDN must already map cdn.eqourse.com to this origin root, as it does for the brochure and videos. No bucket access keys are needed.

Confirmed production host: `103.189.88.129` (`tutrain-webapp`). Node.js/PM2 runs as `deployer` on the same host, and `/var/www/eqourse-cdn` is owned by `deployer:deployer`. No mount or sudo is needed to save images. Existing image locations already return `Cache-Control: public, max-age=31536000, immutable` and are cached by Google Cloud CDN.

Antigravity confirmed the active API Nginx server block already contains:

```nginx
client_max_body_size 25m;
```

Keep this existing 25 MB limit. It accommodates the application's 10 MB per-image limit and multipart overhead; no Nginx change or additional upload-limit include is required. The earlier report of a default 1 MB API limit was superseded by this active-config confirmation. Live upload verification remains necessary after deployment.

Set the production backend environment to the values above, then restart the `eqourse` PM2 process with `--update-env`. Confirm `deployer` can also write the frontend document root and `sitemap.xml` for SEO publishing. These production paths should not replace the Windows development frontend output directory.

In `/admin/events`, choose a country, select a JPG/PNG/WebP/AVIF (maximum 10 MB), and enter a title and description. Save a draft or publish. A signed, administrator-bound upload ticket authorizes the upload. Image bytes pass through the backend once to write to Utho disk; public image requests use the CDN URL. Google CDN serves cached responses; cache misses reach its existing static origin. Configure immutable cache headers for gallery images on that origin (unique filenames make this safe). The application does not proxy public image downloads.

Keys are `events/{tour-slug}/gallery/{descriptive-title}-{uuid}.{extension}`. Each tour and year has its own gallery. The backend validates tour, path, size, MIME type and image signature. Metadata lives in MongoDB. Title and description automatically generate alt text, image title, meta title, meta description and share metadata. Published photos appear in the country gallery and receive a dedicated `/events/{country}/highlights/{photo-slug}` page, ImageObject data and sitemap entry. Unpublishing removes public visibility and SEO HTML while retaining the disk image for reversible editing. Startup reconciles published SEO after deployment; FRONTEND_DIST_DIR must be writable by the backend.

Deployment acceptance: upload a small draft, publish, check its country gallery and unique highlight HTML/sitemap, inspect the cdn.eqourse.com image response and Google CDN cache headers, then unpublish. These live checks require deployment on the Utho host; the Windows development machine cannot write to the Linux origin directory.
