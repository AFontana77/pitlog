import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pellet Smoker Recipes — Temps, Times & Wood Pairings | PitLog',
  description:
    'Pellet smoker recipes with smoking temps, internal targets, and wood pellet pairings. Works for Traeger, Pit Boss, Camp Chef, and Z Grills.',
};

const WOOD_GUIDE = [
  { wood: 'Hickory', flavor: 'Bold, smoky, bacon-like', best: 'Brisket, pork shoulder, ribs', note: 'The most classic BBQ wood. Strong smoke flavor. Can overpower delicate proteins like fish or chicken.' },
  { wood: 'Applewood', flavor: 'Mild, sweet, fruity', best: 'Chicken, pork, salmon, turkey', note: 'Works with almost any protein. Produces a mild smoke that does not compete with your rub or sauce.' },
  { wood: 'Cherry', flavor: 'Mild, slightly sweet, adds dark color', best: 'Chicken, pork, duck, ribs', note: 'Blends well with hickory or oak. Adds a deep mahogany color to bark. Avoid for long fish cooks.' },
  { wood: 'Mesquite', flavor: 'Very strong, earthy, almost bitter', best: 'Beef, Texas-style brisket', note: 'Burns hot and fast. Best for shorter cooks. On a long smoke it can turn bitter. Blend with oak to tone it down.' },
  { wood: 'Pecan', flavor: 'Mild, nutty, rich', best: 'Brisket, ribs, whole chicken, pork', note: 'A softer version of hickory. One of the most versatile pellets in BBQ. Hard to go wrong.' },
  { wood: 'Oak', flavor: 'Medium, earthy, clean', best: 'Brisket, beef ribs, lamb, all-around use', note: 'The most neutral wood. Produces a clean smoke without overwhelming the meat. Used in most competition BBQ blends.' },
];

const RECIPES = [
  {
    name: 'Hickory Smoked Brisket',
    smokerTemp: '225°F',
    internalTarget: '203°F',
    time: '1 to 1.5 hr/lb',
    wood: 'Hickory or hickory-oak blend',
    steps: [
      'Season brisket with salt, pepper, and garlic powder the night before. Refrigerate uncovered.',
      'Set pellet smoker to 225°F using hickory pellets. Place brisket fat-side up.',
      'Smoke until 160 to 165°F internal. Wrap tightly in butcher paper.',
      'Return to smoker. Continue until 203°F and probe slides in with no resistance. Rest at least 1 hour.',
    ],
  },
  {
    name: 'Apple Smoked Pulled Pork',
    smokerTemp: '225°F',
    internalTarget: '203°F',
    time: '1.5 hr/lb',
    wood: 'Applewood',
    steps: [
      'Apply rub to pork shoulder the night before. Applewood gives a mild, sweet smoke that pairs well with most rubs.',
      'Set pellet smoker to 225°F. Smoke bone-side down until internal hits 160°F.',
      'Wrap in foil with a splash of apple juice. Return to smoker until 203°F and probe-tender.',
      'Rest 1 hour before pulling. The apple smoke flavor is noticeable but not overpowering.',
    ],
  },
  {
    name: 'Cherry Smoked Chicken Thighs',
    smokerTemp: '275°F',
    internalTarget: '175°F',
    time: '1.5 to 2 hr',
    wood: 'Cherry',
    steps: [
      'Dry brine chicken thighs overnight with salt and your preferred rub. Cherry wood gives great skin color.',
      'Set pellet smoker to 275°F using cherry pellets.',
      'Smoke skin-side up until internal hits 165°F. Crank to 400°F for 10 to 15 min to crisp the skin.',
      'Pull at 175°F. The cherry smoke adds color and a slight sweetness without overpowering the chicken.',
    ],
  },
  {
    name: 'Pecan Smoked Ribs',
    smokerTemp: '225°F',
    internalTarget: '195 to 203°F',
    time: '5 to 6 hr',
    wood: 'Pecan',
    steps: [
      'Remove membrane. Apply rub generously. Pecan is mild enough to use for the full cook without wrapping.',
      'Set pellet smoker to 225°F using pecan pellets. Smoke unwrapped for 2 hours.',
      'Wrap in foil with butter and brown sugar. Return to smoker for 2 more hours.',
      'Unwrap, glaze, return for 1 more hour. Done when you see a slight crack on the bend test.',
    ],
  },
  {
    name: 'Oak Smoked Salmon',
    smokerTemp: '180 to 200°F',
    internalTarget: '145°F',
    time: '1 to 2 hr',
    wood: 'Oak or alder',
    steps: [
      'Dry brine salmon with salt and brown sugar for 1 to 2 hours. Rinse and pat dry before smoking.',
      'Set pellet smoker to 180°F using oak or alder pellets. Place salmon skin-side down.',
      'Smoke until internal hits 130°F. Brush with a honey-soy glaze.',
      'Continue smoking until 145°F. Let rest 5 min. Oak gives a clean smoke that does not overpower the fish.',
    ],
  },
];

