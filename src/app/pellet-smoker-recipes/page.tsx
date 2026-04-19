import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Flame, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pellet Smoker Recipes — Temps, Times & Wood Pairings | PitLog',
  description:
    'Pellet smoker recipes with smoking temps, internal targets, and wood pellet pairings. Works for Traeger, Pit Boss, Camp Chef, and Z Grills.',
};

const WOOD_GUIDE = [
  {
    wood: 'Hickory',
    flavor: 'Bold, smoky, bacon-like',
    best: 'Brisket, pork shoulder, ribs',
    note: 'The most classic BBQ wood. Strong smoke flavor. Can overpower delicate proteins like fish or chicken.',
  },
  {
    wood: 'Applewood',
    flavor: 'Mild, sweet, fruity',
    best: 'Chicken, pork, salmon, turkey',
    note: 'Works with almost any protein. Produces a mild smoke that does not compete with your rub or sauce.',
  },
  {
    wood: 'Cherry',
    flavor: 'Mild, slightly sweet, adds dark color',
    best: 'Chicken, pork, duck, ribs',
    note: 'Blends well with hickory or oak. Adds a deep mahogany color to bark. Avoid for long fish cooks.',
  },
  {
    wood: 'Mesquite',
    flavor: 'Very strong, earthy, almost bitter',
    best: 'Beef, Texas-style brisket',
    note: 'Burns hot and fast. Best for shorter cooks. On a long smoke it can turn bitter — blend with oak to tone it down.',
  },
  {
    wood: 'Pecan',
    flavor: 'Mild, nutty, rich',
    best: 'Brisket, ribs, whole chicken, pork',
    note: 'A softer version of hickory. One of the most versatile pellets in BBQ. Hard to go wrong.',
  },
  {
    wood: 'Oak',
    flavor: 'Medium, earthy, clean',
    best: 'Brisket, beef ribs, lamb, all-around use',
    note: 'The most neutral wood. Produces a clean smoke without overwhelming the meat. Used in most competition BBQ blends.',
  },
];

