import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ANIMALS, getAnimal, getRegions, getSafetyMinimum, getWood, RECIPES, type AnimalSlug } from '@/content';
import { getHotspots, diagramAlt } from '@/content/hotspots';
import { ogImageMeta } from '@/content/ogImage';
import { comparisonPagesFor } from '@/content/comparisonPages';
import { CutDiagram, type DiagramRegion } from '@/components/content/CutDiagram';
import { SafetyLine } from '@/components/content/SafetyLine';
import { DonenessTable } from '@/components/content/DonenessTable';
import { Citations } from '@/components/content/Citations';
import { Breadcrumbs, C, Card, CtaRow, Eyebrow, H1, H2, H3, Label, Lede, P, Section, Td, Th, Tr } from '@/components/content/ui';

const TITLES: Record<AnimalSlug, { title: string; description: string; h1: string }> = {
  beef: {
    title: 'Beef Cuts Chart: Interactive Primal Guide with Temps and Woods',
    description: 'Tap the beef primals: chuck, rib, short loin, sirloin, brisket, plate, flank, round, shank. Tenderness, method, USDA temp, brisket finish, woods.',
    h1: 'Beef primal cuts.',
  },
  pork: {
    title: 'Pork Cuts Chart: Butt, Loin, Ribs, Belly, Ham, Explained',
    description: 'Tap the pork primals: Boston butt, picnic, loin, spareribs, belly, ham, hock. The 145 F USDA rule, the pulled-pork finish, woods, mistakes and recipes.',
    h1: 'Pork primal cuts.',
  },
  chicken: {
    title: 'Chicken Cuts Guide: Breast, Thigh, Wing, Drumstick, Back',
    description: 'The parts of a chicken and how to smoke or grill each: breast, wing, thigh, drumstick, back, tail. The 165 F USDA rule, dark-meat texture, woods, recipes.',
    h1: 'Chicken cuts.',
  },
  lamb: {
    title: 'Lamb Cuts Chart: Shoulder, Rack, Loin, Leg, Breast, Shank',
    description: 'Tap the lamb primals. Which ones grill, which go low and slow, the 145 F USDA rule, the American Lamb Board doneness scale, woods and recipes.',
    h1: 'Lamb primal cuts.',
  },
  goat: {
    title: 'Goat Meat Cuts: Shoulder, Rack, Loin, Leg, Breast, Shank',
    description: 'Goat cuts and how to cook each. Goat is lean, so heat and moisture matter. The 145 F USDA rule, braising vs smoking, woods, the Moroccan shoulder recipe.',
    h1: 'Goat primal cuts.',
  },
  salmon: {
    title: 'Salmon Cuts: Collar, Loin, Center Cut, Belly, Tail',
    description: 'The portions of a side of salmon and how each cooks: collar, top loin, center cut, belly, tail. The 145 F USDA and FDA rule, plus alder and fruit woods.',
    h1: 'Salmon cuts.',
  },
};

export function generateStaticParams() {
  return ANIMALS.map((a) => ({ animal: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ animal: string }> }): Promise<Metadata> {
  const { animal } = await params;
  const t = TITLES[animal as AnimalSlug];
  if (!t) return {};
  const hs = getHotspots(animal as AnimalSlug);
  const a = getAnimal(animal);
  const card = a ? ogImageMeta(a.slug, diagramAlt(a.name, getRegions(animal as AnimalSlug))) : undefined;
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: `https://pitlog.app/cuts/${animal}` },
    openGraph: { title: t.title, description: t.description, url: `https://pitlog.app/cuts/${animal}`, type: 'article', ...(card?.openGraph ?? {}) },
    twitter: { card: 'summary_large_image', title: t.title, description: t.description, ...(card?.twitter ?? {}) },
  };
}

