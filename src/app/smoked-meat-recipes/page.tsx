import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smoked Meat Recipes — Internal Temps & Times | PitLog',
  description:
    'Smoked meat recipes for brisket, ribs, pork shoulder, chicken, and more. Internal temperatures and smoking times for every cut.',
};

const TEMP_TABLE = [
  { protein: 'Pork (whole muscle)', usdaMin: '145°F', pitmasterTarget: '203°F (shoulder/butt) / 195 to 203°F (ribs)', why: 'USDA minimum is safe. But collagen in shoulder and ribs does not fully break down until 195°F+. Pull at minimum and you get chewy, not tender.' },
  { protein: 'Poultry', usdaMin: '165°F', pitmasterTarget: '175°F (dark meat) / 165°F (breast)', why: 'Breast dries out above 165°F. Dark meat (thighs, drumsticks) is better at 175°F. The extra temp renders the fat properly.' },
  { protein: 'Beef (whole muscle)', usdaMin: '145°F', pitmasterTarget: '203°F (brisket/chuck) / 130 to 145°F (tri-tip/steak)', why: 'Steaks and tri-tip are served medium-rare (130°F). Brisket and chuck need 203°F for collagen breakdown. No shortcut.' },
  { protein: 'Fish', usdaMin: '145°F', pitmasterTarget: '145°F', why: 'USDA minimum and pitmaster target are the same. Fish is delicate. Do not go past 145°F or it dries out fast.' },
];

const RECIPES = [
  {
    name: 'Classic Smoked Brisket',
    weight: '12 to 14 lb packer',
    smokerTemp: '225 to 250°F',
    internalTarget: '203°F',
    time: '12 to 18 hr',
    wood: 'Oak or hickory',
    method: [
      'Season the night before with a 50/50 mix of coarse salt and black pepper. Add garlic powder if you like.',
      'Place fat-side up at 225°F. Do not open the smoker for the first 4 hours.',
      'Expect a stall at 150 to 165°F that can last 2 to 4 hours. This is normal. Wrap in butcher paper when the bark is set and dark.',
      'Continue at 250°F until 203°F internal. Probe test: the probe should go in with zero resistance, like butter. Rest 1 to 2 hours before slicing.',
    ],
  },
  {
    name: 'Competition-Style Pork Ribs',
    weight: '2 to 3 lb rack (spare or baby back)',
    smokerTemp: '225°F',
    internalTarget: '195 to 203°F',
    time: '5 to 6 hr (baby back) / 6 to 7 hr (spare)',
    wood: 'Apple-cherry blend',
    method: [
      'Remove the membrane from the bone side. Season with a sweet rub. Brown sugar, paprika, salt, pepper, garlic.',
      'Spare ribs: 3-2-1 method. Baby backs: 2-2-1. The numbers are hours: unwrapped, wrapped in foil, unwrapped.',
      'In the wrap: brown sugar, butter, a splash of apple juice or cider vinegar.',
      'Sauce in the last 30 min. Done when you see a slight crack on the bend test and meat pulls back from the bone ends.',
    ],
  },
  {
    name: 'Smoked Pulled Pork',
    weight: '8 to 10 lb Boston butt',
    smokerTemp: '225 to 250°F',
    internalTarget: '203°F',
    time: '12 to 16 hr',
    wood: 'Apple or hickory',
    method: [
      'Apply rub and refrigerate overnight uncovered. This forms the bark during the cook.',
      'Smoke bone-side down at 225°F. It will stall at 150 to 165°F just like brisket. Wrap in foil at 160°F to push through.',
      'Continue at 250°F after wrapping. Pull at 203°F when probe-tender. Bone should slide out cleanly.',
      'Rest 1 hour minimum. Pull by hand. Toss in a little of the liquid from the foil wrap before serving.',
    ],
  },
  {
    name: 'Smoked Whole Chicken',
    weight: '3.5 to 4.5 lb bird',
    smokerTemp: '300°F',
    internalTarget: '165°F (breast)',
    time: '2.5 to 3.5 hr',
    wood: 'Apple or pecan',
    method: [
      'Spatchcock the bird. Remove the backbone with kitchen shears, press flat. This cuts cook time and gives better skin.',
      'Dry brine 4 to 24 hours before cooking. Salt only, uncovered in the fridge. Do not rinse.',
      'Smoke at 300°F for the first 2 hours, then check internal temp in the thickest part of the breast. Crank to 400°F if skin needs crisping.',
      'Pull at 165°F breast temp. Thighs will be at 175°F+ at this point. Rest 10 min before cutting.',
    ],
  },
  {
    name: 'Smoked Chuck Roast',
    weight: '3 to 4 lb roast',
    smokerTemp: '250°F',
    internalTarget: '205°F',
    time: '8 to 10 hr',
    wood: 'Oak or hickory',
    method: [
      'Season chuck roast with beef rub. Let sit 30 min at room temp.',
      'Smoke at 250°F directly on the grate until it hits 160°F internal (about 4 to 5 hr).',
      'Transfer to a foil pan. Add half a cup beef broth, a pat of butter. Cover tightly with foil.',
      'Return to smoker until 205°F and probe-tender. Shred like pulled pork or slice thick against the grain.',
    ],
  },
];

