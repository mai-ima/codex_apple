import { access, readFile } from "node:fs/promises";
import { dirname, normalize, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pages } from "../src/data/pages.mjs";

const requiredPageFragments = ["site-header", "product-rail", "shopping-promise", "footer-directory", "hero-title", "site-footer", "<main>"];

const requiredCssFragments = [
  "@media (max-width: 980px)",
  "@media (max-width: 860px)",
  "@media (max-width: 560px)",
  ".product-grid",
  ".specs-panel",
  ".buy-panel",
  ".timeline-panel",
  ".product-rail",
  ".shopping-promise",
  ".compare-panel",
  ".footer-directory",
  "@keyframes riseIn",
];

const requiredAssets = [
  "gcherry-mark.svg",
  "hero-setup.svg",
  "gbook-airborne.svg",
  "gpad-pro.svg",
  "gphone-rush.svg",
  "gwatch-pulse.svg",
  "gsound-pods.svg",
  "ghome-hub.svg",
  "arcade-plus.svg",
  "accessories-gear.svg",
  "support-care.svg",
  "gstudio-core.svg",
  "checkout-flow.svg",
  "technology-core.svg",
  "history-archive.svg",
  "feature-thermal.svg",
];

const repoRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");
const missingCss = requiredCssFragments.filter((fragment) => !css.includes(fragment));
if (missingCss.length > 0) {
  throw new Error(`Missing CSS fragments: ${missingCss.join(", ")}`);
}

if (pages.length < 36) {
  throw new Error(`Expected at least 36 generated pages, got ${pages.length}.`);
}

const seenSlugs = new Set();
const seenOutputs = new Set();
for (const page of pages) {
  if (seenSlugs.has(page.slug)) throw new Error(`Duplicate page slug: ${page.slug}`);
  if (seenOutputs.has(page.outFile)) throw new Error(`Duplicate page output: ${page.outFile}`);
  seenSlugs.add(page.slug);
  seenOutputs.add(page.outFile);

  const htmlPath = resolve(repoRoot, page.outFile);
  const html = await readFile(htmlPath, "utf8");
  const missing = requiredPageFragments.filter((fragment) => !html.includes(fragment));
  if (missing.length > 0) {
    throw new Error(`${page.outFile} is missing required fragments: ${missing.join(", ")}`);
  }
  if (!html.includes("public/assets/") && !html.includes("../public/assets/")) {
    throw new Error(`${page.outFile} does not reference generated SVG assets.`);
  }

  const attrPattern = /\b(?:href|src)="([^"]+)"/g;
  for (const [, rawRef] of html.matchAll(attrPattern)) {
    const ref = rawRef.split("#")[0].split("?")[0];
    if (!ref || rawRef.startsWith("#") || rawRef.startsWith("http") || rawRef.startsWith("mailto:")) continue;
    const target = normalize(resolve(dirname(htmlPath), ref));
    if (!target.startsWith(repoRoot)) {
      throw new Error(`${page.outFile} links outside repo: ${rawRef}`);
    }
    try {
      await access(target);
    } catch {
      throw new Error(`${page.outFile} has broken local reference ${rawRef} -> ${relative(repoRoot, target)}`);
    }
  }
}

for (const file of requiredAssets) {
  await access(new URL(`../public/assets/${file}`, import.meta.url));
}

console.log(`Gcherry validation passed for ${pages.length} pages and ${requiredAssets.length} core assets.`);
