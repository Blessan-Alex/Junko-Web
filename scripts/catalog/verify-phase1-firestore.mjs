/**
 * Read-only: print slug/description for Phase 1 product docs in Firestore.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PHASE1_IDS = [
  "WEIGHING_SCALES_Electronic_weighing_scales_pallet_scale_1734x2048",
  "SEALING_MACHINES_Sealing_and_stitching_packaging_machine_FBK_24D",
  "BAG_CLOSING_MACHINES_Machine_heads_DS_9A",
  "CONSUMABLES_Oil_for_sewing_machine_SWOil_e1708935103355",
];

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

async function main() {
  loadEnvFiles();
  const { initFirebaseAdmin } = await import("./firebase-admin-init.mjs");
  const admin = initFirebaseAdmin();
  const db = admin.firestore();
  const projectId =
    admin.app().options.projectId ?? process.env.FIREBASE_PROJECT_ID;
  console.log(`project: ${projectId}\n`);

  for (const id of PHASE1_IDS) {
    const doc = await db.collection("products").doc(id).get();
    if (!doc.exists) {
      console.log(`${id}\n  MISSING\n`);
      continue;
    }
    const d = doc.data();
    const desc = String(d.description ?? "").slice(0, 80);
    console.log(`${id}`);
    console.log(`  slug: ${d.slug}`);
    console.log(`  published: ${d.published !== false}`);
    console.log(`  description: ${desc}${desc.length >= 80 ? "…" : ""}\n`);
  }

  const legacy = await db
    .collection("products")
    .where("slug", "==", "pallet-scale-https-junko-fze-com-product-pallet-scale")
    .get();
  if (!legacy.empty) {
    console.log("Legacy pallet slug documents:");
    for (const doc of legacy.docs) {
      const d = doc.data();
      console.log(
        `  ${doc.id} published=${d.published !== false} slug=${d.slug}`,
      );
    }
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
