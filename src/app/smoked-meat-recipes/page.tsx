import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Thermometer, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smoked Meat Recipes — Internal Temps & Times | PitLog',
  description:
    'Smoked meat recipes for brisket, ribs, pork shoulder, chicken, and more. Internal temperatures and smoking times for every cut.',
};

const TEMP_TABLE = [
  {
    protein: 'Pork (whole muscle)',
    usdaMin: '145°F',
    pitmasterTarget: '203°F (shoulder/butt) / 195–203°F (ribs)',
    why: 'USDA minimum is safe. But collagen in shoulder and ribs does not fully break down until 195°F+. Pull at minimum and you get chewy, not tender.',
  },
  {
    protein: 'Poultry',
    usdaMin: '165°F',
    pitmasterTarget: '175°F (dark meat) / 165°F (breast)',
    why: 'Breast dries out above 165°F. Dark meat (thighs, drumsticks) is better at 175°F — the extra temp renders the fat properly.',
  },
  {
    protein: 'Beef (whole muscle)',
    usdaMin: '145°F',
    pitmasterTarget: '203°F (brisket/chuck) / 130–145°F (tri-tip/steak)',
    why: 'Steaks and tri-tip are served medium-rare (130°F). Brisket and chuck need 203°F for collagen breakdown — no shortcut.',
  },
  {
    protein: 'Fish',
    usdaMin: '145°F',
    pitmasterTarget: '145°F',
    why: 'USDA minimum and pitmaster target are the same. Fish is delicate. Do not go past 145°F or it dries out fast.',
  },
];

const RECIPES = [
  {
    name: 'Classic Smoked Brisket',
    weight: '12–14 lb packer',
    smokerTemp: '225–250°F',
    internalTarget: '203°F',
    time: '12–18 hr',
    wood: 'Oak or hickory',
    method: [
      'Season the night before with a 50/50 mix of coarse salt and black pepper. Add garlic powder if you like.',
      'Place fat-side up at 225°F. Do not open the smoker for the first 4 hours.',
      'Expect a stall at 150–165°F that can last 2–4 hours. This is normal. Wrap in butcher paper when the bark is set and dark.',
      'Continue at 250°F until 203°F internal. Probe test: the probe should go in with zero resistance, like butter. Rest 1–2 hours before slicing.',
    ],
  },
  {
    name: 'Competition-Style Pork Ribs',
    weight: '2–3 lb rack (spare or baby back)',
    smokerTemp: '225°F',
    internalTarget: '195–203°F',
    time: '5–6 hr (baby back) / 6–7 hr (spare)',
    wood: 'Apple + cherry blend',
    method: [
      'Remove the membrane from the bone side. Season with a sweet rub — brown sugar, paprika, salt, pepper, garlic.',
      'Spare ribs: 3-2-1 method. Baby backs: 2-2-1. The numbers are hours: unwrapped, wrapped in foil, unwrapped.',
      'In the wrap: brown sugar, butter, a splash of apple juice or cider vinegar.',
      'Sauce in the last 30 min. Done when you see a slight crack on the bend test and meat pulls back from the bone ends.',
    ],
  },
  {
    name: 'Smoked Pulled Pork',
    weight: '8–10 lb Boston butt',
    smokerTemp: '225–250°F',
    internalTarget: '203°F',
    time: '12–16 hr',
    wood: 'Apple or hickory',
    method: [
      'Apply rub and refrigerate overnight uncovered. This forms the bark during the cook.',
      'Smoke bone-side down at 225°F. It will stall at 150–165°F just like brisket. Wrap in foil at 160°F to push through.',
      'Continue at 250°F after wrapping. Pull at 203°F when probe-tender. Bone should slide out cleanly.',
      'Rest 1 hour minimum. Pull by hand. Toss in a little of the liquid from the foil wrap before serving.',
    ],
  },
  {
    name: 'Smoked Whole Chicken',
    weight: '3.5–4.5 lb bird',
    smokerTemp: '300°F',
    internalTarget: '165°F (breast)',
    time: '2.5–3.5 hr',
    wood: 'Apple or pecan',
    method: [
      'Spatchcock the bird: remove the backbone with kitchen shears, press flat. This cuts cook time and gives better skin.',
      'Dry brine 4–24 hours before cooking — salt only, uncovered in the fridge. Do not rinse.',
      'Smoke at 300°F for the first 2 hours, then check internal temp in the thickest part of the breast. Crank to 400°F if skin needs crisping.',
      'Pull at 165°F breast temp. Thighs will be at 175°F+ at this point. Rest 10 min before cutting.',
    ],
  },
  {
    name: 'Smoked Chuck Roast',
    weight: '3–4 lb roast',
    smokerTemp: '250°F',
    internalTarget: '205°F',
    time: '8–10 hr',
    wood: 'Oak or hickory',
    method: [
      'Season chuck roast with beef rub. Let sit 30 min at room temp.',
      'Smoke at 250°F directly on the grate until it hits 160°F internal (about 4–5 hr).',
      'Transfer to a foil pan. Add 1/2 cup beef broth, a pat of butter. Cover tightly with foil.',
      'Return to smoker until 205°F and probe-tender. Shred like pulled pork or slice thick against the grain.',
    ],
  },
];

