import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { HANDLING, RECIPES, getPitmasterTarget, getRecipe, getSafetyMinimum, getWood, renderableDoneness } from '@/content';
import { SafetyLine } from '@/components/content/SafetyLine';
import { Citations } from '@/components/content/Citations';
import { GearList } from '@/components/content/GearList';
import { ShopThisRecipe } from '@/components/content/ShopThisRecipe';
import { PrintButton } from '@/components/content/PrintButton';
import { Breadcrumbs, C, Card, CtaRow, Eyebrow, H1, H2, H3, Label, Lede, P, Section } from '@/components/content/ui';
import { ogImageMeta } from '@/content/ogImage';

const LIVE = RECIPES.filter((r) => r.status !== 'PLANNED' && r.status !== 'RETIRED');

export function generateStaticParams() {
  return LIVE.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = getRecipe(slug);
  if (!r || r.status === 'PLANNED') return {};
  const url = `https://pitlog.app/recipes/${slug}`;
  const title = `${r.title} Recipe`;
  const description = r.description.slice(0, 158);
  // A sauce or rub has no animal, so it falls back to the site card.
  const card = ogImageMeta(r.animal, r.animal ? `${r.animal} cut diagram` : 'Pit Master Log');
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'article', ...card.openGraph },
    twitter: { card: 'summary_large_image', title, description, ...card.twitter },
  };
}

const STATUS_LABEL: Record<string, string> = {
  TEST_V1: 'Test kitchen, draft 1. Not yet cooked and logged.',
  TEST_V2: 'Test kitchen, draft 2. Cooked once.',
  TEST_V3: 'Test kitchen, draft 3.',
  OFFICIAL: 'Official Pit Log recipe. Kitchen tested.',
};

