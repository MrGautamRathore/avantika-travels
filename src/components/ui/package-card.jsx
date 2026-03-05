"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { FiMapPin, FiClock, FiCalendar } from "react-icons/fi"

export default function PackageCard({ pkg, index = 0 }) {
  const handleBookNow = (e) => {
    // Let the link navigate to booking page
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      <div className="relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
        <Link href={`/packages/${pkg.slug}`} className="block">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={pkg.images[0]?.url || "/placeholder.svg"}
              alt={`${pkg.name} - ${pkg.duration} Tour Package to ${pkg.destination}, Madhya Pradesh | Avantika Travels`}
              fill
              priority={index < 3}
              quality={75}
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {pkg.discount > 0 && (
              <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                -{pkg.discount}% OFF
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col flex-1">
            {/* Duration & Destination */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 min-h-[20px]">
              <FiClock className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="font-medium whitespace-nowrap">{pkg.duration}</span>
              <span className="text-gray-300">|</span>
              <FiMapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="font-medium line-clamp-1">{pkg.destination}</span>
            </div>

            {/* Package Name */}
            <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors text-base">
              {pkg.name}
            </h3>

            {/* Package Description - 3 Lines */}
            {pkg.description && (
              <p className="text-sm text-gray-500 mb-3 line-clamp-3 leading-relaxed">
                {pkg.description}
              </p>
            )}

            {/* Price Section */}
            <div className="mt-auto">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-primary font-bold text-xl">₹{pkg.price.toLocaleString()}</span>
                {pkg.originalPrice > pkg.price && (
                  <span className="text-muted-foreground text-sm line-through">
                    ₹{pkg.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-muted-foreground text-xs">/person</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Book Now Button - Properly placed at bottom */}
        <div className="px-4 pb-4 pt-0">
          <Link 
            href={`/booking?packageId=${pkg._id}`}
            className="block"
            onClick={handleBookNow}
          >
            <button className="w-full bg-primary text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              <FiCalendar className="w-4 h-4" />
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
