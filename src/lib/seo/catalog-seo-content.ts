export type CategorySeoContent = {
  displayName: string;
  overview: string;
  bullets: [string, string, string];
  flagshipSlugs: string[];
};

export type CatalogHubSeoContent = {
  heading: string;
  overview: string;
  bullets: [string, string, string];
  categoryLinks: { label: string; path: string }[];
};

export type ProductSeoEnrichment = {
  heading: string;
  intro?: string;
  applicationNotes?: string;
  specRows: { label: string; value: string }[];
};

const CATEGORY_SEO_BY_SLUG: Record<string, CategorySeoContent> = {
  'bag-closing-threads': {
    displayName: 'Bag Closing Threads',
    overview:
      'Junko FZE supplies industrial bag closing thread, crepe paper tape, and sewing consumables from Sharjah for flour mills, grain handlers, cement and chemical sack lines, food packaging plants, and logistics warehouses across Dubai, Abu Dhabi, and the GCC. We stock polyester and spun threads for jute bags, woven PP sacks, and multi-wall kraft paper bags used on high-speed automatic bagging lines. Buyers choose Junko for consistent cone weights, correct ply counts for their closer model, and fast local delivery when production cannot wait on import lead times. Our team helps maintenance planners align thread lubrication and tape width with Fischbein, Newlong, and portable closer fleets running daily in UAE free-zone and mainland plants.',
    bullets: [
      'Thread ply, cone weight, and lubrication matched to GK35-6A, DS-9A, Fischbein, and Newlong NP-7A class closers.',
      'Crepe tape and monofilament options for dust-tight stitched closures on paper and PP export sacks.',
      'UAE warehouse stock with technical guidance for Sharjah, Dubai, and GCC sack-filling operations.',
    ],
    flagshipSlugs: [
      'sewing-thread',
      '100-polyester-bag-closing-thread',
      'crepe-paper-tape-2',
    ],
  },
  'bag-closing-machines': {
    displayName: 'Bag Closing Machines',
    overview:
      'From automatic bag closing systems and portable sewing heads to conveyors and infeed devices, Junko FZE equips industrial sack lines serving flour, rice, animal feed, cement, and chemical producers in the UAE and wider GCC. Our Sharjah team supports mills and packaging houses in Dubai and Abu Dhabi with machinery compatible with Union Special, Fischbein, and Newlong workflows, plus Yao Han and domestic OEM bag making equipment where lines need higher throughput. Whether you are upgrading a single head or a complete closing island, we help match stitch type, speed, and bag material to your plant layout. Spare heads, conveyor modules, and feeding devices can be quoted to reduce downtime when export sack demand peaks seasonally.',
    bullets: [
      'Automatic systems, machine heads, and portable closers for kraft, PP woven, and jute sacks.',
      'Conveyor and feeding modules to integrate with existing Fischbein / Newlong style bag lines.',
      'Installation advice, spare parts, and UAE-based support from Hamriyah Free Zone, Sharjah.',
    ],
    flagshipSlugs: ['gk35-6a', 'ds-9a', 'high-speed-bag-making-machine'],
  },
  'sealing-machines': {
    displayName: 'Sealing Machines',
    overview:
      'Heat sealers, continuous band sealers, impulse sealers, and heavy-duty bag sealing systems from Junko FZE support food, agricultural, and industrial packaging operations across the UAE. Plants in Sharjah and Dubai use our band and impulse equipment for pouch lines, bulk bag top-sealing, and warehouse repack stations serving retail and export logistics. We supply machines suited to PE, laminated films, and heavy gauge materials common in GCC climate conditions, with local stock for urgent line replacements and consumable seal bars where available. Sealing capacity and film type should match your shift length, humidity exposure, and pallet handling—our sales engineers help shortlist models before you commit capital.',
    bullets: [
      'Band sealers and impulse units for high-volume pouch and bag sealing in hot-climate warehouses.',
      'Heavy-duty bag sealers for stitched-sack lines needing heat-assisted closure.',
      'UAE stock and after-sales support for production and logistics teams in Dubai and the GCC.',
    ],
    flagshipSlugs: [
      'continuous-band-sealer-frb-770i',
      'fbh-32',
      'hand-impulse-sealer-600-800-1000-mm',
    ],
  },
  'filling-and-packing-machines': {
    displayName: 'Filling and Packing Machines',
    overview:
      'Carton sealers, shrink wrappers, strapping systems, and filling equipment from Junko FZE help end-of-line packing teams in UAE food, beverage, and industrial goods plants ship safely to regional distributors. Operations in Sharjah, Dubai, and Abu Dhabi rely on reliable carton closure and stretch/shrink packaging to protect pallet loads through Gulf humidity and long road transit. We align machine capacity with your SKU mix—from light consumer cartons to heavier industrial cases—and support integration with existing conveyor and strapping workflows. Project teams can bundle strapping tools, film, and spare parts with machine quotes to keep GCC export lanes running without fragmented suppliers.',
    bullets: [
      'Carton sealing and shrink lines for FMCG, agri, and industrial case packing.',
      'Strapping machines and tools for pallet stability in GCC logistics hubs.',
      'Local quotes, spare parts, and service coordination from Junko FZE, Sharjah.',
    ],
    flagshipSlugs: ['fxj-5050a', 'bs-4535la', 'kzb-a'],
  },
  'packaging-tools': {
    displayName: 'Packaging Tools',
    overview:
      'Hand strapping tools, tensioners, and packaging tools from Junko FZE support warehouse, construction, and manufacturing sites across the UAE that palletize cement, chemicals, food ingredients, and general freight. Teams in Dubai and Sharjah use pneumatic and manual tensioners daily; having correct tool spec and local availability reduces downtime when a line goes down mid-shift. Junko supplies industrial-grade tensioners and sealers matched to PET, polypropylene, and cord strap used in GCC export packing. Tooling is selected for strap width, joint type, and operator ergonomics so yard crews can maintain consistent pallet integrity through summer heat and long-haul trucking.',
    bullets: [
      'Manual and pneumatic strapping tools for warehouse and yard palletizing.',
      'Compatible with common PET and poly strap widths used in UAE export packing.',
      'Fast supply from Sharjah for maintenance teams and third-party logistics operators.',
    ],
    flagshipSlugs: [
      'pneumatic-strapping-tool',
      'heavy-duty-cord-strapping-tensioner',
      'strapping-sealer',
    ],
  },
  consumables: {
    displayName: 'Consumables',
    overview:
      'Needles, sewing machine oil, spare parts, spring balancers, and bag closing consumables keep packaging machinery running across UAE flour mills, rice packers, and industrial sewing stations. Junko FZE stocks Fischbein-class needles, organ and Groz-Beckert alternatives, and maintenance items so Sharjah and Dubai plants avoid costly air-freight on small parts. We support both automatic bag lines and field portable closers with the same industrial-grade consumables used in GCC export sack operations. Planned shutdowns and breakdown cover are easier when needles, oil, and wear parts are sourced locally with correct cross-reference to your installed machine models.',
    bullets: [
      'Industrial needles and oil for bag closing and overedging machine fleets.',
      'Spare parts and spring balancers for overhead closer installations.',
      'UAE warehouse readiness for planned maintenance and breakdown cover.',
    ],
    flagshipSlugs: ['fischbein-needles', 'swoil', 'bag-closing-thread'],
  },
  'weighing-scales': {
    displayName: 'Weighing Scales',
    overview:
      'Electronic and mechanical weighing scales from Junko FZE support agriculture, warehouse intake, retail back-of-house, and production-line checkweighing across the UAE and GCC. Field scales serve outdoor grain and feed operations; platform and table-top units fit logistics hubs in Dubai and Sharjah where accurate tonnage and piece counts matter for trade compliance. Junko helps buyers select capacity, platform size, and display options for harsh environments and high-traffic warehouse floors. Calibration support, capacity planning, and spare load cells can be discussed when scales serve critical intake or dispatch checkpoints for bulk commodities.',
    bullets: [
      'Field, platform, and table-top scales for agri, warehouse, and retail UAE operations.',
      'Capacity and platform options for pallet, sack, and piece-count applications.',
      'Local enquiry, demonstration, and support from Junko FZE, Sharjah.',
    ],
    flagshipSlugs: [
      'field-scale',
      'table-top-weighing-scale',
      'platform-type-weighing-scale',
    ],
  },
};

