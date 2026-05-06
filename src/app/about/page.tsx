import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About PitLog",
  description: "The story behind PitLog. Search 129+ BBQ cuts and cook times. Log your cooks. Build your pit mastery.",
};

export default function AboutPage() {
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
              style={{
                color: 'oklch(0.62 0.16 55)',
                letterSpacing: '0.18em',
                fontSize: '0.7rem',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '24px',
                  height: '1px',
                  background: 'oklch(0.62 0.16 55)',
                }}
                aria-hidden="true"
              />
              ABOUT THE WORKSHOP
            </div>
            <h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl mb-8"
              style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}
            >
              Built for people who cook by feel and by number.
            </h1>
            <p
              className="text-lg leading-relaxed mb-6 max-w-2xl"
              style={{ color: 'oklch(0.82 0.018 50)' }}
            >
              PitLog started as a personal project for pitmasters who kept losing notes from their best cooks. A napkin with brisket, 203 internal, 14 hours, post oak is great until it disappears. PitLog is the reference and log in one place. Search what the pros recommend, cook it, log your results. Over dozens of cooks you build a personal record of what works on your pit, with your fuel, in your climate. The PitLog app for iPhone and Android has the full database and cook log with offline mode for when you are three hours into a cook with no signal.
            </p>
            <p
              className="leading-relaxed mb-10 max-w-2xl"
              style={{ color: 'oklch(0.78 0.020 50)' }}
            >
              PitLog is published by Anvil Road LLC, a small product studio building practical apps and reference tools for hobbyists, professionals, and makers. Every product in the portfolio follows the same principle: a curated, searchable database paired with a personal log. Search what the experts know. Record what you discover.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/library" className="btn-primary press-feedback">
                Browse the library
              </Link>
              <Link href="/free-download" className="btn-ghost">
                Free download
              </Link>
            </div>
          </div>
        </section>

        <section
          className="px-4 sm:px-6 lg:px-8 py-16 lg:py-20"
          style={{
            backgroundColor: 'oklch(0.18 0.030 50)',
            borderTop: '1px solid oklch(0.28 0.025 50)',
          }}
        >
          <div className="max-w-5xl mx-auto">
            <span
              className="font-display uppercase mb-5 inline-block"
              style={{
                color: 'oklch(0.62 0.16 55)',
                letterSpacing: '0.18em',
                fontSize: '0.7rem',
              }}
            >
              Anvil Road LLC
            </span>
            <h2
              className="font-display text-3xl sm:text-4xl mb-6"
              style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}
            >
              An independent app studio out of New Jersey.
            </h2>
            <p
              className="leading-relaxed max-w-2xl"
              style={{ color: 'oklch(0.82 0.018 50)' }}
            >
              Anvil Road is an independent publisher and app studio. We build reference databases, log apps, KDP books, and companion print products across hobby and professional categories. PitLog is one of 20+ apps in the Anvil Road portfolio. All apps are free to start, with one-time unlocks for unlimited features. No subscriptions.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
