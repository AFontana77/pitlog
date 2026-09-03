import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { FINISH_TESTS, HANDLING, RECIPES, getPitmasterTarget, type PitmasterTarget } from '@/content';
import { ogImageMeta } from '@/content/ogImage';
import { CUT_TEMPERATURE_PAGES, cutTemperaturePagesFor, getCutTemperaturePage, resolveCutPage } from '@/content/cutTemperaturePages';
import { SafetyLine } from '@/components/content/SafetyLine';
import { DonenessTable } from '@/components/content/DonenessTable';
import { Citations } from '@/components/content/Citations';
import { finishLabel } from '@/components/content/finishLabel';
import { Breadcrumbs, C, Card, CtaRow, Eyebrow, H1, H2, H3, Label, P, Section, Td, Th, Tr } from '@/components/content/ui';

/**
 * Answer-first page for one cut's temperature question (pork chop, pork
 * tenderloin, chicken breast, chicken thigh, ribs). The registry in
 * src/content/cutTemperaturePages.ts names the records; this file only
 * lays them out. Safety first, then preference, then tenderness, never merged.
 */
const HANDLING_IDS = ['handling-thermometer-placement', 'handling-colour-is-not-doneness', 'handling-rest-is-part-of-safety', 'handling-danger-zone'];

/**
 * Meta descriptions are cut at 158 characters. Cut on a word boundary and
 * finish with an ellipsis: a hard slice left "which is below t" in the SERP.
 */
function clampDescription(d: string): string {
  if (d.length <= 158) return d;
  const cut = d.slice(0, 157);
  const at = cut.lastIndexOf(' ');
  return `${(at > 120 ? cut.slice(0, at) : cut).replace(/[,;:.]$/, '')}…`;
}

export function generateStaticParams() {
  return CUT_TEMPERATURE_PAGES.map((p) => ({ animal: p.animal, cut: p.cut }));
}

export async function generateMetadata({ params }: { params: Promise<{ animal: string; cut: string }> }): Promise<Metadata> {
  const { animal, cut } = await params;
  const page = getCutTemperaturePage(animal, cut);
  if (!page) return {};
  const ctx = resolveCutPage(page);
  const copy = page.copy(ctx);
  const url = `https://pitlog.app/temperatures/${animal}/${cut}`;
  const description = clampDescription(copy.description);
  const card = ogImageMeta(page.animal, `${ctx.animal.name} cut diagram`);
  return {
    title: copy.title,
    description,
    alternates: { canonical: url },
    openGraph: { title: copy.title, description, url, type: 'article', ...card.openGraph },
    twitter: { card: 'summary_large_image', title: copy.title, description, ...card.twitter },
  };
}

/**
 * A tenderness record. Every field below the window is optional, because not
 * every record in this section is a cook-to target: the stall is a concept
 * with no finish test, no pit range and no rest. Printing the labels
 * unconditionally produced "Pit undefined to undefined F."
 */
function TargetCard({ t, label }: { t: PitmasterTarget; label: string }) {
  const test = t.finish_test ?? '';
  const sourced = t.review_status === 'SOURCED';
  const meta = [
    t.pit_temp_f ? `Pit ${t.pit_temp_f.min} to ${t.pit_temp_f.max} F.` : '',
    t.planning_time ?? '',
    t.rest ? `Rest: ${t.rest}` : '',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <Card raised>
      <Label>
        {label} ({test ? (sourced ? 'sourced, window is craft' : 'barbecue convention') : sourced ? 'sourced' : 'barbecue convention'})
      </Label>
      <p className="font-display text-2xl mb-2" style={{ color: C.text }}>
        {t.window_f?.min} to {t.window_f?.max} F{test ? `, ${test.replace(/_/g, ' ')}` : ''}
      </p>
      <P className="text-sm mb-2">{t.statement}</P>
      {FINISH_TESTS[test] && (
        <p className="text-sm mb-2" style={{ color: C.textSoft }}>
          <span className="font-semibold" style={{ color: C.text }}>
            {test.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}:{' '}
          </span>
          {FINISH_TESTS[test]}
        </p>
      )}
      {meta && (
        <p className="text-xs" style={{ color: C.textMuted }}>
          {meta}
        </p>
      )}
      {t.conflicts.map((c) => (
        <p key={c.resolution} className="text-xs mt-3" style={{ color: C.textMuted }}>
          Two sources disagree: {c.between.join(' vs. ')}. {c.resolution}
        </p>
      ))}
    </Card>
  );
}

