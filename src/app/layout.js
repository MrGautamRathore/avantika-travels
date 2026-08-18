// layout.js (Modified)
import { Poppins } from "next/font/google";
import "./globals.css";
import { SiteProvider } from "@/context/site-context";
import ThemeProvider from "@/components/ui/theme-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import WhatsAppIcon from "@/components/ui/whatsapp-icon";
import { StructuredData } from "@/components/seo/structured-data";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Suspense } from "react";
import AIEnhancements from "@/components/seo/AIEnhancements";
import Script from "next/script";
// ❌ REMOVE: import { CanonicalInjector } from "@/components/seo/CanonicalInjector";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: 'swap',
  preload: true,
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9307e' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ],
  colorScheme: 'light dark',
};

export const metadata = {
  metadataBase: new URL('https://avantikatravels.com'),
  
  title: {
    default: "Avantika Travels | Best Mahakal Ujjain & Omkareshwar Tour Packages",
    template: "%s | Avantika Travels Ujjain"
  },
  description: "Looking for the best travel agency in Ujjain? Book verified Mahakal Darshan taxi, Omkareshwar tour packages, and Indore airport pickup. Call +91-8720006707 for instant booking.",
  keywords: ["Ujjain tour packages", "Mahakal Darshan Booking", "Indore to Ujjain Taxi", "Omkareshwar Tour", "Travel Agency Ujjain", "Avantika Travels","Avantika Travels Ujjain To Omkareshwar tour Packages","Best Travel Agent in Ujjain","Best Travel Company in Ujjain","Best Travel Agency in Ujjain"],
  authors: [{ name: 'Avantika Travels Team', url: 'https://avantikatravels.com' }],
  creator: 'Avantika Travels',
  publisher: 'Avantika Travels MP',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/logo.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://avantikatravels.com',
    siteName: 'Avantika Travels - Ujjain & MP Tourism',
    title: 'Avantika Travels | Best Tour and Travel Company in Ujjain',
    description: 'Planning a trip to Mahakal? Get the best rates for Ujjain Darshan, Omkareshwar, and Indore Taxi services. Book now!',
    images: [
      {
        url: '/mahakal.webp',
        width: 1200,
        height: 630,
        alt: 'Avantika Travels Ujjain To Omkareshwar tour Packages',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avantika Travels | Ujjain Tour Experts',
    description: 'Book Mahakal Darshan & MP Tour Packages. Reliable & Affordable.',
    images: ['/omkareshwar.png'],
    creator: '@avantikatravels',
  },
  other: {
    'geo.region': 'IN-MP',
    'geo.placename': 'Ujjain',
    'geo.position': '23.1765;75.7885',
    'ICBM': '23.1765, 75.7885',
    'google-site-verification': "Kzya8PN69Pu0Wy8EeAaDq8-GKXBErwII4ela_A_nTqY",
    'format-detection': 'telephone=no',
  },
};

const defaultSiteData = {
  name: "Avantika Travels",
  tagline: "Discover the Divine Beauty of Madhya Pradesh",
  contactInfo: { 
    email: "info@avanikatravels.com",
    phone: "+91 8720006707",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${poppins.variable}`}>
      <head>
        <Script id="consent-mode" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied'
            });
          `}
        </Script>
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        {/* ❌ REMOVE: <CanonicalInjector /> */}
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-white text-primary">
            <div className="text-lg font-bold animate-pulse">Loading Avantika Travels...</div>
          </div>
        }>
          <SiteProvider>
            <ThemeProvider>
              <StructuredData />
              <AIEnhancements pageType="global" data={defaultSiteData} />
              <Header />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <WhatsAppIcon />
            </ThemeProvider>
          </SiteProvider>
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID} />
        </Suspense>
        <Script 
          src="https://cdn.counter.dev/script.js" 
          data-id="4118ced0-591b-4232-9a15-f6fd72ffe86a" 
          data-utcoffset="6"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}