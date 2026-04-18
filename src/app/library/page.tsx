import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Database, ArrowRight, Search, Flame, Thermometer, CheckCircle } from 'lucide-react';
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
    color: "#B45309",
    highlights: ["Brisket (flat + point)", "Chuck roast", "Short ribs", "Back ribs", "Tri-tip", "Beef cheeks"],
    notes: "Brisket and chuck dominate. Collagen breakdown at 195–205°F is non-negotiable — probe tender, not just temp.",
  },
  {
    name: "Pork",
    count: 35,
    color: "#DC2626",
    highlights: ["Pork butt / shoulder", "Baby back ribs", "Spare ribs / St. Louis", "Belly / bacon", "Tenderloin", "Country ribs"],
    notes: "Butt and shoulder are the most forgiving cuts. Ribs follow the 3-2-1 or 2-2-1 method depending on thickness and personal preference.",
  },
  {
    name: "Poultry",
    count: 22,
    color: "#CA8A04",
    highlights: ["Whole chicken", "Spatchcock chicken", "Thighs", "Drumsticks", "Whole turkey", "Turkey breast"],
    notes: "Dark meat target: 175°F internal. Whole birds benefit from higher pit temps (300–325°F) to crisp skin before the stall.",
  },
  {
    name: "Lamb",
    count: 12,
    color: "#15803D",
    highlights: ["Leg of lamb", "Lamb shoulder", "Rack of lamb", "Lamb ribs", "Shanks"],
    notes: "Leg and shoulder follow the same collagen logic as beef — low and slow to 195°F+ for fall-apart texture. Rack is shorter and higher temp.",
  },
  {
    name: "Seafood",
    count: 10,
    color: "#1D4ED8",
    highlights: ["Salmon fillet", "Whole fish", "Shrimp", "Lobster tails", "Swordfish steaks"],
    notes: "Short cook times, higher temps. Salmon at 225°F takes 45–60 minutes. Seafood doesn't stall — pull it early and let carryover finish.",
  },
  {
    name: "Vegetables",
    count: 12,
    color: "#7C3AED",
    highlights: ["Corn on the cob", "Whole onions", "Bell peppers", "Portobello mushrooms", "Cauliflower", "Smoked jalapeños"],
    notes: "Great for offset placement or after the main protein pull. Most vegetables smoke at 225–250°F for 45–90 minutes. No stall, no probe test — just watch texture and color.",
  },
];

const WOOD_PAIRINGS = [
  { wood: "Hickory", flavor: "Bold, bacon-like, strong smoke", best: "Pork shoulder, brisket, ribs", avoid: "Poultry, fish (can overpower)" },
  { wood: "Oak", flavor: "Medium, earthy, clean", best: "Brisket, beef ribs, lamb", avoid: "Nothing — the most versatile wood in BBQ" },
  { wood: "Apple", flavor: "Mild, sweet, fruity", best: "Pork, chicken, turkey", avoid: "Heavy beef cuts (too subtle)" },
  { wood: "Cherry", flavor: "Mild, slightly sweet, dark color", best: "Poultry, pork, duck", avoid: "Fish (cherry can taste metallic at high temp)" },
  { wood: "Pecan", flavor: "Mild, nutty, rich", best: "Brisket, pork ribs, poultry", avoid: "Nothing major — a softer hickory alternative" },
  { wood: "Mesquite", flavor: "Very bold, earthy, almost bitter", best: "Beef, Texas-style brisket", avoid: "Long cooks (mesquite gets harsh over hours — better for hot/fast)" },
];

const STALL_INFO = [
  {
    title: "What the stall is",
    body: "The stall happens when a large piece of meat — usually brisket or pork shoulder — hits 150–170°F and stops climbing for 2 to 6 hours. This is evaporative cooling: moisture leaving the surface of the meat cools it at exactly the rate the smoker heats it.",
  },
  {
    title: "What to do about it",
    body: "Wait it out, or wrap. The Texas Crutch (wrapping in butcher paper or foil) cuts through the stall by trapping moisture and eliminating evaporation. Butcher paper breathes more and preserves bark better. Foil is faster but softens bark.",
  },
  {
    title: "Probe testing vs. temperature",
    body: "Temperature is a guide, not a finish line. Brisket is done when a probe slides in with zero resistance — like warm butter. This usually happens between 195°F and 205°F, but the feel matters more than the number.",
  },
  {
    title: "The rest period",
    body: "After pulling, wrap tightly and rest in a cooler or warming oven at 150–160°F for at least 1 hour, ideally 2. Resting lets the internal temp equalize and the juices redistribute. Skipping the rest is where most backyard briskets fall apart.",
  },
];

