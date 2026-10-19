import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import ProductsClient from './ProductsClient';
import { getCatalog } from '@/lib/catalog/get-catalog';

export const metadata: Metadata = {
  title: "Industrial Packaging Machinery Catalog | Junko FZE",
  description: "Browse our complete catalog of industrial bag closing machines, sealers, and consumers. High-performance machinery for your production line.",
  alternates: { canonical: '/products' },
  openGraph: {
    title: "Industrial Packaging Machinery Catalog | Junko FZE",
    description: "Browse our complete catalog of industrial bag closing machines, sealers, and consumers. High-performance machinery for your production line.",
    url: '/products',
    type: 'website',
  }
};

export default async function ProductsPage() {
  const { categories, allProducts } = await getCatalog();

  return (
    <>
      <Suspense fallback={<div className="flex justify-center items-center py-20">Loading catalog...</div>}>
        <ProductsClient categories={categories} allProducts={allProducts} />
      </Suspense>
      {/* Server-rendered product links for SEO crawlability */}
      <nav className="sr-only" aria-label="Complete product catalog">
        <ul>
          {allProducts.map(p => (
            <li key={p.id}>
              <a href={`/product/${p.slug || p.id}`}>{p.name} — {p.category}</a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
