"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { FiArrowRight, FiMapPin, FiUser, FiChevronRight } from "react-icons/fi"

export default function GallerySection() {
  const [galleries, setGalleries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await fetch('/api/galleries')
        if (!response.ok) {
          throw new Error('Failed to fetch galleries')
        }
        const data = await response.json()
        // Take only first 3 galleries for home page
        setGalleries(data.slice(0, 3))
      } catch (err) {
        console.error('Error fetching galleries:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchGalleries()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto mb-12"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="h-48 bg-gray-300 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (galleries.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Travel Memories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the joy and experiences shared by our happy travelers from their unforgettable journeys across Madhya Pradesh.
          </p>
        </motion.div>

        {/* Gallery Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {galleries.map((gallery, index) => (
            <motion.div
              key={gallery._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => window.open(`/gallery/${gallery.slug}`, '_blank')}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                {/* Image Grid */}
                <div className="relative h-64 overflow-hidden">
                  <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
                    {gallery.images.slice(0, 4).map((image, imgIndex) => (
                      <div key={imgIndex} className="relative overflow-hidden">
                        <img
                          src={image.url || image}
                          alt={`${gallery.name} - Image ${imgIndex + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {imgIndex === 3 && gallery.images.length > 4 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">+{gallery.images.length - 4}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <FiChevronRight className="w-8 h-8 mx-auto mb-2" />
                      <span className="font-semibold">View Gallery</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-primary text-sm font-bold mb-2">
                    <FiMapPin className="w-4 h-4" />
                    {gallery.location}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {gallery.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                    <FiUser className="w-4 h-4" />
                    {gallery.passengerName}
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 italic">
                    "{gallery.story}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            View All Memories
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
