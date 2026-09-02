import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ANIMALS, cutReference, getRegions, getSafetyMinimum, getPitmasterTarget, getWood, renderableDoneness, type AnimalSlug } from '@/content';
import { SafetyLine } from '@/components/content/SafetyLine';
import { DonenessTable } from '@/components/content/DonenessTable';
import { Citations } from '@/components/content/Citations';
import { GearList } from '@/components/content/GearList';
import { Breadcrumbs, C, Card, CtaRow, Eyebrow, H1, H2, Label, Lede, P, Section, Td, Th, Tr } from '@/components/content/ui';

export function generateStaticParams() {
  return ANIMALS.flatMap((a) => getRegions(a.slug).map((r) => ({ animal: a.slug, region: r.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ animal: string; region: string }> }): Promise<Metadata> {
  const { animal, region } = await params;
  const ref = cutReference(animal as AnimalSlug, region);
  if (!ref) return {};
  const t = ref.tenderness;
  const rest = ref.safety.rest ? ' with a 3 minute rest' : '';
  const desc = t
    ? `${ref.animal.name} ${ref.region.name.toLowerCase()}: ${ref.region.short_description} Tender at ${t.window_f?.min} to ${t.window_f?.max} F, ${t.finish_test?.replace(/_/g, ' ')}. USDA minimum ${ref.safety.temp_f} F${rest}.`
    : `${ref.animal.name} ${ref.region.name.toLowerCase()}: ${ref.region.short_description} USDA minimum ${ref.safety.temp_f} F${rest}. Best methods, woods, slicing and mistakes.`;
  return {
    title: `${ref.animal.name} ${ref.region.name}: Cuts, Temps, Woods and How to Cook It`,
    description: desc.slice(0, 158),
    alternates: { canonical: `https://pitlog.app/cuts/${animal}/${region}` },
  };
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1" style={{ color: C.textMuted }}>
        <span>{label}</span>
        <span>{value} / 5</span>
      </div>
      <div className="flex gap-1" role="img" aria-label={`${label} ${value} of 5`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className="h-2 flex-1" style={{ background: n <= value ? C.ember : C.border, borderRadius: 2 }} />
        ))}
      </div>
    </div>
  );
}

function finishLabel(finish: string, animal: AnimalSlug): string {
  const t = getPitmasterTarget(finish);
  if (t) return `${t.finish_test?.replace(/_/g, ' ')}, ${t.window_f?.min} to ${t.window_f?.max} F (craft)`;
  const s = getSafetyMinimum(finish);
  if (s) return `${s.temp_f} F${s.rest ? ' + rest' : ''} (USDA)`;
  const d = renderableDoneness(finish);
  if (d) return `Your doneness, ${d.safety.temp_f} F${d.safety.rest ? ' + rest' : ''} USDA floor`;
  return finish;
}

