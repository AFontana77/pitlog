import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ANIMALS, GEAR_CATEGORIES, RECIPES, getRegions } from '@/content';
import { Breadcrumbs, C, Card, CtaRow, Eyebrow, H1, H2, H3, Lede, P, Section } from '@/components/content/ui';

/**
 * /gear, category tier. No products, no prices, no links.
 *
 * pitlog.app IS now enrolled in Amazon Associates as of 2026-09-03, with its
 * own tracking ID (see src/content/commerce.ts). That is not what was blocking
 * this page. What is still missing is a verified product manifest: every gear
 * category in the spine is `category_defined_no_products`, and this lane does
 * not ship an ASIN it has not identity-checked. The page stays noindex until
 * one exists.
 *
 * It is real and useful in the meantime: which tool each cut and recipe
 * actually needs, ranked by how often the records ask for it.
 */
export const metadata: Metadata = {
  alternates: { canonical: 'https://pitlog.app/gear' },
  title: 'BBQ Gear by Cut: What Each Cook Actually Needs',
  description: 'The thermometer, paper, knife, cooler and fuel each cut and recipe calls for, ranked by how often it comes up. Categories only until verified product links exist.',
  robots: { index: false, follow: true },
};

export default function GearPage() {
  // Rank categories by how many records reference them.
  const counts = new Map<string, { cuts: string[]; recipes: string[] }>();
  for (const a of ANIMALS) {
    for (const r of getRegions(a.slug)) {
      for (const g of r.gear_category_refs) {
        const e = counts.get(g) ?? { cuts: [], recipes: [] };
        e.cuts.push(`/cuts/${a.slug}/${r.slug}|${a.name} ${r.name.toLowerCase()}`);
        counts.set(g, e);
      }
    }
  }
  for (const rec of RECIPES) {
    if (rec.status === 'PLANNED') continue;
    for (const g of rec.equipment_refs) {
      const e = counts.get(g) ?? { cuts: [], recipes: [] };
      e.recipes.push(`/recipes/${rec.slug}|${rec.title}`);
      counts.set(g, e);
    }
  }
  const ranked = GEAR_CATEGORIES.map((g) => ({ g, uses: counts.get(g.slug) ?? { cuts: [], recipes: [] } }))
    .filter((x) => x.uses.cuts.length + x.uses.recipes.length > 0)
    .sort((a, b) => b.uses.cuts.length + b.uses.recipes.length - (a.uses.cuts.length + a.uses.recipes.length));

  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">
        <Section tone="bgDeep">
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Gear', href: '/gear' }]} />
          <Eyebrow>Gear</Eyebrow>
          <H1>What each cook actually needs.</H1>
          <Lede>
            Ranked by how often the cut pages and recipes ask for it. Two thermometers top the list because USDA FSIS says
            so. No product links yet: when Pit Log carries them, every one will be a verified, current listing with the
            disclosure above it.
          </Lede>
        </Section>

        <Section>
          <ul className="grid md:grid-cols-2 gap-5">
            {ranked.map(({ g, uses }, i) => (
              <li key={g.slug}>
                <Card className="h-full">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="font-display text-xl" style={{ color: C.ember }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <H3 id={g.slug}>{g.name}</H3>
                  </div>
                  <P className="text-sm mb-3">{g.why}</P>
                  <p className="text-xs mb-2" style={{ color: C.textMuted }}>
                    Used on {uses.cuts.length} cut page{uses.cuts.length === 1 ? '' : 's'} and {uses.recipes.length} recipe{uses.recipes.length === 1 ? '' : 's'}.
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
                    {[...uses.cuts.slice(0, 4), ...uses.recipes.slice(0, 2)].map((u) => {
                      const [href, label] = u.split('|');
                      return (
                        <Link key={href} href={href} style={{ color: C.emberLight, textDecoration: 'underline' }}>
                          {label}
                        </Link>
                      );
                    })}
                  </div>
                  {g.direct_affiliate_candidates.length > 0 && (
                    <p className="text-xs mt-3" style={{ color: C.textMuted }}>
                      Brands we rate: {g.direct_affiliate_candidates.join(', ')}.
                    </p>
                  )}
                </Card>
              </li>
            ))}
          </ul>
        </Section>

        <Section tone="bgDeep">
          <Eyebrow>Honest note</Eyebrow>
          <H2>Why there are no buy buttons</H2>
          <P className="mb-8">
            A recommendation with a broken or wrong link is worse than none. Pit Log adds a product only when the exact
            item has been checked as live and correct, and only through a program the site is enrolled in. Until then,
            take the category, buy what you trust, and log the cook.
          </P>
          <CtaRow />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