const PELLET_TIPS = [
  { title: 'Consistent temp is the main advantage', body: 'Pellet smokers hold temperature automatically. You do not babysit the fire. This makes long cooks much easier. Set the temp, walk away, and let the PID controller do the work.' },
  { title: 'Pellet quality matters', body: 'Cheap pellets with wood flavor additives can taste different than 100 percent hardwood pellets. Look for brands that list the wood species clearly and avoid pellets with bark or filler.' },
  { title: 'Cold weather changes things', body: 'In cold or windy conditions, your pellet smoker burns through pellets faster and may struggle to hold temp. Add 15 to 20 min per pound to your estimate. Check the hopper level before any long cook.' },
  { title: 'Works on any brand', body: 'These recipes work on any pellet smoker. Traeger, Pit Boss, Camp Chef, Z Grills, Weber SmokeFire, Recteq, or any other. Temp is temp. The brand does not change the internal target.' },
];

export default function PelletSmokerRecipesPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24" style={{ backgroundColor: 'oklch(0.10 0.020 50)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="font-display uppercase font-semibold mb-8 flex items-center gap-3" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'oklch(0.62 0.16 55)' }} aria-hidden="true" />
              ANY PELLET SMOKER · USDA TARGETS
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-6" style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}>
              Pellet smoker recipes by wood.
            </h1>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'oklch(0.82 0.018 50)' }}>
              Pellet smokers run at a set temperature automatically. No fire management, no babysitting. The main variable you control is wood pellet choice. Here is how to match wood to protein, plus five recipes with exact temps, times, and pairings. Works on Traeger, Pit Boss, Camp Chef, Z Grills, Recteq, and more.
            </p>
          </div>
        </section>

        {/* Wood Guide */}
        <section className="px-4 sm:px-6 lg:px-8 py-20" style={{ backgroundColor: 'oklch(0.13 0.025 50)' }}>
          <div className="max-w-5xl mx-auto">
            <span className="font-display uppercase mb-5 inline-block" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>Wood pairings</span>
            <h2 className="font-display text-3xl sm:text-4xl mb-12" style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}>
              Six pellets. Six different cooks.
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" aria-label="Wood pellet flavor and pairing guide">
                <thead>
                  <tr style={{ borderBottom: '1px solid oklch(0.28 0.025 50)' }}>
                    <th className="text-left py-3 px-4 font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.12em', fontSize: '0.7rem' }}>Wood</th>
                    <th className="text-left py-3 px-4 font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.12em', fontSize: '0.7rem' }}>Flavor</th>
                    <th className="text-left py-3 px-4 font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.12em', fontSize: '0.7rem' }}>Best for</th>
                    <th className="text-left py-3 px-4 font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.12em', fontSize: '0.7rem' }}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {WOOD_GUIDE.map((row, i) => (
                    <tr key={row.wood} style={{ borderBottom: '1px solid oklch(0.28 0.025 50)', background: i % 2 === 0 ? 'transparent' : 'oklch(0.18 0.030 50)' }}>
                      <td className="py-4 px-4 font-display tabular-nums" style={{ color: 'oklch(0.72 0.14 55)' }}>{row.wood}</td>
                      <td className="py-4 px-4" style={{ color: 'oklch(0.93 0.020 50)' }}>{row.flavor}</td>
                      <td className="py-4 px-4 text-xs" style={{ color: 'oklch(0.82 0.018 50)' }}>{row.best}</td>
                      <td className="py-4 px-4 text-xs leading-relaxed" style={{ color: 'oklch(0.62 0.018 50)' }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Recipes */}
        <section className="px-4 sm:px-6 lg:px-8 py-20" style={{ backgroundColor: 'oklch(0.18 0.030 50)' }}>
          <div className="max-w-5xl mx-auto">
            <span className="font-display uppercase mb-5 inline-block" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>Five recipes</span>
            <h2 className="font-display text-3xl sm:text-4xl mb-12" style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}>
              Each one matched to a wood.
            </h2>
            <div className="space-y-12">
              {RECIPES.map((recipe, idx) => (
                <article key={recipe.name} aria-label={recipe.name} style={{ background: 'oklch(0.13 0.025 50)', border: '1px solid oklch(0.28 0.025 50)', borderRadius: '0.25rem' }}>
                  <div className="px-6 py-5" style={{ borderBottom: '1px solid oklch(0.28 0.025 50)' }}>
                    <div className="font-display tabular-nums mb-2" style={{ color: 'oklch(0.62 0.16 55)', fontSize: '0.875rem' }}>{String(idx + 1).padStart(2, '0')}</div>
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

        {/* Tips */}
        <section className="px-4 sm:px-6 lg:px-8 py-20" style={{ backgroundColor: 'oklch(0.13 0.025 50)' }}>
          <div className="max-w-5xl mx-auto">
            <span className="font-display uppercase mb-5 inline-block" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>Pellet tips</span>
            <h2 className="font-display text-3xl sm:text-4xl mb-12" style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}>
              Things that make a difference.
            </h2>
            <ul>
              {PELLET_TIPS.map(({ title, body }, idx) => (
                <li key={title} className="grid grid-cols-12 gap-4 sm:gap-8 py-8" style={{ borderTop: '1px solid oklch(0.28 0.025 50)', borderBottom: idx === PELLET_TIPS.length - 1 ? '1px solid oklch(0.28 0.025 50)' : 'none' }}>
                  <div className="col-span-2 sm:col-span-1 font-display tabular-nums text-2xl sm:text-3xl leading-none" style={{ color: 'oklch(0.62 0.16 55)' }}>{String(idx + 1).padStart(2, '0')}</div>
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

        <section className="px-4 sm:px-6 lg:px-8 py-12" style={{ backgroundColor: 'oklch(0.18 0.030 50)', borderTop: '1px solid oklch(0.28 0.025 50)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="font-display uppercase mb-4" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>Also useful</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/smoking-times-temperatures" className="text-sm" style={{ color: 'oklch(0.93 0.020 50)' }}>Full smoking times chart</Link>
              <Link href="/traeger-recipes" className="text-sm" style={{ color: 'oklch(0.93 0.020 50)' }}>Traeger recipes</Link>
              <Link href="/pit-boss-recipes" className="text-sm" style={{ color: 'oklch(0.93 0.020 50)' }}>Pit Boss recipes</Link>
              <Link href="/smoker-recipes" className="text-sm" style={{ color: 'oklch(0.93 0.020 50)' }}>All smoker recipes</Link>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24" style={{ backgroundColor: 'oklch(0.10 0.020 50)', borderTop: '1px solid oklch(0.28 0.025 50)' }}>
          <div className="max-w-3xl mx-auto">
            <span className="font-display uppercase mb-5 inline-block" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>The log</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-6" style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}>
              Log which pellets worked best.
            </h2>
            <p className="leading-relaxed mb-10 max-w-2xl" style={{ color: 'oklch(0.82 0.018 50)' }}>
              PitLog lets you record wood type alongside temp, time, and rating. So you can actually remember what combination produced the best result.
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