export default function LibraryPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        {/* Hero */}
        <section className="py-16 px-4" style={{ backgroundColor: '#FFF7ED' }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex w-14 h-14 bg-amber-50 rounded-2xl items-center justify-center mb-6">
              <Database className="text-amber-700" size={28} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">PitLog Reference Library</h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed mb-4">
              129+ BBQ cuts organized by protein type — with target internal temperatures, estimated cook times, stall guidance, and wood pairing recommendations. Built from USDA food safety guidelines and documented pitmaster practice.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-amber-800 bg-amber-50 px-4 py-2 rounded-full">
              <Search size={14} /> Full-text search and cook logging available in the free PitLog app
            </div>
          </div>
        </section>

        {/* Protein Categories */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Cuts by Protein Type</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
              129+ cuts across six categories. Each entry includes target internal temperature, estimated cook time at 225°F and 250°F, stall range, rest time, and wood pairing recommendations.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {PROTEIN_CATEGORIES.map((cat) => (
                <div key={cat.name} className="rounded-xl border border-gray-100 bg-gray-50 p-6 card-hover">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900">{cat.name}</h3>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-amber-50 text-amber-800">{cat.count} cuts</span>
                  </div>
                  <ul className="text-sm text-gray-700 mb-3 space-y-1">
                    {cat.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2">
                        <span style={{ color: cat.color }} className="font-bold">—</span> {h}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-500 leading-relaxed italic">{cat.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wood Pairing Guide */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Wood Pairing Guide</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
              Wood selection changes the flavor profile more than most people expect. The same brisket tastes different over hickory vs. oak vs. cherry. These are the six most common smoking woods and what they do.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 pr-4 font-semibold text-gray-700">Wood</th>
                    <th className="text-left py-3 pr-4 font-semibold text-gray-700">Flavor profile</th>
                    <th className="text-left py-3 pr-4 font-semibold text-gray-700">Best for</th>
                    <th className="text-left py-3 font-semibold text-gray-700">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {WOOD_PAIRINGS.map(({ wood, flavor, best, avoid }) => (
                    <tr key={wood} className="border-b border-gray-100 hover:bg-white transition-colors">
                      <td className="py-3 pr-4 font-medium text-amber-800">{wood}</td>
                      <td className="py-3 pr-4 text-gray-700">{flavor}</td>
                      <td className="py-3 pr-4 text-gray-600 text-xs">{best}</td>
                      <td className="py-3 text-gray-500 text-xs">{avoid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Stall Explanation */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">The Stall — What It Is and What to Do</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
              The stall is the most common source of confusion and panic for backyard pitmasters. Understanding it eliminates most failed cooks.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {STALL_INFO.map(({ title, body }) => (
                <div key={title} className="flex gap-4 p-5 rounded-xl bg-gray-50">
                  <Flame className="text-amber-700 flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* App CTA */}
        <section className="py-16 px-4" style={{ backgroundColor: '#FFF7ED' }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Log the cook. Build your record.</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              PitLog has all 129+ cuts with full cook parameters, plus a cook log to record every session — smoker type, wood used, target temp reached, total time, and your rating. Free to download. $6.99 one-time to unlock the log.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-2 bg-black text-white font-semibold px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors min-h-[48px]">
                App Store
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-2 bg-black text-white font-semibold px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors min-h-[48px]">
                Google Play
              </a>
            </div>
            <p className="text-sm text-gray-400">Free. No subscription. No credit card.</p>
            <div className="mt-6">
              <Link href="/free-download" className="text-sm text-amber-800 hover:underline">
                Or download the free printable temperature and time reference sheet
              </Link>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
