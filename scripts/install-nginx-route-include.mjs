#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";

const [configPath, routeIncludePath, canonicalIncludePath] = process.argv.slice(2);

if (!configPath || !routeIncludePath || !canonicalIncludePath) {
  console.error("Usage: install-nginx-route-include.mjs <nginx-config> <route-include> <canonical-include>");
  process.exit(2);
}

const config = readFileSync(configPath, "utf8");
const routeInclude = readFileSync(routeIncludePath, "utf8");
const canonicalInclude = readFileSync(canonicalIncludePath, "utf8");
if (!canonicalInclude.includes("if ($host != www.eqourse.com)") || !canonicalInclude.includes("if ($scheme != https)")) {
  throw new Error("Canonical include is missing the host or HTTPS guard");
}
const lineEnding = config.includes("\r\n") ? "\r\n" : "\n";
const routeDirective = `include ${routeIncludePath};`;
const canonicalDirective = `include ${canonicalIncludePath};`;

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
  return header.trim().replace(/\s+/g, " ").replace(/^location \^~ /, "location ");
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
  const names = [...body.matchAll(/^[ \t]*server_name\s+([^;\r\n]+);/gm)]
    .flatMap((item) => item[1].trim().toLowerCase().split(/\s+/));
  if (!names.includes("eqourse.com") && !names.includes("www.eqourse.com")) continue;
  const isHttps = /\blisten\s+[^;\r\n]*\b443\b[^;\r\n]*;/i.test(body);
  targets.push({ openingBrace, closingBrace, routeOwner: isHttps && names.includes("www.eqourse.com") });
}

if (targets.filter((target) => target.routeOwner).length !== 1) {
  throw new Error(`Expected one HTTPS www.eqourse.com server block, found ${targets.filter((target) => target.routeOwner).length}`);
}

let updated = config;
let replaced = 0;
for (const target of targets.reverse()) {
  let body = updated.slice(target.openingBrace + 1, target.closingBrace);
  const removals = [];
  if (target.routeOwner) {
    const locationMatcher = /^[ \t]*(location\s+[^\r\n{]+)\s*\{/gm;
    for (const match of body.matchAll(locationMatcher)) {
      if (!managedLocations.has(normalizeLocation(match[1]))) continue;
      const openingBrace = body.indexOf("{", match.index);
      let end = matchingBrace(body, openingBrace) + 1;
      if (body.slice(end, end + 2) === "\r\n") end += 2;
      else if (body[end] === "\n") end += 1;
      removals.push([match.index, end]);
    }
  }
  const managedLinePatterns = [
    /^[ \t]*# Managed by the production deployment workflow\.[ \t]*(?:\r?\n)?/gm,
    /^[ \t]*include\s+[^;\r\n]*eqourse-route-handling\.conf\s*;[ \t]*(?:\r?\n)?/gm,
    /^[ \t]*include\s+[^;\r\n]*eqourse-canonical-origin\.conf\s*;[ \t]*(?:\r?\n)?/gm,
  ];
  if (target.routeOwner) managedLinePatterns.push(/^[ \t]*error_page\s+404\b[^;]*;[ \t]*(?:\r?\n)?/gm);
  for (const pattern of managedLinePatterns) {
    for (const match of body.matchAll(pattern)) removals.push([match.index, match.index + match[0].length]);
  }
  removals.sort((left, right) => right[0] - left[0]);
  for (const [start, end] of removals) body = body.slice(0, start) + body.slice(end);
  replaced += removals.length;
  body = body.replace(/^[ \t]*(?:\r?\n)*/, "").replace(/[ \t]*(?:\r?\n)*$/, "");
  body = `${lineEnding}    # Managed by the production deployment workflow.${lineEnding}    ${canonicalDirective}${lineEnding}${body}`;
  if (target.routeOwner) body += `${lineEnding}    ${routeDirective}`;
  body += lineEnding;
  updated = updated.slice(0, target.openingBrace + 1) + body + updated.slice(target.closingBrace);
}

writeFileSync(configPath, updated, "utf8");
console.log(`Installed canonical guard in ${targets.length} eQOURSE server block(s) and route handling in one block. Replaced ${replaced} managed directive(s).`);
