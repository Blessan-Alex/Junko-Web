/**
 * Bulk migrate product images from public/ paths to Vercel Blob.
 *
 * Requires: BLOB_READ_WRITE_TOKEN, Firebase Admin credentials.
 *
 * Usage:
 *   node scripts/blob-migrate-catalog.cjs --dry-run
 *   node scripts/blob-migrate-catalog.cjs --confirm
 *   node scripts/blob-migrate-catalog.cjs --confirm --confirm-production --expected-project-id=YOUR_PROD_ID
 */
const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "..", "public");

function loadEnvFiles() {
  const root = path.join(__dirname, "..");
  for (const name of [".env.local", ".env.blob-migrate.local"]) {
    const file = path.join(root, name);
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq <= 0) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (val === "[SENSITIVE]") continue;
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

function parseArgs(argv) {
  let dryRun = false;
  let confirm = false;
  let confirmProduction = false;
  let expectedProjectId = null;
  let limit = null;

  for (const arg of argv) {
    if (arg === "--dry-run") dryRun = true;
    else if (arg === "--confirm") confirm = true;
    else if (arg === "--confirm-production") confirmProduction = true;
    else if (arg.startsWith("--expected-project-id=")) {
      expectedProjectId = arg.slice("--expected-project-id=".length);
    } else if (arg.startsWith("--limit=")) {
      limit = Number(arg.slice("--limit=".length));
    }
  }

  return { dryRun, confirm, confirmProduction, expectedProjectId, limit };
}

function extFromPath(filePath) {
  const ext = path.extname(filePath).toLowerCase().replace(".", "");
  if (ext === "jpeg") return "jpg";
  if (["jpg", "png", "webp", "gif"].includes(ext)) return ext === "gif" ? "png" : ext;
  return "jpg";
}

function mimeFromExt(ext) {
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  return "image/jpeg";
}

function blobPathSegment(value) {
  const cleaned = String(value).replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "");
  return cleaned || "product";
}

async function main() {
  loadEnvFiles();

  const { dryRun, confirm, confirmProduction, expectedProjectId, limit } =
    parseArgs(process.argv.slice(2));

  if (!dryRun && !confirm) {
    console.error("blob-migrate: pass --dry-run or --confirm");
    process.exit(1);
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("blob-migrate: set BLOB_READ_WRITE_TOKEN");
    process.exit(1);
  }

  const { put } = await import("@vercel/blob");
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

  const db = admin.firestore();
  const snap = await db.collection("products").get();

  let processed = 0;
  let migrated = 0;
  let skipped = 0;
  let failed = 0;

  for (const doc of snap.docs) {
    if (limit != null && processed >= limit) break;
    processed += 1;

    const data = doc.data();
    const image = String(data.image ?? "");
    const slug = String(data.slug ?? doc.id);
    const productId = String(data.id ?? doc.id);

    if (!image.startsWith("/products/")) {
      skipped += 1;
      continue;
    }

    const localPath = path.join(PUBLIC_DIR, image.replace(/^\//, ""));
    if (!fs.existsSync(localPath)) {
      console.error(`MISSING file ${localPath} (${productId})`);
      failed += 1;
      continue;
    }

    const ext = extFromPath(localPath);
    const blobKey = `products/${blobPathSegment(slug)}/main.${ext}`;

    if (dryRun) {
      console.log(`[dry-run] ${productId} ${image} -> ${blobKey}`);
      migrated += 1;
      continue;
    }

    try {
      const buffer = fs.readFileSync(localPath);
      const result = await put(blobKey, buffer, {
        access: "public",
        contentType: mimeFromExt(ext),
        addRandomSuffix: false,
      });

      await doc.ref.update({ image: result.url });
      console.log(`OK ${productId} -> ${result.url}`);
      migrated += 1;
    } catch (err) {
      console.error(`FAIL ${productId}:`, err.message ?? err);
      failed += 1;
    }
  }

  console.log(
    `blob-migrate done: processed=${processed} migrated=${migrated} skipped=${skipped} failed=${failed} dryRun=${dryRun}`,
  );
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
