'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import HeroSection from "@/components/home/hero-section"

// Dynamic imports
const PlacesSection = dynamic(() => import("@/components/home/places-section"))
const PackagesSection = dynamic(() => import("@/components/home/packages-section"))
const ReviewsSection = dynamic(() => import("@/components/home/reviews-section"))
const SearchResultsSection = dynamic(() => import("@/components/home/search-results-section"))
const ContactPopup = dynamic(() => import("@/components/ui/contact-popup"))

export default function HomePage() {
  const router = useRouter()
  const [selectedTripType, setSelectedTripType] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

  // JSON-LD Schema for Local Business (SEO Booster)
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault()
        router.push('/admin/login')
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [router])

  const handleSearch = () => {
    if (selectedRegion) setHasSearched(true)
  }

  const clearSearch = () => {
    setSelectedRegion("")
    setSelectedTripType("")
    setHasSearched(false)
  }

  return (
    <main>
      <Head>
        <title>Avantika Travels | Best Ujjain Tour Packages & Mahakal Darshan Taxi</title>
        <meta name="description" content="Book affordable Ujjain tour packages, Mahakal Bhasma Aarti darshan, and Indore to Ujjain taxi service. Best travel agency for Omkareshwar & MP Tourism." />
        <meta name="keywords" content="Ujjain Tour Packages, Mahakal Darshan, Indore to Ujjain Taxi, Omkareshwar Trip Cost, Ujjain Travels, Best Travel Agency in Ujjain" />
        <meta property="og:title" content="Avantika Travels | Ujjain & Omkareshwar Tour Packages" />
        <meta property="og:description" content="Plan your spiritual journey with Avantika Travels. We provide the best taxi service and hotel booking for Mahakaleshwar and Omkareshwar." />
        <link rel="canonical" href="https://avantikatravels.com/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <HeroSection
        selectedTripType={selectedTripType}
        setSelectedTripType={setSelectedTripType}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        onSearch={handleSearch}
      />

      {hasSearched && (
        <SearchResultsSection
          selectedTripType={selectedTripType}
          selectedRegion={selectedRegion}
          onClearSearch={clearSearch}
        />
      )}

      <PlacesSection />
      <PackagesSection />
      <ReviewsSection />
      <ContactPopup />
    </main>
  )
}