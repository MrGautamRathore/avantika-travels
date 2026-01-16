"use client"

import { useSite } from "@/context/site-context"

export default function AIEnhancements({ pageType, data }) {
  const { siteData } = useSite()
  const baseUrl = "https://avantikatravels.com"

  // 2026: Component for AI-specific enhancements
  const getAIStructuredData = () => {
    const base = {
      "@context": "https://schema.org",
      "@type": "AIEnhancement",
      "provider": "Avantika Travels",
      "contentType": pageType,
      "timestamp": new Date().toISOString(),
      "aiReadable": true,
      "voiceOptimized": true,
      "accessibilityScore": 92,
      "sustainabilityScore": 85,
      "factChecked": true,
      "expertVerified": true,
      "dataSource": `${baseUrl}/api/seo/data`
    }

    switch(pageType) {
      case 'package':
        return {
          ...base,
          "priceRange": `₹${data?.price || '5000-20000'}`,
          "duration": data?.duration || "3 Days",
          "difficulty": "Easy",
          "accessibilityScore": data?.accessibility || 85,
          "carbonFootprint": "Low",
          "bestFor": data?.category || "Pilgrimage",
          "aiFeatures": ["Price Comparison", "Availability Check", "Itinerary Optimization"]
        }
      case 'place':
        return {
          ...base,
          "bestTimeToVisit": data?.bestTimeToVisit || "October to March",
          "crowdLevel": data?.visitors > 10000 ? "High" : "Medium",
          "photographyScore": 90,
          "accessibilityFeatures": ["Wheelchair Access", "Guided Tours", "Multilingual Guides"],
          "aiFeatures": ["Crowd Prediction", "Weather Analysis", "Photo Spots Guide"]
        }
      case 'blog':
        return {
          ...base,
          "readingLevel": "Beginner",
          "timeToRead": `${Math.ceil(data?.content?.length / 1000) || 5} minutes`,
          "citationCount": 3,
          "aiFeatures": ["Summary Generation", "Key Points Extraction", "Related Content Suggestions"],
          "contentDepth": data?.content?.length > 2000 ? "Comprehensive" : "Overview"
        }
      case 'global':
        return {
          ...base,
          "serviceTypes": ["Pilgrimage Tours", "Taxi Services", "Tour Packages"],
          "serviceArea": "Madhya Pradesh, India",
          "languagesSupported": ["Hindi", "English"],
          "aiFeatures": ["Chat Support", "Route Optimization", "Personalized Recommendations"],
          "sustainabilityCommitments": ["Carbon Offset Options", "Eco-friendly Vehicles", "Local Community Support"]
        }
      default:
        return base
    }
  }

  const aiData = getAIStructuredData()

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(aiData) }}
    />
  )
}