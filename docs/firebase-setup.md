# Firebase setup

**Active project:** `junko-web-final` (rules + indexes deployed; 148 products seeded; parity OK).

```bash
firebase deploy --only firestore --project junko-web-final
npm run catalog:seed          # uses GOOGLE_APPLICATION_CREDENTIALS for junko-web-final
npm run catalog:parity -- --source=firestore
```

**Vercel (Production + Preview)** — set before deploy reads Firestore:

| Variable | Value |
|----------|--------|
| `CATALOG_SOURCE` | `firestore` |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Service account JSON for **junko-web-final** (Sensitive) |
| `FIREBASE_PROJECT_ID` | `junko-web-final` (optional if in JSON) |
| `NEXT_PUBLIC_FIREBASE_*` | Web app config from Firebase Console |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob (Phase 5 uploads) |

Local: copy [`.env.example`](../.env.example) → `.env.local` with the same keys; use `GOOGLE_APPLICATION_CREDENTIALS=./secrets/junko-web-final-570234ae72de.json`.

---

## Phase 1 (historical staging notes)

Public site **still reads** [`src/data/products.ts`](../src/data/products.ts) when `CATALOG_SOURCE=file`.

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

## 7. Verification checklist

**Phase 1**

- [ ] `npm run catalog:parity` passes (file vs snapshot; `products.ts` unchanged).
- [ ] `npm run build` passes (no Firestore wiring in app yet).
- [ ] Staging Firestore shows 148 products + `catalog/categories`.
- [ ] Rules deployed; simulator denies public writes.

**Phase 2 (mandatory before cutover)**

```bash
# Same credentials as seed
$env:GOOGLE_APPLICATION_CREDENTIALS = (Resolve-Path ".\secrets\your-staging-key.json").Path
npm run catalog:parity -- --source=firestore
```

- [ ] Exit **0** — Firestore matches `snapshots/catalog-2026-10-19.json` (148 products, categories, fields).
- [ ] After a deliberate console edit to one product name, parity exits **1** with a field mismatch.

`--check-images` applies to **file** source only (paths under `public/`).

## 8. Phase 3 — Preview runtime (`CATALOG_SOURCE=firestore`)

Production defaults to **`CATALOG_SOURCE=file`** (unchanged). On Vercel **Preview** only:

1. Set env: `CATALOG_SOURCE=firestore`, `FIREBASE_SERVICE_ACCOUNT_JSON` or `GOOGLE_APPLICATION_CREDENTIALS` (via Vercel secret), optional `FIREBASE_PROJECT_ID=junko-web-staging`.
2. Deploy preview; smoke test:
   - `/products` → **148** results
   - `/product/bcm-1`, `/product/80800rl`, weighing-scale SKUs, duplicate-name cases (e.g. NP-7A)
   - Images still `/products/...` under `public/`
   - `/sitemap.xml` → 148 product URLs
   - `redirects.json` behavior unchanged
3. Data gate: `npm run catalog:parity -- --source=firestore` (local, with creds).

**On-demand cache refresh (no admin UI yet):**

```http
POST /api/admin/revalidate
Authorization: Bearer <Firebase ID token with admin claim>
Content-Type: application/json

{ "slugs": ["bcm-1"] }
```

Sign in as admin in Firebase Auth, obtain ID token (client SDK or REST), then call the route. Rollback: set `CATALOG_SOURCE=file` on the environment.

## 9. Production cutover (Phase 4 — catalog data only)

**Goal:** Live visitors on **www.junko-fze.com** read **production Firestore** (same 148-product baseline as [`snapshots/catalog-2026-10-19.json`](../snapshots/catalog-2026-10-19.json)). **No admin UI, no Blob, no catalog write APIs** in this phase.

**This repo never sets production `CATALOG_SOURCE=firestore`.** You flip that manually in **Vercel → Production** only after parity passes.

### 9.1 Create production Firebase project

