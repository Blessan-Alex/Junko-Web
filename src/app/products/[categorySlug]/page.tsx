import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCatalog } from '@/lib/catalog/get-catalog';
import {
  buildCategorySlugByName,
  categoryNameToSlug,
  resolveCategorySlug,
} from '@/lib/catalog/category-slugs';
import {
  getCategoryListingCopy,
  getCategoryListingMetadata,
} from '@/lib/catalog/category-seo';
import ProductsListingView from '../ProductsListingView';

type CategoryProductsPageProps = {
  params: Promise<{ categorySlug: string }>;
};

export const dynamicParams = true;

export async function generateStaticParams() {
  const { categories } = await getCatalog();
  return categories.map((category) => ({
    categorySlug: categoryNameToSlug(category.name),
  }));
}

export async function generateMetadata({
  params,
}: CategoryProductsPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const { categories } = await getCatalog();
  const categoryName = resolveCategorySlug(categorySlug, categories);
  if (!categoryName) {
    return { title: 'Category Not Found' };
  }
  return getCategoryListingMetadata(categoryName, categorySlug);
}

export default async function CategoryProductsPage({
  params,
}: CategoryProductsPageProps) {
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
      canonicalPath={listingCopy.canonicalPath}
      listingTitle={listingCopy.listingTitle}
      listingDescription={listingCopy.listingDescription}
    />
  );
}