const CATALOG_HUB_SEO: CatalogHubSeoContent = {
  heading: 'Industrial Packaging Machinery Supplier in UAE & Dubai',
  overview:
    'Browse Junko FZE’s full catalog of bag closing machinery, industrial thread, heat sealing equipment, end-of-line packing systems, and weighing scales—stocked and supported from Sharjah for buyers across Dubai, Abu Dhabi, and the GCC. We serve flour and grain mills, cement and chemical sack plants, food packaging lines, and logistics warehouses that need reliable machinery, consumables, and spare parts without long import delays.',
  bullets: [
    'Bag closing machines, portable closers, and thread for sack and export packing lines.',
    'Sealing, strapping, and filling equipment for warehouse and production end-of-line.',
    'Weighing scales and consumables with UAE-based sales and technical support.',
  ],
  categoryLinks: [
    {
      label: 'Bag closing machines',
      path: '/products/bag-closing-machines',
    },
    {
      label: 'Bag closing threads',
      path: '/products/bag-closing-threads',
    },
    {
      label: 'Weighing scales',
      path: '/products/weighing-scales',
    },
  ],
};

const THREAD_SPEC_ROWS: { label: string; value: string }[] = [
  {
    label: 'Bag applications',
    value:
      'Jute bags, woven PP bags, multi-wall kraft paper bags, flour and rice sacks',
  },
  {
    label: 'Thread ply and material',
    value:
      '100% spun polyester 20/6, 20/9, 12/4; high-tenacity filament options',
  },
  {
    label: 'Cone weights',
    value: '200 g portable closer cones to 5 kg automatic bagging cones',
  },
  {
    label: 'Machine compatibility',
    value: 'GK35-6A, DS-9A, Fischbein, Newlong NP-7A',
  },
];

