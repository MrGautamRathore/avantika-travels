"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FiSearch } from "react-icons/fi"
import Image from "next/image"
import { useSite } from "@/context/site-context"

export default function HeroSection({
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
    if (e.key === "Enter") handleSearchClick()
  }

  return (
    <section className="relative py-10 md:py-12 flex items-center min-h-[600px]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={siteData.heroImage || "/placeholder-hero.jpg"}
          alt="Mahakal Temple Ujjain"
          fill
          priority
          quality={60}
          className="object-cover object-[55%] lg:object-[70%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">

          {/* Heading */}
          <motion.header
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              <span className="block text-xl md:text-2xl lg:text-3xl font-medium text-gray-300 mb-3">
                Crafting Memorable Journeys & Spiritual Tours
              </span>
              Your Ultimate <span className="text-primary">Ujjain & Omkareshawar</span>
              <br />
              Travel Planner
            </h1>
          </motion.header>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed"
          >
            Explore custom tour packages, seamless itineraries, and guided darshan experiences. <strong className="text-white">Trusted by 5,000+ happy travelers</strong> for unforgettable trips.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 max-w-2xl mt-8"
          >
            <div className="relative flex-1">
              <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search destination, tour package, temple..."
                className="w-full rounded-full bg-white py-4 pl-14 pr-6 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary shadow-xl"
              />
            </div>

            <button
              onClick={handleSearchClick}
              disabled={!searchQuery.trim()}
              className={`rounded-full px-8 py-4 font-semibold text-white transition-all shadow-xl whitespace-nowrap ${
                !searchQuery.trim()
                  ? "bg-primary opacity-70 cursor-not-allowed"
                  : "bg-primary hover:bg-primary-dark hover:scale-105"
              }`}
            >
              Explore Packages
            </button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap gap-3 mt-6 items-center"
          >
            <span className="text-sm text-gray-300 py-2">
              Popular Destinations:
            </span>

            {[
              "Ujjain",
              "Maheshwar",
              "Omkareshwar",
              "Balaji",
            ].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setSearchQuery(item)
                  setSelectedRegion(item)
                  if (onSearch) onSearch()
                }}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur hover:bg-primary hover:border-primary transition"
              >
                {item}
              </button>
            ))}
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center gap-6 mt-8 text-sm text-gray-300"
          >
            <span>✨ Custom Tour Packages</span>
            <span>🗺️ Expert Itinerary Planning</span>
            <span>⭐ 5,000+ Happy Travelers</span>
          </motion.div>

        </div>
      </div>
    </section>
  )
}