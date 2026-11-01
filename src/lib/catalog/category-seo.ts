import type { Metadata } from 'next';
import { categoryNameToSlug } from '@/lib/catalog/category-slugs';

const CATEGORY_LISTING_DESCRIPTIONS: Record<string, string> = {
  'bag-closing-machines':
    'Bag closing machines, portable closers, conveyors, and feeding systems for high-volume sack and bag lines. Browse Junko FZE catalog with UAE supply and support.',
  'bag-closing-threads':
    'Bag closing thread, crepe tape, monofilament yarn, and sewing consumables for industrial bag lines. Quality supplies from Junko FZE, Sharjah.',
  'carpet-overedging-machines':
    'Carpet overedging, binding, and fringe machines for textile finishing. Explore Junko FZE industrial sewing equipment for the GCC.',
  consumables:
    'Needles, oil, spare parts, spring balancers, and maintenance consumables for packaging machinery. Junko FZE — enquire for fast UAE supply.',
  'filling-and-packing-machines':
    'Carton sealers, shrink wrappers, strapping systems, and filling equipment for end-of-line packing. View Junko FZE filling and packing machines.',
  'packaging-materials':
    'Packaging materials and production supplies for industrial packing operations. Browse Junko FZE material solutions for UAE manufacturers.',
  'packaging-tools':
    'Hand strapping tools, tensioners, and packaging tools for warehouse and production use. Junko FZE tools — request a quote.',
  'portable-bag-closers':
    'Portable bag closers and battery chain-stitch machines for field and plant use. Compare models from Junko FZE with UAE technical support.',
  'sealing-machines':
    'Heat sealers, band sealers, impulse sealers, and heavy-duty bag sealing systems. Junko FZE sealing machines for food, agri, and industrial bags.',
  'weighing-scales':
    'Electronic and mechanical weighing scales for warehouse, retail, and industrial use. Junko FZE scales — enquire for capacity and platform options.',
};

function categoryListingDescription(categoryName: string, categorySlug: string): string {
  const custom = CATEGORY_LISTING_DESCRIPTIONS[categorySlug];
  if (custom) return custom;
  return `Browse ${categoryName} in the Junko FZE industrial catalog — packaging machinery and supplies for UAE and GCC production lines.`;
}

function truncateListingTitle(title: string, max = 58): string {
  if (title.length <= max) return title;
  return `${title.slice(0, max - 1).trimEnd()}…`;
}

export function getProductsIndexListingCopy() {
  return {
    canonicalPath: '/products',
    listingTitle: 'Packaging Machinery Catalog | Junko FZE',
    listingDescription:
      'Full catalog of bag closing, sealing, weighing, and packing machinery plus consumables. Filter by category and request quotes from Junko FZE, UAE.',
  };
}

export function getCategoryListingCopy(categoryName: string, categorySlug: string) {
  const listingTitle = truncateListingTitle(
    `${categoryName} | Junko FZE Catalog`,
  );
  return {
    canonicalPath: `/products/${categorySlug}`,
    listingTitle,
    listingDescription: categoryListingDescription(categoryName, categorySlug),
  };
}

export function getProductsIndexMetadata(): Metadata {
  const { canonicalPath, listingTitle, listingDescription } =
    getProductsIndexListingCopy();
  const title = listingTitle;
  const description = listingDescription;
  const canonical = canonicalPath;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
    },
  };
}

export function getCategoryListingMetadata(
  categoryName: string,
  categorySlug: string,
): Metadata {
  const { canonicalPath, listingTitle, listingDescription } =
    getCategoryListingCopy(categoryName, categorySlug);
  const canonical = canonicalPath;
  const title = listingTitle;
  const description = listingDescription;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
    },
  };
}

/** For SEO audit script — static + category listing metadata. */
export function getAllListingMetadataForAudit(
  categories: { name: string }[],
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
    const copy = getCategoryListingCopy(c.name, slug);
    rows.push({
      path: copy.canonicalPath,
      title: copy.listingTitle,
      description: copy.listingDescription,
    });
  }
  return rows;
}
