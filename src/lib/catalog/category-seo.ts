import type { Metadata } from 'next';
import type { Product } from '@/data/products';
import { truncateMetaDescription } from '@/lib/catalog/product-copy';
import { categoryNameToSlug } from '@/lib/catalog/category-slugs';
import { absoluteCanonical } from '@/lib/seo/site';

const CATEGORY_META_SUFFIX =
  'In stock at Junko FZE (Hamriyah Free Zone, Sharjah) with fast delivery across Dubai, UAE, Oman & GCC.';

function truncateListingTitle(title: string, max = 58): string {
  if (title.length <= max) return title;
  return `${title.slice(0, max - 1).trimEnd()}…`;
}

export function buildCategoryMetaDescription(
  categoryName: string,
  productsInCategory: Product[],
): string {
  const examples = [...new Set(productsInCategory.map((p) => p.name.trim()))]
    .filter(Boolean)
    .slice(0, 3);
  const exampleText =
    examples.length > 0
      ? ` Including ${examples.join(', ')}.`
      : ` Browse ${categoryName} for industrial packaging.`;
  const lead = `${categoryName} supplier in UAE —${exampleText} ${CATEGORY_META_SUFFIX}`;
  return truncateMetaDescription(lead, 160);
}

export function getProductsIndexListingCopy() {
  return {
    canonicalPath: '/products',
    listingTitle:
      'Packaging Machinery, Bag Closing Machines & Thread Catalog – UAE Supplier | Junko FZE',
    listingDescription:
      'Browse bag closing machines, sealing equipment, industrial thread, and weighing scales from a UAE packaging machinery supplier. Fast supply across Sharjah, Dubai, Abu Dhabi & GCC.',
  };
}

export function getCategoryListingCopy(
  categoryName: string,
  categorySlug: string,
  productsInCategory: Product[] = [],
) {
  const listingTitle = truncateListingTitle(
    `${categoryName} Supplier in UAE & Dubai – Industrial Packaging | Junko FZE`,
  );
  return {
    canonicalPath: `/products/${categorySlug}`,
    listingTitle,
    listingDescription: buildCategoryMetaDescription(
      categoryName,
      productsInCategory,
    ),
  };
}

export function getProductsIndexMetadata(): Metadata {
  const { canonicalPath, listingTitle, listingDescription } =
    getProductsIndexListingCopy();
  const canonical = absoluteCanonical(canonicalPath);

  return {
    title: { absolute: listingTitle },
    description: listingDescription,
    alternates: { canonical },
    openGraph: {
      title: listingTitle,
      description: listingDescription,
      url: canonical,
      type: 'website',
    },
  };
}

export function getCategoryListingMetadata(
  categoryName: string,
  categorySlug: string,
  productsInCategory: Product[] = [],
): Metadata {
  const { canonicalPath, listingTitle, listingDescription } =
    getCategoryListingCopy(categoryName, categorySlug, productsInCategory);
  const canonical = absoluteCanonical(canonicalPath);

  return {
    title: { absolute: listingTitle },
    description: listingDescription,
    alternates: { canonical },
    openGraph: {
      title: listingTitle,
      description: listingDescription,
      url: canonical,
      type: 'website',
    },
  };
}

/** For SEO audit script — static + category listing metadata. */
export function getAllListingMetadataForAudit(
  categories: { name: string }[],
  allProducts: Product[] = [],
): { path: string; title: string; description: string }[] {
  const index = getProductsIndexListingCopy();
  const rows = [
    {
      path: '/products',
      title: index.listingTitle,
      description: index.listingDescription,
    },
  ];
  for (const c of categories) {
    const slug = categoryNameToSlug(c.name);
    const inCategory = allProducts.filter((p) => p.category === c.name);
    const copy = getCategoryListingCopy(c.name, slug, inCategory);
    rows.push({
      path: copy.canonicalPath,
      title: copy.listingTitle,
      description: copy.listingDescription,
    });
  }
  return rows;
}
