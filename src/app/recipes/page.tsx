import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { RECIPES } from '@/content';
import { Breadcrumbs, C, Card, CtaRow, Eyebrow, H1, H2, H3, Label, Lede, P, Section } from '@/components/content/ui';

export const metadata: Metadata = {
  title: 'Pit Log Recipes: Smoked Brisket, BBQ Sauces, Cedar Plank Salmon',
  description:
    'The Pit Log house recipes: brisket, sauces, chicken thighs, lamb, goat, tri-tip and cedar plank salmon, each with the USDA temperature on the page.',
  alternates: { canonical: 'https://pitlog.app/recipes' },
};

const STATUS_LABEL: Record<string, string> = {
  TEST_V1: 'Test kitchen, draft 1',
  TEST_V2: 'Test kitchen, draft 2',
  TEST_V3: 'Test kitchen, draft 3',
  OFFICIAL: 'Official Pit Log recipe',
};

export default function RecipesPage() {
  const live = RECIPES.filter((r) => r.status !== 'PLANNED' && r.status !== 'RETIRED');
  const planned = RECIPES.filter((r) => r.status === 'PLANNED');
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">
        <Section tone="bgDeep">
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Recipes', href: '/recipes' }]} />
          <Eyebrow>Pit Log house recipes</Eyebrow>
          <H1>Recipes with the temperature on the page.</H1>
          <Lede>
            Every recipe prints the USDA safe minimum and the pitmaster finish, side by side. None is called official until
            it has been cooked and logged. The label on each card says where it stands.
          </Lede>
          <ul className="grid md:grid-cols-2 gap-5">
            {live.map((r) => (
              <li key={r.slug}>
                <Link href={`/recipes/${r.slug}`} className="block h-full press-feedback" style={{ textDecoration: 'none' }}>
                  <Card raised className="h-full">
                    <div className="flex items-baseline justify-between gap-3 mb-2">
                      <H3>{r.title}</H3>
                    </div>
                    <span className="text-xs font-display uppercase block mb-3" style={{ color: C.ember, letterSpacing: '0.12em' }}>
                      {STATUS_LABEL[r.status]}. {r.family}.
                    </span>
                    <P className="text-sm">{r.description}</P>
                    <p className="text-xs mt-3" style={{ color: C.textMuted }}>
                      {r.yield}. {r.cook_time_guidance}
                    </p>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <Eyebrow>In the test kitchen</Eyebrow>
          <H2>Coming after a logged cook</H2>
          <P className="mb-6">These are planned. They get a page once they have quantities and a first cook behind them.</P>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 text-sm" style={{ color: C.textSoft }}>
            {planned.map((r) => (
              <li key={r.slug} className="py-2" style={{ borderBottom: `1px solid ${C.border}` }}>
                {r.title}
                <span style={{ color: C.textMuted }}> ({r.family})</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section tone="bgDeep">
          <Label>Start the cook</Label>
          <H2>Every recipe opens a log</H2>
          <P className="mb-8">Pick the recipe in Pit Master Log and the meat, wood, pit temp and wrap are filled in for you. Change any of them. Then cook.</P>
          <CtaRow />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
