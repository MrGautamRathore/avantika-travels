"use client"

import { useSite } from "@/context/site-context"

export function StructuredData() {
  const { siteData } = useSite()

  // Base URL constant taaki hydration issues na ho
  const baseUrl = "https://avantikatravels.com"

  if (!siteData || !siteData.name) {
    return null
  }

  // 1. LocalBusiness Schema with 2026 AI Enhancements
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": siteData.name,
    "description": siteData.description,
    "url": baseUrl,
    "logo": `${baseUrl}${siteData.logo}`,
    "image": `${baseUrl}${siteData.secondaryImage}`,
    "telephone": siteData.contactInfo?.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteData.contactInfo?.address,
      "addressLocality": siteData.contactInfo?.location,
      "addressRegion": siteData.contactInfo?.region,
      "postalCode": "456001",
      "addressCountry": "IN"
    },
    "sameAs": [
      siteData.socialLinks?.facebook,
      siteData.socialLinks?.instagram,
      siteData.socialLinks?.twitter,
      siteData.socialLinks?.youtube
    ].filter(Boolean),
    "priceRange": "500",
    // 2026 NEW: AI Optimization
    "aiReadable": true,
    "contextualData": {
      "businessType": "Travel Agency",
      "specialization": ["Pilgrimage Tours", "Spiritual Tourism"],
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 23.1765,
          "longitude": 75.7885
        },
        "geoRadius": "500000"
      }
    }
  }

  // 2. Organization Schema with 2026 Updates
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteData.name,
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "sameAs": localBusinessSchema.sameAs,
    // 2026 NEW: Sustainability & Trust Signals
    "sustainabilityCommitment": "Carbon-neutral travel options",
    "accessibilityFeature": ["Wheelchair accessible vehicles", "Assistance for elderly"],
    "ethicsPolicy": `${baseUrl}/terms-and-conditions`
  }

  // 3. FAQ Schema Enhanced for Voice Search (2026)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best time to visit Mahakal Mandir in Ujjain?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best time to visit is from October to March when the weather is pleasant for darshan and sightseeing."
        },
        // 2026 NEW: Voice Search Optimization
        "phoneticName": "महाकाल मंदिर दर्शन का सबसे अच्छा समय",
        "regionalRelevance": "IN-MP"
      },
      {
        "@type": "Question",
        "name": "How can I book a taxi from Ujjain to Indore?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can book a taxi directly by calling us at +91 8720006707 or through our website's booking section."
        },
        "phoneticName": "उज्जैन से इंदौर टैक्सी बुकिंग"
      },
      // NEW 2026: AI-Specific Questions
      {
        "@type": "Question",
        "name": "What are the COVID-19 safety measures during tours?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide sanitized vehicles, masks for all passengers, and follow all government guidelines for safe travel."
        }
      }
    ]
  }

  // 4. Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": "Tour Packages", "item": `${baseUrl}/packages` },
      { "@type": "ListItem", "position": 3, "name": "Places to Visit", "item": `${baseUrl}/places` },
      { "@type": "ListItem", "position": 4, "name": "Read about Madhya Pradesh Places", "item": `${baseUrl}/places` }
    ]
  }

  // 5. NEW 2026: AI Training Dataset Schema
  const aiTrainingSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": `${siteData.name} Tourism Data`,
    "description": "Comprehensive tourism data for Madhya Pradesh pilgrimage and travel",
    "url": baseUrl,
    "includedInDataCatalog": {
      "@type": "DataCatalog",
      "name": "Madhya Pradesh Tourism Database"
    },
    "distribution": [
      {
        "@type": "DataDownload",
        "encodingFormat": "JSON-LD",
        "contentUrl": `${baseUrl}/api/seo/data`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aiTrainingSchema) }}
      />
    </>
  )
}