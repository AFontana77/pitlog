import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "PitLog Library — BBQ Cuts, Cook Times & Temperature Guide",
  description: "Browse 129+ BBQ cuts with target temps, cook time estimates, stall info, and wood pairing guidance. Full search and cook logging available in the free PitLog app.",
};

const PROTEIN_CATEGORIES = [
  {
    name: "Beef",
    count: 38,
    highlights: ["Brisket (flat + point)", "Chuck roast", "Short ribs", "Back ribs", "Tri-tip", "Beef cheeks"],
    notes: "Brisket and chuck dominate. Collagen breakdown at 195 to 205°F is non-negotiable. Probe tender, not just temp.",
  },
  {
    name: "Pork",
    count: 35,
    highlights: ["Pork butt and shoulder", "Baby back ribs", "Spare and St. Louis ribs", "Belly and bacon", "Tenderloin", "Country ribs"],
    notes: "Butt and shoulder are the most forgiving cuts. Ribs follow the 3-2-1 or 2-2-1 method depending on thickness and personal preference.",
  },
  {
    name: "Poultry",
    count: 22,
    highlights: ["Whole chicken", "Spatchcock chicken", "Thighs", "Drumsticks", "Whole turkey", "Turkey breast"],
    notes: "Dark meat target: 175°F internal. Whole birds benefit from higher pit temps (300 to 325°F) to crisp skin before the stall.",
  },
  {
    name: "Lamb",
    count: 12,
    highlights: ["Leg of lamb", "Lamb shoulder", "Rack of lamb", "Lamb ribs", "Shanks"],
    notes: "Leg and shoulder follow the same collagen logic as beef. Low and slow to 195°F+ for fall-apart texture. Rack is shorter and higher temp.",
  },
  {
    name: "Seafood",
    count: 10,
    highlights: ["Salmon fillet", "Whole fish", "Shrimp", "Lobster tails", "Swordfish steaks"],
    notes: "Short cook times, higher temps. Salmon at 225°F takes 45 to 60 minutes. Seafood does not stall. Pull it early and let carryover finish.",
  },
  {
    name: "Vegetables",
    count: 12,
    highlights: ["Corn on the cob", "Whole onions", "Bell peppers", "Portobello mushrooms", "Cauliflower", "Smoked jalapeños"],
    notes: "Great for offset placement or after the main protein pull. Most vegetables smoke at 225 to 250°F for 45 to 90 minutes. No stall, no probe test. Watch texture and color.",
  },
];

const WOOD_PAIRINGS = [
  { wood: "Hickory", flavor: "Bold, bacon-like, strong smoke", best: "Pork shoulder, brisket, ribs", avoid: "Poultry, fish (can overpower)" },
  { wood: "Oak", flavor: "Medium, earthy, clean", best: "Brisket, beef ribs, lamb", avoid: "Nothing. The most versatile wood in BBQ." },
  { wood: "Apple", flavor: "Mild, sweet, fruity", best: "Pork, chicken, turkey", avoid: "Heavy beef cuts (too subtle)" },
  { wood: "Cherry", flavor: "Mild, slightly sweet, dark color", best: "Poultry, pork, duck", avoid: "Fish (cherry can taste metallic at high temp)" },
  { wood: "Pecan", flavor: "Mild, nutty, rich", best: "Brisket, pork ribs, poultry", avoid: "Nothing major. A softer hickory alternative." },
  { wood: "Mesquite", flavor: "Very bold, earthy, almost bitter", best: "Beef, Texas-style brisket", avoid: "Long cooks. Mesquite gets harsh over hours. Better for hot and fast." },
];

