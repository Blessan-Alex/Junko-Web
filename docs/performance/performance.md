
Copy-paste each phase below as an isolated prompt into your coding agent. Each phase is scoped with strict file boundaries, step-by-step logic rules, and a build check so smaller models do not hallucinate or break unrelated code.

---

## Phase 1: Consolidate Catalog Reads & In-Memory Derivation

**Objective:** Eliminate redundant Firestore queries and extra `unstable_cache` reads on Product Detail Pages (PDPs) and the Sitemap by deriving all data in-memory from the single `getCatalog()` call.

**Files in Scope:**

* `src/lib/catalog/get-catalog.ts`
* `src/app/product/[id]/page.tsx`
* `src/app/sitemap.ts`

**Strict Guardrails for the Agent:**

* Do NOT modify any UI components, JSX layout, styling, or admin files in this phase.
* Do NOT delete helper functions from `src/lib/catalog/` yet if other files import them; only stop calling them in the target files below.
* Do NOT change the return shape or TypeScript interfaces of the page props or metadata.

**Step-by-Step Instructions:**

1. **Update Cache Configuration (`src/lib/catalog/get-catalog.ts`):**
* Locate `CACHE_REVALIDATE_SECONDS` and change its value from `3600` (1 hour) to `604800` (7 days).
* Locate the `unstable_cache` wrapper inside `getCatalog()` and ensure its options object includes `tags: ["catalog"]` alongside `revalidate: CACHE_REVALIDATE_SECONDS`.


2. **Refactor Product Detail Page (`src/app/product/[id]/page.tsx`):**
* Inspect **both** `generateMetadata` and the default page component export.
* Remove all calls to `getProductBySlug` and `getRelatedProducts`.
* Instead, call `getCatalog()` once to retrieve `allProducts` and `categories` (Next.js automatically deduplicates this call between `generateMetadata` and the page component when backed by the same cache).
* Find the current product in-memory by searching `allProducts` for an item where `slug` matches `id` OR `id` matches `id`. If not found, trigger `notFound()` exactly as before.
* Derive `relatedProducts` in-memory from `allProducts`:
* Filter out the current product (`p.id !== product.id`).
* First, match products that share the same non-empty `subcategory` as the current product.
* If fewer than the required number of related products (check what limit `getRelatedProducts` previously used, e.g., 4 or 6) are found, fill the remaining slots with products from the same `category` that are not already in the list.
* Slice the final array to the exact limit expected by the UI.




3. **Refactor Sitemap (`src/app/sitemap.ts`):**
* Inspect `sitemap()` and check if `getSitemapEntries()` runs a separate Firestore query or separate cache call.
* Replace any separate Firestore/cache call with the data already returned by `getCatalog()` (`allProducts` and `categories`), mapping `allProducts` into the exact same sitemap URL entry format (slug, lastModified, changeFrequency, priority) that `getSitemapEntries()` produced.



**Verification Step:**

* Run TypeScript type checking (`npx tsc --noEmit`) and ensure zero type errors in `src/app/product/[id]/page.tsx` and `src/app/sitemap.ts`.

---

## Phase 2: Pre-Render Static HTML & Wire Admin On-Demand Revalidation

**Objective:** Pre-generate all product and category pages as static HTML at build/revalidation time and purge the cache only when an admin creates, updates, publishes, or deletes catalog data.

**Files in Scope:**

* `src/app/product/[id]/page.tsx`
* `src/app/products/[categorySlug]/page.tsx`
* `src/app/sitemap.ts`
* All route handlers inside `src/app/api/admin/products/**` and `src/app/api/admin/categories/**` (plus any admin publish route if separate)

**Strict Guardrails for the Agent:**

* Do NOT modify any GET handlers in the admin API routes.
* Do NOT modify Firestore write logic or authentication checks in the admin API routes—only add cache revalidation calls immediately after a successful mutation.

**Step-by-Step Instructions:**

1. **Add Static Params to Product Pages (`src/app/product/[id]/page.tsx`):**
* Export an async function named `generateStaticParams`.
* Inside it, call `getCatalog()`, take `allProducts`, and return an array of objects mapping each product to `{ id: product.slug || product.id }`.


2. **Add Static Params to Category Pages (`src/app/products/[categorySlug]/page.tsx`):**
* Verify if `generateStaticParams` already exists. If not, export an async function named `generateStaticParams` that calls `getCatalog()`, takes `categories`, and returns an array of objects mapping each category to `{ categorySlug: category.slug }`.


