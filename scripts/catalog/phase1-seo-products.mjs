/**
 * Phase 1 SEO: sync four critical products from file catalog to Firestore.
 *
 * Usage:
 *   node scripts/catalog/phase1-seo-products.mjs
 *   node scripts/catalog/phase1-seo-products.mjs --confirm-production --expected-project-id=junko-web-final
 *
 * Then: npm run catalog:rebuild-projection:production
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadCatalog } from "./load-catalog.cjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnvFiles() {
  const root = path.join(__dirname, "..", "..");
  for (const name of [".env.local", ".env"]) {
    const file = path.join(root, name);
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq <= 0) continue;
      const key = trimmed.slice(0, eq).trim();
      if (process.env[key] !== undefined) continue;
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    }
  }
}

const PHASE1_IDS = [
  "WEIGHING_SCALES_Electronic_weighing_scales_pallet_scale_1734x2048",
  "SEALING_MACHINES_Sealing_and_stitching_packaging_machine_FBK_24D",
  "BAG_CLOSING_MACHINES_Machine_heads_DS_9A",
  "CONSUMABLES_Oil_for_sewing_machine_SWOil_e1708935103355",
];

const LEGACY_SLUGS_TO_UNPUBLISH = [
  "pallet-scale-https-junko-fze-com-product-pallet-scale",
];

function parseArgs(argv) {
  let confirmProduction = false;
  let expectedProjectId = null;
  for (const arg of argv) {
    if (arg === "--confirm-production") confirmProduction = true;
    else if (arg.startsWith("--expected-project-id=")) {
      expectedProjectId = arg.slice("--expected-project-id=".length);
    }
  }
  return { confirmProduction, expectedProjectId };
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
  loadEnvFiles();
  const { initFirebaseAdmin } = await import("./firebase-admin-init.mjs");
  const { assertSeedTargetAllowed, getResolvedProjectId } = await import(
    "./seed-guard.mjs"
  );
  const { confirmProduction, expectedProjectId } = parseArgs(
    process.argv.slice(2),
  );

  const admin = initFirebaseAdmin();
  const { FieldValue } = admin.firestore;
  const projectId = getResolvedProjectId(admin);
  assertSeedTargetAllowed(projectId, {
    confirmProduction,
    expectedProjectId,
  });

  const { allProducts } = loadCatalog();
  const byId = new Map(allProducts.map((p) => [p.id, p]));
  const db = admin.firestore();
  const batch = db.batch();
  let writes = 0;

  for (const id of PHASE1_IDS) {
    const product = byId.get(id);
    if (!product) {
      console.error(`phase1-seo: missing product in file catalog: ${id}`);
      process.exit(1);
    }
    const ref = db.collection("products").doc(id);
    batch.set(
      ref,
      {
        ...productToFirestoreDoc(product),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
    writes += 1;
    console.log(`  patch ${id} -> slug ${product.slug}`);
  }

  for (const legacySlug of LEGACY_SLUGS_TO_UNPUBLISH) {
    const snap = await db
      .collection("products")
      .where("slug", "==", legacySlug)
      .limit(5)
      .get();
    for (const doc of snap.docs) {
      if (PHASE1_IDS.includes(doc.id)) continue;
      batch.update(doc.ref, {
        published: false,
        updatedAt: FieldValue.serverTimestamp(),
      });
      writes += 1;
      console.log(`  unpublish legacy doc ${doc.id} (slug ${legacySlug})`);
    }
  }

  await batch.commit();
  console.log(`phase1-seo OK (${writes} writes) project=${projectId}`);
  console.log("Next: npm run catalog:rebuild-projection:production");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
