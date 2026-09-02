import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ANIMALS, HANDLING, PITMASTER_TARGETS, RECIPES, getAnimal, getRegions, getSafetyMinimum, renderableDoneness, type AnimalSlug } from '@/content';
import { SafetyLine } from '@/components/content/SafetyLine';
import { DonenessTable } from '@/components/content/DonenessTable';
import { Citations } from '@/components/content/Citations';
import { Breadcrumbs, C, Card, CtaRow, Eyebrow, H1, H2, H3, Label, Lede, P, Section, Td, Th, Tr } from '@/components/content/ui';

/**
 * Answer-first pages for the big temperature queries (chicken internal temp
 * 165k/mo, pork 74k, salmon 60k, steak doneness chart 60k, and so on). One
 * page per animal. Every number is a record. Safety first, then preference,
 * then tenderness, never merged.
 */
const COPY: Record<AnimalSlug, { title: string; description: string; h1: string; question: string; intro: string; probe: string; targets: string[]; doneness: string[] }> = {
  chicken: {
    title: 'Chicken Internal Temp: 165 F for Breast, Thigh, Wings and Whole Bird',
    description: 'Chicken is safe at 165 F, checked in the thickest breast and the innermost thigh. Thighs taste better at 175 to 185 F. No rest is required. USDA FSIS source and date on the page.',
    h1: 'Chicken internal temperature.',
    question: 'What internal temp is chicken done?',
    intro: 'Every part of a chicken is safe at 165 F. Breast, thigh, wing, drumstick, ground chicken and stuffing. Check the thickest part of the breast and the innermost thigh and wing. Dark meat tastes better higher, at 175 to 185 F. That is a texture preference, not a rule.',
    probe: 'Breast: through the side into the thickest part, not touching bone. Thigh: into the innermost meat by the joint, not touching bone. Whole bird: check breast, thigh and wing, and the stuffing too.',
    targets: ['target-chicken-pulled'],
    doneness: ['doneness-chicken-dark-meat-preference'],
  },
  pork: {
    title: 'Pork Internal Temp: 145 F Chops and Loin, 195 to 205 F Pulled Pork',
    description: 'Pork chops, loin and tenderloin are safe at 145 F with a 3 minute rest and can still be pink. Pulled pork goes to 185 to 205 F for tenderness. USDA FSIS and National Pork Board sources on the page.',
    h1: 'Pork internal temperature.',
    question: 'What internal temp is pork done?',
    intro: 'Pork chops, loin, tenderloin and roasts are safe at 145 F with a 3 minute rest, and safely cooked pork can still be pink. Ground pork is 160 F. Pulled pork is a different cook: the shoulder goes far past the minimum, to 185 to 205 F, until the bone slips out. That higher number is about tenderness, not safety.',
    probe: 'Chops: through the side to the centre. Loin and tenderloin: the thickest part. Shoulder: the thickest meat away from the blade bone. Ribs: between the bones, and trust the bend test more than the number.',
    targets: ['target-pork-shoulder', 'target-pork-ribs', 'target-pork-belly'],
    doneness: ['doneness-pork-chops-roasts'],
  },
  salmon: {
    title: 'Salmon Cooking Temp: 145 F Is the USDA and FDA Number',
    description: 'Salmon is safe at 145 F, or when the flesh is opaque and flakes with a fork. Many cooks pull it earlier for a softer center; that is a preference below the federal minimum and this page says so.',
    h1: 'Salmon internal temperature.',
    question: 'What temperature is salmon done?',
    intro: 'USDA FSIS and FDA both put fish at 145 F, or until the flesh is opaque and separates easily with a fork. Salmon cooks fast and does not stall. Restaurant convention pulls it at 120 to 135 F for a softer, redder centre. Every one of those numbers is below the federal minimum, and they are labelled that way on this page.',
    probe: 'Thermometer through the side into the thickest part of the fillet. On a plank, check the centre of the thickest portion. The tail end is done long before the loin.',
    targets: [],
    doneness: ['doneness-salmon-convention'],
  },
  beef: {
    title: 'Steak Doneness Chart and Beef Internal Temps: Rare to Well, Brisket to Pulled',
    description: 'Steak temperature chart: the Beef Board scale (medium rare 145 F final) beside steakhouse convention (rare 120 F, medium rare 130 F), each flagged against the USDA minimum. Brisket and chuck finish at 195 to 205 F.',
    h1: 'Beef internal temperature and steak doneness chart.',
    question: 'What temp is medium rare? What temp is brisket done?',
    intro: 'Two different questions. A steak or roast is safe at 145 F with a 3 minute rest, and the Beef Board calls that medium rare. Steakhouses pull medium rare at 130 to 135 F, which is a preference below the USDA minimum. Brisket, chuck and short ribs are a third thing: they go to 195 to 205 F, probe tender, because collagen needs the heat. Ground beef is 160 F, always.',
    probe: 'Steaks: through the side to the centre, not touching bone or fat. Roasts: thickest part, checked in more than one place. Brisket: the thickest part of the flat, and feel matters more than the number.',
    targets: ['target-brisket', 'target-beef-chuck-and-short-ribs'],
    doneness: ['doneness-beef-industry', 'doneness-beef-convention'],
  },
  lamb: {
    title: 'Lamb Internal Temp: 145 F Chops and Leg, Pulled Shoulder to 195 F',
    description: 'Lamb chops, rack and leg are safe at 145 F with a 3 minute rest. The American Lamb Board pulls medium rare at 135 F for a 145 F final. Shoulder and shank go to 195 to 205 F for pulling.',
    h1: 'Lamb internal temperature.',
    question: 'What internal temp is lamb done?',
    intro: 'Lamb chops, rack, loin and leg are safe at 145 F with a 3 minute rest. The American Lamb Board scale starts there: pull at 135 F, rest to 145 F for medium rare. Restaurant convention runs lower and is flagged below the minimum here. Shoulder, shank and breast are collagen cuts that go to 195 to 205 F for pulling. Ground lamb is 160 F.',
    probe: 'Rack and chops: through the side, away from bone. Leg: the thickest part, not touching the bone, checked in two places. Shoulder for pulling: the thickest meat away from the blade bone.',
    targets: ['target-lamb-goat-shoulder'],
    doneness: ['doneness-lamb-industry', 'doneness-lamb-goat-convention'],
  },
  goat: {
    title: 'Goat Meat Internal Temp: 145 F Chops, Braise or Pull the Rest',
    description: 'Goat is safe at 145 F with a 3 minute rest, 160 F ground. It is very lean, so USDA FSIS says braise or stew the tougher cuts. Pulled shoulder goes to 195 to 205 F with a wrap.',
    h1: 'Goat internal temperature.',
    question: 'What internal temp is goat done?',
    intro: 'Goat follows the lamb rules: 145 F with a 3 minute rest for chops, rack, loin and leg, 160 F for ground. It is leaner than lamb, and USDA FSIS notes a goat carcass rarely has much fat to protect it from drying, so the tougher cuts are braised or stewed. A smoked goat shoulder for pulling goes to 195 to 205 F with a wrap for the second half.',
    probe: 'Chops and rack: through the side, away from bone. Leg: thickest part, two places. Shoulder: thickest meat away from the blade bone.',
    targets: ['target-lamb-goat-shoulder'],
    doneness: ['doneness-lamb-industry', 'doneness-lamb-goat-convention'],
  },
};

