import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: "Industrial Catalog",
  description: "Browse our complete catalog of industrial bag closing machines, sealers, and consumers. High-performance machinery for your production line.",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center py-20">Loading catalog...</div>}>
      <ProductsClient />
    </Suspense>
  );
}
