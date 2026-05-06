import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pit Boss Recipes — Temps & Times for Pellet Grills | PitLog',
  description:
    'Pit Boss pellet grill recipes with smoking temperatures, times, and internal targets. Brisket, ribs, pulled pork, chicken, and more.',
};

const RECIPES = [
  {
    name: 'Pit Boss Brisket',
    smokerTemp: '225°F',
    internalTarget: '203°F',
    time: '1 to 1.5 hr/lb',
    wood: 'Hickory or mesquite blend',
    steps: [
      'Trim fat cap to a quarter inch. Season the night before with coarse salt, black pepper, and garlic powder.',
      'Set Pit Boss to 225°F. Not the Smoke setting. Use a specific temp. Smoke fat-side up until 160 to 165°F internal.',
      'Wrap in butcher paper. Return to grill. Cook until internal hits 203°F and probe meets no resistance.',
      'Rest wrapped in a cooler for at least 1 hour. Slice against the grain.',
    ],
  },
  {
    name: 'Pit Boss Pulled Pork',
    smokerTemp: '225°F',
    internalTarget: '203°F',
    time: '1.5 hr/lb',
    wood: 'Apple or hickory',
    steps: [
      'Season pork shoulder generously with rub. Refrigerate uncovered overnight.',
      'Set Pit Boss to 225°F. Smoke bone-side down until internal reaches 160°F (6 to 8 hr for an 8 lb butt).',
      'Wrap in foil with apple juice, butter, and brown sugar. Return to smoker until 203°F.',
      'Rest 1 hour. Pull by hand or with bear claws. Bone should slide out with no resistance.',
    ],
  },
  {
    name: 'Pit Boss Spare Ribs',
    smokerTemp: '225°F',
    internalTarget: '195 to 203°F',
    time: '6 hr (3-2-1 method)',
    wood: 'Cherry or hickory',
    steps: [
      'Remove membrane from the back of the rack. Apply rub on both sides. Let sit 30 min.',
      '3 hr: smoke unwrapped at 225°F, bone-side down.',
      '2 hr: wrap in foil with brown sugar, butter, and a splash of apple juice. Back on the grill.',
      '1 hr: unwrap, glaze with sauce, return to grill. Done when you see slight cracking on the bend test.',
    ],
  },
  {
    name: 'Pit Boss Chicken Wings',
    smokerTemp: '275°F then 400°F',
    internalTarget: '165°F',
    time: '1.5 to 2 hr total',
    wood: 'Apple or pecan',
    steps: [
      'Pat wings dry. Toss in baking powder and your rub. Baking powder helps crisp the skin.',
      'Set Pit Boss to 275°F. Smoke wings for 45 to 60 min until internal hits 160°F.',
      'Crank Pit Boss to 400°F (or use the sear zone on models with a flame broiler). Cook 10 to 15 min more.',
      'Pull at 165°F+. Toss in sauce right before serving, not during cooking.',
    ],
  },
  {
    name: 'Pit Boss Chuck Roast',
    smokerTemp: '250°F',
    internalTarget: '205°F',
    time: '1.5 hr/lb',
    wood: 'Oak or hickory',
    steps: [
      'Season chuck roast with beef rub. Let sit at room temp for 30 min.',
      'Set Pit Boss to 250°F. Smoke directly on the grate until internal hits 160°F (about 4 hr).',
      'Place roast in a foil pan with beef broth or a pat of butter. Cover tightly with foil.',
      'Return to smoker until 205°F and probe-tender. Rest 30 min before pulling or slicing.',
    ],
  },
];

const PSETTING_INFO = [
  { title: 'What the Smoke setting does', body: 'On Pit Boss grills, the Smoke setting runs at roughly 180 to 200°F with the fan cycling in a way that produces more smoke. It is good for the first 1 to 2 hours of a long cook to build smoke flavor before bumping to a higher temp.' },
  { title: 'The P-Setting (older models)', body: 'Older Pit Boss models have a P-Setting (P0 to P7) that controls how long the auger pauses between cycles. A higher P number means more smoke but lower temps. P4 is the factory default. Use P5 or P6 for more smoke in cold weather.' },
  { title: 'Temp dial vs. digital control', body: 'Newer Pit Boss models with digital controllers hold temp more accurately. On older dial models, expect plus or minus 25°F swings. Use a quality leave-in thermometer to track actual smoker temp. Do not rely solely on the lid thermometer.' },
  { title: 'The flame broiler', body: 'Many Pit Boss models have a sliding flame broiler plate that exposes the fire pot for direct heat. This is what makes high-heat finishes like chicken wings work so well. Close the flame broiler during smoking, open it only for searing.' },
];

