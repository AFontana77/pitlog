import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { HANDLING, RECIPES } from '@/content';
import { COMPARISON_PAGES, getComparisonPage, resolveComparison, type CompareAttr, type ResolvedSide } from '@/content/comparisonPages';
import { SafetyLine } from '@/components/content/SafetyLine';
import { Citations } from '@/components/content/Citations';
import { finishLabel } from '@/components/content/finishLabel';
import { ogImageMeta } from '@/content/ogImage';
import { Breadcrumbs, C, Card, CtaRow, Eyebrow, H1, H2, H3, Label, P, Section, Td, Th, Tr } from '@/components/content/ui';

/**
 * "Which cut is which" pages. The registry in src/content/comparisonPages.ts
 * names the records and this file lays them out.
 *
 * The verdict goes first and in plain words. Someone standing at a meat
 * counter with their phone out needs the answer in one sentence, not after a
 * table.
 */
const HANDLING_IDS = ['handling-thermometer-placement', 'handling-colour-is-not-doneness'];

const ATTR_LABEL: Record<CompareAttr, string> = {
  where: 'Where it sits',
  scores: 'Tenderness and richness',
  methods: 'Best methods',
  finish: 'Finish',
  planning: 'Planning time',
  rest: 'Rest',
  slice: 'Slice',
  note: 'At the counter',
};

/** Every value here resolves from a record; nothing is written per page. */
function attrValue(attr: CompareAttr, s: ResolvedSide): string {
  const r = s.region;
  switch (attr) {
    case 'where':
      return `Region ${r.number} of the chart. ${r.short_description}`;
    case 'scores':
      return `Tenderness ${r.tenderness_score}/5. Richness ${r.richness_score}/5.`;
    case 'methods':
      return (s.cut?.methods ?? r.best_methods).join(', ');
    case 'finish':
      return s.cut ? finishLabel(s.cut.finish) : s.target ? finishLabel(s.target.id) : '';
    case 'planning':
      return r.planning_time_guidance;
    case 'rest':
      return r.rest_guidance;
    case 'slice':
      return r.slice_direction;
    case 'note':
      return s.cut?.note ?? r.short_description;
  }
}

