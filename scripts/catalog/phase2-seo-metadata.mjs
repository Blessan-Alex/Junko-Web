/**
 * Apply description tweaks for products flagged with meta_duplicate in audit JSON.
 * Appends a unique model reference when descriptions are identical.
 *
 * Usage:
 *   node scripts/catalog/phase2-seo-metadata.mjs --audit=docs/seo/phase-2-audit-2026-10-27.json
 *   node scripts/catalog/phase2-seo-metadata.mjs --audit=... --expected-project-id=junko-web-final
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

function parseArgs(argv) {
  let auditPath = null;
  let expectedProjectId = null;
  let dryRun = false;
  let confirmProduction = false;
  for (const arg of argv) {
    if (arg.startsWith("--audit=")) auditPath = arg.slice("--audit=".length);
    else if (arg.startsWith("--expected-project-id=")) {
      expectedProjectId = arg.slice("--expected-project-id=".length);
    } else if (arg === "--dry-run") dryRun = true;
    else if (arg === "--confirm-production") confirmProduction = true;
  }
  return { auditPath, expectedProjectId, dryRun, confirmProduction };
}

function uniqueSuffix(product) {
  const slug = product.slug || product.id;
  return ` Model reference: ${slug}.`;
}

async function main() {
  loadEnvFiles();
  const { auditPath, expectedProjectId, dryRun, confirmProduction } = parseArgs(
    process.argv.slice(2),
  );
  if (!auditPath) {
    console.error("phase2-seo: pass --audit=docs/seo/phase-2-audit-....json");
    process.exit(1);
  }

  const resolved = path.isAbsolute(auditPath)
    ? auditPath
    : path.join(process.cwd(), auditPath);
  const report = JSON.parse(fs.readFileSync(resolved, "utf8"));
  const dupIds = new Set(
    (report.issues ?? [])
      .filter((i) => i.type === "meta_duplicate")
      .map((i) => i.id),
  );

  if (dupIds.size === 0) {
    console.log("phase2-seo: no meta_duplicate issues in audit file");
    return;
  }

  const { allProducts } = loadCatalog();
  const byId = new Map(allProducts.map((p) => [p.id, p]));
  const targets = [...dupIds].map((id) => byId.get(id)).filter(Boolean);

  if (dryRun) {
    console.log(`phase2-seo dry-run: would update ${targets.length} products`);
    for (const p of targets) {
      console.log(`  ${p.id} (${p.slug})`);
    }
    return;
  }

  const { initFirebaseAdmin } = await import("./firebase-admin-init.mjs");
  const { assertSeedTargetAllowed, getResolvedProjectId } = await import(
    "./seed-guard.mjs"
  );
  const admin = initFirebaseAdmin();
  const { FieldValue } = admin.firestore;
  const projectId = getResolvedProjectId(admin);
  assertSeedTargetAllowed(projectId, {
    expectedProjectId,
    confirmProduction,
  });

  const db = admin.firestore();
  const batch = db.batch();
  let writes = 0;

  for (const product of targets) {
    const ref = db.collection("products").doc(product.id);
    const base = (product.description ?? "").trim();
    const suffix = uniqueSuffix(product);
    const description = base.includes(suffix.trim())
      ? base
      : `${base}${base.endsWith(".") ? "" : "."}${suffix}`;
    batch.set(
      ref,
      { description, updatedAt: FieldValue.serverTimestamp() },
      { merge: true },
    );
    writes += 1;
    console.log(`  patch ${product.id}`);
  }

  await batch.commit();
  console.log(`phase2-seo OK (${writes} writes) project=${projectId}`);
  console.log("Next: sync products.ts manually or re-seed, then rebuild projection");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