export default function PitBossRecipesPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        <section
          className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24"
          style={{ backgroundColor: 'oklch(0.10 0.020 50)' }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="font-display uppercase font-semibold mb-8 flex items-center gap-3" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'oklch(0.62 0.16 55)' }} aria-hidden="true" />
              PIT BOSS · USDA TARGETS
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-6" style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}>
              Pit Boss recipes by the numbers.
            </h1>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'oklch(0.82 0.018 50)' }}>
              Pit Boss pellet grills run 180°F to 500°F. The Smoke setting lands around 180 to 200°F. Most long cooks use 225 to 250°F. Here are the five cooks pitmasters do most on a Pit Boss. Temps, times, wood, and step-by-step methods.
            </p>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-20" style={{ backgroundColor: 'oklch(0.13 0.025 50)' }}>
          <div className="max-w-5xl mx-auto">
            <span className="font-display uppercase mb-5 inline-block" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>
              Five cooks
            </span>
            <h2 className="font-display text-3xl sm:text-4xl mb-12" style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}>
              The recipes that matter.
            </h2>
            <div className="space-y-12">
              {RECIPES.map((recipe, idx) => (
                <article key={recipe.name} aria-label={recipe.name} style={{ background: 'oklch(0.18 0.030 50)', border: '1px solid oklch(0.28 0.025 50)', borderRadius: '0.25rem' }}>
                  <div className="px-6 py-5" style={{ borderBottom: '1px solid oklch(0.28 0.025 50)' }}>
                    <div className="font-display tabular-nums mb-2" style={{ color: 'oklch(0.62 0.16 55)', fontSize: '0.875rem' }}>
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <h3 className="font-display text-2xl mb-3" style={{ color: 'oklch(0.93 0.020 50)' }}>{recipe.name}</h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <span><span className="font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.1em', fontSize: '0.7rem', marginRight: '0.5rem' }}>Smoker</span><span style={{ color: 'oklch(0.93 0.020 50)' }}>{recipe.smokerTemp}</span></span>
                      <span><span className="font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.1em', fontSize: '0.7rem', marginRight: '0.5rem' }}>Pull at</span><span className="font-display tabular-nums" style={{ color: 'oklch(0.72 0.14 55)' }}>{recipe.internalTarget}</span></span>
                      <span><span className="font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.1em', fontSize: '0.7rem', marginRight: '0.5rem' }}>Time</span><span style={{ color: 'oklch(0.93 0.020 50)' }}>{recipe.time}</span></span>
                      <span><span className="font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.1em', fontSize: '0.7rem', marginRight: '0.5rem' }}>Wood</span><span style={{ color: 'oklch(0.93 0.020 50)' }}>{recipe.wood}</span></span>
                    </div>
                  </div>
                  <ol className="px-6 py-5 space-y-4">
                    {recipe.steps.map((step, i) => (
                      <li key={i} className="flex gap-4 text-sm leading-relaxed">
                        <span className="font-display tabular-nums shrink-0" style={{ color: 'oklch(0.62 0.16 55)', minWidth: '1.5rem' }}>{String(i + 1).padStart(2, '0')}</span>
                        <span style={{ color: 'oklch(0.82 0.018 50)' }}>{step}</span>
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-20" style={{ backgroundColor: 'oklch(0.18 0.030 50)' }}>
          <div className="max-w-5xl mx-auto">
            <span className="font-display uppercase mb-5 inline-block" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>
              Settings explained
            </span>
            <h2 className="font-display text-3xl sm:text-4xl mb-12" style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}>
              Understanding your Pit Boss.
            </h2>
            <ul>
              {PSETTING_INFO.map(({ title, body }, idx) => (
                <li key={title} className="grid grid-cols-12 gap-4 sm:gap-8 py-8" style={{ borderTop: '1px solid oklch(0.28 0.025 50)', borderBottom: idx === PSETTING_INFO.length - 1 ? '1px solid oklch(0.28 0.025 50)' : 'none' }}>
                  <div className="col-span-2 sm:col-span-1 font-display tabular-nums text-2xl sm:text-3xl leading-none" style={{ color: 'oklch(0.62 0.16 55)' }}>
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="col-span-10 sm:col-span-4">
                    <h3 className="font-display text-xl sm:text-2xl leading-tight" style={{ color: 'oklch(0.93 0.020 50)' }}>{title}</h3>
                  </div>
                  <div className="col-span-12 sm:col-span-7">
                    <p className="leading-relaxed" style={{ color: 'oklch(0.82 0.018 50)' }}>{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-12" style={{ backgroundColor: 'oklch(0.13 0.025 50)', borderTop: '1px solid oklch(0.28 0.025 50)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="font-display uppercase mb-4" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>Also useful</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/smoking-times-temperatures" className="text-sm" style={{ color: 'oklch(0.93 0.020 50)' }}>Full smoking times chart</Link>
              <Link href="/traeger-recipes" className="text-sm" style={{ color: 'oklch(0.93 0.020 50)' }}>Traeger recipes</Link>
              <Link href="/pellet-smoker-recipes" className="text-sm" style={{ color: 'oklch(0.93 0.020 50)' }}>Pellet smoker recipes</Link>
              <Link href="/smoker-recipes" className="text-sm" style={{ color: 'oklch(0.93 0.020 50)' }}>All smoker recipes</Link>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24" style={{ backgroundColor: 'oklch(0.10 0.020 50)', borderTop: '1px solid oklch(0.28 0.025 50)' }}>
          <div className="max-w-3xl mx-auto">
            <span className="font-display uppercase mb-5 inline-block" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>The log</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-6" style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}>
              Log every Pit Boss cook.
            </h2>
            <p className="leading-relaxed mb-10 max-w-2xl" style={{ color: 'oklch(0.82 0.018 50)' }}>
              Pit Boss grills have real temp swings, especially on older dial models. PitLog lets you track actual smoker temp, actual pull temp, and what you changed from cook to cook. So the next one is always better.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/free-download" className="btn-primary press-feedback">Download PitLog free</Link>
              <Link href="/library" className="btn-ghost">Browse the library</Link>
            </div>
            <p className="mt-6 text-sm" style={{ color: 'oklch(0.62 0.018 50)' }}>Free. No subscription. $6.99 one-time to unlock the cook log.</p>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
