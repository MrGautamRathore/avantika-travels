"use client"

import { motion } from "framer-motion"

export default function PageHeader({ title, subtitle, backgroundImage }) {
  return (
    <section className="relative py-20 md:py-32 flex items-center justify-center overflow-hidden bg-gray-900">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <div 
             className="absolute inset-0 bg-cover bg-center transform scale-105"
             style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}