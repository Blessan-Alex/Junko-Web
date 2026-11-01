# Senior developer review: Your Firestore read problem

My recommendation is to keep Firestore as the source of truth, stop pre-rendering every product from Firestore during deployment, and redesign the caching and publishing flow before changing your database.

Your proposed Option D is directionally correct. However, I would not implement it exactly as written without checking several assumptions. The biggest risk is replacing a build-time read problem with a runtime cache problem, then discovering that your free-tier quota is still being exhausted.

You have only around 148 products. That is a small catalogue. The architecture should be simple, inexpensive, and predictable, with no unnecessary database reads during deployments.

## 1. First, challenge the 30,000-read diagnosis

What the proposed diagnosis gets right

A Next.js build can execute data-fetching code for metadata, page rendering, static parameter generation, and other routes. Repeatedly fetching all 148 products can multiply Firestore reads significantly.

What it has not proved

That `unstable_cache` fails to deduplicate across your build jobs, or that product-page prerendering alone accounts for all 30,000 reads. Those are plausible hypotheses, not verified facts about your deployment.

What we need to establish

Whether the reads originate from the build, runtime requests, cache misses, admin refreshes, or multiple sources. The correct fix depends on that distinction.

### Why 30,000 reads is a useful clue

If each full catalogue fetch reads 148 individual product documents:

\\[ 30{,}000 \div 148 \approx 203 \\]

That is approximately 203 full-catalogue-equivalent reads.

This makes repeated catalogue fetching a credible explanation. It does not prove that 203 full fetches actually happened, because other queries, subcollections, retries, and runtime requests may contribute.

Also, one Firestore query returning 148 documents generally incurs 148 document reads, not one read for the entire query. Caching is therefore the important part.

## 2. My biggest objection: your product pages should not need the full catalogue

This is the architectural change I would prioritize above Option D itself.

Suppose someone visits:

`/product/wireless-keyboard`

The page needs:

- The wireless keyboard's details.
- Its images.
- A few related products.
- Its SEO metadata.

It does not inherently need to read all 148 products.

If `getProductBySlug()` internally calls `getCatalog()` and searches the resulting array, that is a design smell for a Firestore-backed application.

## Current approach, potentially expensive

Product page / metadata

`getCatalog()` reads 148 products

Find one product in the array

Repeated calls can multiply reads if the cache does not hit.

## Preferred approach

Product page / metadata

`getProductBySlug(slug)`

Read the matching product document

Ideally one document read on a cache miss, with cached reuse for metadata and page rendering.

### The data-access design I would use

| Function                   | What it should fetch                                      |
| -------------------------- | --------------------------------------------------------- |
| `getProductBySlug(slug)`   | One matching product document                             |
| `getCatalog()`             | All products, only where the catalogue listing needs them |
| `getRelatedProducts(slug)` | A limited set of related products                         |
| `getAdminCatalog()`        | The data the admin screen actually needs                  |
| `getProductSlugs()`        | Only slugs, if required for a specific operation          |

If your Firestore document IDs already equal the product slugs, use a direct document lookup. If they do not, query the `slug` field with an appropriate index and limit.

Do not create a separate database request for metadata and another for the page if both can reuse the same cached product-data function. However, do not rely on React request memoization alone to deduplicate calls across separate build jobs. Persistent cache behavior needs to be verified independently.

This change reduces the cost of each product-page cache miss even if your higher-level cache behaves imperfectly.

## 3. Option D: Keep it, but tighten the implementation

The idea of on-demand rendering is sound, with a few important qualifications.

A. Stop generating all 148 product pages at build time

Remove the catalogue-backed `generateStaticParams()` workflow if it exists solely to prerender every product. Keep dynamic product URLs. Generate pages when requested, then cache them according to your chosen Next.js rendering strategy.

B. Cache data deliberately

Use a persistent server-side data cache with explicit invalidation. The exact implementation depends on your Next.js version and hosting cache behavior. `unstable_cache` is not a guarantee that every build worker will share one result in every circumstance.

