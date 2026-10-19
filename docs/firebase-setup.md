# Firebase staging setup (Phase 1)

Public site **still reads** [`src/data/products.ts`](../src/data/products.ts). Staging Firestore is seeded for later admin/ISR work only.

## 1. Create staging project

1. [Firebase Console](https://console.firebase.google.com/) → **Add project** → e.g. `junko-web-staging`.
2. Stay on **Spark** plan unless you add paid features later (Phase 1 needs Auth + Firestore only).
3. **Production Firebase project** for junko-fze.com is **out of scope** until a later cutover.

## 2. Authentication

1. **Build** → **Authentication** → **Get started**.
2. Enable **Email/Password** sign-in.
3. Create the first admin user: **Users** → **Add user** (email + password). Note the **UID**.

## 3. Firestore

1. **Build** → **Firestore Database** → **Create database** → **Production mode** (rules file in repo protects data).
2. Deploy rules from this repo (after installing [Firebase CLI](https://firebase.google.com/docs/cli)):

   ```bash
   firebase login
   firebase use --add   # select junko-web-staging
   firebase deploy --only firestore:rules --project YOUR_STAGING_PROJECT_ID
   ```

   Rules file: [`firestore.rules`](../firestore.rules) — public **read** on `published == true` products and `catalog/*`; **writes** only with `request.auth.token.admin == true`.

### Rules simulator (manual check)

1. Firestore → **Rules** → **Rules Playground**.
2. **Read** `products/{id}` as unauthenticated with simulated document `{ published: true }` → allow.
3. **Write** `products/{id}` as unauthenticated → deny.
4. **Write** with auth context `{ admin: true }` in token → allow.

## 4. Service account (local seed only)

1. **Project settings** → **Service accounts** → **Generate new private key** (JSON).
2. Store outside git (e.g. `secrets/junko-web-staging-service-account.json`, add path to `.gitignore` if needed).
3. Copy [`.env.example`](../.env.example) to `.env.local` and set **one** of:
   - `GOOGLE_APPLICATION_CREDENTIALS=./secrets/junko-web-staging-service-account.json`
   - or `FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'`

**Never commit** `.env.local`, JSON keys, or API secrets.

## 5. Seed catalog from snapshot

Baseline: [`snapshots/catalog-2026-10-19.json`](../snapshots/catalog-2026-10-19.json) (148 products).

```bash
npm run catalog:seed
# or
npm run catalog:seed -- --snapshot=snapshots/catalog-2026-10-19.json
```

**Idempotency:** each run uses `set(merge: false)` — documents are **fully replaced** to match the snapshot (safe to re-run after snapshot updates).

Verify in console:

- Collection `products` → **148** documents (IDs match product `id` from snapshot).
- Document `catalog/categories` → `{ categories: [...] }`.

## 6. Admin custom claim (`admin: true`)

Claims are required for future admin writes (rules check `request.auth.token.admin`).

**Option A — script (recommended):**

```bash
# Load same credentials as seed (GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_SERVICE_ACCOUNT_JSON)
node scripts/catalog-set-admin-claim.mjs --email=you@example.com
# or
node scripts/catalog-set-admin-claim.mjs --uid=FIREBASE_AUTH_UID
```

**Option B — one-off Node with Admin SDK** (same credentials as seed):

```js
await admin.auth().setCustomUserClaims("UID_HERE", { admin: true });
```

User must **sign out and sign in** before the ID token includes `admin`.

## 7. Phase 1 verification checklist

- [ ] `npm run catalog:parity` passes (file vs snapshot; `products.ts` unchanged).
- [ ] `npm run build` passes (no Firestore wiring in app yet).
- [ ] Staging Firestore shows 148 products + `catalog/categories`.
- [ ] Rules deployed; simulator denies public writes.

## Related

- Snapshot tooling: [`snapshots/README.md`](../snapshots/README.md)
- Full roadmap: [`admin-migration-plan.md`](../admin-migration-plan.md)
