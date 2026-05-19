import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support — Pit Master Log',
  description: 'Get help with the Pit Master Log app. Contact support or browse common questions.',
};

const FAQS = [
  { q: 'How do I get the app?', a: 'Search Pit Master Log in the App Store or Google Play. The app is free to download. The $6.99 one-time unlock removes entry limits and adds premium features.' },
  { q: 'What does the $6.99 unlock include?', a: 'Unlimited cook logs, full PDF export, advanced wood pairing guide, and offline database. One-time payment, no subscription, no expiration.' },
  { q: 'How do I restore my purchase?', a: 'Open the app, go to Settings, and tap Restore Purchases. Make sure you are signed in to the same Apple ID or Google account you used to purchase.' },
  { q: 'Does the app require an account?', a: 'No account is required for offline use. An optional free account lets you sync your BBQ cook logs across devices.' },
  { q: 'Is there a subscription?', a: 'No. Pit Master Log is free to download with entry limits, and $6.99 one-time to unlock everything. No monthly fees, ever.' },
  { q: 'How do I delete my account and data?', a: 'Go to Settings in the app and tap Delete Account. This removes all cloud data within 30 days. Local data is removed when you uninstall the app.' },
];

export default function SupportPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        <section
          className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24"
          style={{ backgroundColor: 'oklch(0.10 0.020 50)' }}
        >
          <div className="max-w-3xl mx-auto">
            <div
              className="font-display uppercase font-semibold mb-8 flex items-center gap-3"
              style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}
            >
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'oklch(0.62 0.16 55)' }} aria-hidden="true" />
              SUPPORT
            </div>
            <h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl mb-6"
              style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}
            >
              App support.
            </h1>
            <p className="text-lg leading-relaxed mb-12" style={{ color: 'oklch(0.82 0.018 50)' }}>
              Get help with Pit Master Log or give us feedback.
            </p>

            <div
              className="p-8 mb-12"
              style={{
                background: 'oklch(0.18 0.030 50)',
                border: '1px solid oklch(0.28 0.025 50)',
                borderRadius: '0.25rem',
              }}
            >
              <span
                className="font-display uppercase block mb-3"
                style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}
              >
                Email support
              </span>
              <p className="text-sm mb-3" style={{ color: 'oklch(0.82 0.018 50)' }}>
                We respond within 1 to 2 business days.
              </p>
              <a
                href="mailto:support@pitlog.app"
                className="font-display text-xl"
                style={{ color: 'oklch(0.72 0.14 55)' }}
              >
                support@pitlog.app
              </a>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-20" style={{ backgroundColor: 'oklch(0.13 0.025 50)' }}>
          <div className="max-w-3xl mx-auto">
            <span
              className="font-display uppercase mb-5 inline-block"
              style={{ color: 'oklch(0.62 0.16 55)', letterSpacing: '0.18em', fontSize: '0.7rem' }}
            >
              FAQ
            </span>
            <h2 className="font-display text-3xl sm:text-4xl mb-12" style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}>
              Frequently asked questions.
            </h2>
            <ul>
              {FAQS.map(({ q, a }, idx) => (
                <li
                  key={q}
                  className="grid grid-cols-12 gap-4 sm:gap-8 py-8"
                  style={{
                    borderTop: '1px solid oklch(0.28 0.025 50)',
                    borderBottom: idx === FAQS.length - 1 ? '1px solid oklch(0.28 0.025 50)' : 'none',
                  }}
                >
                  <div
                    className="col-span-2 sm:col-span-1 font-display tabular-nums text-2xl sm:text-3xl leading-none"
                    style={{ color: 'oklch(0.62 0.16 55)' }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="col-span-10 sm:col-span-4">
                    <h3 className="font-display text-lg sm:text-xl leading-tight" style={{ color: 'oklch(0.93 0.020 50)' }}>
                      {q}
                    </h3>
                  </div>
                  <div className="col-span-12 sm:col-span-7">
                    <p className="leading-relaxed" style={{ color: 'oklch(0.82 0.018 50)' }}>{a}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-12 text-sm" style={{ color: 'oklch(0.62 0.018 50)' }}>
              See our{' '}
              <a href="/privacy" style={{ color: 'oklch(0.72 0.14 55)' }}>Privacy Policy</a>{' '}
              for information on how we handle your data.
            </p>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
