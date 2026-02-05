"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { FiChevronDown } from "react-icons/fi"
import PackageCard from "@/components/ui/package-card"
import { useSite } from "@/context/site-context"

export default function PackagesSection() {
  const { packages } = useSite()
  const [activeCategory, setActiveCategory] = useState("all")

  const tripCategories = [
    { id: "all", name: "All Packages" },
    { id: "pilgrimage", name: "Mahakal Darshan" },
    { id: "family", name: "Family Trip" },
    { id: "honeymoon", name: "Couple Packages" },
    { id: "adventure", name: "Adventure" },
  ]

  const filteredPackages = activeCategory === "all" 
    ? packages 
    : packages.filter(pkg => pkg.category?.toLowerCase().includes(activeCategory.toLowerCase()))

  return (
    <section className="py-16 md:py-24 bg-gray-50 lg:px-10 sm:px-2">
      <div className="container mx-auto px-4">
        
        {/* SEO Header Section */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Best <span className="text-primary">Ujjain Tour Packages</span> & Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-600 leading-relaxed"
          >
            Planning a visit to the holy city? Check out our affordable <strong>Ujjain trip cost</strong> and customized itineraries. Whether you need a <strong>1-day Ujjain tour plan</strong> or a complete <strong>Indore-Ujjain-Omkareshwar package</strong>, we offer the best deals for families and couples. Book your <strong>Mahakal Darshan taxi</strong> and hotel stay with us for a hassle-free experience.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-3 flex-wrap mb-10">
          {tripCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all shadow-sm ${
                activeCategory === category.id 
                  ? "bg-primary text-white shadow-md transform scale-105" 
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredPackages.slice(0, 8).map((pkg, index) => (
            <PackageCard key={pkg._id} pkg={pkg} index={index} />
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No specific packages found. Contact us for a custom plan!</p>
          </div>
        )}

        <div className="text-center mb-16">
          <Link
            href="/packages"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-lg"
          >
            View All Ujjain Packages
          </Link>
        </div>

        {/* SEO Footer Content Block - Non-intrusive */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mt-8">
           <h3 className="text-xl font-bold text-gray-800 mb-4">Why Choose Avantika Travels for Your Journey?</h3>
           <div className="grid md:grid-cols-2 gap-8 text-gray-600 text-sm leading-relaxed">
              <div>
                <p className="mb-4">
                  <strong>Complete Mahakal Yatra:</strong> We specialize in <Link href="/services" className="text-primary hover:underline">religious tourism</Link>. From assisting with <em>Bhasma Aarti online booking</em> information to guiding you through the new <strong>Mahakal Corridor (Mahakal Lok)</strong>, our drivers and guides ensure you don't miss anything.
                </p>
                <p>
                  <strong>Transparent Pricing:</strong> No hidden charges. Our <strong>Ujjain taxi fare list</strong> is clear. Whether you need a tempo traveller for a group or a sedan for a private trip, you get the best rates in the market.
                </p>
              </div>
              <div>
                <p className="mb-4">
                  <strong>Connectivity:</strong> Landing at Indore Airport? Our <strong>Indore to Ujjain taxi service</strong> is available 24/7. We also cover nearby religious sites like <strong>Omkareshwar</strong>, <strong>Maheshwar</strong>, and <strong>Baglamukhi Mata</strong>.
                </p>
                <p>
                  <strong>Local Expertise:</strong> Being a local <Link href="/about" className="text-primary hover:underline"><em>Ujjain travel agency</em></Link>, we know the best time to visit temples to avoid crowds and the best places to taste authentic Malwa food like Poha-Jalebi and Dal-Bafla.
                </p>
              </div>
           </div>
        </div>

      </div>
    </section>
  )
}