C. Make publishing invalidate the right things

After an admin saves a product, invalidate that product's data and rendered page, plus the catalogue listing if its contents changed. Invalidate the sitemap if the slug or publication status changed.

D. Retain an explicit freshness policy

Choose a revalidation interval as a fallback, not as a substitute for correct publish-time invalidation. Product data should remain available and reasonably fresh even when nobody manually triggers a deployment.

### One critical trap: cache invalidation stampedes

Imagine your admin publishes one product and your code invalidates a shared `catalog` cache.

If 30 visitors then request different product URLs, and each uncached product lookup reloads the entire catalogue, you could trigger many simultaneous 148-document reads.

A shared cache can also have a cold start after a deployment, eviction, or invalidation. Do not assume that a successful cache hit in one request means all server instances or build workers will share it.

My preference: use product-level data caching for product details and a separate catalogue-level cache for the listing. This limits the blast radius of invalidation and makes costs more predictable.

## 4. The architecture I would ship

For your 148-product catalogue, I would use this structure:

Admin interface

Authenticated editor, product forms, image uploads

Authenticated server-side writes

Next.js server / API

Validate input, authorize changes, update product and invalidate relevant caches

Firestore

Product records and catalogue data

Vercel Blob

Product image files and URLs

Public product catalogue

On-demand product routes, cached data, SEO metadata and revalidation

The database remains the source of truth. Vercel Blob remains responsible for image storage. Neither should need to be replaced to solve this problem.

### My proposed rendering and caching policy

| Route or operation | Strategy                                                                 |
| ------------------ | ------------------------------------------------------------------------ |
| `/products`        | Cached catalogue listing, refreshed when products change                 |
| `/product/[slug]`  | On-demand generation with cached product data                            |
| Product metadata   | Reuse the product data cache                                             |
| `/sitemap.xml`     | Generate from published product slugs and refresh after relevant changes |
| Admin dashboard    | Authenticated, server-side data access                                   |
| Admin publish      | Write to Firestore, then invalidate affected cached data and pages       |

One qualification: on-demand generation and ISR are not identical to making a route dynamically render on every request. Configure the route and cache according to your installed Next.js version. Preserve canonical URLs, metadata, sitemap coverage, and correct HTTP status codes for unpublished or deleted products.

I would not introduce a separate build-time JSON catalogue unless there is a demonstrated reason. It adds another representation that can become stale.

## 5. What could still go wrong?

These are the failure modes I would specifically test before deploying the change.

| Risk                                              | Why it matters                                            | Mitigation                                                    |
| ------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------- |
| Cache misses after deploy                         | Cached results may not be available in the way you expect | Measure reads on a clean deployment                           |
| Metadata and page fetch separately                | Both may independently query Firestore                    | Shared, consistently keyed data-cache function                |
| Broad cache invalidation                          | One edit may cause many requests to reload the catalogue  | Separate product and catalogue cache scopes                   |
| Concurrent requests                               | Multiple cache misses may produce duplicate reads         | Test concurrency and use an appropriate shared cache strategy |
| Stale sitemap                                     | New products might not appear in search engines promptly  | Revalidate sitemap after relevant changes                     |
| Admin accidentally reads all products repeatedly  | Dashboard interactions can consume quota                  | Fetch only required data and avoid unnecessary refreshes      |
| Public visitors trigger uncached database queries | Traffic can consume free-tier quota                       | Cache public reads and apply reasonable limits                |
| Image updates leave old files behind              | Blob storage can accumulate unused files                  | Replace or delete obsolete assets safely                      |

Also, do not use a public environment variable for Firebase Admin credentials, and do not let a client directly publish arbitrary product data without server-side authorization and validation.

## 6. Establish a read budget before changing code

You need a measurable target, not just the assumption that Option D will be cheaper.

A rough budget for your catalogue could look like this:

