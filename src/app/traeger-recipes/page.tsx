import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Flame, Thermometer, ArrowRight, CheckCircle } from 'lucide-react';
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
    time: '1–1.5 hr/lb',
    wood: 'Oak or hickory',
    steps: [
      'Trim fat cap to 1/4 inch. Season with salt, pepper, and garlic powder the night before.',
      'Set Traeger to 225°F. Place brisket fat-side up. Smoke until internal temp hits 160–165°F (about 6–8 hr for a 12 lb packer).',
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
      'Set Traeger to 225°F. Place shoulder bone-side down. Smoke until 160°F internal (about 6–8 hr).',
      'Wrap in foil with a splash of apple juice. Return to smoker until 203°F and probe-tender.',
      'Rest 1 hour minimum. Pull with forks or bear claws. The bone should slide out clean.',
    ],
  },
  {
    name: 'Traeger Chicken Thighs',
    smokerTemp: '275°F',
    internalTarget: '175°F',
    time: '1.5–2 hr',
    wood: 'Apple or cherry',
    steps: [
      'Pat thighs dry. Season under and over the skin. Let sit 30 min at room temp before cooking.',
      'Set Traeger to 275°F. Smoke skin-side up until internal hits 165°F (about 1 hr).',
      'Crank Traeger to 400°F for 10–15 min to crisp the skin. Pull at 175°F.',
      'Let rest 5 min before serving. Sauce on the side or glaze in the last 5 min.',
    ],
  },
  {
    name: 'Traeger Salmon',
    smokerTemp: '180°F',
    internalTarget: '145°F',
    time: '1–2 hr',
    wood: 'Alder or apple',
    steps: [
      'Dry brine salmon with brown sugar and salt for 1–2 hours in the fridge. Rinse, pat dry.',
      'Set Traeger to 180°F. Place salmon skin-side down on the grate.',
      'Smoke until internal hits 130°F, then glaze with a mix of honey, soy sauce, and garlic.',
      'Continue until 145°F internal. Salmon should flake easily. Rest 5 min before serving.',
    ],
  },
  {
    name: 'Traeger Spare Ribs (3-2-1)',
    smokerTemp: '225°F',
    internalTarget: '195–203°F',
    time: '6 hr',
    wood: 'Hickory or cherry',
    steps: [
      'Remove the membrane from the back. Season with your rub. Let sit 30 min.',
      '3 hr: Smoke at 225°F, bone-side down, no peeking.',
      '2 hr: Wrap in foil with brown sugar, butter, and a splash of apple juice. Return to smoker.',
      '1 hr: Unwrap, sauce if desired, return to smoker to set the glaze. Done when bend test shows a slight crack.',
    ],
  },
  {
    name: 'Traeger Baby Back Ribs (2-2-1)',
    smokerTemp: '225°F',
    internalTarget: '195–203°F',
    time: '5 hr',
    wood: 'Apple or pecan',
    steps: [
      'Remove membrane. Apply rub generously on both sides.',
      '2 hr: Smoke at 225°F unwrapped.',
      '2 hr: Wrap tightly in foil with butter and brown sugar.',
      '1 hr: Unwrap, sauce, return to smoker. Pull when ribs bend and meat pulls back from the bone.',
    ],
  },
];

const TIPS = [
  {
    title: 'Set the right temp from the start',
    body: 'Most Traeger grills take 10–15 minutes to reach temp. Close the lid during preheat and do not open it for the first hour of the cook.',
  },
  {
    title: 'Use the Super Smoke setting',
    body: 'On WiFIRE models, Super Smoke runs the fan in a pattern that produces more smoke at lower temps (165–225°F). Use it for the first 2–3 hours of a long cook for maximum smoke ring.',
  },
  {
    title: 'Do not open the lid constantly',
    body: 'Every time you open the lid, temp drops 25–50°F and recovery takes 10–15 minutes. Trust the process. Only open to wrap or to probe.',
  },
  {
    title: 'Pellet choice matters',
    body: 'Traeger sells blended pellets. For beef, use their Signature Blend or pure hickory. For poultry and pork, apple or cherry produces a cleaner, milder smoke.',
  },
];

export default function TraegerRecipesPage() {
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
              Traeger Recipes
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed mb-4">
              Traeger pellet grills run 165°F to 500°F. Most smoking happens at 225–275°F. Below are step-by-step methods for the cooks pitmasters do most often — with exact temps, times, and wood pairings.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-amber-800 bg-amber-50 px-4 py-2 rounded-full">
              <Thermometer size={14} /> All internal targets based on USDA food safety guidelines
            </div>
          </div>
        </section>

        {/* Recipes */}
        <section aria-label="Traeger recipes" className="py-16 px-4 bg-white">
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

        {/* Traeger Tips */}
        <section aria-label="Traeger tips" className="py-16 px-4 bg-amber-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Traeger Tips for Better Cooks</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
              A few things that make a real difference on any Traeger grill.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {TIPS.map(({ title, body }) => (
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
              <Link href="/pit-boss-recipes" className="text-sm text-amber-700 hover:underline">Pit Boss recipes</Link>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Log every Traeger cook.</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your Traeger runs different than anyone else's. Wind, ambient temp, pellet brand — they all change the result. PitLog lets you record every cook so you know exactly what worked.
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
