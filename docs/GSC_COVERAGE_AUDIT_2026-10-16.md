# GSC coverage report audit — 16 October 2026

Source: `D:/equourse/seo reports/eqourse-16-10-26.docx`. The document's diagnoses and proposed actions were checked against the live site and repository before changes were made. Its 22 distinct affected URLs had 17 first-hop 301 responses, four 200 responses, and one 404 before this fix.

| Reported URL or group | Verified result | Decision |
| --- | --- | --- |
| `/ai-data-` | Genuine 404; `/ai-data-services` is the live, indexable equivalent. | Add a direct 301 to `/ai-data-services`. |
| `/flash-to-htm-samples` | Redirected to unrelated audio samples. No published Flash-to-HTML sample page exists. A CMS category named `flash-to-html-samples` contains one **Multilingual Audio** WAV item assigned to `/voice-over-services`; the Flash thumbnail component is unused. | Return 410 for this URL and its `/flash-to-html-samples` alias, with and without trailing slash. Correct the CMS category separately if it is still used by editors. |
| `/k12-curriculum-development-and-design-services` | Live 200 with dedicated curriculum content, a self-referencing canonical, index directive, and sitemap entry. | Keep indexable. The report's proposed redirect would remove a real service page. |
| `/instructional-design-services` | Live 200 with dedicated content, self-referencing canonical, index directive, and sitemap entry. The nested legacy URL already 301s here. | Keep as the sole preferred instructional-design URL. |
| `/admin/careers`, `/admin/careersEmail` | Return the admin application shell with `X-Robots-Tag: noindex, nofollow`; robots.txt disallows `/admin`; neither URL is in the sitemap. Unauthenticated `/api/admin/careers` returns 401. | Keep crawl blocked and content behind API authentication. Add regression checks. |
| All other 16 redirecting report URLs | First-hop 301 to the relevant clean page, including About, blog articles, K–12 samples, AI, Talent Assessment, the event overview, and case studies. | Keep. The report's destination URLs with trailing slashes are normalized to the site's no-slash canonical policy. |

The report lists both slash variants of the multilingual case-study URL. Each already redirects in one hop to the same clean canonical URL. Legacy redirect sources and admin URLs are absent from the XML sitemap. After deployment, `npm run audit:seo:live` checks all sitemap URLs plus these report-specific redirects, 410 responses, admin headers, and unauthenticated API rejection.

Search Console's “Crawled – currently not indexed” label is a crawl observation; it does not by itself justify redirecting a useful, self-canonical service page. Google may continue showing historical issue rows until it recrawls the affected URLs.