function isoDuration(text: string | null | undefined): string | undefined {
  if (!text) return undefined;
  const m = text.match(/(\d+)\s*(minutes|minute|min)/i);
  if (m) return `PT${m[1]}M`;
  const h = text.match(/(\d+)\s*(hours|hour|h)\b/i);
  if (h) return `PT${h[1]}H`;
  return undefined;
}

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = getRecipe(slug);
  if (!r || r.status === 'PLANNED' || r.status === 'RETIRED') notFound();

  const safety = r.safety_refs.map(getSafetyMinimum).filter((s): s is NonNullable<typeof s> => !!s);
  const handling = r.safety_refs.map((id) => HANDLING.find((h) => h.id === id)).filter((h): h is NonNullable<typeof h> => !!h);
  const target = getPitmasterTarget(r.finish_ref);
  const doneness = r.finish_ref ? renderableDoneness(r.finish_ref) : undefined;
  const finishSafety = r.finish_ref ? getSafetyMinimum(r.finish_ref) : undefined;
  const pit = HANDLING.find((h) => h.id === r.pit_temp_ref);
  const woods = r.wood_refs.map(getWood).filter((w): w is NonNullable<typeof w> => !!w);
  const refs = [...safety.flatMap((s) => s.source_refs), ...handling.flatMap((h) => h.source_refs), ...(target?.source_refs ?? []), ...(doneness?.record.source_refs ?? [])];

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: r.title,
    description: r.description,
    author: { '@type': 'Organization', name: 'Pit Log by Anvil Road LLC' },
    recipeYield: r.yield ?? undefined,
    prepTime: isoDuration(r.prep_time),
    recipeCategory: r.family,
    recipeCuisine: 'American barbecue',
    recipeIngredient: (r.ingredient_groups ?? []).flatMap((g) => g.items.map((i) => `${i.qty} ${i.item}`)),
    recipeInstructions: (r.steps ?? []).map((s, i) => ({ '@type': 'HowToStep', position: i + 1, text: s })),
    keywords: [r.family, r.animal, ...woods.map((w) => w.name.toLowerCase())].filter(Boolean).join(', '),
  };

  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <Section tone="bgDeep">
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Recipes', href: '/recipes' }, { name: r.title, href: `/recipes/${r.slug}` }]} />
          <Eyebrow>{r.family} recipe</Eyebrow>
          <H1>{r.title}</H1>
          <Lede>{r.description}</Lede>
          <p className="text-sm font-display uppercase mb-6" style={{ color: C.ember, letterSpacing: '0.12em' }}>
            {STATUS_LABEL[r.status]}
          </p>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <Card>
              <dt style={{ color: C.textMuted }}>Yield</dt>
              <dd style={{ color: C.text }}>{r.yield}</dd>
            </Card>
            <Card>
              <dt style={{ color: C.textMuted }}>Prep</dt>
              <dd style={{ color: C.text }}>{r.prep_time}</dd>
            </Card>
            <Card>
              <dt style={{ color: C.textMuted }}>Cook</dt>
              <dd style={{ color: C.text }}>{r.cook_time_guidance}</dd>
            </Card>
            <Card>
              <dt style={{ color: C.textMuted }}>Wood</dt>
              <dd style={{ color: C.text }}>{woods.map((w) => w.name).join(', ') || 'None'}</dd>
            </Card>
          </dl>
        </Section>

        {(safety.length > 0 || target || doneness || finishSafety) && (
          <Section tone="surface">
            <Eyebrow>Temperatures</Eyebrow>
            <H2>Safe first. Then done.</H2>
            <div className="grid md:grid-cols-2 gap-4">
              {safety.map((s) => (
                <SafetyLine key={s.id} safety={s} />
              ))}
              {finishSafety && !safety.find((s) => s.id === finishSafety.id) && <SafetyLine safety={finishSafety} />}
            </div>
            {target && (
              <Card raised className="mt-6">
                <Label>Pitmaster finish</Label>
                <p className="font-display text-2xl mb-2" style={{ color: C.text }}>
                  {target.window_f?.min} to {target.window_f?.max} F, {target.finish_test?.replace(/_/g, ' ')}
                </p>
                <P>{target.statement}</P>
              </Card>
            )}
            {doneness && (
              <Card raised className="mt-6">
                <Label>Doneness</Label>
                <P className="mb-2">
                  {doneness.record.tiers.map((t) => `${t.label}: ${t.temp_f_min}${t.temp_f_max && t.temp_f_max !== t.temp_f_min ? ` to ${t.temp_f_max}` : ''} F`).join('. ')}.
                </P>
                {doneness.mustDisclose && doneness.disclosure && (
                  <p className="text-sm p-3" style={{ color: C.text, background: 'oklch(0.20 0.06 30)', borderLeft: `3px solid ${C.burgundy}` }}>
                    {doneness.disclosure}
                  </p>
                )}
              </Card>
            )}
            {pit && (
              <p className="text-sm mt-6" style={{ color: C.textMuted }}>
                Pit temperature: {pit.statement}
              </p>
            )}
          </Section>
        )}

        <Section>
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <Eyebrow>Ingredients</Eyebrow>
              {(r.ingredient_groups ?? []).map((g) => (
                <div key={g.name} className="mb-6">
                  <H3>{g.name}</H3>
                  <ul className="space-y-2 text-sm">
                    {g.items.map((it) => (
                      <li key={it.item} className="flex gap-3 py-1" style={{ borderBottom: `1px solid ${C.border}`, color: C.textSoft }}>
                        <span className="tabular-nums w-24 shrink-0" style={{ color: C.text }}>
                          {it.qty}
                        </span>
                        <span>
                          {it.item}
                          {it.note ? <span style={{ color: C.textMuted }}> ({it.note})</span> : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="mt-8">
                <ShopThisRecipe categories={r.shop_ingredient_categories} />
              </div>
            </div>
            <div className="lg:col-span-3">
              <Eyebrow>Method</Eyebrow>
              <ol className="space-y-6">
                {(r.steps ?? []).map((s, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-display text-2xl tabular-nums shrink-0" style={{ color: C.ember }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="leading-relaxed" style={{ color: C.textSoft }}>
                      {s}
                    </p>
                  </li>
                ))}
              </ol>
              {(r.notes ?? []).length > 0 && (
                <Card className="mt-8">
                  <Label>Notes</Label>
                  <ul className="space-y-2 text-sm" style={{ color: C.textSoft }}>
                    {(r.notes ?? []).map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </Card>
              )}
              {handling.length > 0 && (
                <Card className="mt-6">
                  <Label>Handling, from USDA FSIS</Label>
                  <ul className="space-y-2 text-sm" style={{ color: C.textSoft }}>
                    {handling.map((h) => (
                      <li key={h.id}>
                        <span className="font-semibold" style={{ color: C.text }}>
                          {h.title}.{' '}
                        </span>
                        {h.statement}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          </div>
        </Section>

        <Section tone="surface">
          <div className="grid md:grid-cols-2 gap-10">
            <GearList refs={r.equipment_refs} heading="Gear for this cook" />
            <div>
              <Label>Related</Label>
              <ul className="space-y-2 text-sm">
                {r.related_cut_refs.map((rc) => {
                  const [animal, region] = rc.split('/');
                  return (
                    <li key={rc}>
                      {animal === 'beef' ? (
                        <Link href={`/cuts/${animal}/${region}`} style={{ color: C.emberLight, textDecoration: 'underline' }}>
                          Beef {region.replace(/-/g, ' ')} cut guide
                        </Link>
                      ) : (
                        <span style={{ color: C.textMuted }}>
                          {animal.charAt(0).toUpperCase() + animal.slice(1)} {region.replace(/-/g, ' ')} guide, in the works
                        </span>
                      )}
                    </li>
                  );
                })}
                {woods.map((w) => (
                  <li key={w.slug}>
                    <Link href={`/woods#${w.slug}`} style={{ color: C.emberLight, textDecoration: 'underline' }}>
                      {w.name} smoke
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/temperatures" style={{ color: C.emberLight, textDecoration: 'underline' }}>
                    The full temperature chart
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        <Section tone="bgDeep">
          <Label>Start this cook</Label>
          <H2>Open it in Pit Master Log</H2>
          <P className="mb-6">
            {r.app_log_prefill
              ? `The log opens with ${r.app_log_prefill.meat_type.toLowerCase()}, ${r.app_log_prefill.wood_type.join(' and ').toLowerCase()}, ${r.app_log_prefill.target_temp} F and ${r.app_log_prefill.wrap_method.toLowerCase()} already filled in. Change anything. Then cook.`
              : 'Log the cook this sauce goes on. Note the sauce in the rub field so you can find it again.'}
          </P>
          <div className="flex flex-wrap gap-3 items-center">
            <CtaRow />
            <PrintButton recipe={r.slug} />
          </div>
          <Citations refs={refs} updatedAt={r.updated_at} />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
