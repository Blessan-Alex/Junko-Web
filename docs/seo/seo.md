Copy-paste each phase below as an isolated prompt into your coding agent. Every phase is strictly scoped so smaller models can execute the SEO upgrades without breaking your static build (`○` / `●`) or increasing Vercel Fluid CPU usage.

---

## Phase 1: Canonical Consolidation, HTTPS Enforcement & 301 Duplicate Slug Redirects

**Objective:** Eliminate the `http://` vs. `https://` indexing split (which currently diverts 33% of homepage clicks to insecure `http://`), enforce a single `[https://www.junko-fze.com](https://www.junko-fze.com)` canonical domain across every route, and permanently 301-redirect duplicate (`-1`, `-2`) and malformed product slugs at the CDN edge with zero Function Invocations.

**Files in Scope:**

* `src/app/layout.tsx`
* `middleware.ts`
* `next.config.ts` and `scripts/redirects.json` (if `next.config.ts` loads redirects from there)
* `src/app/sitemap.ts`

**Strict Guardrails for the Agent:**

* Do NOT add Firestore lookups or dynamic server logic inside `middleware.ts`.
* Do NOT remove existing legacy redirects in `scripts/redirects.json` or `next.config.ts`; only append and deduplicate.
* All redirects must be configured as permanent (`permanent: true`) so Google transfers ranking equity and drops the duplicate URLs from its index.

**Step-by-Step Instructions:**

1. **Enforce Canonical Base URL (`src/app/layout.tsx`):**
* Inspect `metadataBase` in `src/app/layout.tsx` and ensure it is explicitly set to `[https://www.junko-fze.com](https://www.junko-fze.com)` (never `http://` and never falling back to a preview URL on production).
* Check that the root layout or `src/app/page.tsx` defines `alternates: { canonical: "[https://www.junko-fze.com](https://www.junko-fze.com)" }` for the homepage.


2. **Verify Protocol & Host Redirect (`middleware.ts`):**
* Inspect `middleware.ts` where the `www` redirect occurs.
* Ensure that if a request arrives over `http` (via `x-forwarded-proto === "http"`) or on the non-`www` apex domain (`junko-fze.com`), it issues a single-hop **301 Permanent Redirect** (explicitly pass `{ status: 301 }`) to `[https://www.junko-fze.com](https://www.junko-fze.com)` + pathname + search.


3. **Add Static Edge Redirects for Duplicate & Corrupted Slugs (`next.config.ts` / `scripts/redirects.json`):**
* Check how `next.config.ts` loads `redirects()`. Add permanent redirects (`permanent: true`) for the following duplicate and malformed URLs discovered in Google Search Console:
* `/product/pallet-scale-https-junko-fze-com-product-pallet-scale` $\rightarrow$ `/product/pallet-scale`
* `/product/gk35-6a-1` $\rightarrow$ `/product/gk35-6a`
* `/product/bcm-4-1` $\rightarrow$ `/product/bcm-4`
* `/product/ds-9a-1` $\rightarrow$ `/product/ds-9a`
* `/product/fbk-332c-1` $\rightarrow$ `/product/fbk-332c`
* `/product/high-speed-bag-making-machine-2` $\rightarrow$ `/product/high-speed-bag-making-machine`
* `/product/kp2701` $\rightarrow$ `/product/kp-2701b`


* Note: Before adding each redirect above, verify in the local catalog data (`products.ts` or slug resolver) which of the two slugs is the active primary product slug. If a product's actual active slug in the database is one of the suffixed ones (e.g., `crepe-paper-tape-2`, `3-7-silicon-treated-1`, `sm-6-1`, `bcm-2-1`), do NOT redirect that active slug to a 404—only redirect confirmed duplicate pairs to the active canonical slug.


4. **Filter Duplicate Slugs Out of Sitemap (`src/app/sitemap.ts`):**
* Ensure every URL emitted by `src/app/sitemap.ts` starts with `[https://www.junko-fze.com](https://www.junko-fze.com)` and never outputs any URL that is configured as a redirect source in `scripts/redirects.json`.



**Verification Step:**

* Run `npx tsc --noEmit` to ensure zero type errors in `middleware.ts`, `next.config.ts`, and `src/app/sitemap.ts`.

---

## Phase 2: B2B Geo-Targeted Metadata & "Striking Distance" Title Upgrades

