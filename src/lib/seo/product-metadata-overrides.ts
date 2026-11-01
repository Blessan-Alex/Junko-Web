export type ProductMetadataOverride = {
  title?: string;
  description?: string;
};

const BAG_CLOSING_THREAD_DESC =
  'Jute bag sewing thread, flour & rice bag stitching thread, and 100% polyester industrial bag closing thread supplier in Dubai & UAE. Junko FZE, Sharjah.';

const POLYESTER_THREAD_DESC =
  '100% polyester industrial bag closing thread for jute, woven PP, and kraft paper sacks. Flour & rice bag stitching thread supplier in Dubai & UAE from Junko FZE.';

const CREPE_TAPE_DESC =
  'Bag closing paper crêpe tape (kraft paper tape for bag stitching) supplier in UAE. Industrial crepe tape for sack lines from Junko FZE, Sharjah.';

const GK35_DESC =
  'GK35-6A automatic pneumatic bag closing sewing machine for kraft paper, PP & jute bags. Supplier in UAE & Dubai — Junko FZE, Sharjah.';

const FIELD_SCALE_DESC =
  'Industrial field scale & rugged weighing equipment supplier in UAE. Digital scales for warehouse and outdoor use from Junko FZE, Sharjah.';

const TABLE_TOP_SCALE_DESC =
  'Digital table top weighing scale supplier in UAE for retail and industrial bench use. Junko FZE — enquire for capacity and platform options, Sharjah.';

const OVERRIDES: Record<string, ProductMetadataOverride> = {
  'bag-closing-thread': { description: BAG_CLOSING_THREAD_DESC },
  '100-polyester-bag-closing-thread': { description: POLYESTER_THREAD_DESC },
  'crepe-paper-tape': { description: CREPE_TAPE_DESC },
  'crepe-paper-tape-1': { description: CREPE_TAPE_DESC },
  'crepe-paper-tape-2': { description: CREPE_TAPE_DESC },
  'gk35-6a': { description: GK35_DESC },
  'gk35-6a-1': { description: GK35_DESC },
  'field-scale': { description: FIELD_SCALE_DESC },
  'table-top-weighing-scale': { description: TABLE_TOP_SCALE_DESC },
  'table-top-weighing-scale-1': { description: TABLE_TOP_SCALE_DESC },
  'table-top-weighing-scale-2': { description: TABLE_TOP_SCALE_DESC },
};

export function getProductMetadataOverride(
  slug: string | undefined | null,
): ProductMetadataOverride | undefined {
  const key = slug?.trim();
  if (!key) return undefined;
  return OVERRIDES[key];
}
