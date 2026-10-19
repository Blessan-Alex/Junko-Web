import fs from "fs";
import path from "path";

function publicPathForImage(imagePath, cwd = process.cwd()) {
  const rel = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
  return path.join(cwd, "public", rel);
}

export function buildImageManifest(allProducts, options = {}) {
  const cwd = options.cwd ?? process.cwd();
  const gitCommit = options.gitCommit ?? null;
  const exportedAt = options.exportedAt ?? new Date().toISOString();

  const referenced = allProducts.map((p) => p.image).filter(Boolean);
  const uniquePaths = [...new Set(referenced)];

  const entries = uniquePaths.map((imagePath) => {
    const full = publicPathForImage(imagePath, cwd);
    const exists = fs.existsSync(full);
    let sizeBytes = null;
    if (exists) {
      try {
        sizeBytes = fs.statSync(full).size;
      } catch {
        sizeBytes = null;
      }
    }
    return { path: imagePath, exists, sizeBytes };
  });

  const missingCount = entries.filter((e) => !e.exists).length;

  return {
    exportedAt,
    gitCommit,
    entries,
    summary: {
      totalReferenced: referenced.length,
      uniquePaths: uniquePaths.length,
      missingCount,
    },
  };
}

export function formatMissingImages(manifest) {
  return manifest.entries.filter((e) => !e.exists).map((e) => e.path);
}
