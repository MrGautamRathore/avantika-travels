"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import PageHeader from "@/components/ui/page-header"
import {FaBus ,FaPlane , FaTrain,  FaMapPin, FaHeart} from "react-icons/fa"

const services = [
  {
    id: "train-ticket",
    name: "Train Ticket",
    description: "Book train tickets for your journey across India",
    icon: FaTrain,
    color: "bg-blue-500"
  },
  {
    id: "bus-ticket",
    name: "Bus Ticket",
    description: "Comfortable bus travel options for all destinations",
    icon: FaBus,
    color: "bg-green-500"
  },
  {
    id: "flight-ticket",
    name: "Flight Ticket",
    description: "Domestic and international flight bookings",
    icon: FaPlane,
    color: "bg-purple-500"
  },
  {
    id: "holiday-package",
    name: "Holiday Package",
    description: "Complete holiday packages with accommodation and activities",
    icon: FaMapPin,
    color: "bg-orange-500"
  },
  {
    id: "honeymoon-package",
    name: "Honeymoon Package",
    description: "Romantic honeymoon packages for newlyweds",
    icon: FaHeart,
    color: "bg-pink-500"
  }
]

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive travel solutions for all your journey needs"
        backgroundImage="/bg1.jpg"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Service
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From transportation to complete travel packages, we offer everything you need for a seamless journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="p-8">
                    <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mb-6 mx-auto`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground text-center mb-4">
                      {service.name}
                    </h3>
                    <p className="text-muted-foreground text-center mb-6">
                      {service.description}
                    </p>
                    <div className="text-center">
                      <Link
                        href={`/booking?service=${service.id}`}
                        className="inline-block bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
