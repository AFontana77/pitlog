import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Flame, Thermometer, ArrowRight, CheckCircle } from 'lucide-react';
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
    time: '1–1.5 hr/lb',
    wood: 'Hickory or mesquite blend',
    steps: [
      'Trim fat cap to 1/4 inch. Season the night before with coarse salt, black pepper, and garlic powder.',
      'Set Pit Boss to 225°F (not Smoke setting — use a specific temp). Smoke fat-side up until 160–165°F internal.',
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
      'Set Pit Boss to 225°F. Smoke bone-side down until internal reaches 160°F (6–8 hr for an 8 lb butt).',
      'Wrap in foil with apple juice, butter, and brown sugar. Return to smoker until 203°F.',
      'Rest 1 hour. Pull by hand or with bear claws. Bone should slide out with no resistance.',
    ],
  },
  {
    name: 'Pit Boss Spare Ribs',
    smokerTemp: '225°F',
    internalTarget: '195–203°F',
    time: '6 hr (3-2-1 method)',
    wood: 'Cherry or hickory',
    steps: [
      'Remove membrane from the back of the rack. Apply rub on both sides. Let sit 30 min.',
      '3 hr: Smoke unwrapped at 225°F, bone-side down.',
      '2 hr: Wrap in foil with brown sugar, butter, and a splash of apple juice. Back on the grill.',
      '1 hr: Unwrap, glaze with sauce, return to grill. Done when you see slight cracking on the bend test.',
    ],
  },
  {
    name: 'Pit Boss Chicken Wings',
    smokerTemp: '275°F then 400°F',
    internalTarget: '165°F',
    time: '1.5–2 hr total',
    wood: 'Apple or pecan',
    steps: [
      'Pat wings dry. Toss in baking powder and your rub (baking powder helps crisp the skin).',
      'Set Pit Boss to 275°F. Smoke wings for 45–60 min until internal hits 160°F.',
      'Crank Pit Boss to 400°F (or use the sear zone on models with a flame broiler). Cook 10–15 min more.',
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
  {
    title: 'What the Smoke setting does',
    body: 'On Pit Boss grills, the Smoke setting runs at roughly 180–200°F with the fan cycling in a way that produces more smoke. It is good for the first 1–2 hours of a long cook to build smoke flavor before bumping to a higher temp.',
  },
  {
    title: 'The P-Setting (older models)',
    body: 'Older Pit Boss models have a P-Setting (P0 to P7) that controls how long the auger pauses between cycles. A higher P number means more smoke but lower temps. P4 is the factory default. Use P5 or P6 for more smoke in cold weather.',
  },
  {
    title: 'Temp dial vs. digital control',
    body: 'Newer Pit Boss models with digital controllers hold temp more accurately. On older dial models, expect +/- 25°F swings. Use a quality leave-in thermometer to track actual smoker temp — do not rely solely on the lid thermometer.',
  },
  {
    title: 'The flame broiler',
    body: 'Many Pit Boss models have a sliding flame broiler plate that exposes the fire pot for direct heat. This is what makes high-heat finishes (like chicken wings) work so well — close the flame broiler during smoking, open it only for searing.',
  },
];

export default function PitBossRecipesPage() {
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
              Pit Boss Recipes
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed mb-4">
              Pit Boss pellet grills run 180°F to 500°F. The Smoke setting lands around 180–200°F. Most long cooks use 225–250°F. Here are the five cooks pitmasters do most on a Pit Boss — with temps, times, wood, and step-by-step methods.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-amber-800 bg-amber-50 px-4 py-2 rounded-full">
              <Thermometer size={14} /> All internal targets based on USDA food safety guidelines
            </div>
          </div>
        </section>

        {/* Recipes */}
        <section aria-label="Pit Boss pellet grill recipes" className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto space-y-12">
            {RECIPES.map((recipe) => (
              <article key={recipe.name} aria-label={recipe.name} className="border border-gray-200 rounded-2xl overflow-hidden">
                <div className="bg-amber-50 px-6 py-4 border-b border-amber-100">
                  <h2 className="text-xl font-bold text-gray-900">{recipe.name}</h2>
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
        </section>

        {/* P-Setting + Smoke Setting Explainer */}
        <section aria-label="Pit Boss settings guide" className="py-16 px-4 bg-amber-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Understanding Your Pit Boss Settings</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
              Pit Boss grills have a few settings that confuse new owners. Here is what they mean and how to use them.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {PSETTING_INFO.map(({ title, body }) => (
                <div key={title} className="flex gap-4 p-5 rounded-xl bg-white border border-amber-100">
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
              <Link href="/pellet-smoker-recipes" className="text-sm text-amber-700 hover:underline">Pellet smoker recipes</Link>
              <span className="text-gray-300">|</span>
              <Link href="/smoker-recipes" className="text-sm text-amber-700 hover:underline">All smoker recipes</Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Download PitLog app" className="py-16 px-4" style={{ backgroundColor: '#FFF7ED' }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Log every Pit Boss cook.</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Pit Boss grills have real temp swings, especially on older dial models. PitLog lets you track actual smoker temp, actual pull temp, and what you changed from cook to cook — so the next one is always better.
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
