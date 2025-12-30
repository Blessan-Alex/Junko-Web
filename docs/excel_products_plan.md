Cool — then **don’t use a database**. You’ll be fastest + simplest + most reliable with a **static catalog**.

## What to do (recommended setup)

### Data

* Put your catalog in: `public/catalog/products.json`
  (your `products_clean.json` is already perfect for this)

### Images

* Put product images in: `public/products/`
* Use a naming rule:
  `public/products/<SKU>-200.webp`
  `public/products/<SKU>-400.webp`
  `public/products/<SKU>-800.webp`
* Also add: `public/products/_placeholder.webp`

This gives you **optimized loading** without any backend.

---

## How to load images (optimized)

Use `srcSet + sizes + lazy loading + fallback`:

```tsx
type ProductImageProps = {
  sku?: string | null;
  name?: string;
  className?: string;
  sizePx?: number; // how big it appears on screen
};

export function ProductImage({
  sku,
  name,
  className,
  sizePx = 56,
}: ProductImageProps) {
  const safeSku = sku ? encodeURIComponent(sku) : null;

  const base = safeSku ? `/products/${safeSku}` : null;
  const placeholder = "/products/_placeholder.webp";

  // If no SKU, show placeholder
  const src = base ? `${base}-200.webp` : placeholder;

  return (
    <img
      className={
        className ??
        "rounded-md bg-neutral-100 object-cover shrink-0"
      }
      style={{ width: sizePx, height: sizePx }}
      src={src}
      srcSet={
        base
          ? `
            ${base}-200.webp 200w,
            ${base}-400.webp 400w,
            ${base}-800.webp 800w
          `
          : undefined
      }
      sizes={`${sizePx}px`}
      alt={name ? `${name} image` : "Product image"}
      loading="lazy"
      decoding="async"
      width={sizePx}
      height={sizePx}
      onError={(e) => {
        e.currentTarget.src = placeholder;
        e.currentTarget.srcset = "";
      }}
    />
  );
}
```

Why this is good:

* Downloads the smallest image that fits (mobile doesn’t fetch huge files)
* Lazy loads off-screen images
* Avoids layout shift (width/height set)
* Safe fallback if an image is missing

---

## Rendering 1,800 products without lag

Don’t render all rows at once. Use **virtualization**.

### Use `@tanstack/react-virtual`

* Smooth scrolling
* Renders only what’s visible

Pattern:

* Load JSON once
* Search/filter in memory
* Virtualize the list of results

If you want, I can paste a full `CatalogPage.tsx` using react-router v7 + react-virtual + Tailwind, ready to drop in.

---

## Update flow (every 6 months)

1. Replace `public/catalog/products.json`
2. Replace/add images in `public/products/`
3. Deploy

No migrations, no admin panels, no backend maintenance.

---

## Extra (nice B2B touches)

* CSV download link (procurement loves this)
* “Last updated: <date>” from the JSON
* “Request info” button (mailto or form) — since there’s no pricing

---

If you tell me how you want the catalog UI to look:

* **table view** (procurement-style) vs **cards** (modern catalog),
  I’ll give you the exact page + components layout for your Vite + RRv7 app.
