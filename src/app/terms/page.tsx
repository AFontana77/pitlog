import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Pit Master Log',
  description: 'Terms of service for the Pit Master Log mobile application and pitlog.app website.',
};

const linkStyle = { color: 'oklch(0.72 0.14 55)' };
const headingStyle = { color: 'oklch(0.93 0.020 50)', lineHeight: 1.1 };
const bodyStyle = { color: 'oklch(0.82 0.018 50)' };

export default function TermsPage() {
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
              TERMS
            </div>
            <h1 className="font-display text-4xl sm:text-5xl mb-3" style={headingStyle}>
              Terms of service
            </h1>
            <p className="text-sm mb-12" style={{ color: 'oklch(0.62 0.018 50)' }}>
              Last updated: April 18, 2026
            </p>

            <p className="leading-relaxed mb-6" style={bodyStyle}>
              These Terms of Service govern your use of the Pit Master Log BBQ cook log app and the website at pitlog.app. By downloading the app or using the website, you agree to these terms. If you do not agree, do not use the service.
            </p>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>1. Who we are</h2>
            <p className="leading-relaxed mb-6" style={bodyStyle}>
              Anvil Road LLC operates pitlog.app and the Pit Master Log mobile application. Contact:{' '}
              <a href="mailto:support@pitlog.app" style={linkStyle}>support@pitlog.app</a>
            </p>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>2. Use of the service</h2>
            <p className="leading-relaxed mb-6" style={bodyStyle}>
              Pit Master Log is a personal BBQ cook log app. You may use the service for personal, non-commercial purposes only. You agree not to misuse the service, reverse-engineer the app, or use it in any way that violates applicable law.
            </p>
            <p className="leading-relaxed mb-6" style={bodyStyle}>
              You are responsible for all data you enter into the app. We do not verify the accuracy of your logged entries.
            </p>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>3. User accounts</h2>
            <p className="leading-relaxed mb-6" style={bodyStyle}>
              Creating an account is optional. If you create an account, you are responsible for keeping your credentials secure. You may delete your account at any time from the app settings.
            </p>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>4. In-app purchases</h2>
            <p className="leading-relaxed mb-6" style={bodyStyle}>
              Pit Master Log offers a one-time in-app purchase ($6.99 USD) to unlock the full database and premium logging features. Purchases are processed by Apple App Store or Google Play and are subject to their respective refund policies. We do not process payment information directly.
            </p>
            <p className="leading-relaxed mb-6" style={bodyStyle}>
              Purchases are tied to your App Store or Google Play account and can be restored on new devices using the restore purchases option in settings.
            </p>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>5. Intellectual property</h2>
            <p className="leading-relaxed mb-6" style={bodyStyle}>
              All content, design, code, and database records in the Pit Master Log app and website are owned by Anvil Road LLC or licensed to us. You may not copy, reproduce, or redistribute any part of the service without written permission.
            </p>
            <p className="leading-relaxed mb-6" style={bodyStyle}>
              Data you create in the app (your personal log entries) remains yours. We do not claim ownership of your personal records.
            </p>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>Health and safety notice</h2>
            <p className="leading-relaxed mb-6" style={bodyStyle}>
              Cook times and temperatures are for reference only. Actual cooking results vary by equipment, cut thickness, and conditions. Always verify meat reaches safe internal temperatures per USDA guidelines.
            </p>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>6. Limitation of liability</h2>
            <p className="leading-relaxed mb-6" style={bodyStyle}>
              Pit Master Log is provided as is without warranties of any kind. Anvil Road LLC is not liable for any damages arising from use of the app, including data loss, inaccurate reference information, or service interruptions. Our total liability to you is limited to the amount you paid for any in-app purchase.
            </p>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>7. Changes to these terms</h2>
            <p className="leading-relaxed mb-6" style={bodyStyle}>
              We may update these terms from time to time. We will post the revised terms at this URL with a new last updated date. Continued use of the service after changes constitutes your acceptance of the updated terms.
            </p>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>8. Governing law</h2>
            <p className="leading-relaxed mb-6" style={bodyStyle}>
              These terms are governed by the laws of the State of New Jersey, United States, without regard to conflict of law principles. Any disputes must be brought in the courts of New Jersey.
            </p>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>9. Contact</h2>
            <p className="leading-relaxed" style={bodyStyle}>
              Questions about these terms? Email{' '}
              <a href="mailto:support@pitlog.app" style={linkStyle}>support@pitlog.app</a>.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
