import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getPitmasterTarget, getSafetyMinimum } from '@/content';

export const metadata: Metadata = {
  title: 'Smoking Times and Temperatures Chart | PitLog',
  description:
    'Smoking times and internal temperatures for beef, pork, poultry, and fish. Reference every cut with smoker temp and internal target.',
};

/**
 * Rows are derived from the content spine (content/temperatures). The
 * "internal" column shows the tenderness window for collagen cuts and the
 * USDA minimum for lean cuts; both are labelled so the two never blur.
 * Full detail, sources and the doneness scales live on /temperatures.
 */
const tgt = (id: string) => getPitmasterTarget(id)!;
const safe = (id: string) => getSafetyMinimum(id)!;
const win = (id: string) => `${tgt(id).window_f!.min} to ${tgt(id).window_f!.max}°F, ${tgt(id).finish_test!.replace(/_/g, ' ')}`;
const pit = (id: string) => `${tgt(id).pit_temp_f!.min} to ${tgt(id).pit_temp_f!.max}°F`;

const CUTS = [
  { cut: 'Brisket (full packer)', smokerTemp: pit('target-brisket'), internalTarget: win('target-brisket'), approxTime: '1 to 1.5 hr/lb', notes: `USDA minimum ${safe('safety-whole-muscle-red-meat').temp_f}°F + 3 min rest is passed hours earlier. ${tgt('target-brisket').stall}` },
  { cut: 'Pork Shoulder / Boston Butt', smokerTemp: pit('target-pork-shoulder'), internalTarget: win('target-pork-shoulder'), approxTime: '1 hr 15 min/lb (Pork Board)', notes: 'Pork Board says 185 to 190°F with the bone-slip test; backyard convention runs to 205°F. Rest 1 hr above 140°F.' },
  { cut: 'Spare Ribs / St. Louis / Baby Back', smokerTemp: pit('target-pork-ribs'), internalTarget: win('target-pork-ribs'), approxTime: '3 to 5 hr baby backs, 5 to 7 hr spares (Pork Board)', notes: 'The thermometer is unreliable on ribs. Bend test and fork tender decide.' },
  { cut: 'Pork Belly / Burnt Ends', smokerTemp: pit('target-pork-belly'), internalTarget: win('target-pork-belly'), approxTime: 'About 7 hr (Pork Board)', notes: 'Cube around 165°F for burnt ends, sauce, back on uncovered until glazed and tender.' },
  { cut: 'Chuck Roast / Beef Short Ribs', smokerTemp: pit('target-beef-chuck-and-short-ribs'), internalTarget: win('target-beef-chuck-and-short-ribs'), approxTime: '1.5 hr/lb chuck; 6 to 8 hr short ribs', notes: 'Brisket logic. Wrap when the bark is set. Pull on feel.' },
  { cut: 'Lamb or Goat Shoulder (pulled)', smokerTemp: pit('target-lamb-goat-shoulder'), internalTarget: win('target-lamb-goat-shoulder'), approxTime: '1.5 hr/lb', notes: 'Goat is lean (FSIS). Wrap early. A sliced roast follows the Lamb Board scale instead.' },
  { cut: 'Whole Chicken', smokerTemp: '275 to 325°F', internalTarget: `${safe('safety-poultry').temp_f}°F USDA minimum, thigh, wing and breast`, approxTime: '60 to 75 min indirect (FSIS)', notes: 'No rest required by USDA. Higher pit temp for skin. Pink at the bone can persist at 165°F.' },
  { cut: 'Chicken Thighs', smokerTemp: pit('target-chicken-pulled'), internalTarget: `${safe('safety-poultry').temp_f}°F minimum; 175 to 185°F preferred texture`, approxTime: '1.5 to 2 hr', notes: 'Dark meat renders above the minimum. That is preference, not safety.' },
  { cut: 'Chicken Wings', smokerTemp: '275°F then 400°F', internalTarget: `${safe('safety-poultry').temp_f}°F minimum`, approxTime: '1.5 to 2 hr total', notes: 'Smoke about 1 hr, then finish hot to crisp the skin. Sauce in the last 15 to 30 min (FSIS).' },
  { cut: 'Pork Loin / Chops', smokerTemp: '225 to 250°F', internalTarget: `${safe('safety-whole-muscle-red-meat').temp_f}°F + 3 min rest (USDA)`, approxTime: 'About 1.5 hr loin (Pork Board)', notes: 'Lean. Pork Board: pull a loin at 140°F and rest 10 min to reach 145°F. The 145°F reading is the rule.' },
  { cut: 'Salmon Fillet', smokerTemp: '225°F', internalTarget: `${safe('safety-fish').temp_f}°F (USDA and FDA), or opaque and flakes`, approxTime: '45 to 60 min', notes: 'Fish does not stall. Anything under 145°F is a preference below the federal minimum.' },
];

const STALL_NOTES = [
  { title: 'What the stall is', body: 'Brisket and pork shoulder both hit a plateau at 150 to 170°F where the temp stops climbing. This can last 2 to 6 hours. It is normal. Evaporative cooling from the meat surface equals the heat coming from the smoker.' },
  { title: 'How to get through it', body: 'Wait it out, or wrap. The Texas Crutch (butcher paper or foil) stops evaporation and breaks the stall. Butcher paper breathes and protects bark better. Foil is faster but softens the crust.' },
  { title: 'Probe tender vs. temperature', body: 'Temperature is a guide. The real test is feel. A probe (or toothpick, or cake tester) should slide into the thickest part of the meat with zero resistance. Like going into room-temperature butter. That is done.' },
  { title: 'The rest', body: 'After pulling, wrap tight and rest in a cooler for at least 1 hour. 2 hours for brisket. The rest lets internal temp equalize and juices redistribute. It is not optional.' },
];

