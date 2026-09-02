import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import catalog from '../../../content/pod/catalog.json';
import { MATTE_VARIANTS, PRINT_SPEC, suggestRetail } from '@/lib/pod/printful';
import { Breadcrumbs, C, Card, Eyebrow, H1, H2, H3, Lede, P, Section, Td, Th, Tr } from '@/components/content/ui';

/**
 * /posters, PREVIEW ONLY. Renders only when POD_PREVIEW=true (never on the
 * public production build) and is noindex regardless. No product is
 * purchasable: there is no Printful account, no print master at resolution,
 * no verified price and no mockup. This page exists so the catalog, pricing
 * model and layout can be reviewed before any of that lands.
 */
export const metadata: Metadata = {
  title: 'Pit Log Posters (preview)',
  robots: { index: false, follow: false },
};

type Product = (typeof catalog)['products'][number];

export default function PostersPreviewPage() {
  if (process.env.POD_PREVIEW !== 'true') notFound();
  const products = catalog.products as Product[];
  const families = catalog.families as Record<string, string>;
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">
        <Section tone="bgDeep">
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Posters', href: '/posters' }]} />
          <Eyebrow>Preview. Not for sale.</Eyebrow>
          <H1>Pit Log posters.</H1>
          <Lede>
            The cut guides and the smoke wood chart as prints for the kitchen and the pit. Provider: Printful. Nothing here
            can be bought yet; this page is a review surface for the catalog and the pricing model.
          </Lede>
          <Card>
            <H3>Blockers before launch</H3>
            <P className="text-sm">Printful account and payouts (owner). Print masters at 5400 px or better. Safety defects fixed on the species masters. Mockups. A tested fulfilment path.</P>
          </Card>
        </Section>

        {Object.entries(families).map(([key, label]) => (
          <Section key={key} tone={key === 'B' ? 'surface' : 'bg'}>
            <Eyebrow>Family {key}</Eyebrow>
            <H2>{label}</H2>
            <ul className="grid md:grid-cols-2 gap-5 mt-6">
              {products
                .filter((p) => p.family === key)
                .map((p) => (
                  <li key={p.slug}>
                    <Card className="h-full">
                      <H3>{p.title}</H3>
                      <p className="text-xs mb-2" style={{ color: C.textMuted }}>
                        Sizes {p.print_sizes.join(', ')}. {p.framed ? 'Framed and unframed.' : 'Unframed.'} Status: {p.fulfillment_status}.
                      </p>
                      {'blockers' in p && (
                        <p className="text-xs" style={{ color: 'oklch(0.80 0.12 30)' }}>
                          Blocked: {(p as { blockers?: string[] }).blockers?.join('; ')}
                        </p>
                      )}
                      {p.related_content_refs?.[0] && (
                        <Link href={p.related_content_refs[0]} className="text-sm" style={{ color: C.emberLight, textDecoration: 'underline' }}>
                          Related guide
                        </Link>
                      )}
                    </Card>
                  </li>
                ))}
            </ul>
          </Section>
        ))}

        <Section tone="surface">
          <Eyebrow>Pricing model, v1</Eyebrow>
          <H2>Base cost captured 2026-09-02, suggested retail</H2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm" aria-label="Poster pricing model">
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  <Th>Size</Th>
                  <Th>Frame</Th>
                  <Th>Base cost</Th>
                  <Th>Suggested retail</Th>
                  <Th>Print master px</Th>
                </tr>
              </thead>
              <tbody>
                {MATTE_VARIANTS.map((v, i) => (
                  <Tr key={`${v.size}-${v.frame}`} i={i}>
                    <Td strong>{v.size} in</Td>
                    <Td>{v.frame}</Td>
                    <Td num>${v.base_cost_usd.toFixed(2)}</Td>
                    <Td num>${suggestRetail(v).toFixed(2)}</Td>
                    <Td num>{PRINT_SPEC[v.size].px.join(' x ')}</Td>
                  </Tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs mt-3" style={{ color: C.textMuted }}>
            Shipping is quoted live from Printful at checkout and charged at cost. Base costs are a capture and must be re-read before launch.
          </p>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
