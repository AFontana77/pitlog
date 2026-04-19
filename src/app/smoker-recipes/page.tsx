import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Flame, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smoker Recipes — Times and Temps for Every Cut | PitLog',
  description:
    'Smoker recipes for beef, pork, poultry, and fish. Smoking temperatures, internal targets, and times. Log every cook in PitLog.',
};

const CATEGORIES = [
  {
    name: 'Beef Smoker Recipes',
    intro: 'Beef is the heart of BBQ. Low-and-slow collagen breakdown is what separates a great brisket from a dry one. These cuts all reward patience.',
    recipes: [
      {
        name: 'Smoked Brisket',
        temp: '225–250°F',
        internal: '203°F',
        time: '1–1.5 hr/lb',
        note: 'Full packer or flat. Wrap in butcher paper at 160°F. Probe tender when done — not just at temp.',
      },
      {
        name: 'Smoked Chuck Roast',
        temp: '250°F',
        internal: '205°F',
        time: '1.5 hr/lb',
        note: 'Often called the poor man\'s brisket. Wrap at 165°F. Rest 30 min before slicing or pulling.',
      },
      {
        name: 'Smoked Tri-Tip',
        temp: '225°F then 400°F',
        internal: '130–145°F',
        time: '2–3 hr total',
        note: 'Smoke until 110°F, then reverse sear on high heat to finish. Best at medium-rare.',
      },
      {
        name: 'Smoked Beef Short Ribs',
        temp: '250–275°F',
        internal: '203°F',
        time: '8–10 hr',
        note: 'Plate ribs (dino ribs) take a full day. Probe tender is the only reliable test. Wrap is optional.',
      },
    ],
  },
  {
    name: 'Pork Smoker Recipes',
    intro: 'Pork shoulder and ribs are the most forgiving cooks in BBQ. They hold well at temp and reheat better than most proteins.',
    recipes: [
      {
        name: 'Smoked Pork Shoulder',
        temp: '225–250°F',
        internal: '203°F',
        time: '1.5 hr/lb',
        note: 'The backbone of pulled pork. Wrap at 160°F, rest 1 hour minimum after pulling from the smoker.',
      },
      {
        name: 'Smoked Baby Back Ribs',
        temp: '225°F',
        internal: '195–203°F',
        time: '5 hr (2-2-1)',
        note: '2 hr unwrapped, 2 hr wrapped, 1 hr unwrapped. Bend test: cracks on the surface when bent.',
      },
      {
        name: 'Smoked Spare Ribs',
        temp: '225°F',
        internal: '195–203°F',
        time: '6 hr (3-2-1)',
        note: 'Thicker cut. St. Louis trim removes the skirt for even cooking. More forgiving than baby backs.',
      },
      {
        name: 'Smoked Pork Belly',
        temp: '225°F',
        internal: '195–200°F',
        time: '5–6 hr',
        note: 'Cube at 165°F for burnt ends. Toss in sauce and brown sugar, return uncovered for 1 hour.',
      },
    ],
  },
  {
    name: 'Poultry Smoker Recipes',
    intro: 'Poultry cooks faster than beef and pork. Higher smoker temps (275–300°F) help crisp the skin — otherwise you end up with rubbery texture.',
    recipes: [
      {
        name: 'Smoked Whole Chicken',
        temp: '275–300°F',
        internal: '165°F (breast)',
        time: '3–4 hr',
        note: 'Spatchcock (remove backbone) for more even cooking and crisper skin. Rest 10 min before carving.',
      },
      {
        name: 'Smoked Chicken Thighs',
        temp: '275°F',
        internal: '175°F',
        time: '2 hr',
        note: 'Dark meat is more forgiving. Pull at 175°F for best texture. Skin crisps better with dry brine.',
      },
      {
        name: 'Smoked Chicken Wings',
        temp: '275°F then 400°F',
        internal: '165°F+',
        time: '1.5–2 hr',
        note: 'Smoke at 275°F for 1 hr, then crank heat for 15–20 min to crisp the skin before saucing.',
      },
      {
        name: 'Smoked Turkey Breast',
        temp: '275°F',
        internal: '165°F',
        time: '4–5 hr',
        note: 'Brine overnight if possible. Wrap at 155°F to retain moisture. Rest 20 min before slicing.',
      },
    ],
  },
  {
    name: 'Fish Smoker Recipes',
    intro: 'Fish cooks fast and at lower temps than other proteins. There is no stall. Pull it as soon as it hits target temp — overcooked fish dries out quickly.',
    recipes: [
      {
        name: 'Smoked Salmon',
        temp: '180–200°F',
        internal: '145°F',
        time: '1–2 hr',
        note: 'Dry brine with salt and brown sugar for 1–2 hr first. Glaze with honey and soy in the last 20 min.',
      },
      {
        name: 'Smoked Trout',
        temp: '180°F',
        internal: '145°F',
        time: '1.5 hr',
        note: 'Brine whole trout for 4 hr in a salt-water-brown-sugar mix. Alder wood is the traditional choice.',
      },
      {
        name: 'Smoked Swordfish',
        temp: '225°F',
        internal: '145°F',
        time: '45–60 min',
        note: 'Meaty cut that holds up well in a smoker. Marinate first. Short cook — check at 30 min.',
      },
    ],
  },
];

