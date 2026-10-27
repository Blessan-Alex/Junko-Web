import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCatalog } from '@/lib/catalog/get-catalog';
import {
  buildCategorySlugByName,
  resolveCategorySlug,
} from '@/lib/catalog/category-slugs';
import {
  getCategoryListingCopy,
  getCategoryListingMetadata,
  parseListingPageNum,
} from '@/lib/catalog/category-seo';
import ProductsListingView from '../ProductsListingView';

type CategoryProductsPageProps = {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: CategoryProductsPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const { page } = await searchParams;
  const { categories } = await getCatalog();
  const categoryName = resolveCategorySlug(categorySlug, categories);
  if (!categoryName) {
    return { title: 'Category Not Found' };
  }
  return getCategoryListingMetadata(categoryName, categorySlug, page);
}

export default async function CategoryProductsPage({
  params,
  searchParams,
}: CategoryProductsPageProps) {
  const { page } = await searchParams;
  const pageNumber = parseListingPageNum(page);
  const { categorySlug } = await params;
  const { categories, allProducts } = await getCatalog();
  const categoryName = resolveCategorySlug(categorySlug, categories);
  if (!categoryName) {
    notFound();
  }
  const categorySlugByName = buildCategorySlugByName(categories);
  const listingCopy = getCategoryListingCopy(categoryName, categorySlug);

  return (
    <ProductsListingView
      categories={categories}
      allProducts={allProducts}
      activeCategoryName={categoryName}
      categorySlugByName={categorySlugByName}
      pageNumber={pageNumber}
      canonicalPath={listingCopy.canonicalPath}
      listingTitle={listingCopy.listingTitle}
      listingDescription={listingCopy.listingDescription}
    />
  );
}
