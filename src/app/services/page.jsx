"use client"

import Link from "next/link"
import Head from "next/head"
import { motion } from "framer-motion"
import PageHeader from "@/components/ui/page-header"
import { FaBus, FaPlane, FaTrain, FaMapPin, FaHeart, FaCheckCircle, FaWhatsapp, FaHeadset, FaRupeeSign } from "react-icons/fa"
// Importing context for dynamic contact info
import { useSite } from "@/context/site-context" 

const services = [
  {
    id: "train-ticket",
    name: "Train Ticket Booking",
    description: "Authorized IRCTC booking for Tatkal and General quotas.",
    icon: FaTrain,
    color: "bg-blue-500"
  },
  {
    id: "bus-ticket",
    name: "Bus Reservations",
    description: "AC Sleeper & Volvo bus booking from Indore & Ujjain.",
    icon: FaBus,
    color: "bg-green-500"
  },
  {
    id: "flight-ticket",
    name: "Flight Booking",
    description: "Cheap flight tickets from Indore (IDR) to anywhere.",
    icon: FaPlane,
    color: "bg-purple-500"
  },
  {
    id: "holiday-package",
    name: "Holiday Packages",
    description: "Customized family tours for MP Tourism and India.",
    icon: FaMapPin,
    color: "bg-orange-500"
  },
  {
    id: "honeymoon-package",
    name: "Honeymoon Specials",
    description: "Romantic getaways to Manali, Goa, and Kerala.",
    icon: FaHeart,
    color: "bg-pink-500"
  },
  {
    id: "taxi-service",
    name: "Taxi Service",
    description: "Sanitized cabs for Mahakal Darshan and Omkareshwar.",
    icon: FaBus, // Reusing bus icon or import FaCar if available
    color: "bg-yellow-500"
  }
]

export default function ServicesPage() {
  const { siteData } = useSite() // Using context for phone numbers

  // JSON-LD Schema for Local Business Services
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Travel Agency Services",
    "provider": {
      "@type": "TravelAgency",
      "name": "Avantika Travels",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ujjain",
        "addressRegion": "Madhya Pradesh",
        "addressCountry": "IN"
      }
    },
    "areaServed": ["Ujjain", "Indore", "Dewas", "Madhya Pradesh"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Travel Services",
      "itemListElement": services.map(s => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": s.name
        }
      }))
    }
  }

  return (
    <>
      <Head>
        <title>Travel Services in Ujjain & Indore | Train, Flight & Taxi Booking</title>
        <meta name="description" content="Best travel agency in Ujjain for Train Ticket Booking, Flight Tickets, and Taxi Services. We offer affordable holiday packages for Mahakal Darshan and MP Tourism." />
        <meta name="keywords" content="Train ticket agent Ujjain, Flight booking Indore, Taxi service Ujjain, Bus ticket booking, Honeymoon packages, Travel agent in MP" />
        <link rel="canonical" href="https://avantikatravels.com/services" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <PageHeader
        title="Our Services"
        subtitle="Your One-Stop Solution for Train, Flight, Bus & Tour Bookings in Madhya Pradesh"
        backgroundImage="/ram-ghat-ujjain.png"
      />

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          
          {/* Intro Text */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">Why Go Anywhere Else?</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
              Complete Travel Solutions Under One Roof
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At <strong>Avantika Travels</strong>, we don't just plan tours; we manage the entire logistics of your journey. 
              Whether you need a confirmed <em>Tatkal train ticket</em>, a budget <em>flight from Indore</em>, or a comfortable 
              <em>taxi for Mahakal Darshan</em>, our team ensures a hassle-free experience.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                >
                  <div className="p-8">
                    <div className={`w-16 h-16 ${service.color} rounded-2xl rotate-3 group-hover:rotate-6 transition-transform flex items-center justify-center mb-6 mx-auto shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-4 group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 text-center mb-8 min-h-[48px]">
                      {service.description}
                    </p>
                    <div className="text-center">
                      <Link
                        href="/contact"
                        className="inline-block bg-white border-2 border-primary text-primary px-6 py-2.5 rounded-full font-bold hover:bg-primary hover:text-white transition-all"
                      >
                        Enquire Now
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* --- SEO CONTENT BLOCK (400+ Words Strategy) --- */}
          <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Comprehensive Travel Assistance in Ujjain & Indore</h2>
                
                <div className="grid md:grid-cols-2 gap-12 text-gray-600 leading-relaxed">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <FaTrain className="text-blue-500" /> Train Ticket Booking Agent
                        </h3>
                        <p className="mb-6">
                            Finding confirmed train tickets in India can be challenging. As a trusted <strong>train ticket agent in Ujjain</strong>, we assist with General, Tatkal, and Ladies quota bookings. Whether you are travelling from <em>Ujjain Junction (UJN)</em> or <em>Indore (INDB)</em>, we help you find the best connections. Avoid the stress of IRCTC captchas and let us handle your railway reservations.
                        </p>

                        <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <FaPlane className="text-purple-500" /> Flight & Air Ticketing
                        </h3>
                        <p className="mb-6">
                            Looking for <strong>cheap flights from Indore Airport</strong>? We provide domestic and international flight booking services with zero hidden costs. We compare prices across airlines like Indigo, Air India, and Vistara to get you the best deal. Our service includes web check-in assistance and modification support.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <FaBus className="text-yellow-500" /> Taxi & Bus Services
                        </h3>
                        <p className="mb-6">
                            Our core expertise lies in road travel. We operate a fleet of well-maintained cars for <strong>Indore to Ujjain taxi services</strong>, Omkareshwar yatras, and Maheshwar trips. For budget travelers, we book tickets in luxury Volvo and sleeper buses connecting MP to Rajasthan, Gujarat, and Maharashtra. Safety and cleanliness are our top priorities.
                        </p>

                        <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <FaMapPin className="text-orange-500" /> Customized Holiday Packages
                        </h3>
                        <p>
                            Beyond ticketing, we craft experiences. From spiritual <strong>Mahakal Darshan packages</strong> to romantic <strong>honeymoon trips</strong> in Himachal or Kerala, we customize itineraries to fit your budget. We handle hotel bookings, meals, and sightseeing so you can just enjoy your vacation.
                        </p>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
                    <div className="flex flex-col items-center text-center p-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-3">
                            <FaCheckCircle className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-gray-900">Authorized Agents</h4>
                        <p className="text-sm text-gray-500">Trusted booking partner</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3">
                            <FaHeadset className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-gray-900">24/7 Support</h4>
                        <p className="text-sm text-gray-500">Always here to help</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-3">
                            <FaRupeeSign className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-gray-900">Best Prices</h4>
                        <p className="text-sm text-gray-500">No hidden charges</p>
                    </div>
                </div>

            </div>
          </article>

          {/* Final CTA */}
          <div className="mt-16 text-center">
             <h3 className="text-2xl font-bold text-gray-900 mb-6">Need Immediate Assistance?</h3>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                   href={`https://wa.me/${siteData.contactInfo?.phone?.replace(/\D/g, '') || '918720006707'}?text=Hi, I need to book a ticket.`}
                   target="_blank"
                   className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                    <FaWhatsapp className="w-5 h-5" /> Chat on WhatsApp
                </a>
             </div>
          </div>

        </div>
      </section>
    </>
  )
}