export default async function AnimalPage({ params }: { params: Promise<{ animal: string }> }) {
  const { animal: slug } = await params;
  const animal = getAnimal(slug);
  if (!animal) notFound();
  const a = slug as AnimalSlug;
  const t = TITLES[a];
  const regions = getRegions(a);
  const comparisons = comparisonPagesFor(a);
  const safety = getSafetyMinimum(animal.safety_ref)!;
  const ground = animal.ground_safety_ref && animal.ground_safety_ref !== animal.safety_ref ? getSafetyMinimum(animal.ground_safety_ref) : undefined;
  const hs = getHotspots(a);
  const donenessIds = Array.from(new Set(regions.flatMap((r) => r.doneness_refs)));
  const liveRecipes = RECIPES.filter((r) => r.animal === a && r.status !== 'PLANNED' && r.status !== 'RETIRED');

  const diagramRegions: DiagramRegion[] = hs
    ? regions
        .map((r) => {
          const h = hs.regions.find((x) => x.slug === r.slug);
          if (!h) return null;
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
            learnHref: `/cuts/${a}/${r.slug}`,
            cookHref: `/recipes?animal=${a}&cut=${r.slug}`,
          };
        })
        .filter((x): x is DiagramRegion => !!x)
    : [];

  const refs = [...animal.source_refs, ...regions.flatMap((r) => r.source_refs), ...safety.source_refs];

  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">
        <Section tone="bgDeep" width="max-w-6xl">
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Cuts', href: '/cuts' }, { name: animal.name, href: `/cuts/${a}` }]} />
          <Eyebrow>{animal.name} cuts chart</Eyebrow>
          <H1>{t.h1}</H1>
          <Lede>{animal.summary}</Lede>
          {hs && diagramRegions.length > 0 ? (
            <CutDiagram
              animal={a}
              imageSrc={hs._meta.web_image}
              imageAlt={diagramAlt(animal.name, regions)}
              imageWidth={hs._meta.web_image_px[0]}
              imageHeight={hs._meta.web_image_px[1]}
              viewBox={hs.viewBox}
              regions={diagramRegions}
            />
          ) : (
            <P muted>Diagram in production. The region list below carries everything the diagram would.</P>
          )}
          <p className="text-xs mt-3" style={{ color: C.textMuted }}>
            {animal.primal_scheme.note}
          </p>
        </Section>

        <Section id="regions" labelledBy="regions-heading" width="max-w-6xl">
          <Eyebrow>The {regions.length} regions</Eyebrow>
          <H2 id="regions-heading">Pick a region</H2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {regions.map((r) => (
              <li key={r.slug}>
                <Link href={`/cuts/${a}/${r.slug}`} className="block h-full press-feedback" style={{ textDecoration: 'none' }}>
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
          {comparisons.length > 0 && (
            <p className="text-sm mt-6" style={{ color: C.textSoft }}>
              <span className="font-semibold" style={{ color: C.text }}>Names confusing? </span>
              {comparisons.map((cp, i) => (
                <span key={cp.slug}>
                  <Link href={`/cuts/compare/${cp.slug}`} style={{ color: C.emberLight, textDecoration: 'underline' }}>
                    {cp.name.toLowerCase()}
                  </Link>
                  {i < comparisons.length - 1 ? ', ' : '.'}
                </span>
              ))}
            </p>
          )}
        </Section>

        <Section tone="surface" id="temps" labelledBy="temps-heading" width="max-w-6xl">
          <Eyebrow>Temperatures</Eyebrow>
          <H2 id="temps-heading">Safe first. Then done.</H2>
          <div className={`grid ${ground ? 'md:grid-cols-2' : ''} gap-4 mb-10`}>
            <SafetyLine safety={safety} />
            {ground && <SafetyLine safety={ground} />}
          </div>
          <div className="space-y-10">
            {donenessIds.map((d) => (
              <DonenessTable key={d} id={d} title={d.replace('doneness-', '').replace(/-/g, ' ')} />
            ))}
          </div>
          <p className="mt-6 text-sm" style={{ color: C.textMuted }}>
            Collagen cuts do not use a doneness scale. They cook to a tenderness window, shown on each cut page and on the{' '}
            <Link href={`/temperatures/${a}`} style={{ color: C.emberLight, textDecoration: 'underline' }}>
              {animal.name.toLowerCase()} temperature page
            </Link>
            .
          </p>
        </Section>

        <Section id="woods" labelledBy="woods-heading" width="max-w-6xl">
          <Eyebrow>Woods</Eyebrow>
          <H2 id="woods-heading">What to burn under {animal.name.toLowerCase()}</H2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm" aria-label={`Best woods for ${animal.name.toLowerCase()}`}>
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

        {a === 'beef' && (
          <Section tone="surface" width="max-w-6xl" id="quick-reference" labelledBy="qr-heading">
            <Eyebrow>Quick reference</Eyebrow>
            <H2 id="qr-heading">The nine primals on one card</H2>
            <P className="mb-6">
              Tenderness, richness, best method, finish and slice direction for each region, with the USDA reminder in the
              corner. The numbers on this card match the records on this page.
            </P>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/cuts/beef-cut-quick-reference.jpg"
              alt="Beef cut quick reference card: nine primal regions with tenderness, richness, best method, finish and slice direction, the Pit Log Ember Citrus BBQ Sauce teaser, and the USDA reminder that whole-muscle beef is 145 F with a 3 minute rest and ground beef 160 F"
              width={1103}
              height={1426}
              loading="lazy"
              className="w-full max-w-3xl h-auto"
              style={{ borderRadius: '0.25rem', border: `1px solid ${C.border}` }}
            />
            <p className="text-xs mt-2" style={{ color: C.textMuted }}>
              Poster print coming once the print master is ready. The sauce it names is{' '}
              <Link href="/recipes/pit-log-ember-citrus-bbq-sauce" style={{ color: C.emberLight, textDecoration: 'underline' }}>
                live in the test kitchen
              </Link>
              .
            </p>
          </Section>
        )}

        <Section tone="bgDeep" width="max-w-6xl">
          <Label>Cook it, log it</Label>
          <H2>{liveRecipes.length ? `${animal.name} recipes` : 'Recipes'}</H2>
          {liveRecipes.length ? (
            <ul className="mb-8 space-y-2">
              {liveRecipes.map((r) => (
                <li key={r.slug}>
                  <Link href={`/recipes/${r.slug}`} style={{ color: C.emberLight, textDecoration: 'underline' }}>
                    {r.title}
                  </Link>
                  <span style={{ color: C.textMuted }}> ({r.status.replace('_', ' ').toLowerCase()})</span>
                </li>
              ))}
            </ul>
          ) : (
            <P className="mb-8">
              The {animal.name.toLowerCase()} house recipes are in the test kitchen. See what is live on the{' '}
              <Link href="/recipes" style={{ color: C.emberLight, textDecoration: 'underline' }}>
                recipes page
              </Link>
              .
            </P>
          )}
          <CtaRow posterNote="Poster: once the print master is ready." />
          <Citations refs={refs} updatedAt="2026-09-02" />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
