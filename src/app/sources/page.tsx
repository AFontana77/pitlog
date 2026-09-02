import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SOURCES } from '@/content';
import { Breadcrumbs, C, Card, Eyebrow, H1, H2, Lede, P, Section, Td, Th, Tr } from '@/components/content/ui';

export const metadata: Metadata = {
  alternates: { canonical: 'https://pitlog.app/sources' },
  title: 'Sources and Method: Where Pit Log Numbers Come From',
  description:
    'Every temperature on Pit Log points at a record, and every record points at a source with the date we read it. USDA FSIS for safety. Industry bodies and universities for cuts and craft. Here is the list.',
};

const TIER: Record<number, string> = { 1: 'Federal agency', 2: 'University', 3: 'Industry body', 4: 'Provider documentation', 5: 'Practitioner report' };

export default function SourcesPage() {
  const food = SOURCES.filter((s) => s.tier <= 3 || s.id.startsWith('amazingribs'));
  const other = SOURCES.filter((s) => !food.includes(s));
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">
        <Section tone="bgDeep">
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Sources', href: '/sources' }]} />
          <Eyebrow>Sources and method</Eyebrow>
          <H1>Where the numbers come from.</H1>
          <Lede>
            One fact, one record, many pages. Every temperature, cut name and wood note on this site renders from a
            version-controlled record. Every record names its source and the date we read it. Nothing is typed from memory,
            and nothing is copied off a graphic.
          </Lede>
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <H2>Safety</H2>
              <P className="text-sm">USDA Food Safety and Inspection Service, and FDA for seafood. These are the floors. Where any other number is lower, the federal minimum governs.</P>
            </Card>
            <Card>
              <H2>Cuts and doneness</H2>
              <P className="text-sm">The Beef Checkoff, the National Pork Board and the American Lamb Board for cut names and their published doneness scales. Texas A&M Meat Science for barbecue mechanics.</P>
            </Card>
            <Card>
              <H2>Craft</H2>
              <P className="text-sm">Tenderness windows, wood character and the stall are barbecue convention. They are labelled craft wherever they appear and never presented as safety.</P>
            </Card>
          </div>
        </Section>

        <Section>
          <Eyebrow>Food sources</Eyebrow>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Food safety and meat sources">
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  <Th>Source</Th>
                  <Th>Type</Th>
                  <Th>Page updated</Th>
                  <Th>Read</Th>
                </tr>
              </thead>
              <tbody>
                {food.map((s, i) => (
                  <Tr key={s.id} i={i}>
                    <Td strong>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: C.text, textDecoration: 'underline' }}>
                        {s.org}: {s.title}
                      </a>
                    </Td>
                    <Td>{TIER[s.tier]}</Td>
                    <Td num>{s.page_last_updated ?? 'not shown'}</Td>
                    <Td num>{s.accessed}</Td>
                  </Tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section tone="surface">
          <Eyebrow>How a record works</Eyebrow>
          <H2>Three temperature kinds, never merged</H2>
          <P className="mb-4">
            A safety minimum is a federal floor. A culinary preference is how you like a steak, and it can sit below the
            floor, in which case the page says so next to the number. A tenderness target is where a collagen cut turns
            soft, always above the floor, and always labelled craft. The site will not print a preference table without
            the minimum beside it; the code that renders one returns both together.
          </P>
          <P className="mb-4">
            Craft figures without an authoritative source stay marked as convention. Twenty-odd records are in that state
            today, and they say so. When two sources disagree, the record keeps both and says which one governs.
          </P>
          <P>
            The same records build the{' '}
            <Link href="/free-download" style={{ color: C.emberLight, textDecoration: 'underline' }}>
              field guide PDF
            </Link>{' '}
            and the reference layer of the Pit Master Log app. Published by Anvil Road LLC. Corrections:{' '}
            <Link href="/support" style={{ color: C.emberLight, textDecoration: 'underline' }}>
              support
            </Link>
            .
          </P>
        </Section>

        {other.length > 0 && (
          <Section>
            <Eyebrow>Program and provider documentation</Eyebrow>
            <ul className="text-sm space-y-2" style={{ color: C.textSoft }}>
              {other.map((s) => (
                <li key={s.id}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                    {s.org}: {s.title}
                  </a>
                  <span style={{ color: C.textMuted }}> (read {s.accessed})</span>
                </li>
              ))}
            </ul>
          </Section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
