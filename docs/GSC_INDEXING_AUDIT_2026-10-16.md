# GSC indexing handover audit — 16 October 2026

Source: `eQOURSE_GSC_Indexing_Developer_Handover_13_Oct_2026.docx`. Its URL lists are treated as observations to verify, not as implementation instructions. The [row-by-row CSV](GSC_INDEXING_AUDIT_2026-10-16.csv) records the live first response, final response, redirect count, and decision for all 152 URLs (8 listed as 404 and 144 listed as redirected).

## Findings

| Live result before this change | URLs | Action |
| --- | ---: | --- |
| Intentional 301 to a live page | 107 | Keep the redirect. Six were listed as 404 in the handover. |
| Direct 200, despite a historical GSC redirect label | 26 | No redirect change. All have one indexable canonical matching the clean path. |
| CMS article or case study trailing slash served 200 | 13 | Allow Nginx's trailing-slash normalization rule to issue a 301. |
| Missing `/talent-assessment` | 1 | Add a direct 301 to the published workforce evaluation page. |
| Old CMS aliases serving metadata-empty shells | 3 | Add direct 301s to the matching published article or case study. |
| Retired investment article query redirecting to the generic blog | 1 | Return 410, per the user's content decision. No matching published article was found. |
| `/events/business-tour-2026` redirecting to the Events overview | 1 | Content decision pending; the existing redirect remains in place for now. |

The 107 existing 301s include 101 from the redirect list and six from the 404 list. Every first-hop 301 tested reached a 200 page in one hop. Of the 81 distinct redirect destinations, all but two query-string variants were in the XML sitemap; those two canonicalize to sitemap-listed base pages.

## Host and release checks

The live host audit found that `https://eqourse.com/ai-data-services` served a duplicate 200 and `http://eqourse.com/ai-data-services` redirected to the bare HTTPS host first. The generated canonical-origin guard already existed, but the production deploy workflow did not install it. The workflow now installs it in the eQOURSE server blocks, verifies the apex and HTTP redirects, and restores the prior Nginx configuration if a check fails. The canonical guard is placed before existing server-level redirects.

The full production build prerendered 261 routes (156 static, 105 CMS). `npm run verify:seo` passed after the build; the Nginx installer test passed. Live outcomes in the CSV are **pre-deployment** observations; code changes are not marked as live fixes until deployment checks pass.

## CMS metadata requiring editorial review

The published CMS feed contains two text-data-collection articles with the same SEO title and description. Their bodies differ, so the preferred article and any merge or canonical decision require editorial input. Two China tour highlight photos also share a title. The SEO verifier reports these CMS-controlled duplicates as warnings while still failing on duplicate metadata for code-controlled pages. The articles and media remain indexable until their CMS metadata is corrected.

After deployment, run `npm run audit:seo:live` and request GSC validation only for the resolved issues. GSC's historical labels may persist until Google recrawls the URLs.
