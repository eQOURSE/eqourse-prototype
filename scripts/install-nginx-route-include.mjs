#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";

const [configPath, routeIncludePath] = process.argv.slice(2);

if (!configPath || !routeIncludePath) {
  console.error("Usage: install-nginx-route-include.mjs <nginx-config> <route-include>");
  process.exit(2);
}

const config = readFileSync(configPath, "utf8");
const routeInclude = readFileSync(routeIncludePath, "utf8");
const lineEnding = config.includes("\r\n") ? "\r\n" : "\n";
const includeDirective = `include ${routeIncludePath};`;

function matchingBrace(text, openingBrace) {
  let depth = 0;
  let quote = null;
  let escaped = false;
  let comment = false;

  for (let index = openingBrace; index < text.length; index += 1) {
    const character = text[index];

    if (comment) {
      if (character === "\n") comment = false;
      continue;
    }
    if (quote) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === quote) quote = null;
      continue;
    }
    if (character === "#") {
      comment = true;
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }
    if (character === "{") depth += 1;
    if (character === "}") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }

  throw new Error(`Unbalanced braces after byte ${openingBrace}`);
}

function normalizeLocation(header) {
  return header.trim().replace(/\s+/g, " ");
}

function locationSignatures(text) {
  const signatures = new Set();
  const matcher = /^[ \t]*(location\s+[^\r\n{]+)\s*\{/gm;
  for (const match of text.matchAll(matcher)) {
    signatures.add(normalizeLocation(match[1]));
  }
  return signatures;
}

const managedLocations = locationSignatures(routeInclude);
if (!managedLocations.has("location /")) {
  throw new Error("Generated route include does not own the public location / block");
}

const serverMatcher = /^[ \t]*server\s*\{/gm;
const targets = [];
for (const match of config.matchAll(serverMatcher)) {
  const openingBrace = config.indexOf("{", match.index);
  const closingBrace = matchingBrace(config, openingBrace);
  const body = config.slice(openingBrace + 1, closingBrace);
  const isHttps = /\blisten\s+[^;\r\n]*\b443\b[^;\r\n]*;/i.test(body);
  const isCanonicalHost = /\bserver_name\s+[^;\r\n]*\bwww\.eqourse\.com\b[^;\r\n]*;/i.test(body);
  if (isHttps && isCanonicalHost) targets.push({ openingBrace, closingBrace });
}

if (targets.length !== 1) {
  throw new Error(`Expected one HTTPS www.eqourse.com server block, found ${targets.length}`);
}

const target = targets[0];
let body = config.slice(target.openingBrace + 1, target.closingBrace);
const removals = [];
const locationMatcher = /^[ \t]*(location\s+[^\r\n{]+)\s*\{/gm;

for (const match of body.matchAll(locationMatcher)) {
  if (!managedLocations.has(normalizeLocation(match[1]))) continue;
  const openingBrace = body.indexOf("{", match.index);
  let end = matchingBrace(body, openingBrace) + 1;
  if (body.slice(end, end + 2) === "\r\n") end += 2;
  else if (body[end] === "\n") end += 1;
  removals.push([match.index, end]);
}

const managedLinePatterns = [
  /^[ \t]*error_page\s+404\b[^;]*;[ \t]*(?:\r?\n)?/gm,
  /^[ \t]*include\s+[^;\r\n]*eqourse-route-handling\.conf\s*;[ \t]*(?:\r?\n)?/gm,
];
for (const pattern of managedLinePatterns) {
  for (const match of body.matchAll(pattern)) removals.push([match.index, match.index + match[0].length]);
}

removals.sort((left, right) => right[0] - left[0]);
for (const [start, end] of removals) body = body.slice(0, start) + body.slice(end);

body = body.replace(/[ \t]*(?:\r?\n)*$/, "");
body += `${lineEnding}    # Managed by the production deployment workflow.${lineEnding}    ${includeDirective}${lineEnding}`;

const updated =
  config.slice(0, target.openingBrace + 1) + body + config.slice(target.closingBrace);

writeFileSync(configPath, updated, "utf8");
console.log(`Installed ${includeDirective} Replaced ${removals.length} managed directive(s).`);
