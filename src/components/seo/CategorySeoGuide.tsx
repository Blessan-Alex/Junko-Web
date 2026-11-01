import Link from 'next/link';
import type { Product } from '@/data/products';
import type { CategorySeoContent } from '@/lib/seo/catalog-seo-content';
import { publicProductHref } from '@/lib/catalog/public-slug';

type CategorySeoGuideProps = {
  content: CategorySeoContent;
  allProducts: Product[];
};

export default function CategorySeoGuide({
  content,
  allProducts,
}: CategorySeoGuideProps) {
  const bySlug = new Map(
    allProducts
      .map((p) => {
        const href = publicProductHref(p.slug, p.id);
        const slugKey = p.slug?.trim().toLowerCase();
        return href && slugKey
          ? ([slugKey, { href, name: p.name }] as const)
          : null;
      })
      .filter(Boolean) as [string, { href: string; name: string }][],
  );

  const flagshipLinks = content.flagshipSlugs
    .map((slug) => {
      const row = bySlug.get(slug.toLowerCase());
      return row ? { slug, ...row } : null;
    })
    .filter(Boolean) as { slug: string; href: string; name: string }[];

  return (
    <section
      aria-label="Category industrial guide"
      className="border-t border-gray-200 dark:border-white/10 bg-[#fdfcfc] dark:bg-[#0f0c1b]"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <h2 className="text-2xl md:text-3xl font-bold font-serif text-text-main dark:text-white mb-6">
          Industrial {content.displayName} Supplier in UAE &amp; Dubai
        </h2>
        <p className="text-text-sub dark:text-gray-300 text-lg leading-relaxed mb-8 border-l-4 border-primary pl-4 max-w-4xl">
          {content.overview}
        </p>
        <ul className="space-y-3 mb-10 max-w-3xl">
          {content.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-3 text-text-sub dark:text-gray-300 text-base leading-relaxed"
            >
              <span className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0">
                check_circle
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        {flagshipLinks.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            <span className="text-sm font-bold uppercase tracking-wider text-text-sub dark:text-gray-400 w-full">
              Featured products
            </span>
            {flagshipLinks.map((link) => (
              <Link
                key={link.slug}
                href={link.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-text-main dark:text-white font-semibold text-sm hover:border-primary hover:text-primary transition-colors"
              >
                {link.name}
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
