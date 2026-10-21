/**
 * One-time / ops: rebuild catalog/listing + catalog/sitemap in Firestore.
 * Scans all products (~N reads) — run after deploy or when projections are missing.
 *
 * Requires Firebase Admin: GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_SERVICE_ACCOUNT_JSON
 *
 * Usage:
 *   npm run catalog:rebuild-projection
 *   npm run catalog:rebuild-projection -- --confirm-production --expected-project-id=junko-web-final
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnvFiles() {
  const root = path.join(__dirname, "..");
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

async function main() {
  loadEnvFiles();
  const { confirmProduction, expectedProjectId } = parseArgs(
    process.argv.slice(2),
  );

  const { initFirebaseAdmin } = await import("./catalog/firebase-admin-init.mjs");
  const { assertSeedTargetAllowed, getResolvedProjectId } = await import(
    "./catalog/seed-guard.mjs"
  );
  const admin = initFirebaseAdmin();
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

  const { rebuildCatalogProjections } = await import(
    "../src/lib/admin/catalog-projection.ts"
  );
  console.log(`Rebuilding catalog projections for ${projectId}…`);
  await rebuildCatalogProjections();
  console.log("Done. Wrote catalog/listing and catalog/sitemap.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