**Objective:** Upgrade `<title>`, `<meta name="description">`, and `alternates.canonical` generation across Category pages, Product Detail Pages, and the Catalog index to capture UAE/Dubai B2B supplier intent (862 impressions) and convert Page 1/Page 2 "striking distance" impressions into clicks.

**Files in Scope:**

* `src/app/page.tsx`
* `src/app/products/page.tsx`
* `src/app/products/[categorySlug]/page.tsx`
* `src/app/product/[id]/page.tsx`

**Strict Guardrails for the Agent:**

* Do NOT re-introduce `searchParams` into any server page or `generateMetadata` function. All pages must remain 100% static (`○` or `●`).
* Do NOT add new Firestore queries—use only the already-cached `getCatalog()` data.
* Ensure every `generateMetadata` function outputs an explicit `alternates: { canonical: ... }` using the full `[https://www.junko-fze.com/](https://www.junko-fze.com/)...` URL.

**Step-by-Step Instructions:**

1. **Upgrade Homepage & Main Catalog Metadata (`src/app/page.tsx`, `src/app/products/page.tsx`):**
* On the homepage (`/`), ensure the title and description explicitly target: *"Industrial Packaging Machines, Bag Closing Thread & Weighing Scales Supplier in UAE & Dubai | Junko FZE"* and mention fast supply across Sharjah, Dubai, Abu Dhabi, and the GCC.
* On `/products`, set the canonical URL to `[https://www.junko-fze.com/products](https://www.junko-fze.com/products)` and format the title to target broad buyer searches: *"Packaging Machinery, Bag Closing Machines & Thread Catalog – UAE Supplier | Junko FZE"*.


2. **Upgrade Category Metadata Templates (`src/app/products/[categorySlug]/page.tsx`):**
* In `generateMetadata`, replace bare category titles (like `{Category Name} | Junko FZE`) with B2B commercial intent titles:
* Format: `${category.name} Supplier in UAE & Dubai – Industrial Packaging | Junko FZE`


* Build a dynamic meta description (145–160 characters) that includes the category name, top product examples from that category, and *"In stock at Junko FZE (SAIF Zone, Sharjah) with fast delivery across Dubai, UAE, Oman & GCC."*
* Set `alternates.canonical` to `[https://www.junko-fze.com/products/$](https://www.junko-fze.com/products/$){category.slug}`.


3. **Upgrade Product Detail Page Metadata (`src/app/product/[id]/page.tsx`):**
* In `generateMetadata`, construct high-CTR B2B titles and descriptions using the product's `name`, `subcategory` or `category`, and UAE supplier positioning:
* If the product title is short (under 38 characters), append the category/application and location: `${product.name} – ${categoryName} Supplier in UAE | Junko FZE`.
* Specifically ensure high-impression products include their exact search synonyms in the generated title or meta description (via a clean SEO override map or keyword builder):
* **Bag Closing Threads (`bag-closing-thread`, `100-polyester-bag-closing-thread`):** Explicitly mention *Jute Bag Sewing Thread, Flour & Rice Bag Stitching Thread, 100% Polyester Industrial Bag Closing Thread Supplier in Dubai & UAE*.
* **Crepe Paper Tape (`crepe-paper-tape-2`):** Explicitly mention *Bag Closing Paper Crêpe Tape (Kraft Paper Tape for Bag Stitching) Supplier in UAE*.
* **GK35-6A (`gk35-6a`):** Explicitly mention *GK35-6A Automatic Pneumatic Bag Closing Sewing Machine for Kraft Paper, PP & Jute Bags*.
* **Scales (`field-scale`, `table-top-weighing-scale`):** Explicitly mention *Industrial Field Scale & Digital Table Top Weighing Scale Supplier in UAE*.




* Set `alternates.canonical` to `[https://www.junko-fze.com/product/$](https://www.junko-fze.com/product/$){canonicalSlug}`.



**Verification Step:**

* Run `npx tsc --noEmit` to verify that all metadata objects conform to Next.js `Metadata` types.

---

## Phase 3: Rich JSON-LD Structured Data (`Product`, `BreadcrumbList`, `Organization`)

**Objective:** Fix the empty Google Search Console `Search appearance` report (currently 0 rich result impressions) by injecting valid server-rendered JSON-LD structured data for `Organization`, `BreadcrumbList`, and `Product`.

