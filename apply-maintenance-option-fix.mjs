// Muxair: makes "Maintenance" selectable as a service on case studies.
//
// Why it was missing: the admin form builds its "Services Delivered"
// checkboxes from workServiceLabels in src/lib/site-data.ts, and that list only
// had website, seo, google-ads and meta-ads.
//
// This script changes two files:
//   src/lib/site-data.ts       adds "maintenance" to the WorkService type and labels
//   src/routes/work/index.tsx  adds a "Maintenance" filter button on /work
//
// Usage (from the project root, in the VS Code terminal):
//   node apply-maintenance-option-fix.mjs
//
// Safe to run: it backs up both files (.bak), refuses to run twice, and stops
// without changing anything if a spot it expects is missing.

import { existsSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";

const SITE_DATA = "src/lib/site-data.ts";
const WORK_INDEX = "src/routes/work/index.tsx";

for (const f of [SITE_DATA, WORK_INDEX]) {
  if (!existsSync(f)) {
    console.error(`Could not find ${f}. Run this from the project root (the folder with package.json).`);
    process.exit(1);
  }
}

let siteData = readFileSync(SITE_DATA, "utf8");
let workIndex = readFileSync(WORK_INDEX, "utf8");

if (/export type WorkService[^;]*"maintenance"/.test(siteData)) {
  console.log('Already patched ("maintenance" is already in WorkService). Nothing to do.');
  process.exit(0);
}

const problems = [];

function replaceOnce(label, text, pattern, replacement) {
  if (!pattern.test(text)) {
    problems.push(label);
    return text;
  }
  // Expand $1, $2... ourselves so the text is inserted exactly as written.
  return text.replace(pattern, (...m) =>
    replacement.replace(/\$(\d)/g, (_, n) => m[Number(n)] ?? ""),
  );
}

siteData = replaceOnce(
  "WorkService type",
  siteData,
  /export type WorkService = "website" \| "seo" \| "google-ads" \| "meta-ads";/,
  'export type WorkService = "website" | "seo" | "google-ads" | "meta-ads" | "maintenance";',
);

siteData = replaceOnce(
  "workServiceLabels",
  siteData,
  /("meta-ads": "Meta Ads",)(\s*\n\};)/,
  '$1\n  maintenance: "Website Maintenance",$2',
);

workIndex = replaceOnce(
  "work filter buttons",
  workIndex,
  /(\{ id: "meta-ads", label: "Meta Ads" \},)/,
  '$1\n  { id: "maintenance", label: "Maintenance" },',
);

if (problems.length) {
  console.error("Nothing was changed. These spots were not found:");
  for (const p of problems) console.error("  - " + p);
  process.exit(1);
}

copyFileSync(SITE_DATA, SITE_DATA + ".bak");
copyFileSync(WORK_INDEX, WORK_INDEX + ".bak");
writeFileSync(SITE_DATA, siteData);
writeFileSync(WORK_INDEX, workIndex);
console.log("Patched " + SITE_DATA);
console.log("Patched " + WORK_INDEX);
console.log("Next: restart `npm run dev`, then open /admin/work/new. Maintenance should be in the list.");
