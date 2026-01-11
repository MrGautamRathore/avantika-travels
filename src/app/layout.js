import { Poppins } from "next/font/google"
import "./globals.css"
import { SiteProvider } from "@/context/site-context"
import ThemeProvider from "@/components/ui/theme-provider"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import WhatsAppIcon from "@/components/ui/whatsapp-icon"
import { MetadataProvider } from "@/components/seo/metadata-provider"
import { StructuredData } from "@/components/seo/structured-data"


// app/layout.js

export const metadata = {
  metadataBase: new URL('https://avantikatravels.com'),
  title: {
    default: "Avantika Travels | Best Mahakal Mandir & MP Tour Packages",
    template: "%s | Avantika Travels"
  },
  description: "Experience the divine beauty of Mahakal Mandir with Avantika Travels. We offer the best pilgrimage tours, spiritual journeys, and cultural heritage packages in Ujjain, Indore, and Madhya Pradesh.",
  keywords: ["Mahakal Mandir Ujjain", "Ujjain Tour Packages", "Madhya Pradesh Tourism", "Indore Travels", "Spiritual Tours India", "Avantika Travels"],
  authors: [{ name: "Avantika Travels" }],
  creator: "Avantika Travels",
  publisher: "Avantika Travels",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  // Logo aur Icons (Isse Google Search mein Icon aayega)
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
  // Social Media Links (Open Graph)
  openGraph: {
    title: "Avantika Travels | Discover the Divine Beauty of Madhya Pradesh",
    description: "Your trusted travel partner for Mahakal Mandir Darshan and MP tourism.",
    url: 'https://avantikatravels.com',
    siteName: 'Avantika Travels',
    images: [
      {
        url: '/pik2.avif', // Ensure this is in your public folder
        width: 1200,
        height: 630,
        alt: 'Avantika Travels Mahakal Mandir Tour',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Avantika Travels | Ujjain & MP Tours',
    description: 'Book your spiritual journey to Mahakal Mandir with the best travel agency in MP.',
    images: ['/pik2.avif'],
  },
  // Robots indexing
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
};


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f9307e",
}



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
       <meta name="google-site-verification" content="Kzya8PN69Pu0Wy8EeAaDq8-GKXBErwII4ela_A_nTqY" /> 
       <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="shortcut icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<meta name="apple-mobile-web-app-title" content="Avantika Travels" />
<link rel="manifest" href="/site.webmanifest" />
       </head>
     
      <body className={`${poppins.variable} font-sans antialiased`}>
        <SiteProvider>
          <ThemeProvider>
            <MetadataProvider>
              <StructuredData />
              <Header />
              <main>{children}</main>
              <Footer />
              <WhatsAppIcon />
            </MetadataProvider>
          </ThemeProvider>
        </SiteProvider>
      </body>
    </html>
  )
}