**Files in Scope:**

* `src/app/layout.tsx` (or `src/app/page.tsx`)
* `src/app/products/[categorySlug]/page.tsx`
* `src/app/product/[id]/page.tsx`
* Any existing schema utility file in `src/lib/` (inspect repo first to reuse or extend existing JSON-LD helpers)

**Strict Guardrails for the Agent:**

* **CRITICAL GOOGLE COMPLIANCE:** Do NOT invent fake `aggregateRating`, `review`, or fake numeric prices if the product does not have a public price in the data. Fabricating ratings triggers a Google Search Console manual action.
* Every URL inside JSON-LD (`url`, `item`, `image`) MUST be an absolute `[https://www.junko-fze.com/](https://www.junko-fze.com/)...` URL (or full HTTPS Blob URL for images).
* Every `BreadcrumbList` must contain at least 2 `ListItem` entries with sequential `position` integers (`1, 2, 3...`), `name`, and absolute `item` URL.

**Step-by-Step Instructions:**

1. **Inspect Existing JSON-LD Helpers:**
* Search the codebase for `application/ld+json` to see what structured data already exists on listings or PDPs so you extend rather than duplicate `<script type="application/ld+json">` tags.


2. **Add/Verify `Organization` & B2B Supplier Schema (`src/app/layout.tsx` or `src/app/page.tsx`):**
* Ensure a valid `Organization` JSON-LD block is rendered with:
* `name`: `"Junko FZE"`
* `url`: `"[https://www.junko-fze.com](https://www.junko-fze.com)"`
* `logo`: Full HTTPS URL to the site logo
* `address`: Structured `PostalAddress` for SAIF Zone, Sharjah, United Arab Emirates (`addressCountry: "AE"`, `addressRegion: "Sharjah"`)
* `areaServed`: `["AE", "OM", "SA", "QA", "KW", "BH", "IN"]`
* `contactPoint`: Customer service / sales phone and email from the site's contact constants.




3. **Add `BreadcrumbList` JSON-LD to Category & Product Pages:**
* On `/products/[categorySlug]/page.tsx`, output a `BreadcrumbList` with 3 items:
1. `Home` (`[https://www.junko-fze.com](https://www.junko-fze.com)`)
2. `Products` (`[https://www.junko-fze.com/products](https://www.junko-fze.com/products)`)
3. `${category.name}` (`[https://www.junko-fze.com/products/$](https://www.junko-fze.com/products/$){category.slug}`)


* On `/product/[id]/page.tsx`, output a `BreadcrumbList` with 4 items:
1. `Home` (`[https://www.junko-fze.com](https://www.junko-fze.com)`)
2. `Products` (`[https://www.junko-fze.com/products](https://www.junko-fze.com/products)`)
3. `${category.name}` (`[https://www.junko-fze.com/products/$](https://www.junko-fze.com/products/$){category.slug}`)
4. `${product.name}` (`[https://www.junko-fze.com/product/$](https://www.junko-fze.com/product/$){canonicalSlug}`)




4. **Add/Upgrade `Product` JSON-LD on `/product/[id]/page.tsx`:**
* Output a valid `Product` JSON-LD object containing:
* `@context`: `"[https://schema.org](https://schema.org)"`
* `@type`: `"Product"`
* `name`: Product name
* `description`: Clean plain-text product description (fallback to generated B2B description if short)
* `sku` / `mpn`: Product model code or slug/ID
* `image`: Array of absolute HTTPS image URLs (only include if the product has a valid non-empty image URL)
* `brand`: `{ "@type": "Brand", "name": product.brand || "Junko FZE" }`
* `category`: Category name
* `manufacturer` / `offers`: Include an `Offer` block with `url` (`[https://www.junko-fze.com/product/$](https://www.junko-fze.com/product/$){canonicalSlug}`), `availability: "[https://schema.org/InStock](https://schema.org/InStock)"`, `itemCondition: "[https://schema.org/NewCondition](https://schema.org/NewCondition)"`, and `seller: { "@type": "Organization", "name": "Junko FZE" }`. (Check if Google Rich Results requires `price` on `Offer`—if no numeric price exists on B2B products, keep the `Product` + `additionalProperty` specs from product specifications and omit incomplete `offers` if it would trigger a missing-price warning, OR check how existing PDP schema is structured).





