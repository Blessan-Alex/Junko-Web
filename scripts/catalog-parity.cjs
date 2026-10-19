const fs = require("fs");
const path = require("path");
const { loadCatalog } = require("./catalog/load-catalog.cjs");

const PRODUCT_FIELDS = [
  "slug",
  "name",
  "category",
  "subcategory",
  "description",
  "image",
  "featured",
];

function parseArgs(argv) {
  let snapshotPath = null;
  let checkImages = false;
  for (const arg of argv) {
    if (arg === "--check-images") {
      checkImages = true;
    } else if (arg.startsWith("--snapshot=")) {
      snapshotPath = arg.slice("--snapshot=".length);
    }
  }
  return { snapshotPath, checkImages };
}

const { latestCatalogSnapshot } = require("./catalog/resolve-snapshot.cjs");

function normalizeOptional(value) {
  return value === undefined || value === null ? undefined : value;
}

function setSymmetricDiff(a, b) {
  const onlyA = [...a].filter((x) => !b.has(x));
  const onlyB = [...b].filter((x) => !a.has(x));
  return { onlyA, onlyB };
}

async function main() {
  const { buildImageManifest, formatMissingImages } = await import(
    "./catalog/image-manifest.mjs"
  );

  const { snapshotPath: snapshotArg, checkImages } = parseArgs(
    process.argv.slice(2),
  );
  const snapshotsDir = path.join(process.cwd(), "snapshots");
  const snapshotPath =
    snapshotArg ?? latestCatalogSnapshot(snapshotsDir);

  if (!snapshotPath || !fs.existsSync(snapshotPath)) {
    console.error(
      "catalog:parity: no snapshot found. Run npm run catalog:snapshot or pass --snapshot=path",
    );
    process.exit(1);
  }

  const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
  const { categories: liveCategories, allProducts: liveProducts } = loadCatalog();
  const baselineProducts = snapshot.allProducts ?? [];
  const baselineCategories = snapshot.categories ?? [];

  const failures = [];
  const mismatchSamples = [];
  const MAX_SAMPLES = 20;

  if (liveProducts.length !== baselineProducts.length) {
    failures.push(
      `product count: live=${liveProducts.length}, snapshot=${baselineProducts.length}`,
    );
  }

  const liveIds = new Set(liveProducts.map((p) => p.id));
  const baseIds = new Set(baselineProducts.map((p) => p.id));
  const idDiff = setSymmetricDiff(liveIds, baseIds);
  if (idDiff.onlyA.length > 0) {
    failures.push(`ids only in live (${idDiff.onlyA.length}): ${idDiff.onlyA.slice(0, 5).join(", ")}${idDiff.onlyA.length > 5 ? "…" : ""}`);
  }
  if (idDiff.onlyB.length > 0) {
    failures.push(`ids only in snapshot (${idDiff.onlyB.length}): ${idDiff.onlyB.slice(0, 5).join(", ")}${idDiff.onlyB.length > 5 ? "…" : ""}`);
  }

  const liveSlugs = new Set(liveProducts.map((p) => p.slug));
  const baseSlugs = new Set(baselineProducts.map((p) => p.slug));
  const slugDiff = setSymmetricDiff(liveSlugs, baseSlugs);
  if (slugDiff.onlyA.length > 0) {
    failures.push(`slugs only in live (${slugDiff.onlyA.length})`);
  }
  if (slugDiff.onlyB.length > 0) {
    failures.push(`slugs only in snapshot (${slugDiff.onlyB.length})`);
  }

  const baselineById = new Map(baselineProducts.map((p) => [p.id, p]));
  for (const live of liveProducts) {
    const base = baselineById.get(live.id);
    if (!base) continue;
    for (const field of PRODUCT_FIELDS) {
      const a = normalizeOptional(live[field]);
      const b = normalizeOptional(base[field]);
      if (a !== b) {
        failures.push(`field mismatch on id=${live.id} field=${field}`);
        if (mismatchSamples.length < MAX_SAMPLES) {
          mismatchSamples.push({ id: live.id, field, live: a, snapshot: b });
        }
      }
    }
  }

  const liveCatJson = JSON.stringify(liveCategories);
  const baseCatJson = JSON.stringify(baselineCategories);
  if (liveCatJson !== baseCatJson) {
    failures.push("categories array does not match snapshot");
  }

  console.log(`Compared live products.ts to ${path.relative(process.cwd(), snapshotPath)}`);

  if (checkImages) {
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

  if (mismatchSamples.length > 0) {
    console.log("Sample field mismatches:");
    for (const s of mismatchSamples) {
      console.log(`  ${s.id} .${s.field}`);
    }
  }

  if (failures.length > 0) {
    console.error(`catalog:parity FAILED (${failures.length} issue(s)):`);
    for (const f of failures.slice(0, 30)) {
      console.error(`  - ${f}`);
    }
    if (failures.length > 30) {
      console.error(`  … and ${failures.length - 30} more`);
    }
    process.exit(1);
  }

  console.log("catalog:parity OK — live catalog matches snapshot.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
