"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { FiArrowRight, FiMapPin, FiStar, FiUsers, FiTrendingUp } from "react-icons/fi"

export default function PlaceCard({ place, index = 0, variant = "default" }) {
  const isLarge = variant === "large"
  
  // Use first image from images array or placeholder
  const imageUrl = place.images && place.images.length > 0 ? place.images[0].url : "/placeholder.svg"
  
  // Check if place is active
  const isActive = place.isActive !== false && place.isAtive !== false

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative ${isLarge ? "col-span-2 row-span-2" : ""}`}
      // SEO Schema Tags (Invisible to user)
      itemScope 
      itemType="http://schema.org/TouristAttraction"
    >
      <Link href={`/places/${place.slug}`}>
        <div className={`relative rounded-2xl overflow-hidden ${isLarge ? "h-[400px]" : "h-48"}`}>
          <Image
            src={imageUrl}
            // SEO Optimized Alt Text
            alt={`Visit ${place.title || place.name} - Best Tourist Place in Madhya Pradesh`}
            fill
            priority={index < 3}
            quality={90}
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            itemProp="image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Inactive overlay */}
          {!isActive && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
                Currently Closed
              </div>
            </div>
          )}
          
          {/* Rating badge */}
          {place.rating > 0 && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5" itemProp="aggregateRating" itemScope itemType="http://schema.org/AggregateRating">
              <FiStar className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-sm" itemProp="ratingValue">{place.rating.toFixed(1)}</span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-end justify-between">
              <div className="space-y-2">
                <h3 
                  className={`font-semibold text-white ${isLarge ? "text-2xl" : "text-lg"}`}
                  itemProp="name"
                >
                  {place.title || place.name}
                </h3>
                
                <div className="flex flex-wrap items-center gap-3 text-white/90 text-sm">
                  <div className="flex items-center gap-1.5" itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                    <FiMapPin className="w-3.5 h-3.5" />
                    <span itemProp="addressLocality">{place.location}</span>
                  </div>
                  
                  {/* Entry fee - only show if > 0 */}
                  {place.entryFee > 0 && (
                    <div className="flex items-center gap-1.5">
                      <span>₹ {place.entryFee.toLocaleString()}</span>
                    </div>
                  )}
                </div>
                
                {/* Additional info row for large cards (Only layout specific logic) */}
                {isLarge && (
                  <div className="flex flex-wrap items-center gap-3 text-white/80 text-xs">
                    {place.visitors > 0 && (
                      <div className="flex items-center gap-1.5">
                        <FiUsers className="w-3 h-3" />
                        <span>{place.visitors >= 1000 ? `${(place.visitors/1000).toFixed(1)}K` : place.visitors} visitors</span>
                      </div>
                    )}
                    
                    {place.category && (
                        <span className="bg-white/20 px-2 py-0.5 rounded text-white font-medium">
                            {place.category}
                        </span>
                    )}
                  </div>
                )}
                
                {/* Price info */}
                {place.price > 0 && place.entryFee !== place.price && (
                  <p className="text-primary text-sm font-medium">
                    From ₹{place.price.toLocaleString()}
                  </p>
                )}
              </div>
              
              {/* Arrow button (Original Style) */}
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                <FiArrowRight className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}