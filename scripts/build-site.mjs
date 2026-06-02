import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { pages } from "../src/data/pages.mjs";
import { renderPage } from "../src/components/render.mjs";

for (const page of pages) {
  await mkdir(dirname(page.outFile), { recursive: true });
  await writeFile(page.outFile, renderPage(page));
}

console.log(`Generated ${pages.length} Gcherry pages.`);
