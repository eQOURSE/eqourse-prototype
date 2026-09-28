const fs = require("fs/promises");
const fsSync = require("fs");
const path = require("path");

const SITE_URL = (process.env.PUBLIC_SITE_URL || "https://www.eqourse.com").replace(/\/+$/, "");
let writeQueue = Promise.resolve();

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeJson(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function normalizeSlug(slug) {
  const value = String(slug || "").trim().toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
    throw new Error(`Cannot publish SEO HTML for invalid slug: ${value || "(empty)"}`);
  }
  return value;
}

function getFrontendDistDir() {
  if (process.env.FRONTEND_DIST_DIR) {
    return path.resolve(process.env.FRONTEND_DIST_DIR);
  }

  // The production deployment builds in /opt and then copies the public files
  // to Nginx's document root. Writing back into /opt/dist succeeds but changes
  // nothing on the live site. Prefer the known live root when it exists so a
  // missing environment variable cannot silently publish to the wrong copy.
  const liveCandidates = [
    process.env.FRONTEND_LIVE_DIST_DIR,
    process.platform !== "win32" ? "/opt/eqourse-prototype/dist" : undefined,
    process.platform !== "win32" ? "/var/www/eqourse/dist" : undefined,
  ].filter(Boolean).map((candidate) => path.resolve(candidate));

  const liveRoot = liveCandidates.find((candidate) => (
    fsSync.existsSync(path.join(candidate, "cms-shell.html")) ||
    fsSync.existsSync(path.join(candidate, "index.html"))
  ));
  if (liveRoot) return liveRoot;

  return path.resolve(path.join(__dirname, "..", "..", "..", "dist"));
}

async function writeFileAtomic(filePath, content) {
  const temporaryPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  try {
    await fs.writeFile(temporaryPath, content, "utf8");
    await fs.rename(temporaryPath, filePath);
  } catch (error) {
    await fs.rm(temporaryPath, { force: true }).catch(() => undefined);
    throw error;
  }
}

