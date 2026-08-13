'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import HeroSection from "@/components/home/hero-section"

const PlacesSection = dynamic(() => import("@/components/home/places-section"))
const PackagesSection = dynamic(() => import("@/components/home/packages-section"))
const GallerySection = dynamic(() => import("@/components/home/gallery-section"))
const ReviewsSection = dynamic(() => import("@/components/home/reviews-section"))
const SearchResultsSection = dynamic(() => import("@/components/home/search-results-section"))
const ContactPopup = dynamic(() => import("@/components/ui/contact-popup"))

export default function HomeClient() {
  const router = useRouter()
  const [selectedTripType, setSelectedTripType] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

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
      <GallerySection />
      <ReviewsSection />
      <ContactPopup />
    </main>
  )
}