const PRODUCT_SEO_BY_SLUG: Record<string, ProductSeoEnrichment> = {
  'bag-closing-thread': {
    heading: 'Industrial bag closing thread specifications',
    intro:
      'Polyester bag closing thread for automatic and portable sack lines in the UAE.',
    applicationNotes:
      'Used on jute, PP woven, and kraft paper sacks in flour mills, rice packers, and logistics warehouses across Dubai and Sharjah.',
    specRows: THREAD_SPEC_ROWS,
  },
  '100-polyester-bag-closing-thread': {
    heading: '100% polyester bag closing thread',
    intro:
      'High-tenacity polyester thread for industrial bag stitching and export sack lines.',
    applicationNotes:
      'Ideal for multi-wall paper and woven PP bags where consistent ply and cone weight reduce changeover downtime on GK35-6A and DS-9A class closers.',
    specRows: THREAD_SPEC_ROWS,
  },
  'crepe-paper-tape-2': {
    heading: 'Kraft crêpe paper tape for bag closing',
    intro:
      'Bag closing paper crêpe tape for stitched sack lines requiring sift-proof closure.',
    applicationNotes:
      'Applied on kraft and PP export bags in food, grain, and chemical packing across the GCC.',
    specRows: [
      {
        label: 'Material',
        value: 'Kraft crêpe paper tape for bag stitching applications',
      },
      {
        label: 'Typical widths',
        value: 'Industrial widths for automatic tape feeders and manual bench apply',
      },
      {
        label: 'Elongation',
        value: 'Crêpe structure allows conforming to sack curves without tearing',
      },
      {
        label: 'Sealing performance',
        value:
          'Dust and sift-resistant closure when combined with stitched paper or PP bags',
      },
    ],
  },
  'field-scale': {
    heading: 'Industrial field scale applications',
    intro:
      'Rugged weighing equipment for outdoor and yard operations in the UAE.',
    applicationNotes:
      'Suited to agriculture intake, feed mills, construction material yards, and warehouse loading bays in Sharjah, Dubai, and regional GCC sites.',
    specRows: [
      {
        label: 'Primary use',
        value: 'Field and platform weighing for bulk materials and palletized goods',
      },
      {
        label: 'Environment',
        value: 'Outdoor and semi-covered yards typical of UAE agri and logistics',
      },
      {
        label: 'Operations',
        value: 'Intake weighing, dispatch checks, and inventory verification',
      },
    ],
  },
  'table-top-weighing-scale': {
    heading: 'Digital table top weighing scale',
    intro:
      'Bench scales for production lines, retail back-of-house, and QC stations.',
    applicationNotes:
      'Used in UAE food processing, spare parts counting, and warehouse pick stations where compact footprint and readable displays matter.',
    specRows: [
      {
        label: 'Primary use',
        value: 'Piece count, small batch, and checkweigh on production benches',
      },
      {
        label: 'Industries',
        value: 'Food packaging, industrial components, retail prep, logistics hubs',
      },
      {
        label: 'UAE supply',
        value: 'Enquire for capacity, platform size, and connectivity from Junko FZE, Sharjah',
      },
    ],
  },
  'gk35-6a': {
    heading: 'GK35-6A automatic bag closing sewing system',
    intro:
      'Pneumatic bag closing sewing head for high-speed sack lines.',
    applicationNotes:
      'Closes kraft paper, PP woven, and jute bags on automatic lines serving flour, rice, feed, and industrial bulk packing in the UAE and GCC.',
    specRows: [
      {
        label: 'Bag materials',
        value: 'Kraft paper, PP woven, jute, and multi-wall export sacks',
      },
      {
        label: 'Operation',
        value: 'Automatic pneumatic bag closing sewing head for continuous lines',
      },
      {
        label: 'Stitch type',
        value: 'Double-thread chain stitch for industrial sack closure',
      },
      {
        label: 'Regional support',
        value: 'Supply, spare parts, and service from Junko FZE, Sharjah',
      },
    ],
  },
};

export function getCategorySeoContent(
  slug: string | null | undefined,
): CategorySeoContent | undefined {
  if (!slug) return undefined;
  return CATEGORY_SEO_BY_SLUG[slug.trim().toLowerCase()];
}

export function getCatalogHubSeoContent(): CatalogHubSeoContent {
  return CATALOG_HUB_SEO;
}

export function getProductSeoEnrichment(
  slug: string | null | undefined,
): ProductSeoEnrichment | undefined {
  if (!slug) return undefined;
  const key = slug.trim().toLowerCase();
  const direct = PRODUCT_SEO_BY_SLUG[key];
  if (direct) return direct;
  const baseKey = key.replace(/-\d+$/, '');
  if (baseKey !== key) {
    return PRODUCT_SEO_BY_SLUG[baseKey];
  }
  return undefined;
}