const TEMP_TIPS = [
  { title: 'Buy a dual-probe thermometer', body: 'One probe in the meat, one clipped to the grate near the protein. Your smoker lid thermometer is often 25 to 50°F off. You need to know the actual cooking environment, not the factory guess.' },
  { title: 'Pull temp vs. resting temp', body: 'Meat continues to cook 5 to 10°F after you pull it from the smoker (carryover cooking). For fish and chicken, this matters a lot. Pull salmon at 140°F and it will carry to 145°F while resting.' },
  { title: 'Collagen cuts need time, not just temp', body: 'Brisket and shoulder can be at 203°F but still feel tight on the probe. If there is resistance, give it more time. The probe test overrides the thermometer reading every time.' },
];

export default function SmokedMeatRecipesPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24" style={{ backgroundColor: 'oklch(0.10 0.020 50)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="font-display uppercase font-semibold mb-8 flex items-center gap-3" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'oklch(0.62 0.16 55)' }} aria-hidden="true" />
              USDA + PITMASTER TARGETS
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-6" style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}>
              Smoked meat by internal temp.
            </h1>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'oklch(0.82 0.018 50)' }}>
              The biggest mistake most people make with smoked meat: they rely on time instead of internal temperature. Time is a rough estimate. Internal temp is the real target. Here is everything you need to get it right.
            </p>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-20" style={{ backgroundColor: 'oklch(0.13 0.025 50)' }}>
          <div className="max-w-6xl mx-auto">
            <span className="font-display uppercase mb-5 inline-block" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>USDA vs. pitmaster</span>
            <h2 className="font-display text-3xl sm:text-4xl mb-6" style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}>
              The two numbers, side by side.
            </h2>
            <p className="leading-relaxed mb-10 max-w-2xl" style={{ color: 'oklch(0.82 0.018 50)' }}>
              USDA minimums are food safety requirements. Pitmaster targets are higher for certain cuts because collagen does not break down until you push past the minimum.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" aria-label="Temperature targets by protein type">
                <thead>
                  <tr style={{ borderBottom: '1px solid oklch(0.28 0.025 50)' }}>
                    <th className="text-left py-3 px-4 font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.12em', fontSize: '0.7rem' }}>Protein</th>
                    <th className="text-left py-3 px-4 font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.12em', fontSize: '0.7rem' }}>USDA Minimum</th>
                    <th className="text-left py-3 px-4 font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.12em', fontSize: '0.7rem' }}>Pitmaster Target</th>
                    <th className="text-left py-3 px-4 font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.12em', fontSize: '0.7rem' }}>Why</th>
                  </tr>
                </thead>
                <tbody>
                  {TEMP_TABLE.map((row, i) => (
                    <tr key={row.protein} style={{ borderBottom: '1px solid oklch(0.28 0.025 50)', background: i % 2 === 0 ? 'transparent' : 'oklch(0.18 0.030 50)' }}>
                      <td className="py-4 px-4 font-medium" style={{ color: 'oklch(0.93 0.020 50)' }}>{row.protein}</td>
                      <td className="py-4 px-4 tabular-nums" style={{ color: 'oklch(0.82 0.018 50)' }}>{row.usdaMin}</td>
                      <td className="py-4 px-4 font-display tabular-nums" style={{ color: 'oklch(0.72 0.14 55)' }}>{row.pitmasterTarget}</td>
                      <td className="py-4 px-4 text-xs leading-relaxed" style={{ color: 'oklch(0.62 0.018 50)' }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-4" style={{ color: 'oklch(0.62 0.018 50)' }}>
              Source: USDA Food Safety and Inspection Service. Pitmaster targets reflect documented BBQ practice for collagen-rich cuts.
            </p>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-20" style={{ backgroundColor: 'oklch(0.18 0.030 50)' }}>
          <div className="max-w-5xl mx-auto">
            <span className="font-display uppercase mb-5 inline-block" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>Five recipes</span>
            <h2 className="font-display text-3xl sm:text-4xl mb-12" style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}>
              Weight. Temp. Time. Method.
            </h2>
            <div className="space-y-12">
              {RECIPES.map((recipe, idx) => (
                <article key={recipe.name} aria-label={recipe.name} style={{ background: 'oklch(0.13 0.025 50)', border: '1px solid oklch(0.28 0.025 50)', borderRadius: '0.25rem' }}>
                  <div className="px-6 py-5" style={{ borderBottom: '1px solid oklch(0.28 0.025 50)' }}>
                    <div className="font-display tabular-nums mb-2" style={{ color: 'oklch(0.62 0.16 55)', fontSize: '0.875rem' }}>{String(idx + 1).padStart(2, '0')}</div>
                    <h3 className="font-display text-2xl mb-3" style={{ color: 'oklch(0.93 0.020 50)' }}>{recipe.name}</h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <span><span className="font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.1em', fontSize: '0.7rem', marginRight: '0.5rem' }}>Weight</span><span style={{ color: 'oklch(0.93 0.020 50)' }}>{recipe.weight}</span></span>
                      <span><span className="font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.1em', fontSize: '0.7rem', marginRight: '0.5rem' }}>Smoker</span><span style={{ color: 'oklch(0.93 0.020 50)' }}>{recipe.smokerTemp}</span></span>
                      <span><span className="font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.1em', fontSize: '0.7rem', marginRight: '0.5rem' }}>Pull at</span><span className="font-display tabular-nums" style={{ color: 'oklch(0.72 0.14 55)' }}>{recipe.internalTarget}</span></span>
                      <span><span className="font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.1em', fontSize: '0.7rem', marginRight: '0.5rem' }}>Time</span><span style={{ color: 'oklch(0.93 0.020 50)' }}>{recipe.time}</span></span>
                      <span><span className="font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.1em', fontSize: '0.7rem', marginRight: '0.5rem' }}>Wood</span><span style={{ color: 'oklch(0.93 0.020 50)' }}>{recipe.wood}</span></span>
                    </div>
                  </div>
                  <ol className="px-6 py-5 space-y-4">
                    {recipe.method.map((step, i) => (
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

        <section className="px-4 sm:px-6 lg:px-8 py-20" style={{ backgroundColor: 'oklch(0.13 0.025 50)' }}>
          <div className="max-w-5xl mx-auto">
            <span className="font-display uppercase mb-5 inline-block" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>Thermometer</span>
            <h2 className="font-display text-3xl sm:text-4xl mb-12" style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}>
              Getting temperature right.
            </h2>
            <ul>
              {TEMP_TIPS.map(({ title, body }, idx) => (
                <li key={title} className="grid grid-cols-12 gap-4 sm:gap-8 py-8" style={{ borderTop: '1px solid oklch(0.28 0.025 50)', borderBottom: idx === TEMP_TIPS.length - 1 ? '1px solid oklch(0.28 0.025 50)' : 'none' }}>
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
              <Link href="/smoker-recipes" className="text-sm" style={{ color: 'oklch(0.93 0.020 50)' }}>All smoker recipes</Link>
              <Link href="/traeger-recipes" className="text-sm" style={{ color: 'oklch(0.93 0.020 50)' }}>Traeger recipes</Link>
              <Link href="/pellet-smoker-recipes" className="text-sm" style={{ color: 'oklch(0.93 0.020 50)' }}>Pellet smoker recipes</Link>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24" style={{ backgroundColor: 'oklch(0.10 0.020 50)', borderTop: '1px solid oklch(0.28 0.025 50)' }}>
          <div className="max-w-3xl mx-auto">
            <span className="font-display uppercase mb-5 inline-block" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>The log</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-6" style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}>
              Record the temps that worked.
            </h2>
            <p className="leading-relaxed mb-10 max-w-2xl" style={{ color: 'oklch(0.82 0.018 50)' }}>
              PitLog logs the actual internal temp you pulled at, the smoker temp throughout the cook, and your rating. Next time you do that brisket, you will know exactly what produced the result.
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
