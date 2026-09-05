const SITE_URL = "https://www.eqourse.com";
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const REQUEST_TIMEOUT_MS = 15_000;
const CONCURRENCY = 12;
const GSC_CRITICAL_URLS = [
  `${SITE_URL}/blog/scaling-exam-performance-blueprint-aligned-test-prep-content`,
];

const request = (url, init = {}) => fetch(url, {
  ...init,
  redirect: "manual",
  signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
});

const failures = [];

const robotsResponse = await request(`${SITE_URL}/robots.txt`);
if (robotsResponse.status !== 200) failures.push(`robots.txt returned ${robotsResponse.status}`);
const robots = await robotsResponse.text();
if (/Disallow:\s*\/$/im.test(robots)) failures.push("robots.txt blocks the complete site");
if (!robots.includes(`Sitemap: ${SITEMAP_URL}`)) failures.push("robots.txt does not reference the canonical sitemap");

const sitemapResponse = await request(SITEMAP_URL);
if (sitemapResponse.status !== 200) failures.push(`sitemap.xml returned ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (urls.length === 0) failures.push("sitemap.xml contains no URLs");
if (new Set(urls).size !== urls.length) failures.push("sitemap.xml contains duplicate URLs");
for (const url of GSC_CRITICAL_URLS) {
  if (!urls.includes(url)) failures.push(`GSC priority URL is missing from sitemap.xml: ${url}`);
}

for (const url of urls) {
  if (!url.startsWith(`${SITE_URL}/`)) failures.push(`non-canonical sitemap host or protocol: ${url}`);
  if (url !== `${SITE_URL}/` && url.endsWith("/")) failures.push(`trailing-slash sitemap URL: ${url}`);
}

let nextIndex = 0;
const auditWorker = async () => {
  while (nextIndex < urls.length) {
    const url = urls[nextIndex++];
    try {
      const response = await request(url);
      if (response.status !== 200) failures.push(`${url} returned ${response.status}`);
      if (/noindex/i.test(response.headers.get("x-robots-tag") || "")) {
        failures.push(`${url} returns X-Robots-Tag noindex`);
      }
      if (response.status !== 200) continue;

      const html = await response.text();
      const titles = html.match(/<title(?:\s[^>]*)?>[\s\S]*?<\/title>/gi) ?? [];
      const descriptions = html.match(/<meta[^>]*\bname=["']description["'][^>]*>/gi) ?? [];
      const canonicals = html.match(/<link[^>]*\brel=["']canonical["'][^>]*>/gi) ?? [];
      const robotsTags = html.match(/<meta[^>]*\bname=["']robots["'][^>]*>/gi) ?? [];

      if (titles.length !== 1) failures.push(`${url} exposes ${titles.length} title tags`);
      if (descriptions.length !== 1) failures.push(`${url} exposes ${descriptions.length} meta descriptions`);
      if (canonicals.length !== 1 || !canonicals[0].includes(`href="${url}"`)) {
        failures.push(`${url} must expose exactly one self-referencing canonical`);
      }
      if (robotsTags.some((tag) => /noindex/i.test(tag))) {
        failures.push(`${url} exposes an HTML noindex directive`);
      }
    } catch (error) {
      failures.push(`${url} could not be checked: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
};
await Promise.all(Array.from({ length: CONCURRENCY }, auditWorker));

const canonicalRedirectChecks = [
  "http://eqourse.com/ai-data-services",
  "http://www.eqourse.com/ai-data-services",
  "https://eqourse.com/ai-data-services",
];
for (const url of canonicalRedirectChecks) {
  const response = await request(url, { method: "HEAD" });
  const location = response.headers.get("location");
  if (response.status !== 301 || location !== `${SITE_URL}/ai-data-services`) {
    failures.push(`${url} must return one 301 directly to ${SITE_URL}/ai-data-services; got ${response.status} ${location || "(no Location)"}`);
  }
}

for (const url of GSC_CRITICAL_URLS) {
  const slashVariant = `${url}/`;
  const response = await request(slashVariant, { method: "HEAD" });
  const location = response.headers.get("location");
  if (response.status !== 301 || location !== url) {
    failures.push(`${slashVariant} must return one 301 directly to ${url}; got ${response.status} ${location || "(no Location)"}`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`[audit-live-seo] Verified ${urls.length} sitemap URLs, robots.txt and canonical host/protocol redirects.`);