| Operation                                | Approximate uncached document reads  |
| ---------------------------------------- | ------------------------------------ |
| One full catalogue fetch                 | 148                                  |
| One product-detail lookup                | 1, if it reads one matching document |
| Three independent full catalogue fetches | 444                                  |
| 30 full catalogue fetches                | 4,440                                |
| 203 full catalogue fetches               | 30,044                               |

These are estimates assuming each catalogue fetch reads 148 documents and the product lookup reads one. Queries, retries, and other collections can change actual usage.

The critical distinction is that caching changes how often those reads happen, while more targeted queries reduce the cost when a cache miss occurs.

### How I would validate the fix

1. Record the Firestore read count before a deployment.
2. Deploy the change and record the increase, separating build activity from live traffic as far as the available logs allow.
3. Open several product URLs, including one that has not been requested since deployment.
4. Open the same URLs again and verify that cached requests do not repeatedly load the full catalogue.
5. Edit one product through the admin panel. Verify that its page updates, the listing remains correct, and unrelated product pages do not all trigger full-catalogue reads.
6. Check that newly published products appear in the listing and sitemap without requiring another deployment.

Set a release acceptance criterion of no full-catalogue read for each individual product-page render. Then establish an actual read budget from your measurements, rather than relying on an arbitrary target.

Firestore usage metrics and logs are important here. Vercel build logs alone may not explain all reads attributed to the Firebase project.

## 7. What about Firebase Spark?

You do not need to upgrade to a paid plan merely because your catalogue contains 148 products.

The standard Firestore free quota has historically included 50,000 document reads per day for an eligible database, subject to the applicable free-tier terms and configuration. Check your Firebase console to confirm the quota available to your specific project.

Even if 30,000 reads per deployment fits within a daily allowance, repeatedly spending that allowance on deployments is not a sound architecture. It leaves less headroom for actual visitors and admin activity.

The objective should be to make the application efficient enough that deployment frequency is not a significant source of database consumption.

## 8. My final recommendation, in priority order

## 1

Fix the data-access layer first

Stop calling `getCatalog()` from `getProductBySlug()`. Fetch individual product documents and reuse cached data for metadata and page rendering.

## 2

Remove unnecessary static generation

Do not fetch Firestore-backed product data for every product during every build. Generate product pages on demand, using the appropriate Next.js rendering strategy.

## 3

Implement scoped cache invalidation

Product edits should refresh the affected product and listing as necessary. Slug and publication changes should also refresh the sitemap.

## 4

Measure before declaring success

Test a deployment, repeated page requests, a cold cache, and an admin publish. Verify Firestore read counts and SEO behavior before merging the production change.

I would not start by switching to file-based product data, migrating databases, or paying for a higher Firebase tier. Your catalogue is small enough that a properly designed Firestore-backed solution should be viable.

## 9. Let us inspect your actual implementation

The most important missing detail is how your current Next.js app fetches and caches product data. I do not want to prescribe a route configuration that conflicts with your installed Next.js version or current cache setup.

Please share these four things:

1\. Next.js version

Find it in package.json.

2\. Router type

App Router (`app/`)

Pages Router (`pages/`)

Both

3\. Current caching approach

`unstable_cache`

`fetch` caching or revalidation

React `cache()` only

No explicit caching

Multiple methods or unsure

4\. Firestore document structure

Document ID equals the product slug

Document ID is different, with a separate `slug` field

Unsure

Review my architecture

Even better, paste your current `app/product/[slug]/page.tsx` (or equivalent), the file containing `getCatalog()` and `getProductBySlug()`, and your admin publish/revalidation handler. Redact credentials and environment-variable values.

With those files, we can determine exactly where the reads originate and make the smallest safe change rather than guessing.


This code confirms one of the main problems in your current architecture. The product detail route fetches the entire catalogue, and your static-generation configuration explicitly loads the entire catalogue during the build.

