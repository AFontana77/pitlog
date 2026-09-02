import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SAFETY_MINIMUMS, HANDLING, PITMASTER_TARGETS, CULINARY_DONENESS, getSafetyMinimum } from '@/content';
import { SafetyLine } from '@/components/content/SafetyLine';
import { DonenessTable } from '@/components/content/DonenessTable';
import { Citations } from '@/components/content/Citations';
import { Breadcrumbs, C, Card, CtaRow, Eyebrow, H1, H2, H3, Label, Lede, P, Section, Td, Th, Tr } from '@/components/content/ui';

export const metadata: Metadata = {
  title: 'Meat Temperature Chart: USDA Safe Minimums vs. BBQ Finish Temps',
  description:
    'The full USDA FSIS safe minimum internal temperature chart, next to the brisket, pork shoulder and rib finish temps pitmasters actually cook to. Three different numbers, kept apart.',
  alternates: { canonical: 'https://pitlog.app/temperatures' },
};

const SAFETY_ORDER = [
  'safety-whole-muscle-red-meat',
  'safety-ground-meat',
  'safety-poultry',
  'safety-fish',
  'safety-ham-uncooked',
  'safety-ham-reheat',
  'safety-eggs',
  'safety-leftovers',
];

export default function TemperaturesPage() {
  const safety = SAFETY_ORDER.map(getSafetyMinimum).filter((s): s is NonNullable<typeof s> => !!s);
  const targets = PITMASTER_TARGETS.filter((t) => t.window_f && t.safety_ref);
  const stall = PITMASTER_TARGETS.find((t) => t.id === 'concept-the-stall');
  const handlingSafety = HANDLING.filter((h) => h.kind === 'SAFETY_HANDLING');
  const handlingPlanning = HANDLING.filter((h) => h.kind === 'PLANNING_GUIDANCE');
  const refs = [
    ...safety.flatMap((s) => s.source_refs),
    ...HANDLING.flatMap((h) => h.source_refs),
    ...targets.flatMap((t) => t.source_refs),
    ...CULINARY_DONENESS.flatMap((d) => d.source_refs),
  ];

  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">
        <Section tone="bgDeep">
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Temperatures', href: '/temperatures' }]} />
          <Eyebrow>Meat temperature chart</Eyebrow>
          <H1>Three numbers. Never the same number.</H1>
          <Lede>
            A safe temperature, a preferred doneness, and a tenderness target are three different things. This page keeps
            them apart. USDA FSIS wins every conflict.
          </Lede>
          <div className="grid sm:grid-cols-3 gap-4">
            <Card>
              <Label>1. Safety minimum</Label>
              <P>The food safety floor. Set by USDA FSIS. Never go under it. It is not a preference.</P>
            </Card>
            <Card>
              <Label>2. Culinary preference</Label>
              <P>How you like a steak or a fillet. Rare and medium-rare sit below the minimum. The page says so every time.</P>
            </Card>
            <Card>
              <Label>3. Tenderness target</Label>
              <P>Where brisket and shoulder turn tender. Always above the minimum. A checkpoint, not a guarantee.</P>
            </Card>
          </div>
        </Section>

        <Section id="usda" labelledBy="usda-heading">
          <Eyebrow>USDA FSIS chart</Eyebrow>
          <H2 id="usda-heading">Safe minimum internal temperatures</H2>
          <P className="mb-8">
            Read with a food thermometer before the food leaves the heat. Colour is not doneness. These are the federal
            figures, quoted from the FSIS chart with the date we read it.
          </P>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="USDA FSIS safe minimum internal temperature chart">
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  <Th>Food</Th>
                  <Th>Minimum</Th>
                  <Th>Rest</Th>
                  <Th>Notes</Th>
                </tr>
              </thead>
              <tbody>
                {safety.map((s, i) => (
                  <Tr key={s.id} i={i}>
                    <Td strong>{s.scope.charAt(0).toUpperCase() + s.scope.slice(1)}</Td>
                    <Td num>
                      {s.temp_f} F / {s.temp_c} C
                    </Td>
                    <Td>{s.rest ?? 'None required'}</Td>
                    <Td>{s.notes[0] ?? s.measurement}</Td>
                  </Tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <SafetyLine safety={safety[0]} />
          </div>
        </Section>

        <Section tone="surface" id="handling" labelledBy="handling-heading">
          <Eyebrow>Handling rules</Eyebrow>
          <H2 id="handling-heading">What the thermometer cannot tell you</H2>
          <ul className="grid md:grid-cols-2 gap-x-10">
            {handlingSafety.map((h, i) => (
              <li key={h.id} className="py-5" style={{ borderTop: `1px solid ${C.border}` }}>
                <div className="flex gap-4">
                  <span className="font-display text-2xl tabular-nums" style={{ color: C.ember }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <H3>{h.title}</H3>
                    <P className="mb-2">{h.statement}</P>
                    <P muted className="text-sm">
                      At the pit: {h.pitlog_application}
                    </P>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="tenderness" labelledBy="tenderness-heading">
          <Eyebrow>Tenderness targets</Eyebrow>
          <H2 id="tenderness-heading">Where the tough cuts turn tender</H2>
          <P className="mb-8">
            These sit 40 to 60 degrees above the safety floor. They are barbecue craft. Where an industry body publishes a
            figure we show it, even when it disagrees with the backyard number. The finish test decides, not the digits.
          </P>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Pitmaster tenderness targets">
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  <Th>Cut</Th>
                  <Th>Window</Th>
                  <Th>Finish test</Th>
                  <Th>Pit temp</Th>
                  <Th>Rest</Th>
                  <Th>Source</Th>
                </tr>
              </thead>
              <tbody>
                {targets.map((t, i) => (
                  <Tr key={t.id} i={i}>
                    <Td strong>{t.id.replace('target-', '').replace(/-/g, ' ')}</Td>
                    <Td num>
                      {t.window_f!.min} to {t.window_f!.max} F
                    </Td>
                    <Td>{t.finish_test?.replace(/_/g, ' ')}</Td>
                    <Td num>{t.pit_temp_f ? `${t.pit_temp_f.min} to ${t.pit_temp_f.max} F` : ''}</Td>
                    <Td>{t.rest}</Td>
                    <Td>{t.review_status === 'SOURCED' ? 'Industry body' : 'Convention'}</Td>
                  </Tr>
                ))}
              </tbody>
            </table>
          </div>
          {stall && (
            <Card className="mt-8">
              <Label>The stall</Label>
              <P>{stall.statement}</P>
            </Card>
          )}
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {handlingPlanning.map((h) => (
              <Card key={h.id}>
                <Label>{h.title}</Label>
                <P className="text-sm">{h.statement}</P>
              </Card>
            ))}
          </div>
        </Section>

        <Section tone="surface" id="doneness" labelledBy="doneness-heading">
          <Eyebrow>Culinary preference</Eyebrow>
          <H2 id="doneness-heading">Doneness, with the minimum printed beside it</H2>
          <P className="mb-10">
            The Beef Board and the American Lamb Board publish scales that start at the USDA minimum. Steakhouse
            convention runs lower. Both are here. Every figure under the minimum is flagged.
          </P>
          <div className="space-y-12">
            <DonenessTable id="doneness-beef-industry" title="Beef, industry scale (Beef Board)" />
            <DonenessTable id="doneness-beef-convention" title="Beef, steakhouse convention" />
            <DonenessTable id="doneness-pork-chops-roasts" title="Pork chops and roasts" />
            <DonenessTable id="doneness-lamb-industry" title="Lamb and goat, industry scale (American Lamb Board)" />
            <DonenessTable id="doneness-lamb-goat-convention" title="Lamb and goat, restaurant convention" />
            <DonenessTable id="doneness-chicken-dark-meat-preference" title="Chicken dark meat" />
            <DonenessTable id="doneness-salmon-convention" title="Salmon" />
          </div>
        </Section>

        <Section tone="bgDeep">
          <Eyebrow>Next</Eyebrow>
          <H2>Now pick the cut</H2>
          <P className="mb-8">
            Every number here lives on its cut page too, next to the woods, the mistakes and the recipes. Start with{' '}
            <Link href="/cuts/beef" style={{ color: C.emberLight, textDecoration: 'underline' }}>
              beef
            </Link>
            , or see{' '}
            <Link href="/woods" style={{ color: C.emberLight, textDecoration: 'underline' }}>
              which wood
            </Link>{' '}
            to burn.
          </P>
          <CtaRow />
          <Citations refs={refs} updatedAt="2026-09-02" />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