const TEMP_TIPS = [
  {
    title: 'Buy a dual-probe thermometer',
    body: 'One probe in the meat, one clipped to the grate near the protein. Your smoker lid thermometer is often 25–50°F off. You need to know the actual cooking environment, not the factory guess.',
  },
  {
    title: 'Pull temp vs. resting temp',
    body: 'Meat continues to cook 5–10°F after you pull it from the smoker (carryover cooking). For fish and chicken, this matters a lot. Pull salmon at 140°F and it will carry to 145°F while resting.',
  },
  {
    title: 'Collagen cuts need time, not just temp',
    body: 'Brisket and shoulder can be at 203°F but still feel tight on the probe. If there is resistance, give it more time. The probe test overrides the thermometer reading every time.',
  },
];

export default function SmokedMeatRecipesPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        {/* Hero */}
        <section aria-label="Page introduction" className="py-16 px-4" style={{ backgroundColor: '#FFF7ED' }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex w-14 h-14 bg-amber-100 rounded-2xl items-center justify-center mb-6">
              <Thermometer className="text-amber-700" size={28} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Smoked Meat Recipes
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed mb-4">
              The biggest mistake most people make with smoked meat: they rely on time instead of internal temperature. Time is a rough estimate. Internal temp is the real target. Here is everything you need to get it right.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-amber-800 bg-amber-50 px-4 py-2 rounded-full">
              <Thermometer size={14} /> USDA minimums + pitmaster targets — both explained
            </div>
          </div>
        </section>

        {/* Temp Explainer Table */}
        <section aria-label="USDA vs pitmaster temperature targets" className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">USDA Minimums vs. Pitmaster Targets</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
              USDA minimums are food safety requirements. Pitmaster targets are higher for certain cuts because collagen does not break down until you push past the minimum. Here is the difference by protein.
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm" aria-label="Temperature targets by protein type">
                <thead>
                  <tr className="bg-amber-50 border-b border-amber-100">
                    <th className="text-left py-3 px-4 font-semibold text-amber-900">Protein</th>
                    <th className="text-left py-3 px-4 font-semibold text-amber-900">USDA Minimum</th>
                    <th className="text-left py-3 px-4 font-semibold text-amber-900">Pitmaster Target</th>
                    <th className="text-left py-3 px-4 font-semibold text-amber-900">Why the difference</th>
                  </tr>
                </thead>
                <tbody>
                  {TEMP_TABLE.map((row, i) => (
                    <tr
                      key={row.protein}
                      className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-amber-50 transition-colors`}
                    >
                      <td className="py-3 px-4 font-semibold text-gray-900">{row.protein}</td>
                      <td className="py-3 px-4 text-gray-700 font-medium">{row.usdaMin}</td>
                      <td className="py-3 px-4 font-medium text-amber-700">{row.pitmasterTarget}</td>
                      <td className="py-3 px-4 text-gray-500 text-xs leading-relaxed">{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">
              Source: USDA Food Safety and Inspection Service. Pitmaster targets reflect documented BBQ practice for collagen-rich cuts.
            </p>
          </div>
        </section>

        {/* Recipes */}
        <section aria-label="Smoked meat recipes" className="py-16 px-4 bg-amber-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">5 Smoked Meat Recipes</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
              Every recipe below includes weight, smoker temp, internal target, estimated time, and step-by-step method.
            </p>
            <div className="space-y-10">
              {RECIPES.map((recipe) => (
                <article key={recipe.name} aria-label={recipe.name} className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                  <div className="bg-amber-50 px-6 py-4 border-b border-amber-100">
                    <h3 className="text-xl font-bold text-gray-900">{recipe.name}</h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm">
                      <span className="text-gray-600"><span className="font-semibold text-amber-700">Weight:</span> {recipe.weight}</span>
                      <span className="text-gray-600"><span className="font-semibold text-amber-700">Smoker temp:</span> {recipe.smokerTemp}</span>
                      <span className="text-gray-600"><span className="font-semibold text-amber-700">Pull at:</span> {recipe.internalTarget}</span>
                      <span className="text-gray-600"><span className="font-semibold text-amber-700">Time:</span> {recipe.time}</span>
                      <span className="text-gray-600"><span className="font-semibold text-amber-700">Wood:</span> {recipe.wood}</span>
                    </div>
                  </div>
                  <div className="px-6 py-5">
                    <ol className="space-y-3">
                      {recipe.method.map((step, i) => (
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

        {/* Thermometer Tips */}
        <section aria-label="Temperature tips for smoked meat" className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Getting Temperature Right</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
              The thermometer is your most important tool. Here is how to use it correctly.
            </p>
            <div className="grid sm:grid-cols-3 gap-5">
              {TEMP_TIPS.map(({ title, body }) => (
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
              <Link href="/smoker-recipes" className="text-sm text-amber-700 hover:underline">All smoker recipes</Link>
              <span className="text-gray-300">|</span>
              <Link href="/traeger-recipes" className="text-sm text-amber-700 hover:underline">Traeger recipes</Link>
              <span className="text-gray-300">|</span>
              <Link href="/pellet-smoker-recipes" className="text-sm text-amber-700 hover:underline">Pellet smoker recipes</Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Download PitLog app" className="py-16 px-4" style={{ backgroundColor: '#FFF7ED' }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Record the temps that worked.</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              PitLog logs the actual internal temp you pulled at, the smoker temp throughout the cook, and your rating. Next time you do that brisket, you will know exactly what produced the result.
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
