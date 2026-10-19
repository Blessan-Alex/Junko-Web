# Admin migration plan — Firebase + Vercel Blob

**Project:** Junko-Web (Next.js on Vercel)  
**Current catalog source:** `src/data/products.ts` (`allProducts` + `categories`)  
**Current images:** `public/products/...` via each product’s `image` path (~35 MB, ~150 files)  
**Success metric:** Public site shows **148 products** on `/products` with the same slugs, URLs, and content as today until the client edits via admin.

**End goal:** Client logs in with **Firebase Auth**, edits the full catalog (categories, products, titles, descriptions, images, specs, features) in `/admin`, with images in **Vercel Blob** and data in **Firestore**.

**Publish requirement (mandatory):** Client clicks **Save & publish** → live site updates within **~30 seconds** with **no developer deploy** (on-demand ISR revalidation, not a full Vercel rebuild on every save).

**Deferred until migration is proven:** SEO enhancements (beyond preserving current metadata/redirects/sitemap behavior).

---

## What we are implementing (conversation summary)

This plan exists to move from a **developer-edited** catalog (`products.ts` + `public/products`) to a **client-operated** catalog, without breaking the live Junko site.

### Three outcomes (all required)

| # | Outcome | Meaning |
|---|---------|--------|
| 1 | **Safe migration** | Staged steps, snapshot, parity checks, feature flag, rollback. Visitors see **no breakage** on cutover day. |
| 2 | **Same catalog on day one** | After cutover, `/products` shows **148 results**, same slugs, titles, descriptions, and working images as before (until the client edits). |
| 3 | **Self-service admin, live for visitors** | Client logs in, **adds / edits / deletes** catalog content (including images) via `/admin`. **Save & publish** updates the public site in **~30s**. **You do not** git-push, redeploy, or run scripts for normal content changes. |

### What the client can do in admin (v1 scope)

| Capability | Included |
|------------|----------|
| Log in (Firebase email/password) | Yes |
| Edit existing product: name, description, category, subcategory, specs, features, featured | Yes |
| Replace / upload product image (Vercel Blob) | Yes (after Blob phase; path-based images work before that) |
| **Add new product** | Yes — new slug, appears on `/products` + `/product/{slug}` after publish |
| Edit **category tree** (names / subcategories used by filters) | Yes — v1 minimum: edit labels/lists; structure changes need validation |
| Change home page heroes / marketing copy | **No** (out of scope v1) |
| Fix old URLs when slug changes | Warn in admin; `redirects.json` update — **later** (may need developer until redirect UI exists) |

### Who does what after migration is **done**

| Task | Client (admin) | Developer (you) |
|------|----------------|-----------------|
| Edit product text, image, category | Yes | No |
| Add new product | Yes | No |
| Publish to live site | Yes (Save & publish) | No |
| Change Next.js code, layout, new features | No | Yes |
| Firebase/Vercel env, security rules, first-time setup | No | Yes (one-time + rare) |
| Rollback to `products.ts` if disaster | No | Yes (emergency) |
| SEO cleanup / slug redirect tooling | No | Later (optional) |

### What “new visitors see changes” means

- After **Save & publish**, the **publish API** writes Firestore (+ Blob if applicable) and calls **`revalidateTag` / `revalidatePath`**.
- The **public** `/products` and `/product/...` pages (same design as today) show updated content within **~30 seconds** for new visitors and refreshers — **no** manual Vercel deploy.
- If revalidate fails, admin shows an error; data may be saved but the site stays on old cache until retry — still **no** developer unless the API is broken.

### Public site unchanged (intentional)

Visitors still use the same URLs, layout, product cards, detail pages, WhatsApp CTAs, and SEO behavior. Only the **data source** (Firestore + Blob URLs) and **admin** are new.

---

## Principles (do not skip)

1. **Single writer** — After cutover, either Firestore or `products.ts` drives the site, never both edited independently.
2. **Nothing changes on day one** — First production cutover must be parity: 148 results, same slugs, same copy, images load.
3. **Rollback always available** — Keep snapshot JSON + ability to redeploy last known-good Git commit that used `products.ts`.
4. **Production-safe order** — Infra and staging first; flip production only after parity checks pass.
5. **No destructive Firebase/Blob actions on prod** without backup and a rehearsed rollback.
6. **No developer in the content loop** — After go-live, catalog changes are **admin → publish API → revalidate** only; not git, not deploy hooks, not editing `products.ts` by hand.
7. **Visitors see published data** — `published: true` (default for seeded rows); admin Save & publish is the only path to change what the public site shows.

