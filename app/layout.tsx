import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import WebVitals from "@/components/WebVitals";
import { Analytics } from '@vercel/analytics/react';

/**
 * Font Strategy:
 * Georgia is a widely-available system font (pre-installed on most devices).
 * Using system fonts provides zero network latency and better performance
 * than loading web fonts. The font-family is defined in globals.css with
 * appropriate fallbacks.
 */

// Viewport configuration for optimal mobile performance
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Allow zoom for accessibility
  themeColor: '#8b7355',
};

export const metadata: Metadata = {
  // Base URL for resolving relative URLs in metadata
  // Update this after deployment with your actual domain
  metadataBase: new URL('https://joelle-shekinah-memorial.vercel.app'),

  title: "In Loving Memory of Joëlle Shekinah Tchami",
  description: "A tribute to Joëlle Shekinah Tchami (1983-2025) - International Conference Interpreter, Loving Mother, and Cherished Sister. Celebrating her remarkable life, professional legacy, and unwavering faith.",
  keywords: ["memorial", "tribute", "Joëlle Tchami", "Shekinah", "interpreter", "Cameroon", "conference interpreter", "bilingual", "French", "English", "Portuguese"],
  authors: [{ name: "Tchami Family" }],
  creator: "Tchami Family",
  publisher: "Tchami Family",

  // Open Graph metadata for social media sharing
  openGraph: {
    title: "In Loving Memory of Joëlle Shekinah Tchami",
    description: "International Conference Interpreter, Loving Mother, and Faithful Believer. Celebrating the remarkable life of Joëlle Shekinah Tchami (December 19, 1983 - October 2025).",
    url: "https://joelle-shekinah-memorial.vercel.app", // Update with actual URL after deployment
    siteName: "Joëlle Shekinah Tchami Memorial",
    images: [
      {
        url: "/images/og-image.jpg", // To be created - 1200x630px recommended
        width: 1200,
        height: 630,
        alt: "In Loving Memory of Joëlle Shekinah Tchami",
      },
    ],
    locale: "en_US",
    alternateLocale: ["fr_FR"],
    type: "website",
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "In Loving Memory of Joëlle Shekinah Tchami",
    description: "Celebrating the remarkable life of Joëlle Shekinah Tchami - International Conference Interpreter, Loving Mother, and Faithful Believer.",
    images: ["/images/twitter-card.jpg"], // To be created - 1200x600px recommended
  },

  // Robots configuration
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification tags (add when setting up Google Search Console, etc.)
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  // },

  // Additional metadata
  category: "memorial",
};

// JSON-LD structured data for search engines
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Joëlle Shekinah Tchami",
  "givenName": "Joëlle Shekinah",
  "familyName": "Tchami",
  "birthDate": "1983-12-19",
  "deathDate": "2025-10",
  "birthPlace": {
    "@type": "Place",
    "name": "Bertoua, Cameroon",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CM",
      "addressRegion": "East Region"
    }
  },
  "nationality": {
    "@type": "Country",
    "name": "Cameroon"
  },
  "jobTitle": "International Conference Interpreter",
  "knowsLanguage": [
    {
      "@type": "Language",
      "name": "French",
      "alternateName": "fr"
    },
    {
      "@type": "Language",
      "name": "English",
      "alternateName": "en"
    },
    {
      "@type": "Language",
      "name": "Portuguese",
      "alternateName": "pt"
    }
  ],
  "alumniOf": [
    {
      "@type": "CollegeOrUniversity",
      "name": "University of Buea",
      "location": "Buea, Cameroon"
    },
    {
      "@type": "CollegeOrUniversity",
      "name": "Advanced School of Translators and Interpreters (ASTI)",
      "location": "Buea, Cameroon"
    }
  ],
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Conference Interpreter",
    "occupationalCategory": "Interpreters and Translators"
  },
  "description": "International Conference Interpreter, Loving Mother, and Faithful Believer who served at prestigious international conferences and touched countless lives through her work bridging language barriers.",
  "url": "https://joelle-shekinah-memorial.vercel.app" // Update with actual URL
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Resource hints for performance */}
        {/* Preconnect to Firebase for faster loading */}
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
        <link rel="preconnect" href="https://www.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.gstatic.com" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Favicon links - Add favicon files to public folder */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <WebVitals />
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
