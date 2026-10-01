import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");
const skipDirs = new Set(["_next", "admin", "images", "Assets", "404", "_not-found"]);

if (!existsSync(outDir)) {
  throw new Error("Missing out directory. Run next build before copying HTML routes.");
}

for (const entry of readdirSync(outDir)) {
  if (skipDirs.has(entry) || entry.startsWith(".")) continue;

  const routeDir = path.join(outDir, entry);
  const indexFile = path.join(routeDir, "index.html");
  const htmlFile = path.join(outDir, `${entry}.html`);

  if (statSync(routeDir).isDirectory() && existsSync(indexFile)) {
    copyFileSync(indexFile, htmlFile);
  }
}