---

## Current system (baseline)

| Concern | Location |
|--------|----------|
| Product rows (148) | `src/data/products.ts` → `allProducts` |
| Category tree | `src/data/products.ts` → `categories` |
| Product images | `product.image` → `public/products/...` |
| Legacy URL redirects | `scripts/redirects.json` → `next.config.ts` |
| Pages using catalog | `src/app/products/*`, `src/app/product/[id]/page.tsx`, `src/app/sitemap.ts` |
| Marketing images | Home heroes, logo in `public/` (out of scope for phase 1 admin) |

---

## Target architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  /admin (protected)                                              │
│  Firebase Auth → edit Firestore → upload images → Vercel Blob   │
└────────────────────────────┬────────────────────────────────────┘
                             │
         ┌───────────────────┴───────────────────┐
         ▼                                       ▼
  Firestore                              Vercel Blob
  • catalog/meta (categories)            • product image files
  • products/{id}                        • public HTTPS URLs
         │                                       │
         └───────────────┬───────────────────────┘
                         ▼
              getCatalog() / getProduct() with cache tags + ISR
                         ▼
              Same Product / Category types → existing UI
```

**Phase 1 (data):** Firestore holds catalog; `image` may still be `/products/...` paths.  
**Phase 2 (images):** Migrate blobs to Vercel Blob; `image` becomes `https://...` URLs; update `next.config.ts` `images.remotePatterns`.

---

## Deploy vs publish (read this first)

| Term | Meaning | When to use |
|------|---------|-------------|
| **Deploy** | Vercel runs `next build` from **Git/code** and ships a new app version (often 1–3+ min). Triggered by git push, Redeploy, or deploy hook. | **Code** changes only (developers). |
| **Save & publish (admin)** | Write Firestore + Blob → **`revalidateTag` / `revalidatePath`** on the **already deployed** app. | **Every** client catalog edit. |

**Not best practice:** Trigger a full Vercel deploy on every admin Save (slow, wastes build minutes, rebuilds 148 pages for one text change).

**Best practice for this project:** Admin Save → API route → revalidate (~5–30s). **No** git push, **no** deploy hook for normal content updates.

---

## Save = live in ~30s (mandatory requirement)

Client requirement: **Save → live within ~30 seconds, no developer deploy.** Achievable on **Firebase Spark + Vercel Hobby + Blob** with **on-demand revalidation (ISR)**, not rebuild-the-whole-site on every save.

### What that means

| Step | Who | Time |
|------|-----|------|
| Save in admin | Client | ~1–5s (Firestore + image upload) |
| Update CDN pages | Automatic (your API) | ~5–30s after Save |
| Developer deploy | **Not required** | — |

Save must call **your** backend (Next.js Route Handler on Vercel), not write Firestore from the browser alone without a publish/revalidate step.

### Publish architecture

```text
Admin UI (browser)
  │ Firebase Auth (login)
  │ on Save: ID token + form + image file
  ▼
POST /api/admin/products/[id]   (or /api/admin/publish)
  │ 1. Verify Firebase ID token + admin claim
  │ 2. Upload image → Vercel Blob (if new file)
  │ 3. Write product doc → Firestore
  │ 4. revalidateTag(...) / revalidatePath(...)  ← makes site fresh
  ▼
Visitor requests /products or /product/foo
  │ Next serves regenerated HTML from cache (ISR)
  ▼
Same UI as today; new text/image visible
```

**Firebase** = login + database. **Blob** = image bytes. **Vercel** = API + page regeneration (no manual deploy for content).

### Critical: do not rely on build-time-only catalog

Today the site uses static `products.ts` + `generateStaticParams` at **build**. If cutover is only “fetch Firestore at `next build`”, **Save still needs a full deploy** unless rendering changes.

For **~30s updates without a developer**, you need:

1. **Server reads Firestore when a page is generated/refreshed** (not only at build).
2. **On-demand revalidation** after every successful Save.