export default async function RegionPage({ params }: { params: Promise<{ animal: string; region: string }> }) {
  const { animal: aSlug, region } = await params;
  const a = aSlug as AnimalSlug;
  const ref = cutReference(a, region);
  if (!ref) notFound();
  const { region: r, safety, tenderness, woods, recipes, citations, animal } = ref;
  const ground = getSafetyMinimum('safety-ground-meat')!;
  const total = getRegions(a).length;
  const restText = safety.rest ? ` with a 3 minute rest` : '';
  const name = r.name.toLowerCase();

  const answer = tenderness
    ? `${animal.name} ${name} is done when it is ${tenderness.finish_test?.replace(/_/g, ' ')}, usually between ${tenderness.window_f?.min} and ${tenderness.window_f?.max} F. The number is a checkpoint. USDA FSIS calls ${animal.name.toLowerCase()} safe at ${safety.temp_f} F${restText}. Tenderness comes later.`
    : `${animal.name} ${name} cooks to the doneness you like, at or above the USDA minimum of ${safety.temp_f} F${restText}. It is not a low-and-slow cut.`;

  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">
        <Section tone="bgDeep">
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Cuts', href: '/cuts' },
              { name: animal.name, href: `/cuts/${a}` },
              { name: r.name, href: `/cuts/${a}/${r.slug}` },
            ]}
          />
          <Eyebrow>
            {animal.name} region {String(r.number).padStart(2, '0')} of {total}
          </Eyebrow>
          <H1>{r.name}.</H1>
          <Lede>{r.short_description}</Lede>
          <Card raised>
            <Label>{tenderness ? `What temp is ${animal.name.toLowerCase()} ${name} done?` : `How do you cook ${animal.name.toLowerCase()} ${name}?`}</Label>
            <p className="text-lg leading-relaxed" style={{ color: C.text }}>
              {answer}
            </p>
          </Card>
        </Section>

        <Section>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <Eyebrow>What it is</Eyebrow>
              <H2>Where it comes from</H2>
              <P className="mb-6">{r.long_description}</P>
              {r.fsis_parent && (
                <p className="text-sm" style={{ color: C.textMuted }}>
                  USDA FSIS primal: {r.fsis_parent}. {animal.primal_scheme.note.split('.')[0]}.
                </p>
              )}
            </div>
            <div className="space-y-6">
              <Card>
                <Label>At a glance</Label>
                <div className="space-y-4">
                  <Bar label="Tenderness" value={r.tenderness_score} />
                  <Bar label="Richness" value={r.richness_score} />
                </div>
                <dl className="mt-5 text-sm space-y-2" style={{ color: C.textSoft }}>
                  <div>
                    <dt className="font-semibold inline" style={{ color: C.text }}>Best methods: </dt>
                    <dd className="inline">{r.best_methods.join(', ')}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold inline" style={{ color: C.text }}>Slice: </dt>
                    <dd className="inline">{r.slice_direction}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold inline" style={{ color: C.text }}>Rest: </dt>
                    <dd className="inline">{r.rest_guidance}</dd>
                  </div>
                </dl>
                <p className="text-xs mt-4" style={{ color: C.textMuted }}>
                  Scores are Pit Log editorial, anchored to FSIS tenderness notes.
                </p>
              </Card>
            </div>
          </div>
        </Section>

        <Section tone="surface" id="cuts" labelledBy="cuts-heading">
          <Eyebrow>Retail cuts</Eyebrow>
          <H2 id="cuts-heading">What you will see at the counter</H2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm" aria-label={`Retail cuts from the ${animal.name.toLowerCase()} ${name}`}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  <Th>Cut</Th>
                  <Th>Methods</Th>
                  <Th>Finish</Th>
                  <Th>Notes</Th>
                </tr>
              </thead>
              <tbody>
                {r.retail_cuts.map((rc, i) => (
                  <Tr key={rc.slug} i={i}>
                    <Td strong>{rc.name}</Td>
                    <Td>{rc.methods.join(', ')}</Td>
                    <Td num>{finishLabel(rc.finish, a)}</Td>
                    <Td>{rc.note}</Td>
                  </Tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="temps" labelledBy="temps-heading">
          <Eyebrow>Temperatures</Eyebrow>
          <H2 id="temps-heading">Safe. Then done.</H2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <SafetyLine safety={safety} />
            {r.retail_cuts.some((rc) => rc.finish === 'safety-ground-meat') && <SafetyLine safety={ground} />}
          </div>
          {tenderness && (
            <Card raised className="mb-8">
              <Label>Tenderness target ({tenderness.review_status === 'SOURCED' ? 'sourced, see citations' : 'barbecue convention'})</Label>
              <p className="font-display text-2xl mb-2" style={{ color: C.text }}>
                {tenderness.window_f?.min} to {tenderness.window_f?.max} F, {tenderness.finish_test?.replace(/_/g, ' ')}
              </p>
              <P className="mb-3">{tenderness.statement}</P>
              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm" style={{ color: C.textSoft }}>
                <div>
                  <dt className="font-semibold inline" style={{ color: C.text }}>Probe where: </dt>
                  <dd className="inline">{tenderness.probe_where}</dd>
                </div>
                <div>
                  <dt className="font-semibold inline" style={{ color: C.text }}>Pit: </dt>
                  <dd className="inline">{tenderness.pit_temp_f?.min} to {tenderness.pit_temp_f?.max} F</dd>
                </div>
                <div>
                  <dt className="font-semibold inline" style={{ color: C.text }}>Planning time: </dt>
                  <dd className="inline">{tenderness.planning_time}</dd>
                </div>
                <div>
                  <dt className="font-semibold inline" style={{ color: C.text }}>Stall: </dt>
                  <dd className="inline">{tenderness.stall}</dd>
                </div>
              </dl>
              {tenderness.conflicts.map((c) => (
                <p key={c.resolution} className="text-xs mt-3" style={{ color: C.textMuted }}>
                  Two sources disagree: {c.between.join(' vs. ')}. {c.resolution}
                </p>
              ))}
            </Card>
          )}
          {!tenderness && (
            <Card className="mb-8">
              <Label>Planning time</Label>
              <P>{r.planning_time_guidance}</P>
            </Card>
          )}
          <div className="space-y-10">
            {r.doneness_refs.map((d) => (
              <DonenessTable key={d} id={d} title={d.replace('doneness-', '').replace(/-/g, ' ')} />
            ))}
          </div>
          <p className="mt-6 text-sm" style={{ color: C.textMuted }}>
            More on the{' '}
            <Link href={`/temperatures/${a}`} style={{ color: C.emberLight, textDecoration: 'underline' }}>
              {animal.name.toLowerCase()} temperature page
            </Link>{' '}
            and the{' '}
            <Link href="/temperatures" style={{ color: C.emberLight, textDecoration: 'underline' }}>
              full chart
            </Link>
            .
          </p>
        </Section>

        <Section tone="surface">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <Eyebrow>Woods</Eyebrow>
              <H2>Smoke</H2>
              <ul className="space-y-3">
                {r.best_woods.map((w) => {
                  const wood = getWood(w.split(' ')[0].toLowerCase());
                  return (
                    <li key={w} className="text-sm" style={{ color: C.textSoft }}>
                      <Link href={`/woods#${wood?.slug ?? ''}`} className="font-semibold" style={{ color: C.text, textDecoration: 'underline' }}>
                        {w.charAt(0).toUpperCase() + w.slice(1)}
                      </Link>
                      {wood ? `: ${wood.flavor_character}` : ''}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <Eyebrow>Mistakes</Eyebrow>
              <H2>What ruins it</H2>
              {r.common_mistakes.length ? (
                <ul className="space-y-3">
                  {r.common_mistakes.map((m, i) => (
                    <li key={m} className="flex gap-3 text-sm" style={{ color: C.textSoft }}>
                      <span className="font-display" style={{ color: 'oklch(0.80 0.12 30)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {m}
                    </li>
                  ))}
                </ul>
              ) : (
                <P muted>Hard to ruin. Cook it with the rest of the bird.</P>
              )}
            </div>
          </div>
        </Section>

        <Section>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <Eyebrow>Recipes</Eyebrow>
              <H2>Cook it</H2>
              {recipes.length ? (
                <ul className="space-y-3">
                  {recipes.map((rec) =>
                    rec.status === 'PLANNED' ? (
                      <li key={rec.slug} className="text-sm" style={{ color: C.textMuted }}>
                        {rec.title}: in the test kitchen. Not published yet.
                      </li>
                    ) : (
                      <li key={rec.slug}>
                        <Link href={`/recipes/${rec.slug}`} className="text-lg" style={{ color: C.emberLight, textDecoration: 'underline' }}>
                          {rec.title}
                        </Link>
                        <p className="text-sm" style={{ color: C.textSoft }}>
                          {rec.description}
                        </p>
                      </li>
                    ),
                  )}
                </ul>
              ) : (
                <P muted>No Pit Log recipe for this region yet.</P>
              )}
            </div>
            <GearList refs={r.gear_category_refs} />
          </div>
        </Section>

        <Section tone="bgDeep">
          <Label>Log it</Label>
          <H2>Then write down what happened</H2>
          <P className="mb-8">Pit temp, wood, wrap, final temp, rest, result. The chart says what usually works. Your log says what worked for you.</P>
          <CtaRow />
          <Citations refs={citations.map((c) => c.id)} updatedAt={r.updated_at} />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