export function generateStaticParams() {
  return COMPARISON_PAGES.map((p) => ({ pair: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ pair: string }> }): Promise<Metadata> {
  const { pair } = await params;
  const page = getComparisonPage(pair);
  if (!page) return {};
  const copy = page.copy(resolveComparison(page));
  const url = `https://pitlog.app/cuts/compare/${pair}`;
  const description = copy.description.slice(0, 158);
  const card = ogImageMeta(page.animal, `${page.animal} cut diagram`);
  return {
    title: copy.title,
    description,
    alternates: { canonical: url },
    openGraph: { title: copy.title, description, url, type: 'article', ...card.openGraph },
    twitter: { card: 'summary_large_image', title: copy.title, description, ...card.twitter },
  };
}

export default async function ComparisonPage({ params }: { params: Promise<{ pair: string }> }) {
  const { pair } = await params;
  const page = getComparisonPage(pair);
  if (!page) notFound();
  const ctx = resolveComparison(page);
  const { animal, safety, sides, regions } = ctx;
  const copy = page.copy(ctx);
  const handling = HANDLING.filter((h) => HANDLING_IDS.includes(h.id));
  const recipeSlugs = new Set(regions.flatMap((r) => r.recipe_refs));
  const recipes = RECIPES.filter((r) => recipeSlugs.has(r.slug) && r.status !== 'PLANNED' && r.status !== 'RETIRED');
  const targets = sides.map((s) => s.target).filter((t, i, a) => t && a.findIndex((x) => x?.id === t.id) === i);
  const refs = [
    ...safety.source_refs,
    ...regions.flatMap((r) => r.source_refs),
    ...animal.source_refs,
    ...targets.flatMap((t) => t?.source_refs ?? []),
    ...handling.flatMap((h) => h.source_refs),
  ];
  const updatedAt = [safety, ...regions].map((r) => r.updated_at).sort().at(-1);
  // The rest of the counter: every retail cut in the regions involved, minus
  // the ones already standing as columns in the table. Iterating sides here
  // would list a shared region's cuts once per side, and iterating regions
  // would print the sides' own notes a second time.
  const sideCuts = new Set(sides.map((s) => (s.cut ? `${s.region.slug}/${s.cut.slug}` : '')));
  const otherCuts = regions.flatMap((r) =>
    r.retail_cuts.filter((c) => !sideCuts.has(`${r.slug}/${c.slug}`)).map((cut) => ({ region: r, cut })),
  );

  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">
        <Section tone="bgDeep">
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Cuts', href: '/cuts' },
              { name: animal.name, href: `/cuts/${page.animal}` },
              { name: page.name, href: `/cuts/compare/${page.slug}` },
            ]}
          />
          <Eyebrow>{animal.name} cut guide</Eyebrow>
          <H1>{copy.h1}</H1>
          <Card raised className="mb-6">
            <Label>{copy.question}</Label>
            <p className="text-lg leading-relaxed" style={{ color: C.text }}>
              {copy.answer}
            </p>
          </Card>
          <P className="text-sm">{copy.why}</P>
        </Section>

        <Section>
          <Eyebrow>Side by side</Eyebrow>
          <H2>Where they differ, and where they do not</H2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm" aria-label={`${page.name} compared`}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  <Th>{' '}</Th>
                  {sides.map((s) => (
                    <Th key={s.label}>{s.label}</Th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {page.rows.map((attr, i) => {
                  const values = sides.map((s) => attrValue(attr, s));
                  // A value that is the same on every side is printed once,
                  // spanning the columns. Repeating it in each column dresses
                  // a similarity up as a difference.
                  const same = values.every((v) => v === values[0]);
                  return (
                    <Tr key={attr} i={i}>
                      <Td strong>{ATTR_LABEL[attr]}</Td>
                      {same ? (
                        <td colSpan={sides.length} className="py-3 px-3 align-top" style={{ color: C.textSoft }}>
                          <span className="font-semibold" style={{ color: C.text }}>
                            {sides.length === 2 ? 'Both' : 'All'}:{' '}
                          </span>
                          {values[0]}
                        </td>
                      ) : (
                        values.map((v, j) => <Td key={sides[j].label}>{v}</Td>)
                      )}
                    </Tr>
                  );
                })}
                <Tr i={page.rows.length}>
                  <Td strong>Full guide</Td>
                  {new Set(sides.map((s) => s.region.slug)).size === 1 ? (
                    // Sides that are retail cuts of one region share a guide.
                    <td colSpan={sides.length} className="py-3 px-3 align-top">
                      <Link href={`/cuts/${page.animal}/${sides[0].region.slug}`} style={{ color: C.emberLight, textDecoration: 'underline' }}>
                        {sides[0].region.name}
                      </Link>
                    </td>
                  ) : (
                    sides.map((s) => (
                      <Td key={s.label}>
                        <Link href={`/cuts/${page.animal}/${s.region.slug}`} style={{ color: C.emberLight, textDecoration: 'underline' }}>
                          {s.region.name}
                        </Link>
                      </Td>
                    ))
                  )}
                </Tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section tone="surface">
          <Eyebrow>Temperature</Eyebrow>
          <H2>Both cook to the same numbers</H2>
          <SafetyLine safety={safety} />
          {targets.map((t) =>
            t?.window_f ? (
              <Card raised key={t.id} className="mt-4">
                <Label>Pitmaster finish (craft)</Label>
                <p className="font-display text-2xl mb-2" style={{ color: C.text }}>
                  {t.window_f.min} to {t.window_f.max} F, {t.finish_test?.replace(/_/g, ' ')}
                </p>
                <P className="text-sm">{t.statement}</P>
              </Card>
            ) : null,
          )}
        </Section>

        <Section>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <Eyebrow>Buying</Eyebrow>
              <H3>Which one to put in the cart</H3>
              <P className="text-sm">{copy.buying}</P>
            </div>
            <div>
              {otherCuts.length > 0 && <Eyebrow>Also on the counter</Eyebrow>}
              <ul className="space-y-3 text-sm" style={{ color: C.textSoft }}>
                {otherCuts.map(({ region, cut }) => (
                  <li key={`${region.slug}/${cut.slug}`}>
                    <span className="font-semibold" style={{ color: C.text }}>
                      {cut.name}.{' '}
                    </span>
                    {finishLabel(cut.finish)}. {cut.note}
                  </li>
                ))}
              </ul>
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
          <H2>Now cook it</H2>
          <P className="mb-4">
            {page.nextCut && (
              <>
                The{' '}
                <Link href={`/temperatures/${page.animal}/${page.nextCut.cut}`} style={{ color: C.emberLight, textDecoration: 'underline' }}>
                  {page.nextCut.label}
                </Link>{' '}
                has the finish window, the stall and the rest.{' '}
              </>
            )}
            The{' '}
            <Link href={`/temperatures/${page.animal}`} style={{ color: C.emberLight, textDecoration: 'underline' }}>
              {animal.name.toLowerCase()} temperature page
            </Link>{' '}
            covers every cut.
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
          <Citations refs={refs} updatedAt={updatedAt} />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
