import type { ProductSeoEnrichment } from '@/lib/seo/catalog-seo-content';

type ProductSeoEnrichmentSectionProps = {
  enrichment: ProductSeoEnrichment;
};

export default function ProductSeoEnrichmentSection({
  enrichment,
}: ProductSeoEnrichmentSectionProps) {
  return (
    <section
      aria-label="Industrial application and specifications"
      className="py-16 border-t border-gray-200 dark:border-white/10"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-text-main dark:text-white mb-4 font-serif">
          {enrichment.heading}
        </h2>
        {enrichment.intro ? (
          <p className="text-text-sub dark:text-gray-300 text-lg leading-relaxed mb-4 border-l-4 border-primary pl-4">
            {enrichment.intro}
          </p>
        ) : null}
        {enrichment.applicationNotes ? (
          <p className="text-text-sub dark:text-gray-400 text-base leading-relaxed mb-10">
            {enrichment.applicationNotes}
          </p>
        ) : null}
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              Industrial application specifications
            </caption>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {enrichment.specRows.map((row, index) => (
                <tr
                  key={row.label}
                  className={`group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${
                    index % 2 === 0
                      ? 'bg-white dark:bg-black/20'
                      : 'bg-gray-50/50 dark:bg-white/5'
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-text-sub dark:text-gray-400 w-1/3 group-hover:text-primary transition-colors">
                    {row.label}
                  </td>
                  <td className="px-6 py-4 text-text-main dark:text-white font-medium">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
