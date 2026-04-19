import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Thermometer, Flame, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smoking Times and Temperatures Chart | PitLog',
  description:
    'Smoking times and internal temperatures for beef, pork, poultry, and fish. Reference every cut — brisket, ribs, pork shoulder, chicken, salmon — with smoker temp and internal target.',
};

const CUTS = [
  {
    cut: 'Brisket (full packer)',
    smokerTemp: '225–250°F',
    internalTarget: '203°F',
    approxTime: '1–1.5 hr/lb',
    notes: 'Wrap in butcher paper at 160–165°F. Done when probe slides in like warm butter.',
  },
  {
    cut: 'Pork Shoulder / Boston Butt',
    smokerTemp: '225–250°F',
    internalTarget: '203°F',
    approxTime: '1.5 hr/lb',
    notes: 'Pull at 203°F, rest 1 hr minimum. Should shred with no effort.',
  },
  {
    cut: 'Baby Back Ribs',
    smokerTemp: '225°F',
    internalTarget: '195–203°F',
    approxTime: '5–6 hr',
    notes: 'Use the bend test — ribs should crack slightly when bent. 2-2-1 method works well.',
  },
  {
    cut: 'Spare Ribs / St. Louis',
    smokerTemp: '225°F',
    internalTarget: '195–203°F',
    approxTime: '6–7 hr',
    notes: 'Thicker than baby backs. 3-2-1 method (3 hr smoke, 2 hr wrapped, 1 hr unwrapped).',
  },
  {
    cut: 'Pork Belly / Burnt Ends',
    smokerTemp: '225°F',
    internalTarget: '195–200°F',
    approxTime: '5–6 hr',
    notes: 'Cube at 165°F, toss in sauce and butter, return to smoker uncovered for 1 hr.',
  },
  {
    cut: 'Chuck Roast',
    smokerTemp: '250°F',
    internalTarget: '205°F',
    approxTime: '1.5 hr/lb',
    notes: 'Often called "poor man\'s brisket." Wrap at 165°F. Probe tender when done.',
  },
  {
    cut: 'Lamb Shoulder',
    smokerTemp: '250°F',
    internalTarget: '195°F',
    approxTime: '1.5 hr/lb',
    notes: 'Same collagen logic as pork shoulder. Pull when probe meets no resistance.',
  },
  {
    cut: 'Whole Chicken',
    smokerTemp: '275–300°F',
    internalTarget: '165°F (breast)',
    approxTime: '3–4 hr',
    notes: 'Higher pit temp helps crisp the skin. Check thigh — it runs hotter than breast.',
  },
  {
    cut: 'Chicken Thighs',
    smokerTemp: '275°F',
    internalTarget: '175°F',
    approxTime: '2 hr',
    notes: 'Dark meat benefits from higher internal temp — 175°F renders fat and firms texture.',
  },
  {
    cut: 'Chicken Wings',
    smokerTemp: '275°F then 400°F',
    internalTarget: '165°F+',
    approxTime: '1.5–2 hr total',
    notes: 'Smoke at 275°F for 1 hr, then crank to 400°F for 15–20 min to crisp the skin.',
  },
  {
    cut: 'Turkey Breast',
    smokerTemp: '275°F',
    internalTarget: '165°F',
    approxTime: '4–5 hr',
    notes: 'Brine overnight if possible. Wrap at 155°F to preserve moisture.',
  },
  {
    cut: 'Salmon Fillet',
    smokerTemp: '180–200°F',
    internalTarget: '145°F',
    approxTime: '1–2 hr',
    notes: 'Low and slow. Glaze with honey or maple in the last 20 min. No stall on fish.',
  },
];

const STALL_NOTES = [
  {
    title: 'What the stall is',
    body: 'Brisket and pork shoulder both hit a plateau at 150–170°F where the temp stops climbing. This can last 2 to 6 hours. It is normal. Evaporative cooling from the meat surface equals the heat coming from the smoker.',
  },
  {
    title: 'How to get through it',
    body: 'Wait it out — or wrap. The Texas Crutch (butcher paper or foil) stops evaporation and breaks the stall. Butcher paper breathes and protects bark better. Foil is faster but softens the crust.',
  },
  {
    title: 'Probe tender vs. temperature',
    body: 'Temperature is a guide. The real test is feel. A probe (or toothpick, or cake tester) should slide into the thickest part of the meat with zero resistance — like going into room-temperature butter. That is done.',
  },
  {
    title: 'The rest',
    body: 'After pulling, wrap tight and rest in a cooler for at least 1 hour — 2 hours for brisket. The rest lets internal temp equalize and juices redistribute. It is not optional.',
  },
];

export default function SmokingTimesPage() {
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
              Smoking Times and Temperatures Chart
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed mb-4">
              Every cut you are likely to smoke — with smoker temperature, internal target, estimated time, and pitmaster notes. All temperatures based on USDA food safety guidelines and documented pitmaster practice.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-amber-800 bg-amber-50 px-4 py-2 rounded-full">
              <Flame size={14} /> Bookmark this page for your next cook
            </div>
          </div>
        </section>

        {/* Reference Table */}
        <section aria-label="Smoking times and temperatures reference table" className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Full Reference Chart</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
              Times are estimates. Internal temperature and probe feel are what matter at the end.
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm" aria-label="BBQ smoking times and temperatures by cut">
                <thead>
                  <tr className="bg-amber-50 border-b border-amber-100">
                    <th className="text-left py-3 px-4 font-semibold text-amber-900">Cut</th>
                    <th className="text-left py-3 px-4 font-semibold text-amber-900">Smoker Temp</th>
                    <th className="text-left py-3 px-4 font-semibold text-amber-900">Internal Target</th>
                    <th className="text-left py-3 px-4 font-semibold text-amber-900">Approx Time</th>
                    <th className="text-left py-3 px-4 font-semibold text-amber-900">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {CUTS.map((row, i) => (
                    <tr
                      key={row.cut}
                      className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-amber-50 transition-colors`}
                    >
                      <td className="py-3 px-4 font-semibold text-gray-900 whitespace-nowrap">{row.cut}</td>
                      <td className="py-3 px-4 text-gray-700 whitespace-nowrap">{row.smokerTemp}</td>
                      <td className="py-3 px-4 font-medium text-amber-700 whitespace-nowrap">{row.internalTarget}</td>
                      <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{row.approxTime}</td>
                      <td className="py-3 px-4 text-gray-500 text-xs leading-relaxed">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">
              USDA minimum safe temperatures: pork 145°F, poultry 165°F, whole muscle beef 145°F. Pitmaster targets for collagen cuts (brisket, shoulder, ribs) are higher to achieve probe-tender texture.
            </p>
          </div>
        </section>

        {/* Stall + Probe Tender Explainer */}
        <section aria-label="The stall and probe tender explained" className="py-16 px-4 bg-amber-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">The Stall and Probe Tender</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
              These two concepts explain why most first-time brisket cooks either panic or pull too early.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {STALL_NOTES.map(({ title, body }) => (
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

        {/* CTA */}
        <section aria-label="Download PitLog app" className="py-16 px-4" style={{ backgroundColor: '#FFF7ED' }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Log your actual cook times.</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Charts are a starting point. Your smoker runs different. PitLog lets you record every cook — actual smoker temp, wood used, start and pull times, internal temp reached — so you build a real record over time.
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
