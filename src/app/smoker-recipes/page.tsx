import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
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
      { name: 'Smoked Brisket', temp: '225 to 250°F', internal: '203°F', time: '1 to 1.5 hr/lb', note: 'Full packer or flat. Wrap in butcher paper at 160°F. Probe tender when done. Not just at temp.' },
      { name: 'Smoked Chuck Roast', temp: '250°F', internal: '205°F', time: '1.5 hr/lb', note: 'Often called the poor man brisket. Wrap at 165°F. Rest 30 min before slicing or pulling.' },
      { name: 'Smoked Tri-Tip', temp: '225°F then 400°F', internal: '130 to 145°F', time: '2 to 3 hr total', note: 'Smoke until 110°F, then reverse sear on high heat to finish. Best at medium-rare.' },
      { name: 'Smoked Beef Short Ribs', temp: '250 to 275°F', internal: '203°F', time: '8 to 10 hr', note: 'Plate ribs (dino ribs) take a full day. Probe tender is the only reliable test. Wrap is optional.' },
    ],
  },
  {
    name: 'Pork Smoker Recipes',
    intro: 'Pork shoulder and ribs are the most forgiving cooks in BBQ. They hold well at temp and reheat better than most proteins.',
    recipes: [
      { name: 'Smoked Pork Shoulder', temp: '225 to 250°F', internal: '203°F', time: '1.5 hr/lb', note: 'The backbone of pulled pork. Wrap at 160°F, rest 1 hour minimum after pulling from the smoker.' },
      { name: 'Smoked Baby Back Ribs', temp: '225°F', internal: '195 to 203°F', time: '5 hr (2-2-1)', note: '2 hr unwrapped, 2 hr wrapped, 1 hr unwrapped. Bend test: cracks on the surface when bent.' },
      { name: 'Smoked Spare Ribs', temp: '225°F', internal: '195 to 203°F', time: '6 hr (3-2-1)', note: 'Thicker cut. St. Louis trim removes the skirt for even cooking. More forgiving than baby backs.' },
      { name: 'Smoked Pork Belly', temp: '225°F', internal: '195 to 200°F', time: '5 to 6 hr', note: 'Cube at 165°F for burnt ends. Toss in sauce and brown sugar, return uncovered for 1 hour.' },
    ],
  },
  {
    name: 'Poultry Smoker Recipes',
    intro: 'Poultry cooks faster than beef and pork. Higher smoker temps (275 to 300°F) help crisp the skin. Otherwise you end up with rubbery texture.',
    recipes: [
      { name: 'Smoked Whole Chicken', temp: '275 to 300°F', internal: '165°F (breast)', time: '3 to 4 hr', note: 'Spatchcock (remove backbone) for more even cooking and crisper skin. Rest 10 min before carving.' },
      { name: 'Smoked Chicken Thighs', temp: '275°F', internal: '175°F', time: '2 hr', note: 'Dark meat is more forgiving. Pull at 175°F for best texture. Skin crisps better with dry brine.' },
      { name: 'Smoked Chicken Wings', temp: '275°F then 400°F', internal: '165°F+', time: '1.5 to 2 hr', note: 'Smoke at 275°F for 1 hr, then crank heat for 15 to 20 min to crisp the skin before saucing.' },
      { name: 'Smoked Turkey Breast', temp: '275°F', internal: '165°F', time: '4 to 5 hr', note: 'Brine overnight if possible. Wrap at 155°F to retain moisture. Rest 20 min before slicing.' },
    ],
  },
  {
    name: 'Fish Smoker Recipes',
    intro: 'Fish cooks fast and at lower temps than other proteins. There is no stall. Pull it as soon as it hits target temp. Overcooked fish dries out quickly.',
    recipes: [
      { name: 'Smoked Salmon', temp: '180 to 200°F', internal: '145°F', time: '1 to 2 hr', note: 'Dry brine with salt and brown sugar for 1 to 2 hr first. Glaze with honey and soy in the last 20 min.' },
      { name: 'Smoked Trout', temp: '180°F', internal: '145°F', time: '1.5 hr', note: 'Brine whole trout for 4 hr in a salt-water-brown-sugar mix. Alder wood is the traditional choice.' },
      { name: 'Smoked Swordfish', temp: '225°F', internal: '145°F', time: '45 to 60 min', note: 'Meaty cut that holds up well in a smoker. Marinate first. Short cook. Check at 30 min.' },
    ],
  },
];

const ALT_BG = ['oklch(0.13 0.025 50)', 'oklch(0.18 0.030 50)'];

