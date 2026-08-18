import HomeClient from "./home-client"

export const metadata = {
  title: "Avantika Travels | Best Ujjain Tour Packages & Mahakal Darshan Taxi",
  description: "Book affordable Ujjain tour packages, Mahakal Bhasma Aarti darshan, and Indore to Ujjain taxi service. Best travel agency for Omkareshwar & MP Tourism.",
  keywords: "Ujjain Tour Packages, Mahakal Darshan, Indore to Ujjain Taxi, Omkareshwar Trip Cost, Ujjain Travels, Best Travel Agency in Ujjain",
  alternates: {
    canonical: "https://avantikatravels.com/",
  },
  openGraph: {
    title: "Avantika Travels | Ujjain & Omkareshwar Tour Packages",
    description: "Plan your spiritual journey with Avantika Travels. We provide the best taxi service and hotel booking for Mahakaleshwar and Omkareshwar.",
    url: "https://avantikatravels.com/",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Avantika Travels",
  "image": "https://avantikatravels.com/logo.png",
  "description": "Best travel agency in Ujjain for Mahakal Darshan, Omkareshwar tours, and Indore to Ujjain taxi services.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Ujjain",
    "addressRegion": "MP",
    "addressCountry": "IN"
  },
  "priceRange": "₹₹"
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  )
} 