import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const installer = fileURLToPath(new URL("./install-nginx-route-include.mjs", import.meta.url));

test("installs canonical guards on all public hosts and route rules only on HTTPS www", () => {
  const directory = mkdtempSync(join(tmpdir(), "eqourse-nginx-test-"));
  try {
    const configPath = join(directory, "eqourse.conf");
    const routePath = join(directory, "eqourse-route-handling.conf");
    const canonicalPath = join(directory, "eqourse-canonical-origin.conf");
    writeFileSync(configPath, `server {
  listen 80;
  server_name eqourse.com www.eqourse.com;
  return 301 https://eqourse.com$request_uri;
  location / { return 301 https://eqourse.com$request_uri; }
}
server {
  listen 443 ssl;
  server_name eqourse.com;
  location / { try_files $uri =404; }
}
server {
  listen 443 ssl;
  server_name www.eqourse.com;
  location / { try_files $uri/ /index.html; }
  location ^~ /blog/ { try_files $uri /index.html; }
  error_page 404 /404.html;
}
server {
  listen 443 ssl;
  server_name staging.eqourse.com;
  location / { try_files $uri =404; }
}
`);
    writeFileSync(routePath, `location / { try_files $uri/index.html $uri =404; }
location /blog/ { try_files $uri/index.html $uri /cms-shell.html; }
error_page 404 /404.html;
`);
    writeFileSync(canonicalPath, `if ($host != www.eqourse.com) { return 301 https://www.eqourse.com$request_uri; }
if ($scheme != https) { return 301 https://www.eqourse.com$request_uri; }
`);

    const install = () => execFileSync(process.execPath, [installer, configPath, routePath, canonicalPath]);
    install();
    const first = readFileSync(configPath, "utf8");
    assert.equal(first.split(`include ${canonicalPath};`).length - 1, 3);
    assert.equal(first.split(`include ${routePath};`).length - 1, 1);
    assert.ok(first.indexOf(`include ${canonicalPath};`) < first.indexOf("return 301 https://eqourse.com$request_uri;"));
    assert.doesNotMatch(first, /try_files \$uri\/ \/index\.html/);
    assert.doesNotMatch(first, /location \^~ \/blog\//);
    assert.match(first, /server_name staging\.eqourse\.com;\s+location \/ \{ try_files \$uri =404; \}/);

    install();
    assert.equal(readFileSync(configPath, "utf8"), first);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