export default function SmokerRecipesPage() {
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
              Smoker Recipes
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed mb-4">
              Every smoker recipe comes down to two numbers: the smoker temp and the internal target. Get those right and the protein does most of the work. Below are the cooks that every pitmaster runs — organized by protein.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <a href="#beef" className="text-sm text-amber-700 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-full transition-colors">Beef</a>
              <a href="#pork" className="text-sm text-amber-700 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-full transition-colors">Pork</a>
              <a href="#poultry" className="text-sm text-amber-700 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-full transition-colors">Poultry</a>
              <a href="#fish" className="text-sm text-amber-700 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-full transition-colors">Fish</a>
            </div>
          </div>
        </section>

        {/* Protein Sections */}
        {CATEGORIES.map((cat, catIdx) => {
          const anchorId = cat.name.toLowerCase().split(' ')[0];
          return (
            <section
              key={cat.name}
              id={anchorId}
              aria-label={cat.name}
              className={`py-16 px-4 ${catIdx % 2 === 0 ? 'bg-white' : 'bg-amber-50'}`}
            >
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{cat.name}</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">{cat.intro}</p>
                <div className="grid sm:grid-cols-2 gap-5">
                  {cat.recipes.map((recipe) => (
                    <article
                      key={recipe.name}
                      aria-label={recipe.name}
                      className="rounded-xl border border-gray-200 bg-white p-5"
                    >
                      <h3 className="font-bold text-gray-900 mb-3">{recipe.name}</h3>
                      <div className="space-y-1 text-sm mb-3">
                        <div className="flex gap-2">
                          <span className="font-semibold text-amber-700 w-28 flex-shrink-0">Smoker temp</span>
                          <span className="text-gray-700">{recipe.temp}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-semibold text-amber-700 w-28 flex-shrink-0">Pull at</span>
                          <span className="text-gray-700">{recipe.internal}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-semibold text-amber-700 w-28 flex-shrink-0">Approx time</span>
                          <span className="text-gray-700">{recipe.time}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed italic">{recipe.note}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* Grill-Specific Links */}
        <section aria-label="Grill-specific recipe pages" className="py-12 px-4 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Recipes by Grill Brand</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                href="/traeger-recipes"
                className="block p-5 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 transition-colors text-center"
              >
                <span className="block font-bold text-amber-900 mb-1">Traeger Recipes</span>
                <span className="text-xs text-gray-500">Temps, times, and settings for Traeger grills</span>
              </Link>
              <Link
                href="/pit-boss-recipes"
                className="block p-5 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 transition-colors text-center"
              >
                <span className="block font-bold text-amber-900 mb-1">Pit Boss Recipes</span>
                <span className="text-xs text-gray-500">Recipes with P-Setting and Smoke mode guidance</span>
              </Link>
              <Link
                href="/pellet-smoker-recipes"
                className="block p-5 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 transition-colors text-center"
              >
                <span className="block font-bold text-amber-900 mb-1">Pellet Smoker Recipes</span>
                <span className="text-xs text-gray-500">Wood pairings and recipes for any pellet grill</span>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Download PitLog app" className="py-16 px-4" style={{ backgroundColor: '#FFF7ED' }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Track every cook. Get better every time.</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              PitLog has 129+ cuts with reference temps and times, plus a cook log to record your actual results. Free to download. $6.99 one-time to unlock the log.
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
