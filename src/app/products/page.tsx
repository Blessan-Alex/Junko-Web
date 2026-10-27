import type { Metadata } from 'next';
import { getCatalog } from '@/lib/catalog/get-catalog';
import { buildCategorySlugByName } from '@/lib/catalog/category-slugs';
import {
  getProductsIndexListingCopy,
  getProductsIndexMetadata,
  parseListingPageNum,
} from '@/lib/catalog/category-seo';
import ProductsListingView from './ProductsListingView';

type ProductsPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({
  searchParams,
}: ProductsPageProps): Promise<Metadata> {
  const { page } = await searchParams;
  return getProductsIndexMetadata(page);
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { page } = await searchParams;
  const pageNumber = parseListingPageNum(page);
  const listingCopy = getProductsIndexListingCopy();
  const { categories, allProducts } = await getCatalog();
  const categorySlugByName = buildCategorySlugByName(categories);

  return (
    <ProductsListingView
      categories={categories}
      allProducts={allProducts}
      activeCategoryName={null}
      categorySlugByName={categorySlugByName}
      pageNumber={pageNumber}
      canonicalPath={listingCopy.canonicalPath}
      listingTitle={listingCopy.listingTitle}
      listingDescription={listingCopy.listingDescription}
    />
  );
}