There is also a second issue: your product page fetches the product in both `generateMetadata()` and the page component, then fetches the entire catalogue again for related products. Whether those calls produce separate Firestore reads depends on the implementation of `get-catalog.ts` and its caching behavior.

I would make two changes first: eliminate unnecessary full-catalogue reads from product routes, then stop generating all product pages from Firestore during deployment.

## 1. Where your reads are coming from

Your uploaded product route contains these three relevant operations.

| Code location            | Operation                                       | Potential read cost                 |
| ------------------------ | ----------------------------------------------- | ----------------------------------- |
| `generateStaticParams()` | Fetches the full catalogue                      | \~148 reads once                    |
| `generateMetadata()`     | Fetches one product by slug                     | Depends on `getProductBySlug()`     |
| `ProductDetailPage()`    | Fetches the full catalogue for related products | \~148 reads per prerendered product |

The third operation is the clearest problem.

With 148 product pages, the related-products operation alone could produce:

\\[ 148 \times 148 = 21{,}904 \text{ reads} \\]

That is before counting metadata, other routes, and any repeated full-catalogue calls inside `getProductBySlug()`.

If that function also loads all 148 products each time, the potential cost increases substantially. We need its implementation to confirm the exact total.

## 2. The changes I would make

### Change A: Remove `generateStaticParams()`

Your current code is:

```
export const dynamicParams = true;

export async function generateStaticParams() {
  const { allProducts } = await getCatalog();

  return allProducts.map(product => ({
    id: product.slug || product.id,
  }));
}
```

For your use case, I would remove the `generateStaticParams()` function and its associated `getCatalog` import if nothing else in the file needs it.

Keep:

```
export const dynamicParams = true;
```

With the App Router, this allows paths that were not generated at build time to be generated on demand, subject to the route's rendering and caching configuration. Existing product URLs can remain unchanged.

Important: this alone does not solve the problem if the page continues loading all 148 products for related products. It removes the build-time enumeration of every product, but you must also fix the data-fetching path.

### Change B: Stop fetching all products for related products

Currently:

```
const product = await getProductBySlug(id);
const { allProducts } = await getCatalog();

const relatedProducts = (() => {
  if (!product) return [];

  return allProducts
    .filter(p =>
      p.id !== product.id &&
      (p.subcategory === product.subcategory ||
       p.category === product.category)
    )
    .slice(0, 4);
})();
```

The desired structure is:

```
const product = await getProductBySlug(id);

if (!product) {
  notFound();
}

const relatedProducts = await getRelatedProducts(product);
```

Here, `getRelatedProducts()` is a proposed function, not an existing function in your code. We need to implement it against your actual Firestore schema.

It should fetch only a small number of matching products, preferably using indexed queries and a limit, rather than reading the whole collection. It should preserve your current preference for matching subcategory first and category second.

### Change C: Reuse the product data between metadata and page rendering

Both functions call:

```
getProductBySlug(id)
```

We should make sure they reuse the same cached result where appropriate. The right implementation depends on whether your existing function uses Firestore Admin SDK, `unstable_cache`, React `cache()`, or another method.

Do not blindly add another caching wrapper until we inspect the existing implementation. Nested caches and inconsistent cache keys can complicate invalidation.

## 3. What I need next

Please share the contents of this file:

`src/lib/catalog/get-catalog.ts`

Or whichever path contains these functions:

- `getCatalog()`
- `getProductBySlug()`

That file is the key to solving this properly. I want to establish whether `getProductBySlug()` reads a single document or the whole collection, how caching is configured, and how the admin publish handler invalidates cached data.

Once I see it, I can give you the exact replacement code, including the related-products query and cache invalidation strategy, without guessing at your Firestore schema.


Now we can identify the deeper problem. Your `get-catalog.ts` explains why the existing implementation can still consume a large number of Firestore reads despite using `unstable_cache`.

## 1. The main architectural flaw

This is the critical part of your code:

