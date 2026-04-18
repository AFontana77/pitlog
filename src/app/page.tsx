import Link from 'next/link';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Database, BookOpen, BarChart3, Star, ArrowRight, Download, CheckCircle, Flame, Clock, ThumbsUp } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "PitLog — BBQ Reference + Cook Log App",
  description: "PitLog has 129+ BBQ cuts with target temps, stall temps, wood pairings, and cook time estimates. Log every cook, rate the result, and build a record of everything you've pulled off the smoker. Free on iPhone and Android.",
};

const FEATURES = [
  {
    icon: Database,
    title: "129+ cuts with real data",
    body: "Brisket, pork butt, ribs, chicken thighs, tri-tip — every major cut with target internal temp, stall temp range, estimated cook time per pound, and wood pairing notes. Written for pitmasters who want actual numbers, not vague 'cook until done' guidance.",
  },
  {
    icon: BookOpen,
    title: "Cook log built for BBQ",
    body: "Log meat weight, start time, smoker temp, fuel type, rub, injection, and result. Rate every cook 1–5. Add notes on what worked and what to change next time. Every cook saved, searchable by cut or date.",
  },
  {
    icon: Flame,
    title: "Wood pairing guide",
    body: "Hickory, oak, cherry, pecan, apple, mesquite — each wood matched to protein types and flavor profiles. Know which wood works with what before you load the firebox, not after.",
  },
  {
    icon: BarChart3,
    title: "Session history",
    body: "Every cook you've ever logged, all in one place. Search by cut, sort by rating, find your best brisket ever. Build a real record instead of relying on memory when someone asks how you did it.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Find your cut",
    body: "Search by meat type or browse the full library. Get target internal temp, stall range, estimated cook time, and wood pairing recommendations — everything you need before you fire up the smoker.",
  },
  {
    step: "2",
    title: "Log the cook as it happens",
    body: "Start a cook log with the cut, weight, and smoker temp. Add notes throughout — temp stalls, spritzes, wrap decisions. Rate the result when you pull it. 30 seconds of logging saves hours of guessing next time.",
  },
  {
    step: "3",
    title: "Build your record",
    body: "Every cook adds to your personal history. See what rubs you've used, which wood pairings worked, and which cooks rated highest. Share your best sessions with friends who want to know your method.",
  },
];

const DB_CATEGORIES = [
  { label: "Brisket (flat)", temp: "195–205°F", time: "1–1.5 hrs/lb", wood: "Oak or hickory" },
  { label: "Pork shoulder / butt", temp: "195–205°F", time: "1.5–2 hrs/lb", wood: "Hickory or apple" },
  { label: "Baby back ribs", temp: "180–190°F", time: "4–5 hrs total", wood: "Cherry or hickory" },
  { label: "Spare ribs", temp: "185–195°F", time: "5–6 hrs total", wood: "Oak or cherry" },
  { label: "Chicken thighs", temp: "165–175°F", time: "1.5–2 hrs total", wood: "Apple or pecan" },
  { label: "Tri-tip", temp: "130–140°F", time: "1.5–2 hrs total", wood: "Oak or pecan" },
];

