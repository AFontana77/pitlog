import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — PitLog',
  description: 'Privacy policy for the PitLog mobile application and pitlog.app website.',
};

const linkStyle = { color: 'oklch(0.72 0.14 55)' };
const headingStyle = { color: 'oklch(0.93 0.020 50)', lineHeight: 1.1 };
const bodyStyle = { color: 'oklch(0.82 0.018 50)' };

export default function PrivacyPage() {
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
              POLICY
            </div>
            <h1 className="font-display text-4xl sm:text-5xl mb-3" style={headingStyle}>
              Privacy policy
            </h1>
            <p className="text-sm mb-12" style={{ color: 'oklch(0.62 0.018 50)' }}>
              Last updated: April 17, 2026
            </p>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>1. Who we are</h2>
            <p className="leading-relaxed mb-6" style={bodyStyle}>
              Anvil Road LLC operates pitlog.app and the PitLog mobile application. Contact:{' '}
              <a href="mailto:support@pitlog.app" style={linkStyle}>support@pitlog.app</a>
            </p>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>2. Information we collect</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2" style={bodyStyle}>
              <li><strong style={headingStyle}>Account email address</strong>. Optional, for cross-device sync only.</li>
              <li><strong style={headingStyle}>BBQ cook logs you create</strong>. Stored locally on your device and, if you have an account, in our secure cloud database (Supabase).</li>
              <li><strong style={headingStyle}>Purchase confirmation</strong>. Via RevenueCat when you unlock premium features. We do not receive your payment details.</li>
              <li><strong style={headingStyle}>Device identifiers</strong>. Used by RevenueCat to associate your purchase with your device.</li>
            </ul>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>3. How we use your information</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2" style={bodyStyle}>
              <li>To operate the app and sync your data across devices (if you have an account).</li>
              <li>To restore your purchase on new devices.</li>
              <li>To respond to support requests.</li>
            </ul>
            <p className="leading-relaxed mb-6" style={bodyStyle}>
              We do not use your data for advertising. We do not sell your data to any third party.
            </p>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>4. Third-party services</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2" style={bodyStyle}>
              <li><strong style={headingStyle}>Supabase</strong>. Secure cloud database for optional account sync. Hosted on AWS US-East.</li>
              <li><strong style={headingStyle}>RevenueCat</strong>. In-app purchase management and subscription tracking.</li>
              <li><strong style={headingStyle}>Apple App Store / Google Play</strong>. App distribution and payment processing.</li>
            </ul>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>5. Data deletion</h2>
            <p className="leading-relaxed mb-6" style={bodyStyle}>
              You may delete your account and all associated cloud data at any time from the app settings. We will delete your data within 30 days of the request. Local device data is deleted when you uninstall the app.
            </p>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>6. Children</h2>
            <p className="leading-relaxed mb-6" style={bodyStyle}>
              This app is not directed at children under 13. We do not knowingly collect personal information from children under 13.
            </p>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>7. Changes to this policy</h2>
            <p className="leading-relaxed mb-6" style={bodyStyle}>
              We may update this policy. We will post the revised policy at this URL with a new last updated date. Continued use of the app after changes constitutes acceptance of the updated policy.
            </p>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>8. Contact</h2>
            <p className="leading-relaxed" style={bodyStyle}>
              Questions about this policy? Email{' '}
              <a href="mailto:support@pitlog.app" style={linkStyle}>support@pitlog.app</a>.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
