import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Traeger Recipes — Smoking Times, Temps & Settings | PitLog',
  description:
    'Traeger recipes with smoking temperatures, times, and internal targets for beef, pork, chicken, and fish. Log every cook in PitLog.',
};

const RECIPES = [
  {
    name: 'Traeger Brisket',
    smokerTemp: '225°F',
    internalTarget: '203°F',
    time: '1 to 1.5 hr/lb',
    wood: 'Oak or hickory',
    steps: [
      'Trim fat cap to a quarter inch. Season with salt, pepper, and garlic powder the night before.',
      'Set Traeger to 225°F. Place brisket fat-side up. Smoke until internal temp hits 160 to 165°F (about 6 to 8 hr for a 12 lb packer).',
      'Wrap tightly in butcher paper. Return to smoker. Continue until internal reaches 203°F and probe slides in with no resistance.',
      'Rest wrapped in a cooler for at least 1 hour before slicing against the grain.',
    ],
  },
  {
    name: 'Traeger Pulled Pork',
    smokerTemp: '225°F',
    internalTarget: '203°F',
    time: '1.5 hr/lb',
    wood: 'Apple or hickory',
    steps: [
      'Apply your rub to the pork shoulder the night before. Let it sit uncovered in the fridge.',
      'Set Traeger to 225°F. Place shoulder bone-side down. Smoke until 160°F internal (about 6 to 8 hr).',
      'Wrap in foil with a splash of apple juice. Return to smoker until 203°F and probe-tender.',
      'Rest 1 hour minimum. Pull with forks or bear claws. The bone should slide out clean.',
    ],
  },
  {
    name: 'Traeger Chicken Thighs',
    smokerTemp: '275°F',
    internalTarget: '175°F',
    time: '1.5 to 2 hr',
    wood: 'Apple or cherry',
    steps: [
      'Pat thighs dry. Season under and over the skin. Let sit 30 min at room temp before cooking.',
      'Set Traeger to 275°F. Smoke skin-side up until internal hits 165°F (about 1 hr).',
      'Crank Traeger to 400°F for 10 to 15 min to crisp the skin. Pull at 175°F.',
      'Let rest 5 min before serving. Sauce on the side or glaze in the last 5 min.',
    ],
  },
  {
    name: 'Traeger Salmon',
    smokerTemp: '180°F',
    internalTarget: '145°F',
    time: '1 to 2 hr',
    wood: 'Alder or apple',
    steps: [
      'Dry brine salmon with brown sugar and salt for 1 to 2 hours in the fridge. Rinse, pat dry.',
      'Set Traeger to 180°F. Place salmon skin-side down on the grate.',
      'Smoke until internal hits 130°F, then glaze with a mix of honey, soy sauce, and garlic.',
      'Continue until 145°F internal. Salmon should flake easily. Rest 5 min before serving.',
    ],
  },
  {
    name: 'Traeger Spare Ribs (3-2-1)',
    smokerTemp: '225°F',
    internalTarget: '195 to 203°F',
    time: '6 hr',
    wood: 'Hickory or cherry',
    steps: [
      'Remove the membrane from the back. Season with your rub. Let sit 30 min.',
      '3 hr: smoke at 225°F, bone-side down, no peeking.',
      '2 hr: wrap in foil with brown sugar, butter, and a splash of apple juice. Return to smoker.',
      '1 hr: unwrap, sauce if desired, return to smoker to set the glaze. Done when bend test shows a slight crack.',
    ],
  },
  {
    name: 'Traeger Baby Back Ribs (2-2-1)',
    smokerTemp: '225°F',
    internalTarget: '195 to 203°F',
    time: '5 hr',
    wood: 'Apple or pecan',
    steps: [
      'Remove membrane. Apply rub generously on both sides.',
      '2 hr: smoke at 225°F unwrapped.',
      '2 hr: wrap tightly in foil with butter and brown sugar.',
      '1 hr: unwrap, sauce, return to smoker. Pull when ribs bend and meat pulls back from the bone.',
    ],
  },
];

const TIPS = [
  { title: 'Set the right temp from the start', body: 'Most Traeger grills take 10 to 15 minutes to reach temp. Close the lid during preheat and do not open it for the first hour of the cook.' },
  { title: 'Use the Super Smoke setting', body: 'On WiFIRE models, Super Smoke runs the fan in a pattern that produces more smoke at lower temps (165 to 225°F). Use it for the first 2 to 3 hours of a long cook for maximum smoke ring.' },
  { title: 'Do not open the lid constantly', body: 'Every time you open the lid, temp drops 25 to 50°F and recovery takes 10 to 15 minutes. Trust the process. Only open to wrap or to probe.' },
  { title: 'Pellet choice matters', body: 'Traeger sells blended pellets. For beef, use their Signature Blend or pure hickory. For poultry and pork, apple or cherry produces a cleaner, milder smoke.' },
];