1. Firebase Console → **Add project** (e.g. `junko-web-prod` or `junko-fze-prod` — pick one id and keep it documented).
2. Enable **Authentication** → Email/Password (for future admin; same pattern as staging).
3. Create **Firestore** (production mode).
4. Deploy rules from this repo:

   ```bash
   firebase deploy --only firestore:rules --project YOUR_PRODUCTION_PROJECT_ID
   ```

   Same rules file as staging: [`firestore.rules`](../firestore.rules).

5. Create **production** service account JSON (Project settings → Service accounts). Store as e.g. `secrets/junko-web-prod-service-account.json` (gitignored). **Do not commit.**

### 9.2 Seed production Firestore (snapshot only)

Use a **dedicated** prod key — never reuse staging creds by mistake.

```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS = (Resolve-Path ".\secrets\junko-web-prod-service-account.json").Path
$env:CATALOG_SEED_CONFIRM = "yes"
$env:CATALOG_SEED_EXPECTED_PROJECT = "YOUR_PRODUCTION_PROJECT_ID"

npm run catalog:seed:production -- --expected-project-id=YOUR_PRODUCTION_PROJECT_ID
```

- `npm run catalog:seed` alone only allows **`junko-web-staging`** without extra flags.
- `catalog:seed:production` adds `--confirm-production`; both **`CATALOG_SEED_CONFIRM=yes`** and **`--expected-project-id`** (or `CATALOG_SEED_EXPECTED_PROJECT`) are required for non-staging projects.
- **Do not** hand-edit documents in the console during seed; re-run the command if you need a clean copy.

Console check: **148** docs in `products`, document `catalog/categories`.

### 9.3 Parity gate (production Firestore)

```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS = (Resolve-Path ".\secrets\junko-web-prod-service-account.json").Path
npm run catalog:parity -- --source=firestore
```

Must exit **0** before any production traffic cutover. Parity uses Admin SDK (same as the app); `project_id` comes from the service account JSON.

### 9.4 Vercel Production env (manual — after 9.2 + 9.3)

In **Vercel → Settings → Environment Variables → Production** only:

| Variable | Value |
|----------|--------|
| `CATALOG_SOURCE` | `firestore` |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Full production service account JSON (Sensitive) |
| `FIREBASE_PROJECT_ID` | Production project id (optional if embedded in JSON) |

**Do not** add these to the git repo. **Preview** can keep staging vars; **Production** uses prod JSON.

Redeploy **Production** (not just Preview). Build will call Firestore during static generation for product routes.

### 9.5 Production smoke checklist

After deploy:

- [ ] `https://www.junko-fze.com/products` → **148** results (same filters/SEO list as file era).
- [ ] Spot URLs: `/product/bcm-1`, `/product/80800rl`, weighing-scale products, duplicate-name cases (e.g. NP-7A).
- [ ] Product images still load from `/products/...` (paths unchanged; Blob is Phase 5).
- [ ] `/sitemap.xml` → **148** product URLs; canonicals `/product/{slug}`.
- [ ] Legacy URLs still redirect via [`scripts/redirects.json`](../scripts/redirects.json) / `next.config.ts`.
- [ ] `npm run catalog:parity` (file) still passes on CI — `products.ts` remains the snapshot source of truth in git.

### 9.6 Rollback (document and rehearse before cutover)

If the live catalog is wrong or Firestore is unavailable:

1. Vercel **Production** → set `CATALOG_SOURCE` to **`file`** (or remove the variable).
2. Remove or disable production `FIREBASE_SERVICE_ACCOUNT_JSON` on Production if you want builds to avoid Firestore entirely.
3. **Redeploy** the last known-good deployment or trigger a new production deploy from `main` / release branch.
4. Site serves [`src/data/products.ts`](../src/data/products.ts) again; no Firestore read at runtime.

Optional: keep a git tag on the commit used for the last file-only production deploy.

### Phase 4 acceptance (ops)

- [ ] Production Firestore seeded: 148 products + `catalog/categories`, rules deployed.
- [ ] `catalog:parity -- --source=firestore` with **prod** creds → exit 0.
- [ ] After Vercel Production env flip + deploy → live site matches file-era URLs and count.
- [ ] Rollback steps above agreed with team (no code change required to roll back).