const STALL_INFO = [
  {
    title: "What the stall is",
    body: "The stall happens when a large piece of meat, usually brisket or pork shoulder, hits 150 to 170°F and stops climbing for 2 to 6 hours. This is evaporative cooling: moisture leaving the surface of the meat cools it at exactly the rate the smoker heats it.",
  },
  {
    title: "What to do about it",
    body: "Wait it out, or wrap. The Texas Crutch (wrapping in butcher paper or foil) cuts through the stall by trapping moisture and eliminating evaporation. Butcher paper breathes more and preserves bark better. Foil is faster but softens bark.",
  },
  {
    title: "Probe testing vs. temperature",
    body: "Temperature is a guide, not a finish line. Brisket is done when a probe slides in with zero resistance, like warm butter. This usually happens between 195°F and 205°F, but the feel matters more than the number.",
  },
  {
    title: "The rest period",
    body: "After pulling, wrap tightly and rest in a cooler or warming oven at 150 to 160°F for at least 1 hour, ideally 2. Resting lets the internal temp equalize and the juices redistribute. Skipping the rest is where most backyard briskets fall apart.",
  },
];

export default function LibraryPage() {
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
              <span
                style={{ display: 'inline-block', width: '24px', height: '1px', background: 'oklch(0.62 0.16 55)' }}
                aria-hidden="true"
              />
              REFERENCE LIBRARY
            </div>
            <h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl mb-6"
              style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}
            >
              129+ cuts. Times, temps, woods, stalls.
            </h1>
            <p
              className="text-lg leading-relaxed max-w-2xl"
              style={{ color: 'oklch(0.82 0.018 50)' }}
            >
              Organized by protein. Each entry includes target internal temperatures, estimated cook times, stall guidance, and wood pairing recommendations. Built from USDA food safety guidelines and documented pitmaster practice. Full-text search and cook logging available in the free PitLog app.
            </p>
          </div>
        </section>

        {/* Protein Categories */}
        <section
          className="px-4 sm:px-6 lg:px-8 py-20"
          style={{ backgroundColor: 'oklch(0.13 0.025 50)' }}
        >
          <div className="max-w-5xl mx-auto">
            <span
              className="font-display uppercase mb-5 inline-block"
              style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}
            >
              By protein
            </span>
            <h2
              className="font-display text-3xl sm:text-4xl mb-12"
              style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}
            >
              Cuts by protein type.
            </h2>
            <ul>
              {PROTEIN_CATEGORIES.map((cat, idx) => (
                <li
                  key={cat.name}
                  className="grid grid-cols-12 gap-4 sm:gap-8 py-8"
                  style={{
                    borderTop: '1px solid oklch(0.28 0.025 50)',
                    borderBottom: idx === PROTEIN_CATEGORIES.length - 1 ? '1px solid oklch(0.28 0.025 50)' : 'none',
                  }}
                >
                  <div
                    className="col-span-2 sm:col-span-1 font-display tabular-nums text-2xl sm:text-3xl leading-none"
                    style={{ color: 'oklch(0.62 0.16 55)' }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="col-span-10 sm:col-span-3">
                    <h3
                      className="font-display text-xl sm:text-2xl leading-tight mb-2"
                      style={{ color: 'oklch(0.93 0.020 50)' }}
                    >
                      {cat.name}
                    </h3>
                    <span
                      className="font-display tabular-nums text-sm"
                      style={{ color: 'oklch(0.72 0.14 55)' }}
                    >
                      {cat.count} cuts
                    </span>
                  </div>
                  <div className="col-span-12 sm:col-span-8">
                    <ul className="text-sm mb-3 space-y-1" style={{ color: 'oklch(0.82 0.018 50)' }}>
                      {cat.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2">
                          <span style={{ color: 'oklch(0.62 0.16 55)' }}>·</span> {h}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm leading-relaxed" style={{ color: 'oklch(0.62 0.018 50)' }}>
                      {cat.notes}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Wood Pairing Guide */}
        <section
          className="px-4 sm:px-6 lg:px-8 py-20"
          style={{ backgroundColor: 'oklch(0.18 0.030 50)' }}
        >
          <div className="max-w-5xl mx-auto">
            <span
              className="font-display uppercase mb-5 inline-block"
              style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}
            >
              Wood pairings
            </span>
            <h2
              className="font-display text-3xl sm:text-4xl mb-6"
              style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}
            >
              Wood changes everything.
            </h2>
            <p
              className="leading-relaxed mb-10 max-w-2xl"
              style={{ color: 'oklch(0.82 0.018 50)' }}
            >
              Same brisket tastes different over hickory vs. oak vs. cherry. These are the six most common smoking woods and what they do.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid oklch(0.28 0.025 50)' }}>
                    <th className="text-left py-3 pr-4 font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.12em', fontSize: '0.7rem' }}>Wood</th>
                    <th className="text-left py-3 pr-4 font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.12em', fontSize: '0.7rem' }}>Flavor</th>
                    <th className="text-left py-3 pr-4 font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.12em', fontSize: '0.7rem' }}>Best for</th>
                    <th className="text-left py-3 font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.12em', fontSize: '0.7rem' }}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {WOOD_PAIRINGS.map(({ wood, flavor, best, avoid }) => (
                    <tr key={wood} style={{ borderBottom: '1px solid oklch(0.28 0.025 50)' }}>
                      <td className="py-4 pr-4 font-display tabular-nums" style={{ color: 'oklch(0.72 0.14 55)' }}>{wood}</td>
                      <td className="py-4 pr-4" style={{ color: 'oklch(0.93 0.020 50)' }}>{flavor}</td>
                      <td className="py-4 pr-4 text-xs" style={{ color: 'oklch(0.82 0.018 50)' }}>{best}</td>
                      <td className="py-4 text-xs" style={{ color: 'oklch(0.62 0.018 50)' }}>{avoid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Stall Explanation */}
        <section
          className="px-4 sm:px-6 lg:px-8 py-20"
          style={{ backgroundColor: 'oklch(0.13 0.025 50)' }}
        >
          <div className="max-w-5xl mx-auto">
            <span
              className="font-display uppercase mb-5 inline-block"
              style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}
            >
              The stall
            </span>
            <h2
              className="font-display text-3xl sm:text-4xl mb-6"
              style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}
            >
              The stall, and what to do about it.
            </h2>
            <p
              className="leading-relaxed mb-12 max-w-2xl"
              style={{ color: 'oklch(0.82 0.018 50)' }}
            >
              The stall is the most common source of confusion and panic for backyard pitmasters. Understanding it eliminates most failed cooks.
            </p>
            <ul>
              {STALL_INFO.map(({ title, body }, idx) => (
                <li
                  key={title}
                  className="grid grid-cols-12 gap-4 sm:gap-8 py-8"
                  style={{
                    borderTop: '1px solid oklch(0.28 0.025 50)',
                    borderBottom: idx === STALL_INFO.length - 1 ? '1px solid oklch(0.28 0.025 50)' : 'none',
                  }}
                >
                  <div
                    className="col-span-2 sm:col-span-1 font-display tabular-nums text-2xl sm:text-3xl leading-none"
                    style={{ color: 'oklch(0.62 0.16 55)' }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="col-span-10 sm:col-span-4">
                    <h3
                      className="font-display text-xl sm:text-2xl leading-tight"
                      style={{ color: 'oklch(0.93 0.020 50)' }}
                    >
                      {title}
                    </h3>
                  </div>
                  <div className="col-span-12 sm:col-span-7">
                    <p className="leading-relaxed" style={{ color: 'oklch(0.82 0.018 50)' }}>
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* App CTA */}
        <section
          className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24"
          style={{
            backgroundColor: 'oklch(0.10 0.020 50)',
            borderTop: '1px solid oklch(0.28 0.025 50)',
          }}
        >
          <div className="max-w-3xl mx-auto">
            <span
              className="font-display uppercase mb-5 inline-block"
              style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}
            >
              The app
            </span>
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-5xl mb-6"
              style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}
            >
              Log the cook. Build your record.
            </h2>
            <p
              className="leading-relaxed mb-10 max-w-2xl"
              style={{ color: 'oklch(0.82 0.018 50)' }}
            >
              PitLog has all 129+ cuts with full cook parameters, plus a cook log to record every session. Smoker type, wood used, target temp reached, total time, and your rating. Free to download. $6.99 one-time to unlock the log.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
                App Store
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                Google Play
              </a>
            </div>
            <Link
              href="/free-download"
              className="text-sm"
              style={{ color: 'oklch(0.72 0.14 55)' }}
            >
              Or download the free printable temperature and time reference sheet
            </Link>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
