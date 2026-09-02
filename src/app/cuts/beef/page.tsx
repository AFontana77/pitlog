import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { getAnimal, getRegions, getSafetyMinimum, getWood, RECIPES } from '@/content';
import hotspots from '../../../../content/graphics/hotspots/beef.json';
import { CutDiagram, type DiagramRegion } from '@/components/content/CutDiagram';
import { SafetyLine } from '@/components/content/SafetyLine';
import { DonenessTable } from '@/components/content/DonenessTable';
import { Citations } from '@/components/content/Citations';
import { Breadcrumbs, C, Card, CtaRow, Eyebrow, H1, H2, H3, Label, Lede, P, Section, Td, Th, Tr } from '@/components/content/ui';

export const metadata: Metadata = {
  title: 'Beef Cuts Chart: Interactive Primal Guide with Temps and Woods',
  description:
    'Tap the beef primal cuts: chuck, rib, short loin, sirloin, brisket, plate, flank, round, shank. Tenderness, best method, USDA safe temp, brisket finish window, woods and recipes.',
  alternates: { canonical: 'https://pitlog.app/cuts/beef' },
};

export default function BeefPage() {
  const animal = getAnimal('beef')!;
  const regions = getRegions('beef');
  const safety = getSafetyMinimum(animal.safety_ref)!;
  const ground = getSafetyMinimum(animal.ground_safety_ref!)!;
  const hs = hotspots as unknown as { viewBox: string; regions: { slug: string; polygon: [number, number][]; label: [number, number] }[]; _meta: { web_image: string; web_image_px: [number, number] } };

  const diagramRegions: DiagramRegion[] = regions.map((r) => {
    const h = hs.regions.find((x) => x.slug === r.slug)!;
    return {
      slug: r.slug,
      name: r.name,
      number: r.number,
      polygon: h.polygon,
      label: h.label,
      short: r.short_description,
      tenderness: r.tenderness_score,
      richness: r.richness_score,
      methods: r.best_methods,
      woods: r.best_woods.map((w) => getWood(w.split(' ')[0].toLowerCase())?.name ?? w),
      recipeCount: r.recipe_refs.filter((s) => RECIPES.find((x) => x.slug === s && x.status !== 'PLANNED')).length,
      learnHref: `/cuts/beef/${r.slug}`,
      cookHref: `/recipes?animal=beef&cut=${r.slug}`,
    };
  });

  const refs = [...animal.source_refs, ...regions.flatMap((r) => r.source_refs), ...safety.source_refs];

  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">
        <Section tone="bgDeep" width="max-w-6xl">
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Cuts', href: '/cuts' }, { name: 'Beef', href: '/cuts/beef' }]} />
          <Eyebrow>Beef cuts chart</Eyebrow>
          <H1>Beef primal cuts.</H1>
          <Lede>{animal.summary}</Lede>
          <CutDiagram
            animal="beef"
            imageSrc={hs._meta.web_image}
            imageAlt="Beef primal cuts diagram: 1 chuck, 2 rib, 3 short loin, 4 sirloin, 5 brisket, 6 plate, 7 flank, 8 round, 9 shank"
            imageWidth={hs._meta.web_image_px[0]}
            imageHeight={hs._meta.web_image_px[1]}
            viewBox={hs.viewBox}
            regions={diagramRegions}
          />
          <p className="text-xs mt-3" style={{ color: C.textMuted }}>
            {animal.primal_scheme.note}
          </p>
        </Section>

        <Section id="regions" labelledBy="regions-heading" width="max-w-6xl">
          <Eyebrow>The nine regions</Eyebrow>
          <H2 id="regions-heading">Pick a region</H2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {regions.map((r) => (
              <li key={r.slug}>
                <Link href={`/cuts/beef/${r.slug}`} className="block h-full press-feedback" style={{ textDecoration: 'none' }}>
                  <Card raised className="h-full">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-display text-xl" style={{ color: C.ember }}>
                        {String(r.number).padStart(2, '0')}
                      </span>
                      <H3>{r.name}</H3>
                    </div>
                    <P className="text-sm mb-3">{r.short_description}</P>
                    <p className="text-xs" style={{ color: C.textMuted }}>
                      Tenderness {r.tenderness_score}/5. Richness {r.richness_score}/5. {r.best_methods[0].charAt(0).toUpperCase() + r.best_methods[0].slice(1)}.
                    </p>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section tone="surface" id="temps" labelledBy="temps-heading" width="max-w-6xl">
          <Eyebrow>Temperatures</Eyebrow>
          <H2 id="temps-heading">Safe first. Then done.</H2>
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            <SafetyLine safety={safety} />
            <SafetyLine safety={ground} />
          </div>
          <div className="space-y-10">
            <DonenessTable id="doneness-beef-industry" title="Steaks and roasts, Beef Board scale" />
            <DonenessTable id="doneness-beef-convention" title="Steaks, steakhouse convention" />
          </div>
          <p className="mt-6 text-sm" style={{ color: C.textMuted }}>
            Brisket, chuck, short ribs and shank do not use a doneness scale. They cook to a tenderness window, listed on
            each cut page and on the{' '}
            <Link href="/temperatures#tenderness" style={{ color: C.emberLight, textDecoration: 'underline' }}>
              temperature chart
            </Link>
            .
          </p>
        </Section>

        <Section id="woods" labelledBy="woods-heading" width="max-w-6xl">
          <Eyebrow>Woods</Eyebrow>
          <H2 id="woods-heading">What to burn under beef</H2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm" aria-label="Best woods for beef">
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  <Th>Wood</Th>
                  <Th>Strength</Th>
                  <Th>Character</Th>
                </tr>
              </thead>
              <tbody>
                {animal.wood_refs.map((w, i) => {
                  const wood = getWood(w)!;
                  return (
                    <Tr key={w} i={i}>
                      <Td strong>
                        <Link href={`/woods#${wood.slug}`} style={{ color: C.text, textDecoration: 'underline' }}>
                          {wood.name}
                        </Link>
                      </Td>
                      <Td>{wood.strength}</Td>
                      <Td>{wood.flavor_character}</Td>
                    </Tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Section>

        <Section tone="bgDeep" width="max-w-6xl">
          <Label>Cook it, log it</Label>
          <H2>Start with brisket</H2>
          <P className="mb-8">
            The{' '}
            <Link href="/recipes/pit-log-central-texas-brisket" style={{ color: C.emberLight, textDecoration: 'underline' }}>
              Pit Log Central Texas Brisket
            </Link>{' '}
            is salt, pepper, post oak and a long rest. It is the cook the whole guide is built around.
          </P>
          <CtaRow posterNote="Poster: once the print master is ready." />
          <Citations refs={refs} updatedAt="2026-09-02" />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
