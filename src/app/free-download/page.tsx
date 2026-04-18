import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { EmailCaptureForm } from '@/components/EmailCaptureForm';
import { Download, CheckCircle, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free BBQ Cook Times Reference Card",
  description: "One-page quick reference — target temps, approximate cook times, and wood suggestions for 20 common cuts. Free printable from PitLog — no signup required.",
};

export default function FreeDownloadPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">
        <section className="py-20 px-4" style={{ backgroundColor: '#FFFBEB' }}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex w-16 h-16 bg-amber-50 rounded-2xl items-center justify-center mb-6">
              <Download className="text-amber-600" size={28} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Free BBQ Cook Times Reference Card
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              One-page quick reference — target temps, approximate cook times, and wood suggestions for 20 common cuts.
            </p>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-left mb-6">
              <h2 className="font-bold text-gray-900 text-lg mb-4">What is inside</h2>
              <ul className="space-y-3">
                            <li key="20 most common cuts with target internal temps" className="flex items-start gap-3 text-gray-600 text-sm"><CheckCircle size={16} className="text-amber-600 mt-0.5 shrink-0" /> 20 most common cuts with target internal temps</li>
            <li key="Approximate cook time ranges by weight" className="flex items-start gap-3 text-gray-600 text-sm"><CheckCircle size={16} className="text-amber-600 mt-0.5 shrink-0" /> Approximate cook time ranges by weight</li>
            <li key="Top wood pairing suggestion for each protein" className="flex items-start gap-3 text-gray-600 text-sm"><CheckCircle size={16} className="text-amber-600 mt-0.5 shrink-0" /> Top wood pairing suggestion for each protein</li>
            <li key="Stall temperature ranges for low-and-slow cuts" className="flex items-start gap-3 text-gray-600 text-sm"><CheckCircle size={16} className="text-amber-600 mt-0.5 shrink-0" /> Stall temperature ranges for low-and-slow cuts</li>
            <li key="Printable — laminate it and hang it at the pit" className="flex items-start gap-3 text-gray-600 text-sm"><CheckCircle size={16} className="text-amber-600 mt-0.5 shrink-0" /> Printable — laminate it and hang it at the pit</li>
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8">
              <h2 className="font-bold text-gray-900 text-xl mb-2">Get your free copy</h2>
              <p className="text-gray-500 text-sm mb-6">Enter your email and we will send it right to your inbox.</p>
              <EmailCaptureForm buttonLabel="Send Me the Free PDF" />
              <p className="text-xs text-gray-400 mt-4 text-center">No spam. Unsubscribe any time.</p>
            </div>
          </div>
        </section>
        <section className="py-16 px-4 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Want the searchable database?</h2>
            <p className="text-gray-500 mb-6">The free PDF covers the basics. The PitLog app gives you the full searchable library and your personal log — free on iPhone and Android.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-2 bg-black text-white font-semibold px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors min-h-[48px]">
                Get on App Store <ArrowRight size={18} />
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-2 bg-black text-white font-semibold px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors min-h-[48px]">
                Get on Google Play <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
