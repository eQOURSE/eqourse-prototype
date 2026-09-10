# CMS SEO publishing

Blogs and case studies now publish their SEO HTML when content changes in the
admin panel. This keeps the server response and the React page on one metadata
source: the SEO title and SEO description stored with the CMS entry.

## Production configuration

Set `FRONTEND_DIST_DIR` to the live frontend document root that Nginx actually
serves. It must not point at the project build copy. In the current eQOURSE
deployment, the build is created in `/opt/eqourse-prototype/dist` and copied to
`/var/www/eqourse/dist`; the latter is the required publisher target.

Recommended production values:

```dotenv
PUBLIC_SITE_URL=https://www.eqourse.com
FRONTEND_DIST_DIR=/var/www/eqourse/dist
```

After copying a new frontend build, restore write ownership before restarting
PM2. The backend process runs as `deployer` and must be able to create article
directories and replace `sitemap.xml` atomically:

```bash
sudo chown -R deployer:deployer /var/www/eqourse/dist
```

If `FRONTEND_DIST_DIR` is accidentally omitted, Linux production now detects
`/var/www/eqourse/dist` when that live directory exists. An explicit value is
still recommended. A write failure is logged, but it does not stop the public
API: careers, blogs, case studies, samples and admin data remain available while
the SEO publishing permission is repaired.

Restart the backend after deploying. At startup it reconciles every published
blog and case study, so existing entries are repaired automatically. Afterward,
create, edit, publish, unpublish, slug-change and delete operations update the
matching static page and sitemap entry immediately.

For a new published blog, verify that this file exists:

```text
<FRONTEND_DIST_DIR>/blog/<slug>/index.html
```

For a published case study, verify:

```text
<FRONTEND_DIST_DIR>/casestudy/<slug>/index.html
```

Each generated file should contain exactly one `<title>`, one meta description
and one canonical link, all sourced from the admin record.

Verify the raw response—not only the browser DOM—after every deployment:

```bash
curl -s https://www.eqourse.com/blog/example-slug | grep -E '<title|name="description"|rel="canonical"'
```
