import type { Metadata, Viewport } from "next";
import { Alfa_Slab_One, Asap } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const alfaSlab = Alfa_Slab_One({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const asap = Asap({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://www.pitlog.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PitLog — Search 129+ BBQ cuts and cook times",
    template: "%s | PitLog",
  },
  description: "PitLog has 129+ BBQ cuts, target temps, cook times, and wood pairings. Log your own cooks, rate the results, and build a record of everything you've pulled off the grill.",
  keywords: ["bbq log app", "pitmaster log", "smoking meat tracker", "bbq cook times", "pellet grill log"],
  authors: [{ name: "Anvil Road LLC" }],
  creator: "Anvil Road LLC",
  publisher: "Anvil Road LLC",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "PitLog",
    title: "PitLog — Search 129+ BBQ cuts and cook times",
    description: "PitLog has 129+ BBQ cuts, target temps, cook times, and wood pairings. Log your own cooks, rate the results, and build a record of everything you've pulled off the grill.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PitLog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PitLog — Search 129+ BBQ cuts and cook times",
    description: "PitLog has 129+ BBQ cuts, target temps, cook times, and wood pairings. Log your own cooks, rate the results, and build a record of everything you've pulled off the grill.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/icons/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1410",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${alfaSlab.variable} ${asap.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {/* Google Tag Manager - GTM-T9PF8VXN */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-T9PF8VXN');`}
        </Script>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T9PF8VXN"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>{children}</body>
    </html>
  );
}