3. **Make Sitemap Static by Default (`src/app/sitemap.ts`):**
* Add a route segment config export `revalidate = 604800` (7 days) at the top of `src/app/sitemap.ts` so crawler hits serve cached XML from the CDN rather than invoking Node on every bot request.


4. **Add On-Demand Revalidation to Admin Mutations (`src/app/api/admin/**`):**
* Search `src/app/api/admin/` for all `route.ts` files handling catalog mutations (`POST`, `PUT`, `PATCH`, `DELETE`).
* Import `revalidateTag` and `revalidatePath` from `next/cache`.
* In every mutation handler, immediately after the Firestore write or projection rebuild succeeds (and before returning the `NextResponse`), call:
* `revalidateTag("catalog")` (check Next.js version in `package.json` to ensure the call signature matches the installed Next.js types).
* `revalidatePath("/", "layout")` to purge the Full Route Cache across static product, category, and sitemap routes.





**Verification Step:**

* Run `npx tsc --noEmit` to verify that all `revalidateTag` and `revalidatePath` imports and signatures match the project's installed Next.js version.

---

## Phase 3: Convert Listing Pages from Dynamic SSR to Static HTML

**Objective:** Remove server-side `searchParams` usage from `/products` and `/products/[categorySlug]` so Next.js stops running dynamic server functions on every listing page visit and `?page=N` bot crawl.

**Files in Scope:**

* `src/app/products/page.tsx`
* `src/app/products/[categorySlug]/page.tsx`
* `src/app/products/ProductsListingView.tsx` (if it accepts a server-passed `page` prop)
* `src/app/products/ProductsClient.tsx`

**Strict Guardrails for the Agent:**

* Do NOT remove the `<nav className="sr-only" aria-label="Complete product catalog">` block in `ProductsListingView.tsx`—that hidden list ensures search engines still discover all 148 product links from the static page.
* Do NOT break client-side pagination or category filtering behavior in `ProductsClient.tsx`.
* MUST wrap any Client Component that calls `useSearchParams()` inside a React `<Suspense>` boundary, otherwise `next build` will fail with a missing Suspense boundary error on static pages.

**Step-by-Step Instructions:**

1. **Inspect Current Pagination Flow:**
* Check how `page` from `searchParams` is currently used in `src/app/products/page.tsx` and `src/app/products/[categorySlug]/page.tsx` (both inside `generateMetadata` and inside the default page component).
* Check how `ProductsListingView.tsx` and `ProductsClient.tsx` receive and use the current page number.


2. **Remove `searchParams` from Server Components (`src/app/products/page.tsx` and `src/app/products/[categorySlug]/page.tsx`):**
* Remove `searchParams` from the props of `generateMetadata` and the default page component in both files.
* For `generateMetadata`, always generate the canonical base metadata for `/products` and `/products/[categorySlug]` (page 1 defaults) without reading query parameters on the server.
* Pass the default initial page (`1`) or let the client component determine the active page on mount.


3. **Handle `?page=` Purely on the Client (`src/app/products/ProductsClient.tsx`):**
* Ensure `ProductsClient.tsx` reads the `page` query parameter directly via `useSearchParams()` from `next/navigation` (defaulting to page `1` if absent or invalid) and slices the `allProducts` / filtered products array on the client for visual rendering.
* In `ProductsListingView.tsx` (or the parent server page), wrap `<ProductsClient .../>` in a `<Suspense>` boundary with a clean fallback so static generation succeeds at build time.



**Verification Step:**

* Run `npx tsc --noEmit` to verify no prop mismatches exist between `page.tsx`, `ProductsListingView.tsx`, and `ProductsClient.tsx`.

---

## Phase 4: Lock Down `next/image` Transformations & Run Full Build Audit

**Objective:** Drastically reduce Image Optimization transformations and cache writes in `next.config.ts`, optimize the hero slideshow if needed, and verify via `npm run build` that all catalog routes are now static.

**Files in Scope:**

* `next.config.ts`
* `src/components/HeroSlideshow.tsx` (verify only, minimal change if needed)

**Strict Guardrails for the Agent:**

* Do NOT remove existing `remotePatterns` or `serverExternalPackages` in `next.config.ts`.
* Do NOT break the visual appearance or transitions of `HeroSlideshow.tsx`.

**Step-by-Step Instructions:**