export default function SmokingTimesPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

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
              REFERENCE CHART
            </div>
            <h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl mb-6"
              style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}
            >
              Smoking times and temperatures.
            </h1>
            <p
              className="text-lg leading-relaxed max-w-2xl"
              style={{ color: 'oklch(0.82 0.018 50)' }}
            >
              Every cut you are likely to smoke. Smoker temperature, internal target, estimated time, and pitmaster notes. All temperatures based on USDA food safety guidelines and documented pitmaster practice.
            </p>
          </div>
        </section>

        {/* Reference Table */}
        <section
          className="px-4 sm:px-6 lg:px-8 py-20"
          style={{ backgroundColor: 'oklch(0.13 0.025 50)' }}
        >
          <div className="max-w-6xl mx-auto">
            <span
              className="font-display uppercase mb-5 inline-block"
              style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}
            >
              Full chart
            </span>
            <h2
              className="font-display text-3xl sm:text-4xl mb-6"
              style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}
            >
              Cut. Time. Temp.
            </h2>
            <p
              className="leading-relaxed mb-10 max-w-2xl"
              style={{ color: 'oklch(0.82 0.018 50)' }}
            >
              Times are estimates. Internal temperature and probe feel are what matter at the end.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" aria-label="BBQ smoking times and temperatures by cut">
                <thead>
                  <tr style={{ borderBottom: '1px solid oklch(0.28 0.025 50)' }}>
                    <th className="text-left py-3 px-4 font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.12em', fontSize: '0.7rem' }}>Cut</th>
                    <th className="text-left py-3 px-4 font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.12em', fontSize: '0.7rem' }}>Smoker</th>
                    <th className="text-left py-3 px-4 font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.12em', fontSize: '0.7rem' }}>Internal</th>
                    <th className="text-left py-3 px-4 font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.12em', fontSize: '0.7rem' }}>Time</th>
                    <th className="text-left py-3 px-4 font-display uppercase" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.12em', fontSize: '0.7rem' }}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {CUTS.map((row, i) => (
                    <tr
                      key={row.cut}
                      style={{
                        borderBottom: '1px solid oklch(0.28 0.025 50)',
                        background: i % 2 === 0 ? 'transparent' : 'oklch(0.18 0.030 50)',
                      }}
                    >
                      <td className="py-4 px-4 font-medium whitespace-nowrap" style={{ color: 'oklch(0.93 0.020 50)' }}>{row.cut}</td>
                      <td className="py-4 px-4 tabular-nums whitespace-nowrap" style={{ color: 'oklch(0.82 0.018 50)' }}>{row.smokerTemp}</td>
                      <td className="py-4 px-4 font-display tabular-nums whitespace-nowrap" style={{ color: 'oklch(0.72 0.14 55)' }}>{row.internalTarget}</td>
                      <td className="py-4 px-4 tabular-nums whitespace-nowrap" style={{ color: 'oklch(0.82 0.018 50)' }}>{row.approxTime}</td>
                      <td className="py-4 px-4 text-xs leading-relaxed" style={{ color: 'oklch(0.62 0.018 50)' }}>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-4" style={{ color: 'oklch(0.62 0.018 50)' }}>
              USDA FSIS safe minimums: beef, pork, lamb and goat steaks, chops and roasts 145°F plus a 3 minute rest; ground meat 160°F; all poultry 165°F, no rest required; fish 145°F. The higher figures for brisket, shoulder and ribs are tenderness targets, not safety numbers. Where the two differ, the USDA minimum governs. Times are planning estimates.{' '}
              <Link href="/temperatures" style={{ color: 'oklch(0.72 0.14 55)', textDecoration: 'underline' }}>
                Full chart with sources
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Stall + Probe Tender Explainer */}
        <section
          className="px-4 sm:px-6 lg:px-8 py-20"
          style={{ backgroundColor: 'oklch(0.18 0.030 50)' }}
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
              The stall and probe tender.
            </h2>
            <p
              className="leading-relaxed mb-12 max-w-2xl"
              style={{ color: 'oklch(0.82 0.018 50)' }}
            >
              These two concepts explain why most first-time brisket cooks either panic or pull too early.
            </p>
            <ul>
              {STALL_NOTES.map(({ title, body }, idx) => (
                <li
                  key={title}
                  className="grid grid-cols-12 gap-4 sm:gap-8 py-8"
                  style={{
                    borderTop: '1px solid oklch(0.28 0.025 50)',
                    borderBottom: idx === STALL_NOTES.length - 1 ? '1px solid oklch(0.28 0.025 50)' : 'none',
                  }}
                >
                  <div
                    className="col-span-2 sm:col-span-1 font-display tabular-nums text-2xl sm:text-3xl leading-none"
                    style={{ color: 'oklch(0.62 0.16 55)' }}
                  >
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

        {/* CTA */}
        <section
          className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24"
          style={{ backgroundColor: 'oklch(0.10 0.020 50)', borderTop: '1px solid oklch(0.28 0.025 50)' }}
        >
          <div className="max-w-3xl mx-auto">
            <span className="font-display uppercase mb-5 inline-block" style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}>
              The log
            </span>
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-5xl mb-6"
              style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}
            >
              Log your actual cook times.
            </h2>
            <p className="leading-relaxed mb-10 max-w-2xl" style={{ color: 'oklch(0.82 0.018 50)' }}>
              Charts are a starting point. Your smoker runs different. PitLog lets you record every cook. Actual smoker temp, wood used, start and pull times, internal temp reached. So you build a real record over time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/free-download" className="btn-primary press-feedback">
                Download PitLog free
              </Link>
              <Link href="/library" className="btn-ghost">
                Browse the library
              </Link>
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