export default function TraegerRecipesPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        {/* Hero */}
        <section
          className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24"
          style={{ backgroundColor: 'oklch(0.10 0.020 50)' }}
        >
          <div className="max-w-5xl mx-auto">
            <div
              className="font-display uppercase font-semibold mb-8 flex items-center gap-3"
              style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}
            >
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'oklch(0.62 0.16 55)' }} aria-hidden="true" />
              TRAEGER · USDA TARGETS
            </div>
            <h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl mb-6"
              style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}
            >
              Traeger recipes by the numbers.
            </h1>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'oklch(0.82 0.018 50)' }}>
              Traeger pellet grills run 165°F to 500°F. Most smoking happens at 225 to 275°F. Below are step-by-step methods for the cooks pitmasters do most often. Exact temps, times, and wood pairings.
            </p>
          </div>
        </section>

        {/* Recipes */}
        <section
          className="px-4 sm:px-6 lg:px-8 py-20"
          style={{ backgroundColor: 'oklch(0.13 0.025 50)' }}
        >
          <div className="max-w-5xl mx-auto">
            <span className="font-display uppercase mb-5 inline-block" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>
              Six cooks
            </span>
            <h2 className="font-display text-3xl sm:text-4xl mb-12" style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}>
              The recipes that matter.
            </h2>
            <div className="space-y-12">
              {RECIPES.map((recipe, idx) => (
                <article
                  key={recipe.name}
                  aria-label={recipe.name}
                  style={{
                    background: 'oklch(0.18 0.030 50)',
                    border: '1px solid oklch(0.28 0.025 50)',
                    borderRadius: '0.25rem',
                  }}
                >
                  <div
                    className="px-6 py-5"
                    style={{ borderBottom: '1px solid oklch(0.28 0.025 50)' }}
                  >
                    <div
                      className="font-display tabular-nums mb-2"
                      style={{ color: 'oklch(0.62 0.16 55)', fontSize: '0.875rem' }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <h3 className="font-display text-2xl mb-3" style={{ color: 'oklch(0.93 0.020 50)' }}>
                      {recipe.name}
                    </h3>
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
                        <span className="font-display tabular-nums shrink-0" style={{ color: 'oklch(0.62 0.16 55)', minWidth: '1.5rem' }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span style={{ color: 'oklch(0.82 0.018 50)' }}>{step}</span>
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Traeger Tips */}
        <section
          className="px-4 sm:px-6 lg:px-8 py-20"
          style={{ backgroundColor: 'oklch(0.18 0.030 50)' }}
        >
          <div className="max-w-5xl mx-auto">
            <span className="font-display uppercase mb-5 inline-block" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>
              Traeger tips
            </span>
            <h2 className="font-display text-3xl sm:text-4xl mb-12" style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}>
              Better cooks. Less guessing.
            </h2>
            <ul>
              {TIPS.map(({ title, body }, idx) => (
                <li
                  key={title}
                  className="grid grid-cols-12 gap-4 sm:gap-8 py-8"
                  style={{
                    borderTop: '1px solid oklch(0.28 0.025 50)',
                    borderBottom: idx === TIPS.length - 1 ? '1px solid oklch(0.28 0.025 50)' : 'none',
                  }}
                >
                  <div className="col-span-2 sm:col-span-1 font-display tabular-nums text-2xl sm:text-3xl leading-none" style={{ color: 'oklch(0.62 0.16 55)' }}>
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="col-span-10 sm:col-span-4">
                    <h3 className="font-display text-xl sm:text-2xl leading-tight" style={{ color: 'oklch(0.93 0.020 50)' }}>
                      {title}
                    </h3>
                  </div>
                  <div className="col-span-12 sm:col-span-7">
                    <p className="leading-relaxed" style={{ color: 'oklch(0.82 0.018 50)' }}>{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Related Links */}
        <section
          className="px-4 sm:px-6 lg:px-8 py-12"
          style={{ backgroundColor: 'oklch(0.13 0.025 50)', borderTop: '1px solid oklch(0.28 0.025 50)' }}
        >
          <div className="max-w-5xl mx-auto">
            <p className="font-display uppercase mb-4" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>
              Also useful
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/smoking-times-temperatures" className="text-sm" style={{ color: 'oklch(0.93 0.020 50)' }}>Full smoking times chart</Link>
              <Link href="/pit-boss-recipes" className="text-sm" style={{ color: 'oklch(0.93 0.020 50)' }}>Pit Boss recipes</Link>
              <Link href="/pellet-smoker-recipes" className="text-sm" style={{ color: 'oklch(0.93 0.020 50)' }}>Pellet smoker recipes</Link>
              <Link href="/smoker-recipes" className="text-sm" style={{ color: 'oklch(0.93 0.020 50)' }}>All smoker recipes</Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24"
          style={{ backgroundColor: 'oklch(0.10 0.020 50)', borderTop: '1px solid oklch(0.28 0.025 50)' }}
        >
          <div className="max-w-3xl mx-auto">
            <span className="font-display uppercase mb-5 inline-block" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>
              The log
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-6" style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}>
              Log every Traeger cook.
            </h2>
            <p className="leading-relaxed mb-10 max-w-2xl" style={{ color: 'oklch(0.82 0.018 50)' }}>
              Your Traeger runs different than anyone else. Wind, ambient temp, pellet brand. They all change the result. PitLog lets you record every cook so you know exactly what worked.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/free-download" className="btn-primary press-feedback">Download PitLog free</Link>
              <Link href="/library" className="btn-ghost">Browse the library</Link>
            </div>
            <p className="mt-6 text-sm" style={{ color: 'oklch(0.62 0.018 50)' }}>
              Free. No subscription. $6.99 one-time to unlock the cook log.
            </p>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