## 10. Admin UI (Phase 6)

The catalog admin at `/admin` uses the **Firebase Web client SDK** for sign-in only. All catalog writes go through Next.js API routes (Admin SDK + `verifyAdminIdToken`).

### 10.1 Vercel env (Production + Preview)

Add the **Web app** config from Firebase Console → Project settings → Your apps (project **`junko-web-prod`** for Production; use staging project for Preview if you test admin against staging Firestore).

| Variable | Notes |
|----------|--------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Public |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | e.g. `junko-web-prod.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `junko-web-prod` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | |

Server vars unchanged: `FIREBASE_SERVICE_ACCOUNT_JSON`, `CATALOG_SOURCE=firestore`, optional `FIREBASE_PROJECT_ID`.

Local: copy the same `NEXT_PUBLIC_*` keys into `.env.local` (see [`.env.example`](../.env.example)).

### 10.2 First admin login

1. Ensure the user exists in Firebase **Authentication** (Email/Password) for the same project as `CATALOG_SOURCE`.
2. Set the custom claim: `node scripts/catalog-set-admin-claim.mjs <uid>` (see Phase 1 docs) — claim name **`admin: true`**.
3. Open `/admin/login`, sign in. Without the claim you see: “Not an admin — contact support”.
4. **Save & publish** on a product runs Firestore write + cache revalidation; the public site updates within ~30–60s without redeploy.

### 10.3 Manual revalidate (optional)

`POST /api/admin/revalidate` with `Authorization: Bearer <idToken>` still works for ops; body may include `slugs`, `categories`, and `subcategories` arrays to match publish-time cache invalidation. Product APIs revalidate automatically on publish.

### 10.4 Firestore composite indexes (product lookups)

Public product-by-slug and related-product queries need composite indexes on `products`. Deploy from the repo root after linking your Firebase project:

```bash
firebase deploy --only firestore:indexes --project YOUR_PROJECT_ID
```

Index definitions: [`firestore.indexes.json`](../firestore.indexes.json) (`published` + `slug`, `subcategory`, `category`). The console may also prompt with a one-click link on the first query failure.

## 11. Vercel Blob (Phase 5 — product images)

**Goal:** Admin uploads go to Blob; `image` in Firestore is a public `https://` URL. Legacy `/products/...` paths in Git keep working until bulk migrate is verified.

### 11.1 Create store and env

1. Vercel project → **Storage** → **Blob** → create a store (link to this app).
2. Copy **`BLOB_READ_WRITE_TOKEN`** into Vercel **Preview** and **Production** (server env only — never `NEXT_PUBLIC_*`).
3. Local admin upload tests: add the same token to `.env.local` (see [`.env.example`](../.env.example)).

`next.config.ts` allows `*.public.blob.vercel-storage.com` for `next/image`. If your store uses a different hostname, add it to `images.remotePatterns`.

### 11.2 Admin upload flow

1. Edit product → **Upload to Vercel Blob** (JPEG/PNG/WebP, max 5 MB) → sets the image field to the returned URL.
2. **Save & publish** → Firestore `image` + existing `revalidateCatalog()` (unchanged).
3. Path-based images (`/products/...`) remain valid during migration.

API: `POST /api/admin/upload` (Bearer admin id token, multipart field `file`, optional `slug` / `productId`).

### 11.3 Bulk migrate (optional)

From repo root with Firebase Admin creds and `BLOB_READ_WRITE_TOKEN`:

```bash
npm run blob:migrate:dry-run
npm run blob:migrate
```

Production Firebase: add `--confirm-production` and `--expected-project-id=YOUR_PROD_ID` (same guards as catalog seed). The script does **not** delete files under `public/products`.

After migrate, smoke-test product pages (paths + Blob URLs). `npm run catalog:parity` still compares catalog **data** from snapshot; image HTTP checks are separate (optional `--check-images` on parity if enabled).

## Related

- Snapshot tooling: [`snapshots/README.md`](../snapshots/README.md)
- Full roadmap: [`admin-migration-plan.md`](../admin-migration-plan.md)