function absoluteUrl(value, fallback = "") {
  const url = String(value || fallback || "").trim();
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

function plainText(value = "") {
  return String(value)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~|-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripManagedMetadata(html) {
  return html
    .replace(/<title[^>]*>[\s\S]*?<\/title>\s*/gi, "")
    .replace(/<meta[^>]*\bname="(?:description|keywords)"[^>]*>\s*/gi, "")
    .replace(/<link[^>]*\brel="canonical"[^>]*>\s*/gi, "")
    .replace(/<meta[^>]*\bproperty="og:[^"]*"[^>]*>\s*/gi, "")
    .replace(/<meta[^>]*\bname="twitter:[^"]*"[^>]*>\s*/gi, "")
    .replace(/<script[^>]*data-cms-seo-schema="true"[^>]*>[\s\S]*?<\/script>\s*/gi, "");
}

function buildCrawlHtml(type, article, canonical, title, description, image) {
  const publishedAt = article.publishedAt || article.createdAt;
  const updatedAt = article.updatedAt || publishedAt;
  const articleType = type === "blog" ? "BlogPosting" : "Article";
  const authorName = type === "blog" ? article.author?.name || "eQOURSE Editorial" : "eQOURSE";
  const schema = {
    "@context": "https://schema.org",
    "@type": articleType,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    headline: title,
    description,
    image: image || undefined,
    author: { "@type": "Organization", name: authorName },
    publisher: {
      "@type": "Organization",
      name: "eQOURSE",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    datePublished: publishedAt || undefined,
    dateModified: updatedAt || undefined,
    url: canonical,
    inLanguage: "en",
  };

  const sections = type === "blog"
    ? `<article><h1>${escapeHtml(article.title || title)}</h1><p>${escapeHtml(description)}</p><p>${escapeHtml(plainText(article.body))}</p></article>`
    : `<article><h1>${escapeHtml(article.title || title)}</h1><p>${escapeHtml(description)}</p>${[
        ["Challenge", article.challenge],
        ["Solution", article.solution],
        ["Results", article.results],
      ].filter(([, content]) => plainText(content)).map(([heading, content]) => `<section><h2>${heading}</h2><p>${escapeHtml(plainText(content))}</p></section>`).join("")}</article>`;

  return {
    schema,
    root: `<main data-seo-prerender="true">${sections}</main>`,
  };
}

async function loadShell(distDir) {
  for (const name of ["cms-shell.html", "index.html"]) {
    try {
      return await fs.readFile(path.join(distDir, name), "utf8");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  throw new Error(`CMS SEO shell not found in ${distDir}. Deploy the frontend build or set FRONTEND_DIST_DIR.`);
}

async function writeSitemapEntry(distDir, canonical, lastmod, removeOnly = false) {
  const sitemapPath = path.join(distDir, "sitemap.xml");
  let xml;
  try {
    xml = await fs.readFile(sitemapPath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }

  const escapedCanonical = canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  xml = xml.replace(new RegExp(`\\s*<url><loc>${escapedCanonical}<\\/loc>(?:<lastmod>[^<]*<\\/lastmod>)?<\\/url>`, "g"), "");
  if (!removeOnly) {
    const date = lastmod ? `<lastmod>${escapeHtml(String(lastmod).slice(0, 10))}</lastmod>` : "";
    xml = xml.replace("</urlset>", `  <url><loc>${escapeHtml(canonical)}</loc>${date}</url>\n</urlset>`);
  }
  await writeFileAtomic(sitemapPath, xml);
}

async function publishNow(type, article) {
  if (!['blog', 'case-study'].includes(type)) throw new Error(`Unsupported CMS SEO type: ${type}`);
  const slug = normalizeSlug(article.slug);
  const routeBase = type === "blog" ? "blog" : "casestudy";
  const canonical = `${SITE_URL}/${routeBase}/${slug}`;
  const title = String(article.seo?.title || article.title || "").trim();
  const description = String(article.seo?.description || article.excerpt || article.summary || article.challenge || "").trim();
  if (!title || !description) throw new Error(`SEO title and description are required for published ${type} ${slug}`);

  const distDir = getFrontendDistDir();
  let html = stripManagedMetadata(await loadShell(distDir));
  const image = absoluteUrl(article.seo?.ogImageUrl || article.coverImageUrl || article.heroImageUrl, "/assets/og-image.webp");
  const keywords = Array.isArray(article.tags) ? article.tags.filter(Boolean).join(", ") : "";
  const { schema, root } = buildCrawlHtml(type, article, canonical, title, description, image);
  const meta = [
    `<title data-rh="true">${escapeHtml(title)}</title>`,
    `<meta data-rh="true" name="description" content="${escapeHtml(description)}" />`,
    keywords ? `<meta data-rh="true" name="keywords" content="${escapeHtml(keywords)}" />` : "",
    `<link data-rh="true" rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta data-rh="true" property="og:type" content="article" />`,
    `<meta data-rh="true" property="og:site_name" content="eQOURSE" />`,
    `<meta data-rh="true" property="og:title" content="${escapeHtml(title)}" />`,
    `<meta data-rh="true" property="og:description" content="${escapeHtml(description)}" />`,
    `<meta data-rh="true" property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta data-rh="true" property="og:image" content="${escapeHtml(image)}" />`,
    `<meta data-rh="true" name="twitter:card" content="summary_large_image" />`,
    `<meta data-rh="true" name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta data-rh="true" name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta data-rh="true" name="twitter:image" content="${escapeHtml(image)}" />`,
    `<script data-cms-seo-schema="true" type="application/ld+json">${safeJson(schema)}</script>`,
  ].filter(Boolean).join("\n    ");

  html = html.replace(/<meta charset="UTF-8"\s*\/>/i, (match) => `${match}\n    ${meta}`);
  html = html.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${root}</div>`);
  const outputDir = path.join(distDir, routeBase, slug);
  await fs.mkdir(outputDir, { recursive: true });
  await writeFileAtomic(path.join(outputDir, "index.html"), html);
  await writeSitemapEntry(distDir, canonical, article.updatedAt || article.publishedAt);
  return { path: path.join(outputDir, "index.html"), canonical };
}

async function removeNow(type, slug) {
  if (!['blog', 'case-study'].includes(type)) throw new Error(`Unsupported CMS SEO type: ${type}`);
  const safeSlug = normalizeSlug(slug);
  const routeBase = type === "blog" ? "blog" : "casestudy";
  const distDir = getFrontendDistDir();
  const outputDir = path.resolve(distDir, routeBase, safeSlug);
  const expectedParent = path.resolve(distDir, routeBase);
  if (path.dirname(outputDir) !== expectedParent) throw new Error("Refusing to remove an unsafe CMS SEO path");
  await fs.rm(outputDir, { recursive: true, force: true });
  await writeSitemapEntry(distDir, `${SITE_URL}/${routeBase}/${safeSlug}`, undefined, true);
}

function queue(operation) {
  const next = writeQueue.then(operation, operation);
  writeQueue = next.catch(() => undefined);
  return next;
}

function syncCmsSeoPage(type, article) {
  return queue(() => article.status === "published" ? publishNow(type, article) : removeNow(type, article.slug));
}

function removeCmsSeoPage(type, slug) {
  return queue(() => removeNow(type, slug));
}

module.exports = {
  syncCmsSeoPage,
  removeCmsSeoPage,
  getCmsSeoTarget: getFrontendDistDir,
  _internal: { escapeHtml, normalizeSlug, stripManagedMetadata, getFrontendDistDir, writeFileAtomic },
};