export default function SmokerRecipesPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24" style={{ backgroundColor: 'oklch(0.10 0.020 50)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="font-display uppercase font-semibold mb-8 flex items-center gap-3" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'oklch(0.62 0.16 55)' }} aria-hidden="true" />
              EVERY PROTEIN · USDA TARGETS
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-6" style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}>
              Smoker recipes for every cut.
            </h1>
            <p className="text-lg leading-relaxed max-w-2xl mb-8" style={{ color: 'oklch(0.82 0.018 50)' }}>
              Every smoker recipe comes down to two numbers: the smoker temp and the internal target. Get those right and the protein does most of the work. Below are the cooks that every pitmaster runs, organized by protein.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a href="#beef" className="text-sm font-display uppercase" style={{ color: 'oklch(0.72 0.14 55)', letterSpacing: '0.1em' }}>Beef</a>
              <a href="#pork" className="text-sm font-display uppercase" style={{ color: 'oklch(0.72 0.14 55)', letterSpacing: '0.1em' }}>Pork</a>
              <a href="#poultry" className="text-sm font-display uppercase" style={{ color: 'oklch(0.72 0.14 55)', letterSpacing: '0.1em' }}>Poultry</a>
              <a href="#fish" className="text-sm font-display uppercase" style={{ color: 'oklch(0.72 0.14 55)', letterSpacing: '0.1em' }}>Fish</a>
            </div>
          </div>
        </section>

        {CATEGORIES.map((cat, catIdx) => {
          const anchorId = cat.name.toLowerCase().split(' ')[0];
          return (
            <section
              key={cat.name}
              id={anchorId}
              aria-label={cat.name}
              className="px-4 sm:px-6 lg:px-8 py-20"
              style={{ backgroundColor: ALT_BG[catIdx % 2] }}
            >
              <div className="max-w-5xl mx-auto">
                <span className="font-display uppercase mb-5 inline-block" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>
                  {String(catIdx + 1).padStart(2, '0')} · {anchorId.toUpperCase()}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl mb-6" style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}>
                  {cat.name}
                </h2>
                <p className="leading-relaxed mb-12 max-w-2xl" style={{ color: 'oklch(0.82 0.018 50)' }}>{cat.intro}</p>
                <ul>
                  {cat.recipes.map((recipe, idx) => (
                    <li
                      key={recipe.name}
                      className="grid grid-cols-12 gap-4 sm:gap-8 py-8"
                      style={{
                        borderTop: '1px solid oklch(0.28 0.025 50)',
                        borderBottom: idx === cat.recipes.length - 1 ? '1px solid oklch(0.28 0.025 50)' : 'none',
                      }}
                    >
                      <div className="col-span-2 sm:col-span-1 font-display tabular-nums text-2xl sm:text-3xl leading-none" style={{ color: 'oklch(0.62 0.16 55)' }}>
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div className="col-span-10 sm:col-span-4">
                        <h3 className="font-display text-xl sm:text-2xl leading-tight mb-2" style={{ color: 'oklch(0.93 0.020 50)' }}>
                          {recipe.name}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: 'oklch(0.62 0.018 50)' }}>{recipe.note}</p>
                      </div>
                      <div className="col-span-12 sm:col-span-7">
                        <dl className="grid grid-cols-3 gap-x-4 gap-y-2 text-sm">
                          <div>
                            <dt className="font-display uppercase mb-1" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.1em', fontSize: '0.65rem' }}>Smoker</dt>
                            <dd className="tabular-nums" style={{ color: 'oklch(0.93 0.020 50)' }}>{recipe.temp}</dd>
                          </div>
                          <div>
                            <dt className="font-display uppercase mb-1" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.1em', fontSize: '0.65rem' }}>Pull at</dt>
                            <dd className="font-display tabular-nums" style={{ color: 'oklch(0.72 0.14 55)' }}>{recipe.internal}</dd>
                          </div>
                          <div>
                            <dt className="font-display uppercase mb-1" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.1em', fontSize: '0.65rem' }}>Time</dt>
                            <dd className="tabular-nums" style={{ color: 'oklch(0.93 0.020 50)' }}>{recipe.time}</dd>
                          </div>
                        </dl>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}

        <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ backgroundColor: 'oklch(0.13 0.025 50)', borderTop: '1px solid oklch(0.28 0.025 50)' }}>
          <div className="max-w-5xl mx-auto">
            <span className="font-display uppercase mb-5 inline-block" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>By grill brand</span>
            <h2 className="font-display text-3xl mb-10" style={{ color: 'oklch(0.93 0.020 50)' }}>
              Recipes by grill brand.
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link href="/traeger-recipes" className="block p-6" style={{ background: 'oklch(0.18 0.030 50)', border: '1px solid oklch(0.28 0.025 50)', borderRadius: '0.25rem' }}>
                <span className="block font-display text-lg mb-2" style={{ color: 'oklch(0.93 0.020 50)' }}>Traeger Recipes</span>
                <span className="text-xs" style={{ color: 'oklch(0.62 0.018 50)' }}>Temps, times, and settings for Traeger grills</span>
              </Link>
              <Link href="/pit-boss-recipes" className="block p-6" style={{ background: 'oklch(0.18 0.030 50)', border: '1px solid oklch(0.28 0.025 50)', borderRadius: '0.25rem' }}>
                <span className="block font-display text-lg mb-2" style={{ color: 'oklch(0.93 0.020 50)' }}>Pit Boss Recipes</span>
                <span className="text-xs" style={{ color: 'oklch(0.62 0.018 50)' }}>Recipes with P-Setting and Smoke mode guidance</span>
              </Link>
              <Link href="/pellet-smoker-recipes" className="block p-6" style={{ background: 'oklch(0.18 0.030 50)', border: '1px solid oklch(0.28 0.025 50)', borderRadius: '0.25rem' }}>
                <span className="block font-display text-lg mb-2" style={{ color: 'oklch(0.93 0.020 50)' }}>Pellet Smoker Recipes</span>
                <span className="text-xs" style={{ color: 'oklch(0.62 0.018 50)' }}>Wood pairings and recipes for any pellet grill</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24" style={{ backgroundColor: 'oklch(0.10 0.020 50)', borderTop: '1px solid oklch(0.28 0.025 50)' }}>
          <div className="max-w-3xl mx-auto">
            <span className="font-display uppercase mb-5 inline-block" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>The log</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-6" style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}>
              Track every cook. Get better every time.
            </h2>
            <p className="leading-relaxed mb-10 max-w-2xl" style={{ color: 'oklch(0.82 0.018 50)' }}>
              PitLog has 129+ cuts with reference temps and times, plus a cook log to record your actual results. Free to download. $6.99 one-time to unlock the log.
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
