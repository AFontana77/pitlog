import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ANIMALS, WOODS, getSource } from '@/content';
import { Citations } from '@/components/content/Citations';
import { Breadcrumbs, C, Card, CtaRow, Eyebrow, H1, H2, H3, Label, Lede, P, Section, Td, Th, Tr } from '@/components/content/ui';

export const metadata: Metadata = {
  title: 'Best Wood for Smoking: Pairing Chart for Beef, Pork, Chicken, Salmon',
  description:
    'Oak, hickory, mesquite, pecan, apple, cherry, maple and alder. Smoke strength, flavor, the best wood for brisket, pork, chicken, lamb, goat and salmon, and blends that work.',
  alternates: { canonical: 'https://pitlog.app/woods' },
};

const STRENGTH: Record<string, string> = { mild: 'Mild', medium: 'Medium', strong: 'Strong' };

export default function WoodsPage() {
  const fsis = getSource('fsis-smoking-meat-poultry');
  const refs = [...WOODS.flatMap((w) => w.source_refs), 'fsis-smoking-meat-poultry', 'tamu-texas-bbq-cooking'];
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">
        <Section tone="bgDeep">
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Woods', href: '/woods' }]} />
          <Eyebrow>Smoke wood pairing guide</Eyebrow>
          <H1>Which wood for which meat.</H1>
          <Lede>
            There is no single best wood for smoking. Match the smoke strength to the meat and to the length of the cook.
            Mild for salmon and chicken. Medium for pork and lamb. Strong for beef, and only for as long as it takes.
          </Lede>
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/woods/smoke-wood-pairing-guide.jpg"
                alt="Pit Log smoke wood pairing guide poster: flavor profiles for oak, hickory, mesquite, pecan, apple, cherry, maple and alder, best matches by meat, and popular blends"
                width={1122}
                height={1402}
                className="w-full h-auto"
                style={{ borderRadius: '0.25rem', border: `1px solid ${C.border}` }}
              />
              <p className="text-xs mt-2" style={{ color: C.textMuted }}>
                The poster is the picture. The text below is the record it was drawn from. Poster print coming once the
                print master is ready.
              </p>
            </div>
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <Label>Smoke smart</Label>
                <ul className="space-y-2 text-sm" style={{ color: C.textSoft }}>
                  <li>Start mild before you go heavy.</li>
                  <li>Fruit woods add sweetness and colour.</li>
                  <li>Strong woods bury delicate meat.</li>
                  <li>Blends give depth. Two woods, not five.</li>
                  <li>Clean fire, thin blue smoke. White smoke is bitter.</li>
                </ul>
              </Card>
              <Card>
                <Label>Safety, from USDA FSIS</Label>
                <P className="text-sm">
                  Burn only wood sold for cooking. No treated, painted or glued wood, and no softwood scrap. Never smoke
                  in a galvanized can or other makeshift container. Keep the smoker air between 225 and 300 F, and use a
                  second thermometer for the meat.
                </P>
                {fsis && (
                  <a href={fsis.url} target="_blank" rel="noopener noreferrer" className="text-xs" style={{ color: C.textMuted, textDecoration: 'underline' }}>
                    {fsis.org}: {fsis.title}
                  </a>
                )}
              </Card>
            </div>
          </div>
        </Section>

        <Section id="woods" labelledBy="woods-heading">
          <Eyebrow>The eight woods</Eyebrow>
          <H2 id="woods-heading">Flavor, strength, and what each one is for</H2>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {WOODS.map((w) => (
              <Card key={w.slug}>
                <div className="flex items-baseline justify-between mb-2">
                  <H3 id={w.slug}>{w.name}</H3>
                  <span className="font-display uppercase text-xs" style={{ color: w.strength === 'strong' ? 'oklch(0.80 0.12 30)' : C.ember, letterSpacing: '0.12em' }}>
                    {STRENGTH[w.strength]}
                  </span>
                </div>
                <P className="mb-4">{w.flavor_character}</P>
                <dl className="text-sm space-y-2" style={{ color: C.textSoft }}>
                  <div>
                    <dt className="inline font-semibold" style={{ color: C.text }}>Best with: </dt>
                    <dd className="inline">{w.best_animals.join(', ')}</dd>
                  </div>
                  {w.blend_ideas.length > 0 && (
                    <div>
                      <dt className="inline font-semibold" style={{ color: C.text }}>Blends: </dt>
                      <dd className="inline">{w.blend_ideas.join('; ')}</dd>
                    </div>
                  )}
                  {w.avoid_or_use_lightly_with.length > 0 && (
                    <div>
                      <dt className="inline font-semibold" style={{ color: C.text }}>Go easy with: </dt>
                      <dd className="inline">{w.avoid_or_use_lightly_with.join(', ')}</dd>
                    </div>
                  )}
                  {w.regional_note && (
                    <div>
                      <dt className="inline font-semibold" style={{ color: C.text }}>Note: </dt>
                      <dd className="inline">{w.regional_note}</dd>
                    </div>
                  )}
                </dl>
                <p className="text-xs mt-4" style={{ color: C.textMuted }}>
                  {w.review_status === 'SOURCED' ? 'Flavor note has a cited source.' : 'Flavor note is barbecue convention. No agency ranks smoke.'}
                </p>
              </Card>
            ))}
          </div>
        </Section>

        <Section tone="surface" id="by-meat" labelledBy="by-meat-heading">
          <Eyebrow>Best matches by meat</Eyebrow>
          <H2 id="by-meat-heading">Pick the meat, read across</H2>
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-sm" aria-label="Best smoke woods by meat">
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  <Th>Meat</Th>
                  <Th>Woods, in order</Th>
                  <Th>Guide</Th>
                </tr>
              </thead>
              <tbody>
                {ANIMALS.map((a, i) => (
                  <Tr key={a.slug} i={i}>
                    <Td strong>{a.name}</Td>
                    <Td>{a.wood_refs.map((w) => WOODS.find((x) => x.slug === w)?.name ?? w).join(', ')}</Td>
                    <Td>
                      {a.slug === 'beef' ? (
                        <Link href="/cuts/beef" style={{ color: C.emberLight, textDecoration: 'underline' }}>
                          Beef cuts
                        </Link>
                      ) : (
                        <span style={{ color: C.textMuted }}>Guide in the works</span>
                      )}
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section tone="bgDeep">
          <Eyebrow>Log the wood</Eyebrow>
          <H2>Your smoker tells you which wood wins</H2>
          <P className="mb-8">
            Charts get you started. Your log tells you the truth. Pit Master Log records the wood on every cook, so the
            hickory brisket and the oak brisket can be compared a month later.
          </P>
          <CtaRow />
          <Citations refs={refs} updatedAt="2026-09-02" />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
