import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

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
  themeColor: "#D97706",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
