const fs = require("fs");
const path = require("path");
const { loadCatalog } = require("./catalog/load-catalog.cjs");
const {
  resolveSnapshotPath,
  loadSnapshotFile,
} = require("./catalog/resolve-snapshot.cjs");

function parseArgs(argv) {
  let snapshotPath = null;
  let checkImages = false;
  let source = "file";
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--check-images") {
      checkImages = true;
    } else if (arg.startsWith("--snapshot=")) {
      snapshotPath = arg.slice("--snapshot=".length);
    } else if (arg.startsWith("--source=")) {
      source = arg.slice("--source=".length).trim().toLowerCase();
    } else if (arg === "--source" && argv[i + 1]) {
      source = argv[i + 1].trim().toLowerCase();
      i += 1;
    }
  }
  if (source !== "file" && source !== "firestore") {
    console.error(`catalog:parity: unknown --source=${source} (use file or firestore)`);
    process.exit(1);
  }
  return { snapshotPath, checkImages, source };
}

async function main() {
  const { compareCatalogToSnapshot, printParityResult } = await import(
    "./catalog/parity-core.mjs"
  );
  const { buildImageManifest, formatMissingImages } = await import(
    "./catalog/image-manifest.mjs"
  );
  const { EXPECTED_PRODUCT_COUNT } = await import("./catalog/validate.mjs");

  const { snapshotPath: snapshotArg, checkImages, source } = parseArgs(
    process.argv.slice(2),
  );

  if (checkImages && source !== "file") {
    console.log(
      "catalog:parity: --check-images applies only to --source=file (snapshot image paths vs public/)",
    );
  }

  const resolved = resolveSnapshotPath(snapshotArg);
  const snapshot = loadSnapshotFile(resolved);
  if (!snapshot) {
    console.error(
      "catalog:parity: no snapshot found. Run npm run catalog:snapshot or pass --snapshot=path",
    );
    process.exit(1);
  }

  const baselineProducts = snapshot.allProducts ?? [];
  const baselineCategories = snapshot.categories ?? [];
  const snapshotRel = path.relative(process.cwd(), resolved);

  let liveCategories;
  let liveProducts;
  let liveLabel;
  let projectId = null;
  let firestoreDocIds = null;

  if (source === "file") {
    const live = loadCatalog();
    liveCategories = live.categories;
    liveProducts = live.allProducts;
    liveLabel = "products.ts";
    console.log(`Compared ${liveLabel} to ${snapshotRel}`);
  } else {
    const { loadFirestoreCatalog } = await import(
      "./catalog/load-firestore-catalog.mjs"
    );
    try {
      const live = await loadFirestoreCatalog();
      liveCategories = live.categories;
      liveProducts = live.allProducts;
      projectId = live.projectId;
      firestoreDocIds = live.firestoreDocIds;
      liveLabel = "Firestore";
      console.log(
        `Compared ${liveLabel} (project ${projectId}) to ${snapshotRel}`,
      );
    } catch (err) {
      console.error(err.message || err);
      process.exit(1);
    }
  }

  const { failures, mismatchSamples } = compareCatalogToSnapshot({
    liveCategories,
    liveProducts,
    baselineCategories,
    baselineProducts,
    liveLabel,
    requirePublished: source === "firestore",
    firestoreDocIds,
  });

  if (source === "file" && checkImages) {
    const manifest = buildImageManifest(liveProducts);
    const missing = formatMissingImages(manifest);
    console.log(
      `Image check: ${manifest.summary.totalReferenced} referenced, ${manifest.summary.uniquePaths} unique, ${missing.length} missing`,
    );
    if (missing.length > 0) {
      console.log("Missing image files under public/:");
      for (const p of missing) {
        console.log(`  ${p}`);
      }
    }
  }

  const ok = printParityResult({
    failures,
    mismatchSamples,
    successMessage:
      source === "file"
        ? "catalog:parity OK — live catalog matches snapshot."
        : `catalog:parity OK — Firestore matches snapshot (${EXPECTED_PRODUCT_COUNT}/${EXPECTED_PRODUCT_COUNT} products).`,
  });

  if (ok && source === "firestore" && projectId) {
    console.log(`  project: ${projectId}`);
    console.log(`  snapshot: ${snapshotRel}`);
  }

  process.exit(ok ? 0 : 1);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