**Verification Step:**

* Run `npx tsc --noEmit` to verify no syntax or type errors in the JSON-LD builders.

---

## Phase 4: Static B2B Content Enrichment for Category Pages & High-Demand Thread/Scale Pages

**Objective:** Fix the 6 category pages that received only 21 total impressions in 90 days and capture the **1,923 impressions** in the Bag Closing Thread cluster + **862 impressions** in the UAE Packaging Machinery cluster by rendering concise, keyword-rich static B2B buyer guides and spec tables directly in the server HTML.

**Files in Scope:**

* Create a new pure TypeScript static content file: `src/lib/seo/catalog-seo-content.ts`
* `src/app/products/[categorySlug]/page.tsx` (or `ProductsListingView.tsx`)
* `src/app/product/[id]/page.tsx`

**Strict Guardrails for the Agent:**

* Do NOT modify Firestore schemas, admin forms, or API routes.
* Do NOT change existing visual cards, header navigation, or client pagination logic.
* Keep the added SEO sections visually clean, matching the existing Tailwind typography and industrial design system (e.g., placed neatly below the product grid on category pages and inside/below the specifications section on PDPs).

**Step-by-Step Instructions:**

1. **Create Static SEO Content Map (`src/lib/seo/catalog-seo-content.ts`):**
* Export a typed map of category SEO content keyed by `categorySlug` (`bag-closing-threads`, `bag-closing-machines`, `sealing-machines`, `filling-and-packing-machines`, `packaging-tools`, `consumables`, plus any weighing scale category slug present in the catalog).
* For each category, provide:
* A 120–150 word B2B overview paragraph targeting UAE, Dubai, Sharjah, and GCC industrial buyers, mentioning key applications (e.g., flour mills, grain, cement, chemicals, food packaging, logistics warehouses).
* 3 bullet points highlighting industrial specifications, spare parts availability (`Fischbein`, `Newlong`, `Union Special`, `Yao Han` compatibility where relevant), and UAE stock readiness.


* In the same file, export a product-level SEO enrichment map for the top-impression slugs:
* `bag-closing-thread` and `100-polyester-bag-closing-thread`: Include an HTML-renderable specification table comparing **Bag Applications** (*Jute Bags, Woven PP Bags, Multi-Wall Kraft Paper Bags, Flour & Rice Sacks*), **Thread Ply & Material** (*100% Spun Polyester 20/6, 20/9, 12/4, High-Tenacity Filament*), **Cone Weights** (*200g portable closer cones to 5kg automatic bagging cones*), and **Machine Compatibility** (*GK35-6A, DS-9A, Fischbein, Newlong NP-7A*).
* `crepe-paper-tape-2`: Include specs on Kraft Crêpe Paper Tape widths, elongation, and dust/sift-proof sealing for stitched paper/PP bags.
* `field-scale` and `table-top-weighing-scale`: Include industrial weighing capacity applications for agriculture, warehouses, and production lines in the UAE.
* `gk35-6a`: Highlight automatic pneumatic bag closing sewing head specs for kraft paper, PP woven, and jute sacks.




2. **Render Category SEO Guide Below the Product Grid (`src/app/products/[categorySlug]/page.tsx` or `ProductsListingView.tsx`):**
* When rendering a category page (or the main `/products` catalog), render a clean, semantic `<section aria-label="Category industrial guide">` below the product listing grid showing the H2 heading (`Industrial ${category.name} Supplier in UAE & Dubai`), the overview copy, and the application bullet points.
* Include 2–3 contextual internal `<Link>` elements pointing to the top flagship products in that category so PageRank flows directly between category hubs and PDPs.


3. **Render Product Application & Spec Table on Targeted PDPs (`src/app/product/[id]/page.tsx`):**
* If `catalog-seo-content.ts` has enrichment data for the current product's slug, render the structured specification table and industrial application notes inside a clean section on the PDP so Google indexes deep technical content for those high-impression queries.


4. **Final Production Build Verification:**
* Run `npm run build` in the terminal.
* Confirm that `/products`, `/products/[categorySlug]`, `/product/[id]`, and `/sitemap.xml` all build cleanly as Static (`○`) or SSG (`●`) with zero build or TypeScript errors.