const RECIPES = [
  {
    name: 'Hickory Smoked Brisket',
    smokerTemp: '225°F',
    internalTarget: '203°F',
    time: '1–1.5 hr/lb',
    wood: 'Hickory (or hickory + oak blend)',
    steps: [
      'Season brisket with salt, pepper, and garlic powder the night before. Refrigerate uncovered.',
      'Set pellet smoker to 225°F using hickory pellets. Place brisket fat-side up.',
      'Smoke until 160–165°F internal. Wrap tightly in butcher paper.',
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
    time: '1.5–2 hr',
    wood: 'Cherry',
    steps: [
      'Dry brine chicken thighs overnight with salt and your preferred rub. Cherry wood gives great skin color.',
      'Set pellet smoker to 275°F using cherry pellets.',
      'Smoke skin-side up until internal hits 165°F. Crank to 400°F for 10–15 min to crisp the skin.',
      'Pull at 175°F. The cherry smoke adds color and a slight sweetness without overpowering the chicken.',
    ],
  },
  {
    name: 'Pecan Smoked Ribs',
    smokerTemp: '225°F',
    internalTarget: '195–203°F',
    time: '5–6 hr',
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
    smokerTemp: '180–200°F',
    internalTarget: '145°F',
    time: '1–2 hr',
    wood: 'Oak or alder',
    steps: [
      'Dry brine salmon with salt and brown sugar for 1–2 hours. Rinse and pat dry before smoking.',
      'Set pellet smoker to 180°F using oak or alder pellets. Place salmon skin-side down.',
      'Smoke until internal hits 130°F. Brush with a honey-soy glaze.',
      'Continue smoking until 145°F. Let rest 5 min. Oak gives a clean smoke that does not overpower the fish.',
    ],
  },
];

const PELLET_TIPS = [
  {
    title: 'Consistent temp is the main advantage',
    body: 'Pellet smokers hold temperature automatically. You do not babysit the fire. This makes long cooks much easier — set the temp, walk away, and let the PID controller do the work.',
  },
  {
    title: 'Pellet quality matters',
    body: 'Cheap pellets with wood "flavor" additives can taste different than 100% hardwood pellets. Look for brands that list the wood species clearly and avoid pellets with bark or filler.',
  },
  {
    title: 'Cold weather changes things',
    body: 'In cold or windy conditions, your pellet smoker burns through pellets faster and may struggle to hold temp. Add 15–20 min per pound to your estimate. Check the hopper level before any long cook.',
  },
  {
    title: 'Works on any brand',
    body: 'These recipes work on any pellet smoker: Traeger, Pit Boss, Camp Chef, Z Grills, Weber SmokeFire, Recteq, or any other. Temp is temp. The brand does not change the internal target.',
  },
];

export default function PelletSmokerRecipesPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        {/* Hero */}
        <section aria-label="Page introduction" className="py-16 px-4" style={{ backgroundColor: '#FFF7ED' }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex w-14 h-14 bg-amber-100 rounded-2xl items-center justify-center mb-6">
              <Flame className="text-amber-700" size={28} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Pellet Smoker Recipes
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed mb-4">
              Pellet smokers run at a set temperature automatically — no fire management, no babysitting. The main variable you control is wood pellet choice. Here is how to match wood to protein, plus five recipes with exact temps, times, and pairings.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-amber-800 bg-amber-50 px-4 py-2 rounded-full">
              Works on Traeger, Pit Boss, Camp Chef, Z Grills, Recteq, and more
            </div>
          </div>
        </section>

        {/* Wood Guide */}
        <section aria-label="Wood pellet pairing guide" className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Wood Pellet Pairing Guide</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
              Six woods. Each one changes the flavor profile. Start here before you choose your pellets.
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm" aria-label="Wood pellet flavor and pairing guide">
                <thead>
                  <tr className="bg-amber-50 border-b border-amber-100">
                    <th className="text-left py-3 px-4 font-semibold text-amber-900">Wood</th>
                    <th className="text-left py-3 px-4 font-semibold text-amber-900">Flavor</th>
                    <th className="text-left py-3 px-4 font-semibold text-amber-900">Best for</th>
                    <th className="text-left py-3 px-4 font-semibold text-amber-900">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {WOOD_GUIDE.map((row, i) => (
                    <tr
                      key={row.wood}
                      className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-amber-50 transition-colors`}
                    >
                      <td className="py-3 px-4 font-semibold text-amber-700">{row.wood}</td>
                      <td className="py-3 px-4 text-gray-700">{row.flavor}</td>
                      <td className="py-3 px-4 text-gray-600">{row.best}</td>
                      <td className="py-3 px-4 text-gray-500 text-xs leading-relaxed">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Recipes */}
        <section aria-label="Pellet smoker recipes" className="py-16 px-4 bg-amber-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">5 Pellet Smoker Recipes</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
              Each recipe is matched to a specific wood pairing. All internal targets follow USDA food safety guidelines.
            </p>
            <div className="space-y-10">
              {RECIPES.map((recipe) => (
                <article key={recipe.name} aria-label={recipe.name} className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                  <div className="bg-amber-50 px-6 py-4 border-b border-amber-100">
                    <h3 className="text-xl font-bold text-gray-900">{recipe.name}</h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm">
                      <span className="text-gray-600"><span className="font-semibold text-amber-700">Smoker temp:</span> {recipe.smokerTemp}</span>
                      <span className="text-gray-600"><span className="font-semibold text-amber-700">Pull at:</span> {recipe.internalTarget}</span>
                      <span className="text-gray-600"><span className="font-semibold text-amber-700">Time:</span> {recipe.time}</span>
                      <span className="text-gray-600"><span className="font-semibold text-amber-700">Wood:</span> {recipe.wood}</span>
                    </div>
                  </div>
                  <div className="px-6 py-5">
                    <ol className="space-y-3">
                      {recipe.steps.map((step, i) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center mt-0.5">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Pellet Smoker Tips */}
        <section aria-label="Pellet smoker tips" className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Pellet Smoker Tips</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
              A few things that make a difference no matter what brand you own.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {PELLET_TIPS.map(({ title, body }) => (
                <div key={title} className="flex gap-4 p-5 rounded-xl bg-gray-50 border border-gray-100">
                  <CheckCircle className="text-amber-700 flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section aria-label="Related pages" className="py-10 px-4 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-gray-500 mb-3 font-semibold uppercase tracking-wide">Also useful</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/smoking-times-temperatures" className="text-sm text-amber-700 hover:underline">Full smoking times chart</Link>
              <span className="text-gray-300">|</span>
              <Link href="/traeger-recipes" className="text-sm text-amber-700 hover:underline">Traeger recipes</Link>
              <span className="text-gray-300">|</span>
              <Link href="/pit-boss-recipes" className="text-sm text-amber-700 hover:underline">Pit Boss recipes</Link>
              <span className="text-gray-300">|</span>
              <Link href="/smoker-recipes" className="text-sm text-amber-700 hover:underline">All smoker recipes</Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Download PitLog app" className="py-16 px-4" style={{ backgroundColor: '#FFF7ED' }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Log which pellets worked best.</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              PitLog lets you record wood type alongside temp, time, and rating so you can actually remember what combination produced the best result.
            </p>
            <Link
              href="/free-download"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors min-h-[48px]"
            >
              Download PitLog Free <ArrowRight size={18} />
            </Link>
            <p className="text-sm text-gray-400 mt-4">Free. No subscription. $6.99 one-time to unlock the cook log.</p>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
