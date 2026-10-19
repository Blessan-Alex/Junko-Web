/**
 * One-time local bootstrap: set custom claim admin=true on a Firebase Auth user.
 * Not for CI. Requires service account with permission to manage users.
 *
 * Usage:
 *   node scripts/catalog-set-admin-claim.mjs --uid=ABC123
 *   node scripts/catalog-set-admin-claim.mjs --email=admin@example.com
 */

import { initFirebaseAdmin } from "./catalog/firebase-admin-init.mjs";

function parseArgs(argv) {
  let uid = null;
  let email = null;
  for (const arg of argv) {
    if (arg.startsWith("--uid=")) uid = arg.slice("--uid=".length);
    if (arg.startsWith("--email=")) email = arg.slice("--email=".length);
  }
  return { uid, email };
}

async function main() {
  const { uid, email } = parseArgs(process.argv.slice(2));
  if (!uid && !email) {
    console.error("Provide --uid=... or --email=...");
    process.exit(1);
  }

  const admin = initFirebaseAdmin();
  let targetUid = uid;

  if (!targetUid && email) {
    const user = await admin.auth().getUserByEmail(email);
    targetUid = user.uid;
  }

  await admin.auth().setCustomUserClaims(targetUid, { admin: true });
  const user = await admin.auth().getUser(targetUid);
  console.log(`Set admin claim for uid=${targetUid} email=${user.email ?? "(none)"}`);
  console.log("User must sign out and sign in again for claims to apply in client tokens.");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
