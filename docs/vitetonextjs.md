# Safe Migration Guide: Vite React SPA → Next.js

## Overview of Your Current Stack → Next.js Equivalents

```
┌─────────────────────────────────────────────────────────┐
│           CURRENT (Vite SPA)  →  TARGET (Next.js)       │
├─────────────────────────────────────────────────────────┤
│  Vite                         →  Next.js (built-in)     │
│  React Router DOM v7          →  App Router (file-based) │
│  React Helmet Async           →  Next.js Metadata API   │
│  Tailwind CSS v3              →  Tailwind CSS v3 (same) │
│  TypeScript                   →  TypeScript (same)      │
│  Client-side rendering        →  SSR / SSG / ISR        │
└─────────────────────────────────────────────────────────┘
```

---

## Phase 0: Pre-Migration Safety Steps

```bash
# 1. Create a backup branch FIRST
git checkout -b backup/vite-version
git add -A
git commit -m "backup: full working Vite SPA before Next.js migration"
git push origin backup/vite-version

# 2. Go back to main and create migration branch
git checkout main
git checkout -b migration/nextjs
```

---

## Phase 1: Initialize Next.js Project

### Step 1 — Create a fresh Next.js project alongside (not inside) your current project

```bash
# Navigate to parent directory
cd ..

# Create new Next.js project with your existing preferences
npx create-next-app@latest junko-web-next \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

### Step 2 — Install your existing dependencies in the new project

```bash
cd junko-web-next

# Install matching dependencies from your current package.json
npm install xlsx
# Add any other custom dependencies you have

# Remove react-router-dom (NOT needed — Next.js has its own routing)
# Remove react-helmet-async (NOT needed — Next.js has Metadata API)
```

### Step 3 — Copy over Tailwind config

```ts
// tailwind.config.ts (in new Next.js project)
// Merge your existing Vite project's tailwind.config with Next.js defaults

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ⬇️ PASTE your existing theme extensions here
      colors: {
        // your custom colors
      },
      fontFamily: {
        // your custom fonts
      },
    },
  },
  plugins: [
    // your existing plugins
  ],
};

export default config;
```

---

## Phase 2: Migrate Routing (The Big Change)

### Vite (React Router) → Next.js (App Router) File Structure

```
📁 VITE PROJECT (before)              📁 NEXT.JS PROJECT (after)
├── src/                               ├── src/
│   ├── pages/                         │   ├── app/
│   │   ├── Home.tsx                   │   │   ├── page.tsx           (Home)
│   │   ├── About.tsx                  │   │   ├── layout.tsx         (Root Layout)
│   │   ├── Products.tsx               │   │   ├── about/
│   │   ├── ProductDetail.tsx          │   │   │   └── page.tsx       (About)
│   │   └── Contact.tsx                │   │   ├── products/
│   ├── components/                    │   │   │   ├── page.tsx       (Products)
│   │   ├── Navbar.tsx                 │   │   │   └── [slug]/
│   │   ├── Footer.tsx                 │   │   │       └── page.tsx   (ProductDetail)
│   │   └── ...                        │   │   └── contact/
│   ├── App.tsx                        │   │       └── page.tsx       (Contact)
│   └── main.tsx                       │   ├── components/
│                                      │   │   ├── Navbar.tsx
│                                      │   │   ├── Footer.tsx
│                                      │   │   └── ...
│                                      │   └── globals.css
```

### Step 1 — Create Root Layout (replaces App.tsx + main.tsx)

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // or your font
import "@/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// ✅ This replaces react-helmet-async for default/global meta
export const metadata: Metadata = {
  title: {
    default: "Junko — Your Site Tagline",
    template: "%s | Junko",  // child pages auto-append
  },
  description: "Your default site description for SEO",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yoursite.com",
    siteName: "Junko",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### Step 2 — Convert a simple page (e.g., Home)

```tsx
// BEFORE: src/pages/Home.tsx (Vite)
// ─────────────────────────────────
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Junko — Home</title>
        <meta name="description" content="Welcome to Junko" />
      </Helmet>
      <div className="container mx-auto">
        <h1>Welcome to Junko</h1>
        {/* ... */}
      </div>
    </>
  );
};

export default Home;
```

```tsx
// AFTER: src/app/page.tsx (Next.js)
// ──────────────────────────────────
import type { Metadata } from "next";

// ✅ SEO — rendered on the SERVER, crawlers see it immediately
export const metadata: Metadata = {
  title: "Home",  // becomes "Home | Junko" via template
  description: "Welcome to Junko",
  openGraph: {
    title: "Junko — Home",
    description: "Welcome to Junko",
  },
};

// ✅ This is a SERVER component by default (great for SEO)
export default function HomePage() {
  return (
    <div className="container mx-auto">
      <h1>Welcome to Junko</h1>
      {/* ... */}
    </div>
  );
}
```

### Step 3 — Convert Dynamic Route (ProductDetail — THE KEY FOR SEO)

```tsx
// BEFORE: src/pages/ProductDetail.tsx (Vite + React Router)
// ──────────────────────────────────────────────────────────
// Used useParams() from react-router-dom
// Used react-helmet-async for dynamic OG tags
// ❌ Crawlers couldn't read any of this