export default async function CutTemperaturePage({ params }: { params: Promise<{ animal: string; cut: string }> }) {
  const { animal: aSlug, cut: cSlug } = await params;
  const page = getCutTemperaturePage(aSlug, cSlug);
  if (!page) notFound();
  const ctx = resolveCutPage(page);
  const { animal, safety, secondary, primary, regions, cuts, targets, doneness } = ctx;
  const copy = page.copy(ctx);
  const cross = (page.crossTargets ?? [])
    .map((x) => ({ ...x, t: getPitmasterTarget(x.id) }))
    .filter((x): x is typeof x & { t: PitmasterTarget } => !!x.t);
  const handling = HANDLING.filter((h) => HANDLING_IDS.includes(h.id));
  const recipeSlugs = new Set(regions.flatMap((r) => r.recipe_refs));
  const recipes = RECIPES.filter((r) => recipeSlugs.has(r.slug) && r.status !== 'PLANNED' && r.status !== 'RETIRED');
  const siblings = cutTemperaturePagesFor(page.animal).filter((p) => p.cut !== page.cut);
  const regionGuidance = page.regionGuidance !== false;
  const refs = [
    ...safety.source_refs,
    ...(secondary?.source_refs ?? []),
    ...regions.flatMap((r) => r.source_refs),
    ...targets.flatMap((t) => t.source_refs),
    ...cross.flatMap((x) => x.t.source_refs),
    ...doneness.flatMap((d) => d.source_refs),
    ...handling.flatMap((h) => h.source_refs),
  ];
  const updatedAt = [safety, ...regions, ...targets, ...doneness].map((r) => r.updated_at).sort().at(-1);

  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">
        <Section tone="bgDeep">
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Temperatures', href: '/temperatures' },
              { name: animal.name, href: `/temperatures/${page.animal}` },
              { name: page.name, href: `/temperatures/${page.animal}/${page.cut}` },
            ]}
          />
          <Eyebrow>{animal.name} temperature guide</Eyebrow>
          <H1>{copy.h1}</H1>
          <Card raised className="mb-6">
            <Label>{copy.question}</Label>
            <p className="text-lg leading-relaxed" style={{ color: C.text }}>
              {copy.intro}
            </p>
          </Card>
          <div className={`grid ${secondary ? 'md:grid-cols-2' : ''} gap-4`}>
            <SafetyLine safety={safety} />
            {secondary && <SafetyLine safety={secondary} contrast />}
          </div>
        </Section>

        <Section>
          <Eyebrow>The cuts</Eyebrow>
          <H2>What this covers at the counter</H2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm" aria-label={`${page.name} retail cuts and finish temperatures`}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  <Th>Cut</Th>
                  <Th>Methods</Th>
                  <Th>Finish</Th>
                  <Th>Notes</Th>
                  <Th>Guide</Th>
                </tr>
              </thead>
              <tbody>
                {cuts.map(({ region, cut }, i) => (
                  <Tr key={`${region.slug}/${cut.slug}`} i={i}>
                    <Td strong>{cut.name}</Td>
                    <Td>{cut.methods.join(', ')}</Td>
                    <Td num>{finishLabel(cut.finish)}</Td>
                    <Td>{cut.note}</Td>
                    <Td>
                      <Link href={`/cuts/${page.animal}/${region.slug}`} style={{ color: C.emberLight, textDecoration: 'underline' }}>
                        {region.name}
                      </Link>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {(targets.length > 0 || cross.length > 0) && (
          <Section tone="surface">
            <Eyebrow>Tenderness target</Eyebrow>
            <H2>Safe comes first. Tender comes later.</H2>
            <div className="grid md:grid-cols-2 gap-6">
              {targets.map((t) => (
                <TargetCard key={t.id} t={t} label={page.name} />
              ))}
              {cross.map((x) => (
                <div key={x.id}>
                  <TargetCard t={x.t} label={x.label} />
                  {x.href && (
                    <p className="text-sm mt-3" style={{ color: C.textSoft }}>
                      <Link href={x.href} style={{ color: C.emberLight, textDecoration: 'underline' }}>
                        {x.label} cut guide
                      </Link>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {doneness.length > 0 && (
          <Section>
            <Eyebrow>Doneness</Eyebrow>
            <H2>Preference, with the minimum printed beside it</H2>
            <div className="space-y-10 mt-6">
              {doneness.map((d) => (
                <DonenessTable key={d.id} id={d.id} title={d.id.replace('doneness-', '').replace(/-/g, ' ')} />
              ))}
            </div>
          </Section>
        )}

        <Section tone={doneness.length > 0 ? 'surface' : undefined}>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <Eyebrow>Probe placement</Eyebrow>
              <H3>Where the thermometer goes</H3>
              <P className="text-sm mb-6">{copy.probe}</P>
              {regionGuidance && (
                <>
                  <Eyebrow>Planning</Eyebrow>
                  <dl className="text-sm space-y-2" style={{ color: C.textSoft }}>
                    <div>
                      <dt className="font-semibold inline" style={{ color: C.text }}>Time: </dt>
                      <dd className="inline">{primary.planning_time_guidance}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold inline" style={{ color: C.text }}>Rest: </dt>
                      <dd className="inline">{primary.rest_guidance}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold inline" style={{ color: C.text }}>Slice: </dt>
                      <dd className="inline">{primary.slice_direction}</dd>
                    </div>
                  </dl>
                </>
              )}
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
              {regionGuidance && primary.common_mistakes.length > 0 && (
                <>
                  <Eyebrow>Mistakes</Eyebrow>
                  <ul className="space-y-3">
                    {primary.common_mistakes.map((m, i) => (
                      <li key={m} className="flex gap-3 text-sm" style={{ color: C.textSoft }}>
                        <span className="font-display" style={{ color: 'oklch(0.80 0.12 30)' }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </Section>

        <Section tone="bgDeep">
          <Label>Next</Label>
          <H2>Cook it, then log it</H2>
          <P className="mb-4">
            The{' '}
            <Link href={`/temperatures/${page.animal}`} style={{ color: C.emberLight, textDecoration: 'underline' }}>
              {animal.name.toLowerCase()} temperature page
            </Link>{' '}
            covers every cut. The{' '}
            <Link href={`/cuts/${page.animal}/${primary.slug}`} style={{ color: C.emberLight, textDecoration: 'underline' }}>
              {primary.name.toLowerCase()} cut guide
            </Link>{' '}
            has the woods, the mistakes and the recipes.
            {siblings.length > 0 && (
              <>
                {' '}Also:{' '}
                {siblings.map((s, i) => (
                  <span key={s.cut}>
                    <Link href={`/temperatures/${s.animal}/${s.cut}`} style={{ color: C.emberLight, textDecoration: 'underline' }}>
                      {s.name.toLowerCase()} internal temp
                    </Link>
                    {i < siblings.length - 1 ? ', ' : '.'}
                  </span>
                ))}
              </>
            )}
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