```
async function getFirestoreProductBySlugCached(
  slug: string
): Promise<Product | null> {
  return unstable_cache(
    async () => {
      const { allProducts: products } = await getCatalog();
      return findProductBySlug(products, slug);
    },
    ["catalog-product-lookup-v2", slug],
    {
      tags: ["catalog", `product:${slug}`],
      revalidate: CACHE_REVALIDATE_SECONDS,
    },
  )();
}
```

You have a separate cache entry for each slug, but every cache entry depends on the entire catalogue.

For 148 products, you potentially have 148 distinct product cache entries. Each cache entry calls `getCatalog()` on a cache miss.

The important nuance is that `getCatalog()` itself has another cache. If that shared catalogue cache is warm and available, the nested call can be inexpensive. But you are relying on two layers of caching, and the inner cache may not be warm or shared in every execution context.

Your product-level cache is caching the result of a full-catalogue lookup, rather than caching a direct product lookup. That is the design I would change.

## 2. Three problems I would fix

### Problem A: Every product has its own cache entry backed by the full catalogue

Your cache keys are:

```
["catalog-firestore-v1"]
```

and:

```
["catalog-product-lookup-v2", slug]
```

The first is a shared catalogue cache. The second creates a distinct cached lookup for each slug.

This is not automatically broken. If the shared cache works correctly, it can reduce reads substantially. However, the architecture is unnecessarily dependent on nested cache behavior.

### Problem B: Publishing a product can invalidate every product lookup

Every product lookup has these tags:

```
tags: ["catalog", `product:${slug}`]
```

That means invalidating the `catalog` tag also invalidates every product lookup that carries that tag.

If your admin revalidation endpoint invalidates `catalog` after every product edit, a single edit can invalidate all 148 product lookup entries and the catalogue cache. Subsequent requests may repopulate them.

This is a particularly important issue to fix.

### Problem C: Related products still require the full catalogue

Your product page separately calls:

```
const { allProducts } = await getCatalog();
```

That is needed for your current in-memory related-products algorithm. We should replace it with a targeted query or a deliberately cached catalogue, depending on the actual Firestore schema.

## 3. The implementation I recommend

I would separate the data access into three independent paths.

| Data access        | Cache key                                           | Invalidation                         |
| ------------------ | --------------------------------------------------- | ------------------------------------ |
| Individual product | `product:{slug}`                                    | That product                         |
| Full catalogue     | `catalog`                                           | Catalogue changes                    |
| Related products   | Product/category-specific key, if caching is needed | Relevant product or category changes |

The catalogue listing still uses `getCatalog()`. The product page uses a direct lookup. Related products use a limited query. This keeps the responsibilities separate.

There is one schema detail we must establish before writing the final code: whether your Firestore document IDs equal your product slugs. If they do, a direct document read is straightforward. If they do not, the lookup needs a query against the slug field.

## 4. What I would do with your existing code

- Keep `getCatalog()` for the `/products` listing.
- Remove `generateStaticParams()` from the product detail route if the goal is to avoid generating all products during deployment.
- Replace `getFirestoreProductBySlugCached()` with a direct Firestore product lookup and a suitable cache.
- Remove the full-catalogue dependency from the related-products section.
- Separate product-level invalidation from catalogue-level invalidation where possible.
- Verify that the sitemap and admin publishing flow still work correctly.

I would not remove caching or switch to file-based data as the first step. Your existing Firestore-backed architecture can be retained.

## 5. One more file before I prescribe the exact replacement

Please share `fetch-firestore.ts`, which contains `fetchCatalogFromFirestore()`.

I need to see how the collection is queried, how document IDs and slugs are mapped, and which Firestore SDK you use. With that file, I can give you the precise replacement for `get-catalog.ts` rather than inventing a collection name or document structure.

After that, the next file to inspect is your `/api/admin/revalidate` handler. That will tell us whether publishing a single product currently invalidates the entire catalogue and every product cache entry.