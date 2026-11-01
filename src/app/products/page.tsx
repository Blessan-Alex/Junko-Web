import type { Metadata } from 'next';
import { getCatalog } from '@/lib/catalog/get-catalog';
import { buildCategorySlugByName } from '@/lib/catalog/category-slugs';
import {
  getProductsIndexListingCopy,
  getProductsIndexMetadata,
} from '@/lib/catalog/category-seo';
import ProductsListingView from './ProductsListingView';

export async function generateMetadata(): Promise<Metadata> {
  return getProductsIndexMetadata();
}

export default async function ProductsPage() {
  const listingCopy = getProductsIndexListingCopy();
  const { categories, allProducts } = await getCatalog();
  const categorySlugByName = buildCategorySlugByName(categories);

  return (
    <ProductsListingView
      categories={categories}
      allProducts={allProducts}
      activeCategoryName={null}
      categorySlugByName={categorySlugByName}
      canonicalPath={listingCopy.canonicalPath}
      listingTitle={listingCopy.listingTitle}
      listingDescription={listingCopy.listingDescription}
    />
  );
}
