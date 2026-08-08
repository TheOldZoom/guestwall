import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";

const HEADER = `/*
 * Guestbook Service
 * Copyright (C) 2026 Zoom
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

`;

const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  ".next",
  "dist",
  "build",
  "out",
  "coverage",
  ".turbo",
  ".cache",
]);

const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);

async function processDirectory(directory: string) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) {
        console.log(`Skipping: ${path}`);
        continue;
      }

      await processDirectory(path);
      continue;
    }

    if (!EXTENSIONS.has(extname(entry.name))) {
      continue;
    }

    const content = await readFile(path, "utf8");

    if (content.includes("Copyright (C) 2026 Zoom")) {
      console.log(`Already has header: ${path}`);
      continue;
    }

    await writeFile(path, HEADER + content, "utf8");
    console.log(`Added header: ${path}`);
  }
}

await processDirectory(".");
