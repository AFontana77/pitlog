import Link from 'next/link';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "PitLog — BBQ Reference + Cook Log App",
  description: "PitLog has 129+ BBQ cuts with target temps, stall temps, wood pairings, and cook time estimates. Log every cook, rate the result, and build a record of everything you've pulled off the smoker. Free on iPhone and Android.",
};

const REFERENCE_ROWS = [
  { cut: 'Brisket', time: '12-18h', temp: '225°F', target: '203°F internal' },
  { cut: 'Pork shoulder', time: '10-14h', temp: '225°F', target: '203°F internal' },
  { cut: 'Spare ribs', time: '5-6h', temp: '225°F', target: 'Tender, bend test' },
  { cut: 'Chicken', time: '3-4h', temp: '250°F', target: '165°F internal' },
  { cut: 'Turkey', time: '4-5h', temp: '275°F', target: '165°F internal' },
];

const STATS = [
  { number: '129', label: 'Cuts of meat' },
  { number: 'USDA', label: 'Verified times' },
  { number: '$0', label: 'To start' },
];

const FEATURES = [
  {
    num: '01',
    title: 'Cut database',
    body: "Brisket, pork shoulder, ribs, chicken, turkey, and 124 more. USDA times. Target internal temps. Stall temp ranges. Wood pairings. Built into the app, no signal needed.",
  },
  {
    num: '02',
    title: 'Cook log',
    body: 'Cut, weight, smoker temp, wood, time, internal temp. Add a photo. Note what worked, what to change. Rate the result one through five.',
  },
  {
    num: '03',
    title: 'Stall tracker',
    body: "Watch the stall in real time. Know when to wrap. Predict when it will hit 203. Stop second-guessing the foil call.",
  },
  {
    num: '04',
    title: 'Personal records',
    body: 'Best brisket time. Best ribs flavor. Best pork shoulder bark. Your wins, logged. Find them again by cut, by rating, by date.',
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PitLog",
            "applicationCategory": "LifestyleApplication",
            "operatingSystem": "iOS, Android",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "description": "BBQ cook times and temperatures for 129+ cuts. Log your cooks, track results by cut, and build a personal BBQ reference book.",
            "url": "https://www.pitlog.app"
          })
        }}
      />
      <SiteNav />
      <main id="main-content" className="pt-20">

        {/* Section 1: Hero */}
        <section
          className="px-4 sm:px-6 lg:px-8 py-20 lg:py-28"
          style={{ backgroundColor: 'oklch(0.10 0.020 50)' }}
        >
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left column */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span
                  className="block h-px w-10"
                  style={{ backgroundColor: 'oklch(0.62 0.16 55)' }}
                  aria-hidden="true"
                />
                <span
                  className="font-display uppercase text-xs tracking-[0.18em]"
                  style={{ color: 'oklch(0.62 0.16 55)' }}
                >
                  PitLog · USDA cook times · Free reference
                </span>
              </div>
              <h1
                className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.02] mb-8"
                style={{ color: 'oklch(0.93 0.020 50)' }}
              >
                Smoke meat by the numbers.
              </h1>
              <p
                className="text-lg leading-relaxed mb-10 max-w-lg"
                style={{ color: 'oklch(0.82 0.018 50)' }}
              >
                PitLog gives you 129 cuts with target temps, stall ranges, and cook times built into the app. Log every cook. Rate the result. Build a record of every brisket, butt, and rack you have ever pulled off the smoker.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/library" className="btn-primary press-feedback">
                  Browse the library
                </Link>
                <Link href="/free-download" className="btn-ghost">
                  Free temp card
                </Link>
              </div>
              <p
                className="mt-6 text-sm"
                style={{ color: 'oklch(0.62 0.018 50)' }}
              >
                Free app. No signup. Works offline at the pit.
              </p>
            </div>

            {/* Right column: reference card */}
            <div
              className="border p-6 sm:p-8"
              style={{
                backgroundColor: 'oklch(0.18 0.030 50)',
                borderColor: 'oklch(0.28 0.025 50)',
                borderRadius: '0.25rem',
              }}
            >
              <div
                className="flex items-baseline justify-between pb-4 mb-4 border-b"
                style={{ borderColor: 'oklch(0.28 0.025 50)' }}
              >
                <span
                  className="font-display uppercase text-xs tracking-[0.18em]"
                  style={{ color: 'oklch(0.62 0.16 55)' }}
                >
                  Cut · Time · Temp
                </span>
                <span
                  className="text-xs uppercase tracking-wider"
                  style={{ color: 'oklch(0.62 0.018 50)' }}
                >
                  Sample
                </span>
              </div>
              <ul className="divide-y" style={{ borderColor: 'oklch(0.28 0.025 50)' }}>
                {REFERENCE_ROWS.map((row, idx) => (
                  <li
                    key={row.cut}
                    className="grid grid-cols-12 gap-3 py-4"
                    style={{
                      borderTop: idx === 0 ? 'none' : '1px solid oklch(0.28 0.025 50)',
                    }}
                  >
                    <div
                      className="col-span-5 text-sm font-medium"
                      style={{ color: 'oklch(0.93 0.020 50)' }}
                    >
                      {row.cut}
                    </div>
                    <div
                      className="col-span-3 font-display tabular-nums text-sm"
                      style={{ color: 'oklch(0.72 0.14 55)' }}
                    >
                      {row.time}
                    </div>
                    <div
                      className="col-span-4 text-sm tabular-nums text-right"
                      style={{ color: 'oklch(0.82 0.018 50)' }}
                    >
                      {row.temp} → {row.target.split(' ')[0]}
                    </div>
                  </li>
                ))}
              </ul>
              <p
                className="mt-5 text-xs leading-relaxed"
                style={{ color: 'oklch(0.62 0.018 50)' }}
              >
                Five of 129 cuts. Full database in the app, every entry with stall range and wood pairing.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Stat strip */}
        <section
          className="px-4 sm:px-6 lg:px-8 py-14"
          style={{
            backgroundColor: 'oklch(0.10 0.020 50)',
            borderTop: '1px solid oklch(0.28 0.025 50)',
            borderBottom: '1px solid oklch(0.28 0.025 50)',
          }}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6 sm:gap-12">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-left">
                <div
                  className="font-display tabular-nums text-4xl sm:text-5xl lg:text-6xl mb-2 leading-none"
                  style={{ color: 'oklch(0.72 0.14 55)' }}
                >
                  {stat.number}
                </div>
                <div
                  className="font-display uppercase text-xs sm:text-sm tracking-[0.16em]"
                  style={{ color: 'oklch(0.93 0.020 50)' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Editorial value */}
        <section
          className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24"
          style={{ backgroundColor: 'oklch(0.18 0.030 50)' }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl mb-16">
              <span
                className="font-display uppercase text-xs tracking-[0.18em] mb-5 inline-block"
                style={{ color: 'oklch(0.62 0.16 55)' }}
              >
                What's inside
              </span>
              <h2
                className="font-display text-4xl sm:text-5xl leading-[1.05] mb-6"
                style={{ color: 'oklch(0.93 0.020 50)' }}
              >
                Most cook-time apps don't tell you what 203 means.
              </h2>
              <p
                className="text-lg leading-relaxed"
                style={{ color: 'oklch(0.82 0.018 50)' }}
              >
                PitLog gives you the reference data first, then the log. Numbers you can trust before the firebox is loaded, a place to record what worked after the brisket rests. Built for people who already know what a stall is.
              </p>
            </div>

            <ul>
              {FEATURES.map((f, idx) => (
                <li
                  key={f.num}
                  className="grid grid-cols-12 gap-4 sm:gap-8 py-8"
                  style={{
                    borderTop: '1px solid oklch(0.28 0.025 50)',
                    borderBottom: idx === FEATURES.length - 1 ? '1px solid oklch(0.28 0.025 50)' : 'none',
                  }}
                >
                  <div
                    className="col-span-2 sm:col-span-1 font-display tabular-nums text-2xl sm:text-3xl leading-none"
                    style={{ color: 'oklch(0.62 0.16 55)' }}
                  >
                    {f.num}
                  </div>
                  <div className="col-span-10 sm:col-span-3">
                    <h3
                      className="font-display text-xl sm:text-2xl leading-tight"
                      style={{ color: 'oklch(0.93 0.020 50)' }}
                    >
                      {f.title}
                    </h3>
                  </div>
                  <div className="col-span-12 sm:col-span-8">
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: 'oklch(0.82 0.018 50)' }}
                    >
                      {f.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 4: CTA panel */}
        <section
          className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24"
          style={{
            backgroundColor: 'oklch(0.10 0.020 50)',
            borderTop: '1px solid oklch(0.28 0.025 50)',
          }}
        >
          <div className="max-w-3xl mx-auto">
            <span
              className="font-display uppercase text-xs tracking-[0.18em] mb-5 inline-block"
              style={{ color: 'oklch(0.62 0.16 55)' }}
            >
              Free to start
            </span>
            <h2
              className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6"
              style={{ color: 'oklch(0.93 0.020 50)' }}
            >
              Get the cuts sheet first.
            </h2>
            <p
              className="text-lg leading-relaxed mb-10 max-w-2xl"
              style={{ color: 'oklch(0.82 0.018 50)' }}
            >
              Twenty most common cuts. Target temps, cook times, wood pairings. One page, printable, fits on the fridge or in the smoker shed. Get it free, then grab the app when you are ready to start logging.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/free-download" className="btn-primary press-feedback">
                Get the free card
              </Link>
              <Link href="/library" className="btn-ghost">
                Browse the library
              </Link>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
