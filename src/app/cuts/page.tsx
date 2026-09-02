import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ANIMALS, getSafetyMinimum } from '@/content';
import { SafetyLine } from '@/components/content/SafetyLine';
import { Citations } from '@/components/content/Citations';
import { Breadcrumbs, C, Card, CtaRow, Eyebrow, H1, H2, H3, Label, Lede, P, Section } from '@/components/content/ui';

export const metadata: Metadata = {
  title: 'Meat Cuts Guide: Beef, Pork, Lamb, Goat, Chicken and Salmon',
  description:
    'Interactive cut guides. Pick the animal, tap the primal, get the cut, the USDA safe temperature, the pitmaster finish, the wood and the recipe.',
  alternates: { canonical: 'https://pitlog.app/cuts' },
};

const LIVE = new Set(['beef', 'pork', 'chicken', 'salmon', 'lamb', 'goat']);

export default function CutsHubPage() {
  const refs = ANIMALS.flatMap((a) => a.source_refs);
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">
        <Section tone="bgDeep">
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Cuts', href: '/cuts' }]} />
          <Eyebrow>Know your cuts</Eyebrow>
          <H1>Six animals. Every primal. One set of facts.</H1>
          <Lede>
            Tap a region on the diagram and get what it is, how tender it runs, how to cook it, the USDA safe temperature,
            the pitmaster finish, the wood, and the recipe. All six animals render from the same records.
          </Lede>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ANIMALS.map((a) => {
              const live = LIVE.has(a.slug);
              const safety = getSafetyMinimum(a.safety_ref);
              const inner = (
                <>
                  <div className="flex items-baseline justify-between mb-2">
                    <H3>{a.name}</H3>
                    <span className="text-xs font-display uppercase" style={{ color: live ? C.ember : C.textMuted, letterSpacing: '0.12em' }}>
                      {live ? 'Live' : 'In the works'}
                    </span>
                  </div>
                  <P className="text-sm mb-3">{a.summary}</P>
                  <p className="text-xs" style={{ color: C.textMuted }}>
                    {a.primal_scheme.regions.length} regions. USDA minimum {safety?.temp_f} F{safety?.rest ? ` plus a ${safety.rest.replace('at least ', '')}` : ''}.
                  </p>
                </>
              );
              return live ? (
                <Link key={a.slug} href={a.route} className="block press-feedback" style={{ textDecoration: 'none' }}>
                  <Card raised>{inner}</Card>
                </Link>
              ) : (
                <Card key={a.slug}>{inner}</Card>
              );
            })}
          </div>
        </Section>

        <Section>
          <Eyebrow>The rule on every page</Eyebrow>
          <H2>Safe temperature first. Finish temperature second.</H2>
          <P className="mb-6">
            USDA FSIS sets the floor. Barbecue cooks past it on purpose, because collagen needs time and heat. The two
            numbers are never the same number, and no page here mixes them.
          </P>
          <div className="grid md:grid-cols-2 gap-4">
            {['safety-whole-muscle-red-meat', 'safety-poultry', 'safety-fish', 'safety-ground-meat'].map((id) => {
              const s = getSafetyMinimum(id);
              return s ? <SafetyLine key={id} safety={s} compact /> : null;
            })}
          </div>
          <p className="mt-6 text-sm">
            <Link href="/temperatures" style={{ color: C.emberLight, textDecoration: 'underline' }}>
              The full temperature chart
            </Link>
            <span style={{ color: C.textMuted }}> has all eight USDA rows, the handling rules and every doneness scale.</span>
          </p>
        </Section>

        <Section tone="bgDeep">
          <Label>Then log it</Label>
          <H2>Every cut page ends at the log</H2>
          <P className="mb-8">Pick the cut, cook it, write down what happened. The next one is better.</P>
          <CtaRow />
          <Citations refs={refs} updatedAt="2026-09-02" />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