// AFTER: src/app/products/[slug]/page.tsx (Next.js)
// ──────────────────────────────────────────────────
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Your data fetching function (adapt to your data source)
async function getProduct(slug: string) {
  // Option A: Fetch from API
  const res = await fetch(`https://your-api.com/products/${slug}`, {
    next: { revalidate: 3600 }, // ISR: revalidate every hour
  });

  if (!res.ok) return null;
  return res.json();

  // Option B: Read from local data/xlsx
  // const products = await readProductsFromXLSX();
  // return products.find(p => p.slug === slug);
}

// ✅ DYNAMIC METADATA — runs on server, crawlers see full OG tags
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

// ✅ Optional: Pre-generate all product pages at build time (SSG)
export async function generateStaticParams() {
  const products = await fetch("https://your-api.com/products").then(r =>
    r.json()
  );

  return products.map((product: { slug: string }) => ({
    slug: product.slug,
  }));
}

// ✅ The actual page component
export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <span className="text-xl font-semibold">${product.price}</span>

      {/* Interactive parts need client components */}
      <AddToCartButton productId={product.id} />
    </div>
  );
}
```

---

## Phase 3: Handle Client-Side Interactivity

```tsx
// Components with useState, useEffect, onClick, etc. need "use client"

// src/components/AddToCartButton.tsx
"use client"; // ← Add this directive at the TOP

import { useState } from "react";

export default function AddToCartButton({ productId }: { productId: string }) {
  const [added, setAdded] = useState(false);

  return (
    <button
      onClick={() => setAdded(true)}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      {added ? "Added ✓" : "Add to Cart"}
    </button>
  );
}
```

### Quick Rule of Thumb

```
┌──────────────────────────────────────────────────────┐
│  NEEDS "use client"              │  STAYS SERVER      │
├──────────────────────────────────┼────────────────────┤
│  useState / useEffect            │  Static content    │
│  onClick / onChange / onSubmit   │  Data fetching     │
│  Browser APIs (window, etc.)     │  Metadata export   │
│  Third-party client libraries    │  Database queries  │
│  Context Providers               │  Reading files     │
└──────────────────────────────────┴────────────────────┘
```

---

## Phase 4: Replace Navigation

```tsx
// BEFORE (React Router)
import { Link, useNavigate } from "react-router-dom";

<Link to="/products">Products</Link>

const navigate = useNavigate();
navigate("/products/123");

// ─────────────────────────────────

// AFTER (Next.js)
import Link from "next/link";
import { useRouter } from "next/navigation";

<Link href="/products">Products</Link>

const router = useRouter(); // only in "use client" components
router.push("/products/123");
```

---

## Phase 5: Static Assets & Public Folder

```bash
# Move static files
# Vite: public/ folder → Next.js: public/ folder (same concept!)
cp -r ../junko-web/public/* ./public/
```

---

## Phase 6: Environment Variables

```bash
# BEFORE (Vite)
VITE_API_URL=https://api.example.com
# Access: import.meta.env.VITE_API_URL

# AFTER (Next.js)
NEXT_PUBLIC_API_URL=https://api.example.com    # client-side
API_SECRET_KEY=secret123                        # server-only

# Access:
# Client: process.env.NEXT_PUBLIC_API_URL
# Server: process.env.API_SECRET_KEY
```

---

## Phase 7: SEO Extras (Why You're Doing This)

### Sitemap (auto-generated)

```tsx
// src/app/sitemap.ts
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all products for dynamic URLs
  const products = await fetch("https://your-api.com/products").then(r =>
    r.json()
  );

  const productUrls = products.map((product: any) => ({
    url: `https://yoursite.com/products/${product.slug}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://yoursite.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://yoursite.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...productUrls,
  ];
}
```

### Robots.txt

```tsx
// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://yoursite.com/sitemap.xml",
  };
}
```

### JSON-LD Structured Data (for product rich results)

```tsx
// src/app/products/[slug]/page.tsx (add inside the component)
export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* rest of your page */}
    </>
  );
}
```

---

## Migration Checklist

```
✅ Phase 0: Git backup branch created
✅ Phase 1: Next.js project initialized with TS + Tailwind
✅ Phase 2: Routes converted (file-based routing)
   □ Home → src/app/page.tsx
   □ About → src/app/about/page.tsx
   □ Products → src/app/products/page.tsx
   □ ProductDetail → src/app/products/[slug]/page.tsx
   □ Contact → src/app/contact/page.tsx
   □ (add all your other routes)
✅ Phase 3: Client components marked with "use client"
✅ Phase 4: Links & navigation updated
✅ Phase 5: Static assets moved to public/
✅ Phase 6: Env variables renamed VITE_ → NEXT_PUBLIC_
✅ Phase 7: SEO extras added (sitemap, robots, JSON-LD)
□ Remove react-router-dom from dependencies
□ Remove react-helmet-async from dependencies
□ Remove vite from dependencies
□ Test all pages with: npx next dev
□ Test OG tags with: https://www.opengraph.xyz/
□ Deploy to Vercel (recommended) or your hosting
```

---

## Verify It Worked

```bash
# Start dev server
npm run dev

# Test that crawlers see your meta tags (should show full HTML)
curl http://localhost:3000/products/your-product-slug

# You should see <title>, <meta og:title>, <meta og:image> etc.
# in the RAW HTML response — not injected by JavaScript
```

This is the core difference — **Vite SPA sends an empty `<div id="root">` and hopes JavaScript fills it in**, while **Next.js sends fully rendered HTML with all meta tags baked in from the server**. Crawlers from Google, Facebook, Twitter, WhatsApp, etc. all get the complete content immediately.