### How to implement revalidation (Next.js App Router)

**1. Tagged data fetching (catalog)**

In server code for `/products` and `/product/[slug]`:

- Fetch from Firestore (Admin SDK in server components or `getCatalog()`).
- Attach cache tags, e.g. `catalog`, `product:${slug}` (via `unstable_cache` or `fetch` with `next: { tags: [...] }`).

**2. After Save in API route**

```ts
import { revalidateTag, revalidatePath } from 'next/cache';

// After Firestore write succeeds:
revalidateTag('catalog');           // refreshes /products list
revalidateTag(`product:${slug}`);   // refreshes that product page
revalidatePath('/sitemap.xml');     // optional, keep SEO URLs in sync
```

For a **new** product, also `revalidatePath(`/product/${slug}`)` so the new URL exists without a full build.

**3. Product routes must allow new slugs**

- Keep `dynamicParams = true` (default) on `/product/[id]`.
- Page loads product **by slug from Firestore**; if missing → `notFound()`.
- First visit or revalidate after Save generates the page within seconds.

**4. Admin flow (one button)**

**“Save & publish”** (single action):

1. Validate auth.  
2. Blob upload if needed.  
3. Firestore `set`/`update`.  
4. `revalidateTag` / `revalidatePath` as above.  
5. Return `{ ok: true }` — admin UI: “Live on site within a minute.”

No Vercel dashboard, no git push.

### What the client experiences

| Action | Admin | Live site (~30s) |
|--------|--------|------------------|
| Edit description → Save | Saved | Updated on `/product/...` and `/products` |
| Replace image → Save | New preview | New image on same pages |
| New product → Save | In list | New card + `/product/new-slug` |

If revalidate fails, data is in Firestore but the site looks old — admin must show an error and allow retry (still no developer unless the API is broken).

### Free tier transparency (“no paid services” goal)

**Usually enough for Junko (148 products, B2B traffic):**

