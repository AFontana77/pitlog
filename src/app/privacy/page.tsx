import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Pit Master Log',
  description: 'Privacy policy for the Pit Master Log mobile application and pitlog.app website.',
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
              Privacy Policy
            </h1>
            <p className="text-sm mb-12" style={{ color: 'oklch(0.62 0.018 50)' }}>
              Last updated: April 17, 2026
            </p>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>1. Who We Are</h2>
            <p className="leading-relaxed mb-6" style={bodyStyle}>
              Anvil Road LLC operates pitlog.app and the Pit Master Log mobile application. Contact:{' '}
              <a href="mailto:support@pitlog.app" style={linkStyle} className="hover:underline">support@pitlog.app</a>
            </p>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>2. Information We Collect</h2>
            <p className="mb-3" style={bodyStyle}>We collect the minimum data needed to operate the app:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2" style={bodyStyle}>
              <li><strong style={headingStyle}>BBQ cook logs you create.</strong> Stored locally on your device only. This data is never uploaded to any server.</li>
              <li><strong style={headingStyle}>Purchase data.</strong> When you unlock the full app, RevenueCat receives a transaction ID and device identifier to verify and restore your purchase. We do not receive your payment details.</li>
            </ul>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 mb-6 space-y-1" style={bodyStyle}>
              <li>To operate the app and display your logged cooks</li>
              <li>To restore your purchase on new devices</li>
              <li>To respond to support requests</li>
            </ul>
            <p className="mb-6" style={bodyStyle}>We do not use your data for advertising. We do not sell your data to any third party.</p>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>4. Third-Party Services</h2>
            <ul className="list-disc pl-6 mb-6 space-y-1" style={bodyStyle}>
              <li><strong style={headingStyle}>RevenueCat.</strong> In-app purchase management. They receive device identifiers and transaction data to process and restore purchases.</li>
              <li><strong style={headingStyle}>Apple App Store / Google Play.</strong> App distribution and payment processing.</li>
            </ul>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>5. Data Deletion</h2>
            <p className="leading-relaxed mb-6" style={bodyStyle}>
              Your data is stored only on your device. It is permanently deleted when you uninstall the app.
              We do not store any of your logged data on our servers.
            </p>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>6. Children</h2>
            <p className="leading-relaxed mb-6" style={bodyStyle}>
              This app is not directed at children under 13. We do not knowingly collect personal information from children under 13.
            </p>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>7. Changes to This Policy</h2>
            <p className="leading-relaxed mb-6" style={bodyStyle}>
              We may update this policy. We will post the revised policy at this URL with a new last updated date. Continued use of the app after changes constitutes acceptance of the updated policy.
            </p>

            <h2 className="font-display text-xl mt-10 mb-4" style={headingStyle}>8. Contact</h2>
            <p className="leading-relaxed" style={bodyStyle}>
              Questions about this policy? Email{' '}
              <a href="mailto:support@pitlog.app" style={linkStyle} className="hover:underline">support@pitlog.app</a>.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
