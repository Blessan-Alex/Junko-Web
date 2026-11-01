import Link from 'next/link';
import type { CatalogHubSeoContent } from '@/lib/seo/catalog-seo-content';

type CatalogHubSeoSectionProps = {
  content: CatalogHubSeoContent;
};

export default function CatalogHubSeoSection({
  content,
}: CatalogHubSeoSectionProps) {
  return (
    <section
      aria-label="Catalog industrial guide"
      className="border-t border-gray-200 dark:border-white/10 bg-[#fdfcfc] dark:bg-[#0f0c1b]"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <h2 className="text-2xl md:text-3xl font-bold font-serif text-text-main dark:text-white mb-6">
          {content.heading}
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
        <div className="flex flex-wrap gap-4">
          <span className="text-sm font-bold uppercase tracking-wider text-text-sub dark:text-gray-400 w-full">
            Browse by category
          </span>
          {content.categoryLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-text-main dark:text-white font-semibold text-sm hover:border-primary hover:text-primary transition-colors"
            >
              {link.label}
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