const FAQS = [
  {
    q: "Is PitLog free?",
    a: "Yes. The app is free to download and the reference library is free. The $6.99 one-time unlock adds unlimited cook log entries, session history, and search. No subscription, no renewal — pay once and keep it forever.",
  },
  {
    q: "What's in the BBQ reference library?",
    a: "129+ cuts across beef, pork, poultry, lamb, seafood, and vegetables. Each entry has target internal temp, stall temp range, estimated cook time per pound, and wood pairing notes. All data sourced from USDA safe temp guidelines and established pitmaster practice.",
  },
  {
    q: "Can I log cooks for different smokers?",
    a: "Yes. Each cook log entry includes a smoker type field — offset, kettle, kamado, pellet, drum, or custom. You can filter your history by smoker type to compare results across setups.",
  },
  {
    q: "Does the app work offline?",
    a: "Yes. The full reference library is built into the app and available offline. Log entries are stored locally on your device. No internet required at the pit.",
  },
  {
    q: "Can I share my cook logs?",
    a: "Yes. Individual cook entries can be exported as a simple summary — cut, time, temps, rating, and notes. Good for sharing with friends or posting to BBQ groups.",
  },
  {
    q: "Does PitLog have a timer?",
    a: "A basic cook timer with estimated finish time based on your cut, weight, and smoker temp is on the roadmap for a future update. For now, the reference data gives you the time estimate to set your own timer.",
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
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "BBQ cook times and temperatures for 200+ cuts. Log your cooks, track results by cut, and build a personal BBQ reference book.",
            "url": "https://www.pitlog.app"
          })
        }}
      />
      <SiteNav />
      <main id="main-content" className="pt-20">

        {/* Hero */}
        <section className="py-20 px-4" style={{ backgroundColor: '#FFFBEB' }}>
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full mb-6">
              129+ cuts. Real temps. Real times.
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Every BBQ cut. Every cook.
              <br />
              <span className="text-amber-700">Logged and searchable.</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              PitLog gives you 129+ BBQ cuts with target internal temps, stall ranges, estimated cook times, and wood pairing notes — built into the app, searchable before you load the smoker. Log every cook, rate the result, and build a real record you can actually use next time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/library" className="inline-flex items-center justify-center gap-2 bg-amber-700 text-white font-semibold px-8 py-3 rounded-xl hover:bg-amber-800 transition-colors press-feedback min-h-[48px]">
                Browse the Reference Library <ArrowRight size={18} />
              </Link>
              <Link href="/free-download" className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 font-medium px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors min-h-[48px]">
                <Download size={18} /> Free Temp Reference Card
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Free app. No credit card. 129+ cuts included.
            </p>
          </div>
        </section>

        {/* The database IS the app */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                The reference IS the reason to log.
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Most cook log apps are just blank screens. PitLog gives you the reference data first — 129+ cuts with real numbers — so your logs mean something. You know what you were shooting for, and whether you hit it.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {FEATURES.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-4 p-6 rounded-xl bg-gray-50 card-hover">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-amber-700" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">How PitLog works</h2>
              <p className="text-gray-600 max-w-xl mx-auto">Reference before the cook. Log during. History after.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-8">
              {HOW_IT_WORKS.map(({ step, title, body }) => (
                <div key={step} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-700 font-bold text-lg mb-4">
                    {step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Database preview */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Sample cuts from the library
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                A preview of what's in PitLog. 129+ cuts total — browse and search the full library in the app.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 pr-4 font-semibold text-gray-700">Cut</th>
                    <th className="text-left py-3 pr-4 font-semibold text-gray-700">Target temp</th>
                    <th className="text-left py-3 pr-4 font-semibold text-gray-700">Est. time</th>
                    <th className="text-left py-3 font-semibold text-gray-700">Wood pairing</th>
                  </tr>
                </thead>
                <tbody>
                  {DB_CATEGORIES.map(({ label, temp, time, wood }) => (
                    <tr key={label} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 pr-4 font-medium text-gray-900">{label}</td>
                      <td className="py-3 pr-4 text-amber-700 font-medium">{temp}</td>
                      <td className="py-3 pr-4 text-gray-600">{time}</td>
                      <td className="py-3 text-gray-600">{wood}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center mt-6 text-sm text-gray-400">
              129+ cuts total including beef, pork, poultry, lamb, seafood, and vegetables. Full search in the app.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 px-4 bg-amber-50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Free app. One-time unlock.
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Download PitLog free. The reference library is free. Unlock the cook log, session history, and search for a one-time $6.99. No subscription, no renewal.
            </p>
            <div className="bg-white rounded-2xl p-8 border border-amber-100 mb-8">
              <div className="text-4xl font-bold text-gray-900 mb-1">$6.99</div>
              <div className="text-sm text-gray-400 mb-6">One-time. Yours forever.</div>
              <ul className="text-left space-y-3 mb-6">
                {[
                  "Unlimited cook log entries",
                  "Full session history with search",
                  "Wood pairing guide for all 129+ cuts",
                  "Rating and notes per cook",
                  "Works fully offline",
                  "All future updates included",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle size={16} className="text-amber-600 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-2 bg-black text-white font-semibold px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors min-h-[48px]">
                Download on App Store
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-2 bg-black text-white font-semibold px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors min-h-[48px]">
                Get it on Google Play
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 text-center">
              Common questions
            </h2>
            <div className="space-y-6">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Start with the free temp card.
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Download the printable BBQ temp reference card — 20 most common cuts with target temps on one page. Stick it on the fridge, hang it in the garage. Get the app when you're ready to start logging.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/free-download" className="inline-flex items-center justify-center gap-2 bg-amber-700 text-white font-semibold px-8 py-3 rounded-xl hover:bg-amber-800 transition-colors press-feedback min-h-[48px]">
                <Download size={18} /> Get the Free Card
              </Link>
              <Link href="/library" className="inline-flex items-center justify-center gap-2 border border-amber-200 text-amber-700 font-medium px-8 py-3 rounded-xl hover:bg-amber-50 transition-colors min-h-[48px]">
                Browse the Library
              </Link>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
