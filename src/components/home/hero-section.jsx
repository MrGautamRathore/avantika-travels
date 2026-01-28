"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FiSearch } from "react-icons/fi"
import Image from "next/image"
import { useSite } from "@/context/site-context"

export default function HeroSection({
  selectedTripType,
  setSelectedTripType,
  selectedRegion,
  setSelectedRegion,
  onSearch,
}) {
  const { siteData } = useSite()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchClick = () => {
    if (searchQuery.trim()) setSelectedRegion(searchQuery.trim())
    if (onSearch) onSearch()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearchClick()
  }

  return (
    <section className="relative py-12 md:py-20 flex items-center min-h-[600px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={siteData.heroImage || '/placeholder-hero.jpg'}
          alt="Mahakal Temple Ujjain - Avantika Travels Hero Background"
          fill
          priority
          quality={50}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 backdrop-blur-xs bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              <span className="block text-2xl md:text-3xl font-medium mb-2 text-gray-300">
                Welcome to the City of Mahakal
              </span>
              Explore <span className="text-primary">Ujjain & Omkareshwar</span> with Avantika Travels
            </h1>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl"
          >
            <p>
              Your trusted partner for <strong>Mahakal Darshan</strong>, <strong>Indore to Ujjain Taxi services</strong>, and complete Madhya Pradesh tourism. We offer affordable <strong>Ujjain tour packages</strong> tailored for families and couples.
            </p>
          </motion.div>

          {/* Search Input Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 max-w-2xl"
          >
            <div className="relative flex-1">
              <div className="relative">
                <FiSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Try 'Ujjain 1 Day Trip' or 'Omkareshwar Taxi'..."
                  className="w-full bg-white rounded-full py-4 pl-14 pr-6 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary shadow-lg"
                />
              </div>
            </div>
            <button 
              onClick={handleSearchClick}
              disabled={!searchQuery.trim()}
              className={`bg-primary text-white font-bold px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg ${
                !searchQuery.trim() ? "opacity-90 cursor-not-allowed" : "hover:bg-primary-dark hover:scale-105"
              }`}
            >
              Search Packages
            </button>
          </motion.div>

          {/* Popular Destinations Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-2 mt-6"
          >
            <span className="text-sm text-gray-300 mr-2 py-2">Popular:</span>
            {["Mahakal Darshan", "Indore to Ujjain", "Omkareshwar Trip", "Dewas Chamunda Mata"].map((dest) => (
              <button
                key={dest}
                onClick={() => {
                  setSearchQuery(dest)
                  setSelectedRegion(dest)
                  if(onSearch) onSearch()
                }}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm px-4 py-1.5 rounded-full hover:bg-primary hover:border-primary transition-all"
              >
                {dest}
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}