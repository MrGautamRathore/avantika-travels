"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { FiMaximize2, FiX, FiMapPin, FiChevronRight, FiUser, FiArrowLeft } from "react-icons/fi"
import Link from "next/link"
import PageHeader from "@/components/ui/page-header"

export default function GalleryDetailPage() {
  const params = useParams()
  const slug = params.slug

  const [gallery, setGallery] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTrip, setActiveTrip] = useState(null)
  const [mainImage, setMainImage] = useState("")

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`/api/galleries/slug/${slug}`)
        if (!response.ok) {
          throw new Error('Gallery not found')
        }
        const data = await response.json()
        setGallery(data)
        setMainImage(data.images[0]?.url || data.images[0])
      } catch (err) {
        setError(err.message)
        console.error('Error fetching gallery:', err)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchGallery()
    }
  }, [slug])

  const openLightbox = (trip) => {
    setActiveTrip(trip)
    setMainImage(trip.images[0]?.url || trip.images[0])
  }

  if (loading) {
    return (
      <>
        <PageHeader
          title="Loading..."
          subtitle="Please wait while we load the gallery"
          backgroundImage="/pik4.avif"
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </>
    )
  }

  if (error || !gallery) {
    return (
      <>
        <PageHeader
          title="Gallery Not Found"
          subtitle="The gallery you're looking for doesn't exist"
          backgroundImage="/pik4.avif"
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Gallery Not Found</h2>
            <p className="text-gray-600 mb-8">The gallery you're looking for doesn't exist or has been removed.</p>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
              Back to Gallery
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHeader
        title={gallery.name}
        subtitle={`Travel memories from ${gallery.location}`}
        backgroundImage={gallery.images[0]?.url || gallery.images[0] || "/pik4.avif"}
      />

      <main className="bg-gray-50 min-h-screen py-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <FiArrowLeft className="w-5 h-5" />
              Back to Gallery
            </Link>
          </motion.div>

          {/* Gallery Detail Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 p-8">
              {/* Header Info */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 text-primary text-lg font-bold mb-2">
                  <FiMapPin className="w-5 h-5" />
                  {gallery.location}
                </div>
                <h1 className="text-4xl font-black text-gray-900 mb-4">{gallery.name}</h1>
                <div className="flex items-center justify-center gap-2 text-gray-600 mb-6">
                  <FiUser className="w-5 h-5" />
                  <span className="font-medium">{gallery.passengerName}</span>
                </div>
                <p className="text-xl text-gray-700 leading-relaxed italic max-w-3xl mx-auto border-l-4 border-primary pl-6">
                  "{gallery.story}"
                </p>
              </div>

              {/* Image Grid */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Photo Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {gallery.images.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                      onClick={() => openLightbox(gallery)}
                    >
                      <img
                        src={image.url || image}
                        alt={`${gallery.name} - Photo ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center bg-primary/5 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Inspired by this journey?</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Create your own unforgettable memories in {gallery.location}. Contact us to plan your perfect trip.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/packages"
                    className="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                  >
                    View Packages
                  </Link>
                  <Link
                    href="/contact"
                    className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeTrip && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-white flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-4 flex justify-between items-center border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <FiUser />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 leading-none">{activeTrip.passengerName}</h4>
                    <span className="text-xs text-gray-500">{activeTrip.location} Trip</span>
                  </div>
                </div>
                <button
                  className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-900 transition-all"
                  onClick={() => setActiveTrip(null)}
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Left Side: Big Image Display */}
                <div className="flex-[2] bg-gray-50 p-4 md:p-10 flex items-center justify-center relative">
                  <motion.img
                    key={mainImage}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={mainImage}
                    className="max-w-full max-h-full rounded-3xl shadow-2xl object-contain bg-white"
                  />
                </div>

                {/* Right Side: Thumbnails & Story */}
                <div className="flex-1 bg-white p-6 md:p-10 border-l overflow-y-auto">
                  <h2 className="text-3xl font-black text-gray-900 mb-4">{activeTrip.name}</h2>
                  <p className="text-gray-600 leading-relaxed text-lg italic mb-8 border-l-4 border-primary pl-4">
                    "{activeTrip.story}"
                  </p>

                  <h5 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">View Photos</h5>
                  <div className="grid grid-cols-3 gap-3">
                    {activeTrip.images.map((img, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`aspect-square rounded-2xl overflow-hidden cursor-pointer border-4 transition-all ${mainImage === (img.url || img) ? "border-primary" : "border-transparent opacity-50"}`}
                        onClick={() => setMainImage(img.url || img)}
                      >
                        <img src={img.url || img} className="w-full h-full object-cover" />
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-10 p-6 bg-primary/5 rounded-3xl">
                    <p className="text-sm font-bold text-primary mb-1">Want a similar experience?</p>
                    <p className="text-xs text-gray-600 mb-4">Book your custom package for {activeTrip.location} today.</p>
                    <button className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20">Enquire Now</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  )
}
