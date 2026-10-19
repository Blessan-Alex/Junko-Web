const fs = require("fs");
const path = require("path");
const { loadCatalog } = require("./catalog/load-catalog.cjs");

async function main() {
  const { computeStats, assertBaseline } = await import("./catalog/validate.mjs");
  const { getGitCommit } = await import("./catalog/git-meta.mjs");
  const { buildImageManifest } = await import("./catalog/image-manifest.mjs");

  const dateStamp = new Date().toISOString().slice(0, 10);
  const snapshotsDir = path.join(process.cwd(), "snapshots");
  fs.mkdirSync(snapshotsDir, { recursive: true });

  const { categories, allProducts } = loadCatalog();
  const stats = computeStats(allProducts);

  try {
    assertBaseline(stats);
  } catch (err) {
    console.error("catalog:snapshot baseline validation failed:");
    for (const e of err.errors ?? [err.message]) {
      console.error(`  - ${e}`);
    }
    process.exit(1);
  }

  const exportedAt = new Date().toISOString();
  const gitCommit = getGitCommit();

  const catalogPayload = {
    exportedAt,
    gitCommit,
    categories,
    allProducts,
    stats: {
      productCount: stats.productCount,
      uniqueIds: stats.uniqueIds,
      uniqueSlugs: stats.uniqueSlugs,
    },
  };

  const catalogPath = path.join(snapshotsDir, `catalog-${dateStamp}.json`);
  fs.writeFileSync(catalogPath, JSON.stringify(catalogPayload, null, 2) + "\n", "utf8");
  console.log(`Wrote ${path.relative(process.cwd(), catalogPath)}`);

  const imageManifest = buildImageManifest(allProducts, {
    exportedAt,
    gitCommit,
  });
  const manifestPath = path.join(snapshotsDir, `image-manifest-${dateStamp}.json`);
  fs.writeFileSync(manifestPath, JSON.stringify(imageManifest, null, 2) + "\n", "utf8");
  console.log(`Wrote ${path.relative(process.cwd(), manifestPath)}`);

  console.log(
    `Stats: ${stats.productCount} products, ${stats.uniqueIds} unique ids, ${stats.uniqueSlugs} unique slugs`,
  );
  console.log(
    `Images: ${imageManifest.summary.totalReferenced} referenced, ${imageManifest.summary.uniquePaths} unique, ${imageManifest.summary.missingCount} missing on disk`,
  );
  if (gitCommit) {
    console.log(`Git commit: ${gitCommit}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
