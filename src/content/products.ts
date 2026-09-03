import manifest from '../../content/gear/product_manifest.json';
import { AMAZON_ASSOCIATES_TAG } from './commerce';

/**
 * Verified products, per gear or ingredient category.
 *
 * The manifest is built and gated by tools/gear/build_asin_manifest.py, which
 * discovers candidates from the Amazon SERP and then verifies each one against
 * Keepa's catalogue record: brand, normalised product type, category tree,
 * sales rank and isRedirectASIN. Nothing reaches this file that has not passed
 * that gate, and every rejection is kept in the manifest with its reason.
 *
 * This module is the ONLY place an Amazon URL is built. That is deliberate: a
 * tag appended in one component and forgotten in another is how a property
 * ends up sending free traffic, and there is no error message for it.
 */

export interface VerifiedProduct {
  asin: string;
  keepa_title: string;
  brand: string | null;
  part_number: string | null;
  category_tree: string[];
  sales_rank: number | null;
  rating: number | null;
  reviews: number | null;
}

type Entry = { status: string; products?: VerifiedProduct[]; rejected?: unknown[] };
type Manifest = {
  _meta: { verified_on: string; associates_tag: string };
  gear: Record<string, Entry>;
  ingredients: Record<string, Entry>;
};

const M = manifest as unknown as Manifest;

export const MANIFEST_VERIFIED_ON = M._meta.verified_on;

/**
 * A product link. `nofollow sponsored` is required of paid links, and opening
 * in a new tab keeps the reader's place in a recipe they are cooking from.
 */
export function amazonUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_ASSOCIATES_TAG}&linkCode=ll1&language=en_US`;
}

function entryFor(slug: string): Entry | undefined {
  return M.gear[slug] ?? M.ingredients[slug];
}

/** Verified products for a category, best first. Empty when none passed. */
export function productsFor(slug: string): VerifiedProduct[] {
  const e = entryFor(slug);
  return e && e.status === 'VERIFIED' ? e.products ?? [] : [];
}

export function hasProducts(slug: string): boolean {
  return productsFor(slug).length > 0;
}

/** True when ANY of these categories can render a paid link, which is what decides whether a page must carry the disclosure. */
export function anyProducts(slugs: string[]): boolean {
  return slugs.some(hasProducts);
}

/**
 * A shorter label than the raw Amazon title, which is keyword salad by design.
 * Brand plus the first clause is what a reader actually needs to identify it on
 * the shelf. The full title stays in the manifest and in the link target, so
 * nothing is being hidden; this is only what we print.
 */
export function shortLabel(p: VerifiedProduct): string {
  // Split on commas, pipes and SPACED dashes only. Splitting on a bare hyphen
  // cuts hyphenated words in half, which turned "Lavatools Javelin Ultra-Fast
  // 3-Second Digital Instant Read Thermometer" into "Lavatools Javelin Ultra".
  // Then drop the marketing tail that starts at "for" or "with", which is where
  // an Amazon title stops describing the product and starts listing use cases.
  const cleaned = p.keepa_title.replace(/[®™]/g, '');
  const first = cleaned.split(/,|\||\s[–—-]\s/)[0].split(/\s(?:for|with)\s/i)[0].trim();
  const brand = (p.brand ?? '').trim();
  // Prepend the brand only when the title does not already open with it.
  // Neither an exact prefix nor a first-word test is enough: Keepa's brand for
  // one butcher paper is "PH PERKHOMY" while its title opens "PerkHomy", so
  // both produced "PH PERKHOMY PerkHomy ...". Treat the title as branded if its
  // opening word is any substantial word of the brand.
  const words = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(/\s+/).filter(Boolean);
  const brandWords = words(brand);
  const titleOpener = words(first)[0] ?? '';
  const titleOpensWithBrand =
    brandWords.length > 0 && titleOpener.length >= 3 && brandWords.some((w) => w.length >= 3 && w === titleOpener);
  let label = titleOpensWithBrand ? first : [brand, first].filter(Boolean).join(' ').trim();

  // Keep the size. Trimming the title at the first comma reads well but throws
  // away the one attribute that is usually the actual decision: a 10 inch
  // skillet and a 12 inch skillet are the same words otherwise, and so are a
  // 60 foot and a 200 foot roll of butcher paper.
  const size = cleaned.match(/\b\d+(?:\.\d+)?\s*(?:"|''|inch(?:es)?|in\b|qt\b|quart|ft\b|feet|oz\b|lb\b|gallon)/i);
  if (size && !label.toLowerCase().includes(size[0].toLowerCase().trim())) {
    label += `, ${size[0].trim()}`;
  }
  return label.length > 72 ? label.slice(0, 69).trimEnd() + '…' : label;
}
