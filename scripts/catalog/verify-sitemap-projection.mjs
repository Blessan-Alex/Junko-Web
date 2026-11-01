import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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

async function main() {
  loadEnvFiles();
  const { initFirebaseAdmin } = await import("./firebase-admin-init.mjs");
  const admin = initFirebaseAdmin();
  const db = admin.firestore();
  const doc = await db.collection("catalog").doc("sitemap").get();
  const entries = doc.data()?.entries ?? [];
  const pallet = entries.filter((e) => e.slug?.includes("pallet"));
  console.log("pallet sitemap entries:", pallet);
  const bad = entries.filter(
    (e) =>
      e.slug?.includes("junko-fze") || e.slug?.includes("https"),
  );
  console.log("invalid slug entries:", bad.length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
