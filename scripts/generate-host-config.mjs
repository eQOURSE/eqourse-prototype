import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const redirectsSource = readFileSync(join(root, "src", "routes", "legacyRedirects.ts"), "utf8");
const pageSeoSource = readFileSync(join(root, "src", "seo", "pageSeo.ts"), "utf8");
const redirectPattern = /"(\/[^"]*)"\s*:\s*"(\/[^"]*)"/g;
const redirects = [];
let match;

while ((match = redirectPattern.exec(redirectsSource)) !== null) {
  redirects.push({ from: match[1], to: match[2] });
}

if (redirects.length === 0) {
  throw new Error("No legacy redirects were found; refusing to generate empty hosting rules.");
}

const uniqueSources = new Set(redirects.map(({ from }) => from));
if (uniqueSources.size !== redirects.length) {
  throw new Error("Duplicate legacy redirect sources found.");
}

const canonicalPaths = new Set(
  [...pageSeoSource.matchAll(/"(\/[^"]*)"\s*:\s*\{/g)].map((item) => item[1]),
);
const invalidTargets = redirects.filter(({ to }) => !canonicalPaths.has(to));
if (invalidTargets.length > 0) {
  throw new Error(`Redirect targets missing from pageSeo: ${invalidTargets.map(({ to }) => to).join(", ")}`);
}

const redirectSources = new Set(redirects.map(({ from }) => from));
const redirectChains = redirects.filter(({ to }) => redirectSources.has(to));
if (redirectChains.length > 0) {
  throw new Error(
    `Redirect chains found; every legacy URL must point directly to a canonical page: ${redirectChains
      .map(({ from, to }) => `${from} -> ${to}`)
      .join(", ")}`,
  );
}

const trailingSlashRedirects = [...canonicalPaths]
  .filter((path) => path !== "/")
  .map((path) => `${path}/ ${path} 301!`);

const netlify = [
  "# Generated from src/routes/legacyRedirects.ts. Do not edit by hand.",
  "https://eqourse.com/* https://www.eqourse.com/:splat 301!",
  ...redirects.map(({ from, to }) => `${from} ${to} 301!`),
  "# Preserve matching legacy article slugs while consolidating /blogs/ to /blog/.",
  "/blogs/* /blog/:splat 301!",
  "# Canonicals, sitemap URLs and internal links use no trailing slash.",
  ...trailingSlashRedirects,
  "/blog/*/ /blog/:splat 301!",
  "/casestudy/*/ /casestudy/:splat 301!",
  "# Admin remains an authenticated client-side application.",
  "/admin /index.html 200",
  "/admin/* /index.html 200",
  "# Public routes are prerendered files. Unknown paths fall through to 404.html.",
  "",
].join("\n");

const headers = [
  "# Keep authenticated admin URLs out of search results even if discovered externally.",
  "/admin",
  "  X-Robots-Tag: noindex, nofollow",
  "/admin/*",
  "  X-Robots-Tag: noindex, nofollow",
  "",
].join("\n");

const escapeRewritePattern = (path) => path
  .replace(/^\//, "")
  .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const apache = [
  "# Generated from src/routes/legacyRedirects.ts. Do not edit by hand.",
  "Options -MultiViews",
  "DirectoryIndex index.html",
  "DirectorySlash Off",
  "RewriteEngine On",
  "",
  "# Legacy URLs redirect directly to the final HTTPS + www canonical URL.",
  ...redirects.map(({ from, to }) => (
    `RewriteRule ^${escapeRewritePattern(from)}/?$ https://www.eqourse.com${to} [R=301,L,NE]`
  )),
  "",
  "# Preserve matching legacy article slugs while consolidating /blogs/ to /blog/.",
  "RewriteRule ^blogs/(.+?)/?$ https://www.eqourse.com/blog/$1 [R=301,L,NE]",
  "",
  "# Canonicals, sitemap URLs and internal links use no trailing slash.",
  "# Run this before host/protocol normalization to avoid a two-hop redirect.",
  "RewriteCond %{REQUEST_URI} !^/$",
  "RewriteCond %{REQUEST_URI} /+$",
  "RewriteRule ^(.+?)/+$ https://www.eqourse.com/$1 [R=301,L,NE]",
  "",
  "# Enforce one canonical protocol and host for preferred URLs.",
  "RewriteCond %{HTTPS} !=on [OR]",
  "RewriteCond %{HTTP_HOST} !^www\\.eqourse\\.com$ [NC]",
  "RewriteRule ^ https://www.eqourse.com%{REQUEST_URI} [R=301,L,NE]",
  "",
  "# Serve prerendered route HTML without forcing trailing slashes.",
  "RewriteCond %{REQUEST_FILENAME} -f",
  "RewriteRule ^ - [L]",
  "RewriteCond %{DOCUMENT_ROOT}/$1/index.html -f",
  "RewriteRule ^(.+?)/?$ $1/index.html [L]",
  "",
  "# Admin remains an authenticated client-side application.",
  "RewriteRule ^admin(?:/.*)?$ index.html [L]",
  "",
  "# Unknown public routes must be real 404 responses, not soft-200 SPA pages.",
  "ErrorDocument 404 /404.html",
  "",
  "<IfModule mod_headers.c>",
  "  Header always set X-Content-Type-Options \"nosniff\"",
  "  Header always set Referrer-Policy \"strict-origin-when-cross-origin\"",
  "  Header always set Permissions-Policy \"camera=(), microphone=(), geolocation=()\"",
  "  Header always set Strict-Transport-Security \"max-age=31536000; includeSubDomains\" env=HTTPS",
  "  SetEnvIf Request_URI \"^/admin(?:/|$)\" EQOURSE_NOINDEX=1",
  "  Header always set X-Robots-Tag \"noindex, nofollow\" env=EQOURSE_NOINDEX",
  "  <FilesMatch \"\\.(?:css|js|mjs|woff2?)$\">",
  "    Header set Cache-Control \"public, max-age=31536000, immutable\"",
  "  </FilesMatch>",
  "  <FilesMatch \"\\.(?:png|jpe?g|gif|svg|webp|avif|ico|mp4|webm)$\">",
  "    Header set Cache-Control \"public, max-age=2592000\"",
  "  </FilesMatch>",
  "</IfModule>",
  "",
  "<IfModule mod_deflate.c>",
  "  AddOutputFilterByType DEFLATE text/html text/plain text/css text/javascript application/javascript application/json application/xml image/svg+xml",
  "</IfModule>",
  "",
].join("\n");

const nginxRedirects = redirects.flatMap(({ from, to }) => [
  `location = ${from} { return 301 https://www.eqourse.com${to}; }`,
  `location = ${from}/ { return 301 https://www.eqourse.com${to}; }`,
]);

const nginx = [
  "# Generated from src/routes/legacyRedirects.ts. Do not edit by hand.",
  "# Include these directives inside the HTTPS www.eqourse.com server block.",
  "# This file intentionally owns the public / and /admin locations.",
  "",
  "# Legacy URLs redirect directly to their final canonical destinations.",
  ...nginxRedirects,
  "",
  "# Preserve matching legacy article slugs while consolidating /blogs/ to /blog/.",
  "location ~ ^/blogs/(.+?)/?$ { return 301 https://www.eqourse.com/blog/$1; }",
  "",
  "# Canonicals, sitemap URLs and internal links use no trailing slash.",
  "# This explicit redirect runs before Nginx can apply its directory redirect.",
  "location ~ ^/(.+)/+$ { return 301 https://www.eqourse.com/$1$is_args$args; }",
  "",
  "# Admin remains an authenticated client-side application and must not be indexed.",
  "location = /admin {",
  "  add_header X-Robots-Tag \"noindex, nofollow\" always;",
  "  try_files /index.html =404;",
  "}",
  "location ^~ /admin/ {",
  "  add_header X-Robots-Tag \"noindex, nofollow\" always;",
  "  try_files $uri /index.html =404;",
  "}",
  "",
  "# Serve route/index.html internally at /route. Never test $uri/ here:",
  "# doing so makes Nginx redirect canonical URLs to trailing-slash directories.",
  "location / {",
  "  try_files $uri/index.html $uri =404;",
  "}",
  "",
  "# Unknown public routes return a genuine 404 instead of a soft-200 SPA shell.",
  "error_page 404 /404.html;",
  "location = /404.html { internal; }",
  "",
].join("\n");

const nginxCanonicalOrigin = [
  "# Generated canonical-origin guard for eQOURSE.",
  "# Include this file at server scope in every eqourse.com and www.eqourse.com",
  "# HTTP/HTTPS server block, before route handling. The fixed destination avoids",
  "# host-header reflection and makes every non-canonical request one direct 301.",
  "if ($host != www.eqourse.com) { return 301 https://www.eqourse.com$request_uri; }",
  "if ($scheme != https) { return 301 https://www.eqourse.com$request_uri; }",
  "",
].join("\n");

writeFileSync(join(root, "public", "_redirects"), netlify, "utf8");
writeFileSync(join(root, "public", "_headers"), headers, "utf8");
writeFileSync(join(root, "public", ".htaccess"), apache, "utf8");
mkdirSync(join(root, "deploy", "nginx"), { recursive: true });
writeFileSync(join(root, "deploy", "nginx", "eqourse-route-handling.conf"), nginx, "utf8");
writeFileSync(join(root, "deploy", "nginx", "eqourse-canonical-origin.conf"), nginxCanonicalOrigin, "utf8");

console.log(`[seo-host-config] Generated ${redirects.length} permanent redirect rules for Netlify/Cloudflare Pages, Apache and Nginx.`);
