import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ANIMALS, HANDLING, PITMASTER_TARGETS, WOODS, getRegions, getSafetyMinimum } from '@/content';
import { Citations } from '@/components/content/Citations';
import { Breadcrumbs, C, Card, CtaRow, Eyebrow, H1, H2, H3, Lede, P, Section, Td, Th, Tr } from '@/components/content/ui';

/**
 * The library page predates the content spine and used to carry its own
 * numbers ("129 cuts", per-protein notes). It keeps its URL and its role as
 * the browse-everything page, but every figure now comes from records.
 */
export const metadata: Metadata = {
  alternates: { canonical: 'https://pitlog.app/library' },
  title: 'Pit Log Library: Every Cut, Temperature, Wood and Recipe',
  description:
    'Browse the whole Pit Log reference: six animals and their primal cuts, the USDA safe minimums, the pitmaster tenderness targets, eight smoke woods, and the house recipes. One set of records behind the site, the app and the field guide.',
};

export default function LibraryPage() {
  const totalRegions = ANIMALS.reduce((n, a) => n + getRegions(a.slug).length, 0);
  const totalRetail = ANIMALS.reduce((n, a) => n + getRegions(a.slug).reduce((m, r) => m + r.retail_cuts.length, 0), 0);
  const stall = PITMASTER_TARGETS.find((t) => t.id === 'concept-the-stall');
  const twoTherm = HANDLING.find((h) => h.id === 'handling-two-thermometers');
  const refs = [...ANIMALS.flatMap((a) => a.source_refs), ...WOODS.flatMap((w) => w.source_refs), ...(stall?.source_refs ?? [])];

  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">
        <Section tone="bgDeep">
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Library', href: '/library' }]} />
          <Eyebrow>Reference library</Eyebrow>
          <H1>
            {ANIMALS.length} animals. {totalRegions} primal regions. {totalRetail} cuts.
          </H1>
          <Lede>
            Everything on this site, in the app and in the field guide renders from one set of records. Every safety number
            cites USDA FSIS with the date we read it. Every tenderness number is labelled craft. Start anywhere.
          </Lede>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ANIMALS.map((a) => {
              const regions = getRegions(a.slug);
              const s = getSafetyMinimum(a.safety_ref)!;
              return (
                <Link key={a.slug} href={a.route} className="block press-feedback" style={{ textDecoration: 'none' }}>
                  <Card raised className="h-full">
                    <H3>{a.name}</H3>
                    <p className="text-xs mb-3" style={{ color: C.ember }}>
                      {regions.length} regions. USDA {s.temp_f} F{s.rest ? ' + 3 min rest' : ''}.
                    </p>
                    <P className="text-sm">{regions.map((r) => r.name).join(', ')}.</P>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Section>

        <Section>
          <Eyebrow>Temperatures</Eyebrow>
          <H2>The three numbers</H2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm" aria-label="Animal safety minimums and tenderness targets">
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  <Th>Animal</Th>
                  <Th>USDA minimum</Th>
                  <Th>Tenderness targets (craft)</Th>
                  <Th>Page</Th>
                </tr>
              </thead>
              <tbody>
                {ANIMALS.map((a, i) => {
                  const s = getSafetyMinimum(a.safety_ref)!;
                  const targets = Array.from(new Set(getRegions(a.slug).map((r) => r.tenderness_target_ref).filter(Boolean))).map((id) => PITMASTER_TARGETS.find((t) => t.id === id)!).filter(Boolean);
                  return (
                    <Tr key={a.slug} i={i}>
                      <Td strong>{a.name}</Td>
                      <Td num>
                        {s.temp_f} F{s.rest ? ' + 3 min rest' : ''}
                      </Td>
                      <Td>{targets.length ? targets.map((t) => `${t.window_f?.min} to ${t.window_f?.max} F ${t.finish_test?.replace(/_/g, ' ')}`).join('; ') : 'None. Cook to the minimum or your doneness.'}</Td>
                      <Td>
                        <Link href={`/temperatures/${a.slug}`} style={{ color: C.emberLight, textDecoration: 'underline' }}>
                          {a.name} temps
                        </Link>
                      </Td>
                    </Tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-sm mt-4" style={{ color: C.textMuted }}>
            The{' '}
            <Link href="/temperatures" style={{ color: C.emberLight, textDecoration: 'underline' }}>
              full temperature chart
            </Link>{' '}
            has all eight USDA rows, the handling rules and every doneness scale.
          </p>
        </Section>

        <Section tone="surface">
          <Eyebrow>Woods</Eyebrow>
          <H2>Eight smoke woods</H2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm" aria-label="Smoke woods">
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  <Th>Wood</Th>
                  <Th>Strength</Th>
                  <Th>Best with</Th>
                  <Th>Go easy with</Th>
                </tr>
              </thead>
              <tbody>
                {WOODS.map((w, i) => (
                  <Tr key={w.slug} i={i}>
                    <Td strong>
                      <Link href={`/woods#${w.slug}`} style={{ color: C.text, textDecoration: 'underline' }}>
                        {w.name}
                      </Link>
                    </Td>
                    <Td>{w.strength}</Td>
                    <Td>{w.best_animals.join(', ')}</Td>
                    <Td>{w.avoid_or_use_lightly_with.join(', ') || 'Nothing in particular'}</Td>
                  </Tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section>
          <Eyebrow>Two ideas that explain most bad brisket</Eyebrow>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            {stall && (
              <Card>
                <H3>The stall</H3>
                <P className="text-sm">{stall.statement}</P>
              </Card>
            )}
            {twoTherm && (
              <Card>
                <H3>{twoTherm.title}</H3>
                <P className="text-sm">{twoTherm.statement}</P>
              </Card>
            )}
          </div>
        </Section>

        <Section tone="bgDeep">
          <Eyebrow>Then log it</Eyebrow>
          <H2>The library helps once. The log helps every time.</H2>
          <P className="mb-8">Pit Master Log records the cut, the wood, the wrap, the final temp and the result, so the next cook starts from what worked.</P>
          <CtaRow />
          <Citations refs={refs} updatedAt="2026-09-02" />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