1. **Constrain Image Optimization Settings (`next.config.ts`):**
* Inside the `images` configuration object in `next.config.ts` (preserving existing `remotePatterns`), set:
* `minimumCacheTTL` to `2678400` (31 days in seconds).
* `deviceSizes` to `[640, 1080, 1920]` (replaces the 8 default widths with 3 standard breakpoints).
* `imageSizes` to `[256, 384]` (replaces the 8 default thumbnail widths with 2 card thumbnail sizes).
* `formats` to `["image/webp"]` (prevents generating both AVIF and WebP variants for every image).




2. **Check Hero Slideshow Image Loading (`src/components/HeroSlideshow.tsx`):**
* Locate where the 5 hero `<Image>` components are rendered.
* Ensure ONLY the first slide (`index === 0`) has `priority` (or `loading="eager"`).
* Ensure slides 2 through 5 do NOT have `priority` set, so visitors who bounce or navigate quickly do not force immediate image transformations for all 5 slides simultaneously.


3. **Run Production Build & Verify Route Output:**
* Run `npm run build` in the terminal.
* Inspect the Next.js route output table at the end of the build log and confirm:
* `/products` is marked as Static (`○`).
* `/products/[categorySlug]` is marked as SSG (`●`).
* `/product/[id]` is marked as SSG (`●`).
* `/sitemap.xml` is marked as Static (`○`).
* Zero routes in the public catalog are marked as Dynamic (`ƒ`).


The previous audit accurately identifies which files are running, but it misses **one critical Next.js App Router mechanism** that explains why your metrics look the way they do—and why fixing this is much simpler than giving up your Firestore admin workflow.

## 1. Independent Judgment: What Is *Actually* Happening

A 148-product catalog is tiny (roughly 100–200 KB of JSON total). Treating a 148-item catalog like a million-SKU database that runs server functions and multiple database queries per page view is the core architectural mismatch.

| What the Metrics Show | What the Previous Audit Said | What Is Actually Happening Under the Hood |
| --- | --- | --- |
| **173K Invocations ≈ 177K ISR Reads** | "Pages are served through ISR/data cache, not static export." | **You are caching data (`unstable_cache`), not HTML pages.** When a page renders dynamically and calls `unstable_cache`, Vercel boots a Node function (**1 Function Invocation**) and fetches the JSON from the Data Cache (**1–3 ISR Reads**). You are paying for both a function execution *and* an ISR read on nearly every hit. |
| **415 hits on `/product/[id]` = 57s CPU (75% of load)** | "Each request triggers up to 3 cached Firestore loaders." | Even worse: `/product/[id]` already loads **all 148 products** via `getCatalog()`, yet still makes separate Firestore/cache calls for `getProductBySlug()` and `getRelatedProducts()`. You are doing 3x the cache/database work to fetch data you already hold in memory on the exact same line of code. |
| **Hourly Cache Expiry (`3600s`)** | "Raise `CACHE_REVALIDATE_SECONDS` to 86400." | **Time-based polling is the wrong model when you have an Admin panel.** Because your cache expires every hour across ~150 product slugs, crawlers constantly hit expired cache keys and wake up `firebase-admin`—even when you haven't edited a single product in days. |
| **3K / 5K Image Transformations** | "Serving product thumbs with `next/image` + Blob URLs." | By default, Next.js allows **16 responsive size buckets** per image (`deviceSizes` + `imageSizes`). 148 products × a few responsive breakpoints from different bots/devices easily burns 3,000 transformations. |

---

## 2. The 80/20 Fix Plan (4 Changes to Cut 90% of Usage)

You do **not** need to abandon Firestore (`CATALOG_SOURCE=file`) or re-architect your admin panel. Implementing these four high-leverage changes will eliminate ~90% of your Fluid CPU, Function Invocations, and Image Transformations while keeping your live admin workflow intact.

### Fix 1: Derive PDP Data In-Memory from One `getCatalog()` Call (Kills 66% of PDP Work)

On `/product/[id]/page.tsx`, you are already calling `getCatalog()`, which returns all 148 products. Calling `getProductBySlug(id)` and `getRelatedProducts(product)` via separate Firestore queries and separate `unstable_cache` wrappers is completely redundant for a 148-item array.

* **Action:** Delete the separate Firestore queries on `/product/[id]`. Filter the 148 items in memory (takes less than 0.05ms in V8) from the single `getCatalog()` call.
* **Why it's 80/20:** One cache key (`getCatalog`) warms the entire site—every product page, every category page, and the sitemap share the exact same single cached object.

