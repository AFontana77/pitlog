import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ANIMALS, GEAR_CATEGORIES, RECIPES, getRegions } from '@/content';
import { amazonUrl, hasProducts, productsFor, shortLabel } from '@/content/products';
import { AffiliateDisclosure } from '@/components/content/AffiliateDisclosure';
import { Breadcrumbs, C, Card, CtaRow, Eyebrow, H1, H2, H3, Lede, P, Section } from '@/components/content/ui';

/**
 * /gear. Categories ranked by how often the records ask for them, with the
 * verified picks for each.
 *
 * No prices, ever: see src/content/commerce.ts. Picks come from the manifest
 * built and gated by tools/gear/build_asin_manifest.py; a category with none
 * simply shows none, which is common and correct. Indexing follows the
 * manifest rather than a hardcoded flag, so this page cannot end up indexed
 * with nothing on it or noindexed with picks on it.
 */
export const metadata: Metadata = {
  alternates: { canonical: 'https://pitlog.app/gear' },
  title: 'BBQ Gear by Cut: What Each Cook Actually Needs',
  description: 'The thermometer, paper, knife, cooler and fuel each cut and recipe calls for, ranked by how often it comes up. Every pick checked against Amazon data.',
  // noindex while the page is a category list with nothing to click. It earns
  // indexing when it carries verified picks, and that flips from the manifest
  // rather than from someone remembering to come back and change it.
  robots: GEAR_CATEGORIES.some((g) => hasProducts(g.slug)) ? undefined : { index: false, follow: true },
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
            so. Where a pick is shown, its brand and product type were checked against Amazon&rsquo;s own catalogue record
            before it went on the page, and anything that failed that check is not here.
          </Lede>
          {GEAR_CATEGORIES.some((g) => hasProducts(g.slug)) && <AffiliateDisclosure />}
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
                  {productsFor(g.slug).length > 0 && (
                    <ul className="mb-3 space-y-1">
                      {productsFor(g.slug).map((pr) => (
                        <li key={pr.asin} className="text-sm">
                          <a
                            href={amazonUrl(pr.asin)}
                            target="_blank"
                            rel="nofollow sponsored noopener noreferrer"
                            style={{ color: C.emberLight, textDecoration: 'underline' }}
                          >
                            {shortLabel(pr)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
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
          <H2>How a pick gets on this page</H2>
          <P className="mb-4">
            A recommendation with a wrong link is worse than none, and a wrong link looks exactly like a right one. So a
            product gets here two ways at once. We find it the way you would, by searching Amazon. Then we look it up
            again in Amazon&rsquo;s own catalogue record and check that the brand, the product type and the category all
            say what the listing says.
          </P>
          <P className="mb-4">
            Anything that fails is dropped and the reason is kept. A leave-in probe sold as an instant-read gets dropped.
            An unnamed brand gets dropped. A listing that redirects somewhere else gets dropped. So does a second colour
            of a thing already on the list, because that is not a choice.
          </P>
          <P className="mb-8">
            Where you see no pick, nothing passed. That is the honest answer, and it is why smokers and grills are not
            here at all: those need a real buying guide, not whatever ranks first today.
          </P>
          <CtaRow />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