export function generateStaticParams() {
  return ANIMALS.map((a) => ({ animal: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ animal: string }> }): Promise<Metadata> {
  const { animal } = await params;
  const c = COPY[animal as AnimalSlug];
  if (!c) return {};
  return { title: c.title, description: c.description.slice(0, 158), alternates: { canonical: `https://pitlog.app/temperatures/${animal}` } };
}

export default async function AnimalTemperaturePage({ params }: { params: Promise<{ animal: string }> }) {
  const { animal: slug } = await params;
  const a = slug as AnimalSlug;
  const animal = getAnimal(a);
  const c = COPY[a];
  if (!animal || !c) notFound();
  const safety = getSafetyMinimum(animal.safety_ref)!;
  const ground = animal.ground_safety_ref && animal.ground_safety_ref !== animal.safety_ref ? getSafetyMinimum(animal.ground_safety_ref) : undefined;
  const targets = c.targets.map((id) => PITMASTER_TARGETS.find((t) => t.id === id)).filter((t): t is NonNullable<typeof t> => !!t);
  const handling = HANDLING.filter((h) => ['handling-thermometer-placement', 'handling-colour-is-not-doneness', 'handling-rest-is-part-of-safety', 'handling-danger-zone'].includes(h.id));
  const regions = getRegions(a);
  const recipes = RECIPES.filter((r) => r.animal === a && r.status !== 'PLANNED' && r.status !== 'RETIRED');
  const refs = [
    ...safety.source_refs,
    ...(ground?.source_refs ?? []),
    ...targets.flatMap((t) => t.source_refs),
    ...c.doneness.flatMap((d) => renderableDoneness(d)?.record.source_refs ?? []),
    ...handling.flatMap((h) => h.source_refs),
  ];

  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">
        <Section tone="bgDeep">
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Temperatures', href: '/temperatures' }, { name: animal.name, href: `/temperatures/${a}` }]} />
          <Eyebrow>{animal.name} temperature guide</Eyebrow>
          <H1>{c.h1}</H1>
          <Card raised className="mb-6">
            <Label>{c.question}</Label>
            <p className="text-lg leading-relaxed" style={{ color: C.text }}>
              {c.intro}
            </p>
          </Card>
          <div className={`grid ${ground ? 'md:grid-cols-2' : ''} gap-4`}>
            <SafetyLine safety={safety} />
            {ground && <SafetyLine safety={ground} />}
          </div>
        </Section>

        <Section>
          <Eyebrow>Quick table</Eyebrow>
          <H2>{animal.name} by cut</H2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm" aria-label={`${animal.name} temperatures by cut`}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  <Th>Cut</Th>
                  <Th>USDA minimum</Th>
                  <Th>Finish</Th>
                  <Th>Guide</Th>
                </tr>
              </thead>
              <tbody>
                {regions.map((r, i) => {
                  const t = PITMASTER_TARGETS.find((x) => x.id === r.tenderness_target_ref);
                  return (
                    <Tr key={r.slug} i={i}>
                      <Td strong>{r.name}</Td>
                      <Td num>
                        {safety.temp_f} F{safety.rest ? ' + 3 min rest' : ''}
                      </Td>
                      <Td>{t ? `${t.window_f?.min} to ${t.window_f?.max} F, ${t.finish_test?.replace(/_/g, ' ')} (craft)` : r.doneness_refs.length ? 'Your doneness, at or above the minimum' : 'Cook to the minimum'}</Td>
                      <Td>
                        <Link href={`/cuts/${a}/${r.slug}`} style={{ color: C.emberLight, textDecoration: 'underline' }}>
                          {r.name} guide
                        </Link>
                      </Td>
                    </Tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Section>

        {targets.length > 0 && (
          <Section tone="surface">
            <Eyebrow>Tenderness targets</Eyebrow>
            <H2>The tough cuts go higher</H2>
            <div className="grid md:grid-cols-2 gap-6">
              {targets.map((t) => (
                <Card key={t.id} raised>
                  <Label>{t.id.replace('target-', '').replace(/-/g, ' ')} ({t.review_status === 'SOURCED' ? 'sourced' : 'convention'})</Label>
                  <p className="font-display text-2xl mb-2" style={{ color: C.text }}>
                    {t.window_f?.min} to {t.window_f?.max} F, {t.finish_test?.replace(/_/g, ' ')}
                  </p>
                  <P className="text-sm mb-2">{t.statement}</P>
                  <p className="text-xs" style={{ color: C.textMuted }}>
                    Pit {t.pit_temp_f?.min} to {t.pit_temp_f?.max} F. {t.planning_time} Rest: {t.rest}
                  </p>
                </Card>
              ))}
            </div>
          </Section>
        )}

        <Section>
          <Eyebrow>Doneness</Eyebrow>
          <H2>Preference, with the minimum printed beside it</H2>
          <div className="space-y-10 mt-6">
            {c.doneness.map((d) => (
              <DonenessTable key={d} id={d} title={d.replace('doneness-', '').replace(/-/g, ' ')} />
            ))}
          </div>
        </Section>

        <Section tone="surface">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <Eyebrow>Probe placement</Eyebrow>
              <H3>Where the thermometer goes</H3>
              <P className="text-sm">{c.probe}</P>
            </div>
            <div>
              <Eyebrow>Handling</Eyebrow>
              <ul className="space-y-3 text-sm" style={{ color: C.textSoft }}>
                {handling.map((h) => (
                  <li key={h.id}>
                    <span className="font-semibold" style={{ color: C.text }}>
                      {h.title}.{' '}
                    </span>
                    {h.statement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section tone="bgDeep">
          <Label>Next</Label>
          <H2>Cook it, then log it</H2>
          <P className="mb-4">
            The{' '}
            <Link href={`/cuts/${a}`} style={{ color: C.emberLight, textDecoration: 'underline' }}>
              {animal.name.toLowerCase()} cut guide
            </Link>{' '}
            has every region, the woods and the mistakes. The{' '}
            <Link href="/temperatures" style={{ color: C.emberLight, textDecoration: 'underline' }}>
              full temperature chart
            </Link>{' '}
            has every animal and every source.
          </P>
          {recipes.length > 0 && (
            <ul className="mb-8 space-y-1 text-sm">
              {recipes.map((r) => (
                <li key={r.slug}>
                  <Link href={`/recipes/${r.slug}`} style={{ color: C.emberLight, textDecoration: 'underline' }}>
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <CtaRow />
          <Citations refs={refs} updatedAt="2026-09-02" />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
