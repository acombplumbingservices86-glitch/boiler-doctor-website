#!/usr/bin/env node
// Generates infra/amplify-redirects.json from public/_redirects.
//
// Why this exists: the site is served from AWS Amplify Hosting, and Amplify
// keeps its own separate "Rewrites and redirects" setting (a JSON list, edited
// in the Amplify console under App settings -> Hosting -> Rewrites and
// redirects). It does NOT read public/_redirects at deploy time — that file
// only exists in this repo as documentation/history from when the site was on
// Cloudflare Pages. Left unsynced, the two drift apart silently and redirects
// that look correct in the codebase quietly 404 in production (this happened
// in Sep 2026 — see git history around the /bathroom-renovation and /prices
// fixes).
//
// Usage:
//   node scripts/generate-amplify-redirects.mjs          # regenerate infra/amplify-redirects.json
//   node scripts/generate-amplify-redirects.mjs --check   # exit 1 if the file is out of date (used in CI)
//
// See infra/README.md for the full workflow, including the manual step of
// pasting the regenerated file into the Amplify console.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');
const sourcePath = join(repoRoot, 'public', '_redirects');
const outputPath = join(repoRoot, 'infra', 'amplify-redirects.json');

function convertPattern(pattern) {
  // Cloudflare/Netlify wildcard `*` -> Amplify's `<*>` token.
  if (pattern.endsWith('/*')) {
    return pattern.slice(0, -1) + '<*>';
  }
  if (pattern === '*') {
    return '<*>';
  }
  return pattern;
}

function parseRedirects(text) {
  const rules = [];
  const lines = text.split('\n');
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const parts = line.split(/\s+/);
    if (parts.length < 3) {
      console.warn(`SKIP (unexpected format, expected "source target status"): ${line}`);
      continue;
    }
    const [source, target, status] = parts;
    rules.push({
      source: convertPattern(source),
      status,
      target: target.includes('*') ? convertPattern(target) : target,
    });
  }
  return rules;
}

if (!existsSync(sourcePath)) {
  console.error(`Cannot find ${sourcePath}`);
  process.exit(1);
}

const source = readFileSync(sourcePath, 'utf8');
const rules = parseRedirects(source);
const generated = JSON.stringify(rules, null, 2) + '\n';

const checkMode = process.argv.includes('--check');

if (checkMode) {
  if (!existsSync(outputPath)) {
    console.error(
      `${outputPath} does not exist. Run "node scripts/generate-amplify-redirects.mjs" and commit the result.`
    );
    process.exit(1);
  }
  const current = readFileSync(outputPath, 'utf8');
  if (current !== generated) {
    console.error(
      `infra/amplify-redirects.json is out of date with public/_redirects.\n` +
        `Run "node scripts/generate-amplify-redirects.mjs", commit the updated file, ` +
        `and paste its contents into the Amplify console (see infra/README.md).`
    );
    process.exit(1);
  }
  console.log(`infra/amplify-redirects.json is in sync with public/_redirects (${rules.length} rules).`);
  process.exit(0);
}

writeFileSync(outputPath, generated);
console.log(`Wrote ${rules.length} rules to infra/amplify-redirects.json`);
