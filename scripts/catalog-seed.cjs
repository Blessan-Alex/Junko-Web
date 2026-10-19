const path = require("path");
const {
  resolveSnapshotPath,
  loadSnapshotFile,
} = require("./catalog/resolve-snapshot.cjs");

const FIRESTORE_BATCH_LIMIT = 500;

function parseArgs(argv) {
  let snapshotPath = null;
  let confirmProduction = false;
  let expectedProjectId = null;
  for (const arg of argv) {
    if (arg.startsWith("--snapshot=")) {
      snapshotPath = arg.slice("--snapshot=".length);
    } else if (arg === "--confirm-production") {
      confirmProduction = true;
    } else if (arg.startsWith("--expected-project-id=")) {
      expectedProjectId = arg.slice("--expected-project-id=".length);
    }
  }
  return { snapshotPath, confirmProduction, expectedProjectId };
}

function productToFirestoreDoc(product) {
  const doc = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    category: product.category,
    image: product.image,
    published: true,
  };
  if (product.subcategory !== undefined) doc.subcategory = product.subcategory;
  if (product.description !== undefined) doc.description = product.description;
  if (product.specs !== undefined) doc.specs = product.specs;
  if (product.features !== undefined) doc.features = product.features;
  if (product.featured !== undefined) doc.featured = product.featured;
  return doc;
}

async function main() {
  const { EXPECTED_PRODUCT_COUNT, computeStats } = await import(
    "./catalog/validate.mjs"
  );
  const { initFirebaseAdmin } = await import(
    "./catalog/firebase-admin-init.mjs"
  );
  const { assertSeedTargetAllowed, getResolvedProjectId } = await import(
    "./catalog/seed-guard.mjs"
  );
  const admin = initFirebaseAdmin();
  const { FieldValue } = admin.firestore;

  const {
    snapshotPath: snapshotArg,
    confirmProduction,
    expectedProjectId,
  } = parseArgs(process.argv.slice(2));

  const projectId = getResolvedProjectId(admin);
  try {
    assertSeedTargetAllowed(projectId, {
      confirmProduction,
      expectedProjectId,
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  const resolved = resolveSnapshotPath(snapshotArg);

  const snapshot = loadSnapshotFile(resolved);
  if (!snapshot) {
    console.error(
      "catalog:seed: snapshot not found. Pass --snapshot=snapshots/catalog-2026-10-19.json",
    );
    process.exit(1);
  }

  const categories = snapshot.categories ?? [];
  const allProducts = snapshot.allProducts ?? [];
  const stats = computeStats(allProducts);

  if (stats.productCount !== EXPECTED_PRODUCT_COUNT) {
    console.error(
      `catalog:seed: snapshot has ${stats.productCount} products, expected ${EXPECTED_PRODUCT_COUNT}`,
    );
    process.exit(1);
  }
  if (
    stats.uniqueIds !== EXPECTED_PRODUCT_COUNT ||
    stats.uniqueSlugs !== EXPECTED_PRODUCT_COUNT
  ) {
    console.error("catalog:seed: snapshot failed unique id/slug checks");
    process.exit(1);
  }

  const db = admin.firestore();
  const batch = db.batch();
  let opCount = 0;

  for (const product of allProducts) {
    const ref = db.collection("products").doc(product.id);
    const data = productToFirestoreDoc(product);
    data.updatedAt = FieldValue.serverTimestamp();
    // Idempotent re-seed: full document replace (merge: false) from snapshot baseline.
    batch.set(ref, data, { merge: false });
    opCount += 1;
    if (opCount >= FIRESTORE_BATCH_LIMIT) {
      console.error("catalog:seed: exceeds single-batch limit; split batches in code");
      process.exit(1);
    }
  }

  const categoriesRef = db.collection("catalog").doc("categories");
  batch.set(
    categoriesRef,
    { categories },
    { merge: false },
  );
  opCount += 1;

  try {
    await batch.commit();
  } catch (err) {
    console.error("catalog:seed: Firestore batch commit failed:", err.message);
    process.exit(1);
  }

  console.log(`catalog:seed OK`);
  console.log(`  project: ${projectId}`);
  console.log(`  snapshot: ${path.relative(process.cwd(), resolved)}`);
  console.log(`  products written: ${allProducts.length}`);
  console.log(`  categories doc: catalog/categories`);
  console.log(
    "  idempotency: set(merge:false) — re-run overwrites docs to match snapshot",
  );
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
