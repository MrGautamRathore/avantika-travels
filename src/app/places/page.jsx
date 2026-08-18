// app/places/page.js
import PlacesClient from '/places-client'
import { getSiteData } from '@/lib/data-fetcher' 

// ✅ Server Component mein metadata export
export const metadata = {
  title: "Best Places to Visit in Madhya Pradesh | MP Tourism & Ujjain Darshan",
  description: "Explore top tourist places in Madhya Pradesh. From Mahakal Ujjain & Omkareshwar Jyotirlinga to Pachmarhi Hill Station. Book taxi for MP tour packages.",
  alternates: {
    canonical: "/places", 
  },
  openGraph: {
    title: "Best Places to Visit in Madhya Pradesh",
    description: "Explore top tourist places in Madhya Pradesh. Book taxi for MP tour packages.",
    url: "https://avantikatravels.com/places",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Places to Visit in Madhya Pradesh",
    description: "Explore top tourist places in Madhya Pradesh. Book taxi for MP tour packages.",
  },
}

// ✅ JSON-LD Schema - Server Component mein hi
const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://avantikatravels.com/places",
  "name": "Top Tourist Places in Madhya Pradesh",
  "description": "List of best places to visit in MP including Ujjain, Omkareshwar, Pachmarhi, and Khajuraho.",
  "url": "https://avantikatravels.com/places",
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": 0, // ✅ Dynamic update ho jayega client mein
    "itemListElement": []
  }
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://avantikatravels.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Places to Visit",
      "item": "https://avantikatravels.com/places"
    }
  ]
}

export default async function PlacesPage() {
  // ✅ Server-side data fetching
  const { places, siteData } = await getSiteData()
  
  // ✅ Update schema with actual data
  const updatedSchema = {
    ...collectionPageSchema,
    mainEntity: {
      ...collectionPageSchema.mainEntity,
      numberOfItems: places.length,
      itemListElement: places.slice(0, 15).map((place, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "TouristAttraction",
          "name": place.title || place.name,
          "url": `https://avantikatravels.com/places/${place.slug}`,
        }
      }))
    }
  }

  return (
    <>
      {/* ✅ Server-side JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(updatedSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* ✅ Client Component - Data pass as props */}
      <PlacesClient initialPlaces={places} initialSiteData={siteData} />
    </>
  )
}