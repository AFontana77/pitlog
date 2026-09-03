import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { EmailCaptureForm } from '@/components/EmailCaptureForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: 'https://pitlog.app/free-download' },
  title: "Free BBQ Field Guide: Meat Cuts, Temps and Smoke Woods (PDF)",
  description: "The Pit Log field guide: USDA safe temps, the pitmaster finish for tough cuts, six animal pages, the smoke wood chart and log pages. Free PDF by email.",
};

// Matches what build_pitlog_field_guide.py actually renders from the spine.
const INSIDE = [
  'The full USDA FSIS safe minimum chart, with the source and the date we read it',
  'One page each for beef, pork, lamb, goat, chicken and salmon: regions, tenderness, best method, finish, slice',
  'Tenderness targets for brisket, shoulder, ribs, belly and short ribs, labelled craft, never safety',
  'The eight smoke woods and the pairing matrix',
  'Handling rules: the danger zone, two thermometers, probe placement, rest, sauce timing',
  'Two cook log pages. Print them, laminate the rest, hang it at the pit.',
];

export default function FreeDownloadPage() {
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
              FREE FIELD GUIDE
            </div>
            <h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl mb-6"
              style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}
            >
              Free meat cuts, temps and smoke field guide.
            </h1>
            <p
              className="text-lg leading-relaxed mb-12 max-w-2xl"
              style={{ color: 'oklch(0.82 0.018 50)' }}
            >
              The USDA safe temperatures, the pitmaster finish for the tough cuts, one page per animal, the smoke wood chart and two cook log pages. Built from the same records as this site. No Amazon links, no filler.
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              <div
                className="p-8"
                style={{
                  background: 'oklch(0.18 0.030 50)',
                  border: '1px solid oklch(0.28 0.025 50)',
                  borderRadius: '0.25rem',
                }}
              >
                <span
                  className="font-display uppercase block mb-4"
                  style={{
                    color: 'oklch(0.62 0.16 55)',
                    letterSpacing: '0.18em',
                    fontSize: '0.7rem',
                  }}
                >
                  What is inside
                </span>
                <ul>
                  {INSIDE.map((item, idx) => (
                    <li
                      key={item}
                      className="grid grid-cols-12 gap-3 py-3"
                      style={{
                        borderTop: idx === 0 ? 'none' : '1px solid oklch(0.28 0.025 50)',
                      }}
                    >
                      <div
                        className="col-span-1 font-display tabular-nums text-sm"
                        style={{ color: 'oklch(0.62 0.16 55)' }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div
                        className="col-span-11 text-sm"
                        style={{ color: 'oklch(0.93 0.020 50)' }}
                      >
                        {item}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="p-8"
                style={{
                  background: 'oklch(0.18 0.030 50)',
                  border: '1px solid oklch(0.28 0.025 50)',
                  borderRadius: '0.25rem',
                }}
              >
                <span
                  className="font-display uppercase block mb-4"
                  style={{
                    color: 'oklch(0.62 0.16 55)',
                    letterSpacing: '0.18em',
                    fontSize: '0.7rem',
                  }}
                >
                  Get your free copy
                </span>
                <h2
                  className="font-display text-2xl mb-2"
                  style={{ color: 'oklch(0.93 0.020 50)' }}
                >
                  Send it to my inbox
                </h2>
                <p
                  className="text-sm mb-6"
                  style={{ color: 'oklch(0.78 0.020 50)' }}
                >
                  Enter your email and we will send the PDF right over.
                </p>
                <EmailCaptureForm buttonLabel="Send the free PDF" />
                <p
                  className="text-xs mt-4"
                  style={{ color: 'oklch(0.62 0.018 50)' }}
                >
                  No spam. Unsubscribe any time.
                </p>
              </div>
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
          <div className="max-w-3xl mx-auto">
            <span
              className="font-display uppercase mb-5 inline-block"
              style={{
                color: 'oklch(0.62 0.16 55)',
                letterSpacing: '0.18em',
                fontSize: '0.7rem',
              }}
            >
              The full database
            </span>
            <h2
              className="font-display text-3xl sm:text-4xl mb-6"
              style={{ color: 'oklch(0.93 0.020 50)', lineHeight: 1.05 }}
            >
              Want the searchable database?
            </h2>
            <p
              className="leading-relaxed mb-8"
              style={{ color: 'oklch(0.82 0.018 50)' }}
            >
              The free PDF covers the basics. The PitLog app gives you the full searchable library and your personal log. Free on iPhone and Android.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                App Store
              </a>
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Google Play
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