| Service | Free tier | Your use |
|---------|-----------|----------|
| **Firebase Auth** | Spark | Few admin users |
| **Firestore** | Spark quotas | 148 docs; reads mostly on **revalidate**, not every visitor hit if cached |
| **Vercel Hobby** | Limits apply | Next app + API routes + **on-demand ISR** |
| **Vercel Blob** | Hobby allowance | ~35 MB catalog — see [Blob pricing](https://vercel.com/docs/storage/vercel-blob/pricing) |

**Risks that can force paid later:** Firestore read spikes (mitigate with ISR cache tags), Hobby bandwidth/commercial limits, Blob over quota, Firebase Blaze only if Spark limits exceeded — **use Vercel API routes, not Cloud Functions**, to stay on Spark.

**Not using Firebase Storage** for product images; Blob is on Vercel.

Set billing alerts on Firebase and Vercel; monitor dashboards.

### Publish implementation checklist (mandatory)

| # | Task | Purpose |
|---|------|--------|
| 1 | `getCatalog()` / `getProduct(slug)` from Firestore with **cache tags** | ISR |
| 2 | Product + products pages use those helpers (not static `import products.ts` after cutover) | Data path |
| 3 | `POST /api/admin/...` with **Firebase Admin token verify** + admin claim | Security |
| 4 | Blob upload in same API (or dedicated upload route) | Images |
| 5 | **`revalidateTag` / `revalidatePath` after every successful publish** | ~30s live |
| 6 | Admin: single **Save & publish**; show success/error | No developer |
| 7 | `CATALOG_SOURCE=firestore` + rollback to file | Safe migration |
| 8 | **Do not** use deploy hook as primary publish path | Too slow |

**Optional later:** `revalidate: 3600` as backup if on-demand revalidate fails once.

**Not needed for 30s:** Full site redeploy on every Save.

### Publish summary

| Question | Answer |
|----------|--------|
| Save → live ~30s without developer? | **Yes** — Firestore + Blob + API + `revalidateTag`/`revalidatePath`. |
| Automatic after Save? | **Yes**, if Save always hits publish API and API always revalidates. |
| Paid required? | **Not necessarily** at current size; stay within Spark + Hobby + Blob quotas. |
| Biggest mistake? | Firestore at build only, or Save without revalidation → still needs deploy. |

**Treat “Save & publish + revalidate” as mandatory, not a later phase.**

---
## Environment variables

### Local (`.env.local` — never commit)

| Variable | Purpose | Where used |
|----------|---------|------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Client Firebase | Admin UI, optional client SDK |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Auth | Admin |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Project | Admin + server |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | App id | Admin |
| `FIREBASE_SERVICE_ACCOUNT_JSON` or `GOOGLE_APPLICATION_CREDENTIALS` | Admin SDK | Build-time fetch, seed scripts, API routes |
| `BLOB_READ_WRITE_TOKEN` | Blob upload/read | Server API routes only |
| `CATALOG_SOURCE` | `file` \| `firestore` | Feature flag during migration (recommended) |

### Vercel (Production + Preview)

- Mirror the same vars in **Vercel → Project → Settings → Environment Variables**.
- **Preview** can point to a **separate Firebase project** (recommended) so experiments never touch prod Firestore.
- `BLOB_READ_WRITE_TOKEN`: use Vercel-linked Blob store; scope to project.
- Do **not** add Firebase/Blob vars to production until **Preview parity** passes.

**Caution:** Wrong `CATALOG_SOURCE=firestore` on production before seed + parity = broken or empty catalog. Use feature flag default `file` until explicit cutover.

---

## Phase 0 — Snapshot & backup (mandatory)

**Goal:** Immutable baseline of today’s live catalog.

| Step | Action | Output |
|------|--------|--------|
| 0.1 | Export `categories` + `allProducts` from `products.ts` to JSON | `snapshots/catalog-YYYY-MM-DD.json` (commit or secure backup) |
| 0.2 | Record checksums | Product count **148**, unique slugs **148**, unique ids **148** |
| 0.3 | List all `image` paths; verify files exist under `public/` | `snapshots/image-manifest-YYYY-MM-DD.json` |
| 0.4 | Tag Git commit / note Vercel deployment ID | Rollback reference |

**Implemented:** `npm run catalog:snapshot`, `npm run catalog:parity` (see `snapshots/README.md`).

**Rollback:** Redeploy tagged commit; set `CATALOG_SOURCE=file`; site uses `products.ts` again.

---

## Phase 1 — Firebase setup (no public site change)

**Goal:** Firestore + Auth exist; data seeded; site still reads `products.ts`.

| Step | Action | Risk if skipped |
|------|--------|-----------------|
| 1.1 | Create Firebase project (use **staging** project first) | Prod data corruption |
| 1.2 | Enable **Authentication** → Email/Password (and optionally Google later) | No admin login |
| 1.3 | Create Firestore (production mode); define rules (see below) | Open writes / lockout |
| 1.4 | Create admin user(s); set **custom claim** `admin: true` or allowlist doc `admins/{uid}` | Unauthorized edits |
| 1.5 | **Seed** Firestore from snapshot JSON | Empty/wrong catalog |
| 1.6 | Store `categories` as doc `catalog/categories` or collection `categories` | Broken filters |

**Implemented (Phase 1 tooling):** `npm run catalog:seed`, `firestore.rules`, `docs/firebase-setup.md`, `scripts/catalog-set-admin-claim.mjs`. Public site still uses `products.ts` only.

### Firestore shape (recommended)

**Collection `products`** — document ID = stable `id` from snapshot (not slug; slugs can get `-1` suffixes).

```ts
// Mirrors src/data/products.ts Product
{
  id: string;
  slug: string;
  name: string;
  category: string;
  subcategory?: string;
  description?: string;
  image: string;              // phase 1: "/products/..." ; phase 2: Blob URL
  specs?: Record<string, string>;
  features?: string[];
  featured?: boolean;
  published?: boolean;        // default true for seeded rows
  updatedAt: Timestamp;
}
```

**Document `catalog/categories`** (or single doc):

```ts
{ categories: Category[] }  // same as products.ts today
```

**Optional later:** `catalog/settings` (home heroes, SEO defaults) — not required for migration.

### Firestore security rules (starter)

- **Read:** `products` where `published == true` (and `categories` doc) → allow public read for build/ISR.
- **Write:** `products`, `catalog/*` → only if `request.auth.token.admin == true` (or uid in `admins`).

Test rules in Firebase console before connecting production.

---

## Phase 2 — Parity check (mandatory before cutover)

**Goal:** Prove Firestore matches snapshot.

| Check | Expected |
|-------|----------|
| Product count | **148** |
| Unique `slug` | **148** |
| Unique `id` | **148** |
| Each `slug` | Matches snapshot |
| Each `name`, `category`, `subcategory`, `description` | Matches snapshot (normalize whitespace if needed) |
| Each `image` | Same string as snapshot |
| `categories` | Deep-equal to snapshot |

**Command:** `npm run catalog:parity -- --source firestore` (to implement) comparing snapshot JSON vs Firestore export.

**Fail = do not cut over.**

---

## Phase 3 — Wire site (feature-flagged) + ISR

**Goal:** Code reads Firestore with **cache tags**; default remains `products.ts` until cutover; **publish path uses revalidation** (see “Save = live in ~30s”).

| Step | Action |
|------|--------|
| 3.1 | Add `src/lib/catalog/getCatalog.ts` + `getProduct(slug)` with `unstable_cache` / tags `catalog`, `product:{slug}` |
| 3.2 | If `CATALOG_SOURCE=file` → import from `@/data/products` |
| 3.3 | If `CATALOG_SOURCE=firestore` → Firebase Admin SDK fetch published products + categories |
| 3.4 | Replace direct imports in: `product/[id]/page.tsx`, `products/page.tsx`, `ProductsClient` (pass props from server), `sitemap.ts` |
| 3.5 | Keep `src/data/products.ts` in repo as fallback + snapshot source until phase 7 |
| 3.6 | Product pages: fetch by slug from Firestore; `dynamicParams` true for new products after admin add |
| 3.7 | Implement `POST /api/admin/products/...` with auth + **revalidateTag** after write (can ship behind flag before admin UI) |

**Do not** use build-time-only Firestore fetch as the long-term publish model — it forces a full **deploy** for every content change.

**Caution:** At cutover, `/products` must show **148** results; `generateStaticParams` may prewarm known slugs but new slugs rely on dynamic ISR + revalidate.

### Preview validation

1. Vercel **Preview** deploy with `CATALOG_SOURCE=firestore` + staging Firebase.  
2. `/products` → **Showing 148 results**.  
3. Spot-check 10 URLs: `/product/bcm-1`, `/product/80800rl`, weighing scales, duplicate names (NP-7A).  
4. Images load (still `/products/...` paths).  
5. `sitemap.xml` has 148 product URLs.  
6. Old URLs still redirect via `redirects.json` (unchanged).

---

## Phase 4 — Production cutover (catalog data only)

| Step | Action | Caution |
|------|--------|---------|
| 4.1 | Seed **production** Firestore from same snapshot (or promote staging export) | Do not hand-edit during copy |
| 4.2 | Run parity on **production** Firestore | Must pass |
| 4.3 | Set production `CATALOG_SOURCE=firestore` | Only after 4.2 |
| 4.4 | Deploy; smoke test live site | Compare to snapshot |
| 4.5 | Monitor 24h; keep rollback tag ready | |

**Rollback:** `CATALOG_SOURCE=file` + redeploy previous commit.

---

## Phase 5 — Vercel Blob (images)

**Goal:** New uploads go to Blob; existing site keeps working during migration.

| Step | Action |
|------|--------|
| 5.1 | Create Blob store in Vercel; add `BLOB_READ_WRITE_TOKEN` to env |
| 5.2 | Add Blob host to `next.config.ts` `images.remotePatterns` |
| 5.3 | API route `POST /api/admin/upload` (auth required) → `put()` → return URL |
| 5.4 | **Bulk migrate** (optional script): for each product, read `public/{image}`, upload to `products/{slug}/main.{ext}`, write URL to Firestore |
| 5.5 | Parity check: 148 products, each `image` loads (200 OK) |
| 5.6 | Keep `public/products` in Git until verified; then archive (do not delete until client confirms) |

**Stay under ~1 GB:** Catalog ~35 MB today; use WebP on upload; reject files > e.g. 5 MB in admin.

**Phase 5 can ship after phase 4 is stable.** Until then, admin can edit text while images remain path-based.

---

## Phase 6 — Admin UI

**Goal:** Client can **add, edit, and remove** anything in the **product catalog** without contacting a developer; every save goes through **Save & publish** → live site ~30s.

### Route

- `/admin` — layout with auth gate  
- `/admin/login` — Firebase email/password  
- `/admin/products` — list (search, filter by category); **148** rows after seed  
- `/admin/products/new` — create product (generate `id`, set `slug`, all fields)  
- `/admin/products/[id]` — edit form + image upload  
- `/admin/categories` — edit category names and subcategory lists (validate against products using those values)

### Admin actions → public site (must all work without developer)

| Admin action | Firestore | Blob | Revalidate |
|--------------|-----------|------|------------|
| Edit description / name / specs | Update doc | — | `catalog` + `product:{slug}` |
| Upload new image | Update `image` URL | `put()` | same tags |
| Add product | New doc | optional image | `catalog` + `product:{newSlug}` + sitemap optional |
| Unpublish / hide product | `published: false` | — | `catalog` (product drops from list) |
| Edit categories | `catalog/categories` | — | `catalog` |

### Mandatory fields (admin + validation)

| Field | Mandatory | Notes |
|-------|-----------|--------|
| `id` | Yes | Immutable after create; used as Firestore doc id |
| `slug` | Yes | Unique; warn before change (breaks URLs; update redirects) |
| `name` | Yes | Display title |
| `category` | Yes | Must exist in `categories` |
| `subcategory` | Recommended | Should match category’s subcategory list |
| `description` | Recommended | Allow empty but show warning |
| `image` | Yes | Path or Blob URL |
| `specs` | Optional | Key/value map |
| `features` | Optional | String array |
| `featured` | Optional | Boolean |
| `published` | Yes | Default true |

### Optional (post-migration)

- Draft vs publish workflow  
- Redirect editor when slug changes  
- Home page / hero CMS  
- SEO fields per product (meta title, OG) — **defer** per project decision  
- Audit log (`updatedBy`, `updatedAt`)

### Auth

- Firebase **Email/Password** for client (mandatory).  
- Only users with `admin` claim (or `admins` doc) can call write APIs and open `/admin`.

### Publish model (v1 — fixed)

| Model | Use for Junko? |
|-------|----------------|
| **Save → on-demand revalidate** | **Yes — mandatory** (~30s live, no developer) |
| **Save → full Vercel deploy** (deploy hook) | **No** — emergency/code only, not content |

Admin UI: one button **“Save & publish”** → API → Firestore/Blob → `revalidateTag` / `revalidatePath`. Message: “Changes go live within about a minute.”

---

## Phase 7 — Deprecate `products.ts` as source of truth

Only after:

- [ ] Production on Firestore ≥ 2 weeks stable  
- [ ] Client trained on admin  
- [ ] Snapshot + parity scripts green  

Then:

- Stop editing `products.ts` manually.  
- Optional: CI generates `products.ts` from Firestore export for emergency fallback only.

---

## What must NOT change during migration (checklist)

- [ ] **148** products on `/products` (no filters)  
- [ ] All **148** slugs reachable at `/product/{slug}`  
- [ ] `scripts/redirects.json` unchanged until slug-change workflow exists  
- [ ] `middleware.ts` www redirect unchanged  
- [ ] Public page components / layout / WhatsApp CTAs unchanged  
- [ ] `metadata` / JSON-LD generation logic preserved (data source only changes)

---

## SEO (explicitly later)

Do **not** block migration on these; schedule after phase 4 success:

- Clean `name` fields (remove markdown junk)  
- Alt text strategy  
- Image filename conventions  
- Per-product meta description tuning  
- `lastmod` in sitemap from `updatedAt`

Current behavior (canonical, OG, Product schema, sitemap, redirects) must **keep working** with Firestore-fed data.

---

## Implementation order (summary)

| Order | Phase | Public site risk |
|-------|--------|------------------|
| 1 | 0 Snapshot | None |
| 2 | 1 Firebase + seed (staging) | None |
| 3 | 2 Parity script | None |
| 4 | 3 Wire `getCatalog` + ISR + publish API (staging) | Low (Preview only) |
| 5 | 6 Admin UI on staging (full Save & publish test) | None on prod until cutover |
| 6 | 4 Production cutover (`CATALOG_SOURCE=firestore`) | **High** — parity + rollback |
| 7 | 6 Admin on production (client login) | Low — same publish path as staging |
| 8 | 5 Blob migration (bulk then admin uploads) | Medium — Preview first |
| 9 | 7 Deprecate manual `products.ts` | Low if snapshot remains |

**Go-live definition:** Phases **4 + 6 + publish API** complete → client can edit catalog on production without developer; visitors see changes after Save & publish.

---

## Migration complete — acceptance checklist (“done”)

Use this to confirm the project matches the original intent (safe migration + self-service admin).

### A. Safe migration (cutover day)

- [ ] Snapshot archived; **148** products, **148** unique slugs in snapshot  
- [ ] Production Firestore seeded; parity script **pass**  
- [ ] `/products` → **Showing 148 results** (no filters)  
- [ ] Spot-check 10+ product URLs; images load  
- [ ] `CATALOG_SOURCE=firestore`; rollback steps documented and tested on Preview  
- [ ] Public layout / WhatsApp / redirects unchanged  

### B. All current products preserved

- [ ] Every snapshot slug returns 200 on `/product/{slug}`  
- [ ] Category filters match pre-migration behavior  
- [ ] No accidental duplicate or missing rows vs snapshot  

### C. Admin self-service (no developer for content)

- [ ] Client can log in to `/admin` (Firebase Auth)  
- [ ] Client can **edit** a product → Save & publish → visible on live site within ~30s **without** you deploying  
- [ ] Client can **add** a product → appears on `/products` and own detail page within ~30s  
- [ ] Client can **upload/change** image (Blob after phase 5; or path field before)  
- [ ] Client can **edit categories** used on `/products` filters  
- [ ] Failed publish shows clear error + retry; no silent “saved but not live”  

### D. Ongoing operations

- [ ] You are **not** in the loop for daily catalog edits  
- [ ] You **only** deploy when **code** changes (features, bugfixes)  
- [ ] Billing/alerts set on Firebase + Vercel (stay within free tiers where possible)  

---
## Rollback playbook

1. Vercel → redeploy previous **Production** deployment.  
2. Set `CATALOG_SOURCE=file` (or remove var so default is file).  
3. Confirm `/products` shows **148** from `products.ts`.  
4. Firestore/Blob changes are orphaned but harmless if site reads file again.

---

## Next engineering tasks (repo)

1. Add `snapshots/` + `catalog:snapshot` export script.  
2. Add `catalog:seed` (Admin SDK → Firestore).  
3. Add `catalog:parity` (snapshot vs file or vs Firestore).  
4. Add `getCatalog()` / `getProduct(slug)` + **cache tags** + `CATALOG_SOURCE` flag.  
5. Refactor product pages to use server-provided catalog (ISR-ready).  
6. **`POST /api/admin/...`** — auth verify + Firestore write + **`revalidateTag`** (publish API).  
7. Admin routes: **Save & publish** wired to publish API.  
8. Blob upload in publish API (or dedicated route).  
9. Firebase + Vercel env documentation in README (not secrets).  
10. Bulk image migration script (phase 5).

---

## Sign-off before production cutover

- [ ] Snapshot committed/archived  
- [ ] Parity report: **148 / 148** slugs match  
- [ ] Preview URL reviewed by stakeholder  
- [ ] Rollback deployment ID recorded  
- [ ] Production env vars verified  
- [ ] `CATALOG_SOURCE=firestore` enabled only on intentional deploy  
- [ ] **Staging:** client (or you) performed test Save & publish — change visible on Preview without git deploy  

## Sign-off before handing admin to client (“project done”)

- [ ] All items in **Migration complete — acceptance checklist** sections A–D  
- [ ] Client trained: login, edit, add product, upload image, Save & publish  
- [ ] Written note: content changes do **not** require developer; code/deploy only for site features  

---

*Document version: 1.2 — product vision, acceptance checklist, admin add/edit matrix, no-developer content loop, go-live definition. 148 products in `src/data/products.ts`. Stack: Firebase (Auth + Firestore) + Vercel Blob + on-demand ISR.*
