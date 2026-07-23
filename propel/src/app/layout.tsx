import type { Metadata, Viewport } from "next";
import { DM_Sans, Unbounded } from "next/font/google";
import "./globals.css";
import { homepageSchemaGraph } from "@/lib/structured-data";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, SEO_KEYWORDS, OG_IMAGE } from "@/lib/seo";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const unbounded = Unbounded({ subsets: ["latin"], variable: "--font-display", weight: ["700","800","900"], display: "swap" });

export const viewport: Viewport = {
  themeColor: "#B8FF2E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — AI Marketing Tools for Founders`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  authors: [{ name: "Propel", url: SITE_URL }],
  creator: "Propel",
  publisher: "Propel",
  alternates: { canonical: "/" },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website", locale: "en_US", url: SITE_URL, siteName: SITE_NAME,
    title: `${SITE_NAME} — AI Marketing Tools for Founders`,
    description: "Every marketing tool founders need to go from zero to traction.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Propel — AI Marketing for Founders" }],
  },
  twitter: {
    card: "summary_large_image", site: "@propelhq", creator: "@propelhq",
    title: `${SITE_NAME} — AI Marketing Tools for Founders`,
    description: "Stop guessing. Start launching.",
    images: [{ url: OG_IMAGE, alt: "Propel dashboard" }],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", sizes: "180x180" }],
    shortcut: "/favicon.svg",
    other: [{ rel: "mask-icon", url: "/favicon.svg", color: "#B8FF2E" }],
  },
  manifest: "/manifest.json",
  applicationName: SITE_NAME,
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
  verification: { google: "REPLACE_WITH_GSC_TOKEN" },
  other: { "msapplication-TileColor": "#B8FF2E" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${unbounded.variable}`} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchemaGraph) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="color-scheme" content="dark" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Propel" />
      </head>
      <body className="font-sans bg-bg text-text-primary antialiased">{children}</body>
    </html>
  );
}