```tsx
// src/app/product/[id]/page.tsx
export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  
  // 1. Single shared cache read for the entire 148-item catalog
  const { allProducts } = await getCatalog();

  // 2. Find product in memory (0 Firestore reads, 0 extra ISR reads)
  const product = allProducts.find((p) => p.slug === id || p.id === id);
  if (!product) notFound();

  // 3. Compute related products in memory from allProducts
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (
      (product.subcategory && p.subcategory === product.subcategory) ||
      p.category === product.category
    ))
    .slice(0, 4);

```

---

### Fix 2: Pre-Render Static HTML + Revalidate Only on Admin Publish (Kills ~80% of Invocations)

Instead of expiring caches every 3,600 seconds and running Node functions to assemble pages on demand, pre-build your HTML pages into Vercel's CDN Full Route Cache and only purge them when you actually use `/api/admin/*`.

* **Action 1:** Add `generateStaticParams` to `/product/[id]/page.tsx` and `/products/[categorySlug]/page.tsx` so Next.js pre-renders static HTML for all 148 products and categories.
* **Action 2:** Tag your single `getCatalog()` cache with `tags: ["catalog"]` and increase `CACHE_REVALIDATE_SECONDS` to `false` (or `604800` for 7 days).
* **Action 3:** In `/api/admin/products` and `/api/admin/categories` (when you create, edit, or delete), call `revalidateTag("catalog")` and `revalidatePath("/", "layout")`.
* **Why it's 80/20:** Static HTML served from the CDN edge costs **0 Function Invocations** and **0ms Fluid CPU**. You only pay for `firebase-admin` CPU when you click "Save" in your admin dashboard.

---

### Fix 3: Remove `await searchParams` from `/products` and `/products/[categorySlug]` (Makes Listings 100% Static)

In Next.js App Router, merely referencing `searchParams` in a Server Component forces the route into **Dynamic Rendering on every request**—even when a visitor visits `/products` with no `?page=` query string at all.

Furthermore, your `ProductsListingView.tsx` *already* renders all 148 products inside `<nav className="sr-only">` for SEO crawlers! You are paying the dynamic SSR penalty on the server just to slice an array of 24 items that the client already has.

* **Action:** Remove `searchParams` from `src/app/products/page.tsx` and `src/app/products/[categorySlug]/page.tsx`, and add `export const dynamic = "force-static"`. Let `ProductsClient.tsx` read the URL page number via `useSearchParams()` inside a `<Suspense>` boundary on the client.
* **Why it's 80/20:** Turns `/products` and all `/products/[categorySlug]` routes into pure static CDN files while keeping SEO links intact (`sr-only` nav) and making pagination instant.

---

### Fix 4: Lock Down `next/image` Breakpoints & Cache TTL (Stops the 5K Image Cap Bleed)

You are at 3K / 5K image transformations and 19K cache writes because Next.js generates too many width permutations per product image, and default cache TTLs can cause re-transformations.

* **Action:** Update `next.config.ts` to restrict responsive image buckets to 3–4 actual sizes used by your layout and force a 31-day minimum cache TTL:

```ts
// next.config.ts
const nextConfig: NextConfig = {
  serverExternalPackages: ["firebase-admin"],
  images: {
    minimumCacheTTL: 2678400, // 31 days
    deviceSizes: [640, 1080, 1920], // Down from 8 default sizes
    imageSizes: [256, 384],         // Down from 8 default sizes
    formats: ["image/webp"],        // Avoid doubling transforms with webp + avif
  },
};

```

---

## 3. Summary Priority Matrix

| Step | Target File(s) | Effort | Expected Impact |
| --- | --- | --- | --- |
| **1. Single-Read PDP & Sitemap** | `src/app/product/[id]/page.tsx`, `src/app/sitemap.ts` | ~15 mins | Cuts PDP CPU from ~137ms to ~25ms; eliminates 2/3 of Firestore & ISR reads. |
| **2. Static Params + On-Demand Revalidate** | `get-catalog.ts`, `product/[id]/page.tsx`, `/api/admin/*` | ~30 mins | Drops Function Invocations & Fluid CPU by **80%+** (serves static HTML from CDN). |
| **3. Drop Server `searchParams**` | `products/page.tsx`, `products/[categorySlug]/page.tsx` | ~20 mins | Eliminates dynamic SSR on all category and catalog listing pages. |
| **4. Restrict `next/image` Buckets** | `next.config.ts` | ~2 mins | Cuts Image Optimization transformations and cache writes by **60–75%**. |