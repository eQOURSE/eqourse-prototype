const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { syncCmsSeoPage, removeCmsSeoPage } = require("./cmsSeoPublisher");

const shell = `<!doctype html><html><head><meta charset="UTF-8" />
<title data-rh="true">Homepage title</title>
<meta data-rh="true" name="description" content="Homepage description" />
<link data-rh="true" rel="canonical" href="https://www.eqourse.com/" />
<meta data-rh="true" property="og:title" content="Homepage title" />
<meta data-rh="true" name="twitter:title" content="Homepage title" />
</head><body><div id="root"></div><script type="module" src="/assets/app.js"></script></body></html>`;

async function createDist() {
  const dist = await fs.mkdtemp(path.join(os.tmpdir(), "eqourse-cms-seo-"));
  await fs.writeFile(path.join(dist, "cms-shell.html"), shell, "utf8");
  await fs.writeFile(path.join(dist, "sitemap.xml"), '<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', "utf8");
  process.env.FRONTEND_DIST_DIR = dist;
  return dist;
}

function count(html, pattern) {
  return (html.match(pattern) || []).length;
}

test("a newly published blog owns exactly one admin title, description and canonical", async (t) => {
  const dist = await createDist();
  t.after(() => fs.rm(dist, { recursive: true, force: true }));

  const blog = {
    slug: "new-admin-blog",
    title: "Visible Blog Heading",
    excerpt: "Fallback excerpt",
    body: "A body with [an internal link](/content-services).",
    tags: ["Content Services"],
    author: { name: "eQOURSE Editorial" },
    status: "published",
    publishedAt: "2026-08-18T00:00:00.000Z",
    updatedAt: "2026-08-18T00:00:00.000Z",
    seo: {
      title: "Admin Blog SEO Title | eQOURSE",
      description: "Admin-authored description used as the only server and client SEO description.",
    },
  };

  await syncCmsSeoPage("blog", blog);
  const html = await fs.readFile(path.join(dist, "blog", blog.slug, "index.html"), "utf8");
  assert.equal(count(html, /<title\b/gi), 1);
  assert.equal(count(html, /<meta[^>]+name="description"/gi), 1);
  assert.equal(count(html, /<link[^>]+rel="canonical"/gi), 1);
  assert.match(html, /Admin Blog SEO Title \| eQOURSE/);
  assert.match(html, /Admin-authored description/);
  assert.doesNotMatch(html, /Homepage title|Homepage description/);

  const sitemap = await fs.readFile(path.join(dist, "sitemap.xml"), "utf8");
  assert.equal(count(sitemap, /https:\/\/www\.eqourse\.com\/blog\/new-admin-blog/g), 1);
});

test("editing metadata replaces the page and unpublishing removes it", async (t) => {
  const dist = await createDist();
  t.after(() => fs.rm(dist, { recursive: true, force: true }));
  const article = {
    slug: "future-case-study",
    title: "Case Study Heading",
    summary: "Case study summary.",
    challenge: "Challenge content",
    solution: "Solution content",
    results: "Result content",
    tags: ["AI Data Services"],
    status: "published",
    seo: { title: "First Admin Case Study Title", description: "First admin case study description." },
  };

  await syncCmsSeoPage("case-study", article);
  article.seo = { title: "Updated Admin Case Study Title", description: "Updated admin case study description." };
  await syncCmsSeoPage("case-study", article);
  const output = path.join(dist, "casestudy", article.slug, "index.html");
  const html = await fs.readFile(output, "utf8");
  assert.equal(count(html, /<title\b/gi), 1);
  assert.match(html, /Updated Admin Case Study Title/);
  assert.doesNotMatch(html, /First Admin Case Study Title/);

  article.status = "draft";
  await syncCmsSeoPage("case-study", article);
  await assert.rejects(fs.access(output));
  const sitemap = await fs.readFile(path.join(dist, "sitemap.xml"), "utf8");
  assert.doesNotMatch(sitemap, /future-case-study/);
});

test("slug validation prevents writes outside the intended article directory", async () => {
  await assert.rejects(
    removeCmsSeoPage("blog", "../../outside"),
    /invalid slug/,
  );
});

test('country photo publication and unpublication own their nested SEO route', async (t) => {
 const dist=await createDist();t.after(()=>fs.rm(dist,{recursive:true,force:true}));
 const photo={eventSlug:'japan-tour-2026',slug:'team-meeting-123',title:'Tokyo meeting',description:'Our team discussing multilingual data.',imageAlt:'Team meeting in Tokyo',imageTitle:'Tokyo meeting',imageUrl:'https://cdn.eqourse.com/events/japan-tour-2026/gallery/photo.jpg',status:'published',seo:{title:'Tokyo meeting | eQOURSE',description:'Our team discussing multilingual data.',ogImageUrl:'https://cdn.eqourse.com/events/japan-tour-2026/gallery/photo.jpg'}};
 await syncCmsSeoPage('event-photo',photo);const output=path.join(dist,'events',photo.eventSlug,'highlights',photo.slug,'index.html');const html=await fs.readFile(output,'utf8');assert.match(html,/ImageObject/);assert.match(html,/alt="Team meeting in Tokyo"/);assert.equal(count(html,/<title\b/gi),1);assert.match(await fs.readFile(path.join(dist,'sitemap.xml'),'utf8'),/japan-tour-2026\/highlights\/team-meeting-123/);
 photo.status='draft';await syncCmsSeoPage('event-photo',photo);await assert.rejects(fs.access(output));assert.doesNotMatch(await fs.readFile(path.join(dist,'sitemap.xml'),'utf8'),/team-meeting-123/);
});
