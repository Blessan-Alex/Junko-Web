import React, { Suspense } from 'react';
import type { Category, Product } from '@/data/products';
import ProductsClient from './ProductsClient';
import ProductsCatalogHeader from './ProductsCatalogHeader';
import ProductsServerFirstPageLinks from './ProductsServerFirstPageLinks';
import {
  filterProductsByCategory,
  getFirstPageProducts,
} from '@/lib/catalog/listing-filters';
import { buildListingCollectionPageJsonLd } from '@/lib/catalog/listing-json-ld';
import { PUBLIC_PRODUCTS_PAGE_SIZE } from '@/lib/catalog/public-page-size';

type ProductsListingViewProps = {
  categories: Category[];
  allProducts: Product[];
  activeCategoryName: string | null;
  categorySlugByName: Record<string, string>;
  pageNumber?: number;
  canonicalPath: string;
  listingTitle: string;
  listingDescription: string;
};

export default function ProductsListingView({
  categories,
  allProducts,
  activeCategoryName,
  categorySlugByName,
  pageNumber = 1,
  canonicalPath,
  listingTitle,
  listingDescription,
}: ProductsListingViewProps) {
  const filtered = filterProductsByCategory(allProducts, activeCategoryName);
  const firstPage = getFirstPageProducts(filtered, PUBLIC_PRODUCTS_PAGE_SIZE);

  const collectionPageJsonLd =
    pageNumber === 1
      ? buildListingCollectionPageJsonLd({
          name: listingTitle,
          description: listingDescription,
          canonicalPath,
          filteredProducts: filtered,
        })
      : null;

  return (
    <>
      {collectionPageJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(collectionPageJsonLd),
          }}
        />
      )}
      <Suspense
        fallback={
          <div className="flex justify-center items-center py-20">
            Loading catalog...
          </div>
        }
      >
        <ProductsClient
          categories={categories}
          allProducts={allProducts}
          activeCategoryName={activeCategoryName}
          categorySlugByName={categorySlugByName}
        >
          <ProductsCatalogHeader selectedCategory={activeCategoryName} />
          <ProductsServerFirstPageLinks products={firstPage} />
        </ProductsClient>
      </Suspense>
      <nav className="sr-only" aria-label="Complete product catalog">
        <ul>
          {allProducts.map((p) => (
            <li key={p.id}>
              <a href={`/product/${p.slug || p.id}`}>
                {p.name} — {p.category}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
