"use client"

import { useState, useEffect } from "react"
import PageHeader from "@/components/ui/page-header"
import BlogCard from "@/components/ui/blog-card"
import Pagination from "@/components/ui/pagination"
import { useSite } from "@/context/site-context"
import Head from "next/head"
import Link from "next/link"
import { FiPhone, FiBookOpen, FiCalendar, FiMapPin } from "react-icons/fi"
import { FaWhatsapp } from "react-icons/fa"

export default function BlogsPage() {
  const { blogs, siteData } = useSite()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  // JSON-LD Schema for Blog
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Avantika Travels Blog - Ujjain & MP Tourism Guide",
    "description": "Read expert travel tips, Mahakal Darshan guides, and hidden gems of Madhya Pradesh.",
    "url": "https://avantikatravels.com/blogs",
    "publisher": {
      "@type": "Organization",
      "name": "Avantika Travels",
      "logo": {
        "@type": "ImageObject",
        "url": "https://avantikatravels.com/logo.png"
      }
    },
    "blogPost": blogs.map(blog => ({
      "@type": "BlogPosting",
      "headline": blog.title,
      "image": blog.image,
      "datePublished": blog.createdAt,
      "author": {
        "@type": "Organization",
        "name": "Avantika Travels Team"
      }
    }))
  }

  const categories = ["All", ...new Set(blogs.map((blog) => blog.category))]
  const filteredBlogs = selectedCategory === "All" ? blogs : blogs.filter((blog) => blog.category === selectedCategory)

  // Pagination logic
  const totalItems = filteredBlogs.length
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    const element = document.getElementById('blog-grid');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  return (
    <>
      <Head>
        <title>Ujjain Travel Guide & MP Tourism Blog | Avantika Travels</title>
        <meta name="description" content="Ultimate guide for Mahakal Darshan, Bhasma Aarti booking, and best places to visit in Ujjain & Indore. Expert travel tips by Avantika Travels." />
        <meta name="keywords" content="Ujjain travel blog, Mahakal Bhasma Aarti guide, MP tourism tips, Indore street food, Omkareshwar travel guide, Best time to visit Ujjain" />
        <link rel="canonical" href="https://avantikatravels.com/blogs" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <PageHeader
        title="Travel Stories & Guides"
        subtitle="Expert tips for your spiritual journey to Mahakal and beyond."
        backgroundImage="/sanchi-stup.png"
      />

      <main className="bg-gray-50">
        
        {/* Intro SEO Section */}
        <section className="bg-white py-12 border-b border-gray-200">
           <div className="container mx-auto px-4 text-center max-w-4xl">
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">The Avantika Chronicles</span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                 Your Ultimate <span className="text-primary">Ujjain & MP Travel Guide</span>
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                 Planning a trip to the <strong>City of Temples</strong>? Our blog covers everything you need to know—from 
                 <em> how to book Bhasma Aarti tickets online</em> to finding the <em>best street food in Indore</em>. 
                 Explore our curated articles to make your <strong>Madhya Pradesh tour</strong> hassle-free and memorable.
              </p>
           </div>
        </section>

        <section id="blog-grid" className="py-16">
          <div className="container mx-auto px-4">
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full font-medium capitalize transition-all shadow-sm ${
                    selectedCategory === category 
                      ? "bg-primary text-white shadow-md transform scale-105" 
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
              {paginatedBlogs.map((blog, index) => (
                <BlogCard key={blog._id} blog={blog} index={index} />
              ))}
            </div>

            {/* Empty State */}
            {filteredBlogs.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300 mt-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiBookOpen className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">No articles found in this category yet.</p>
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="mt-4 text-primary font-semibold hover:underline"
                >
                  View all articles
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalItems > itemsPerPage && (
              <div className="mt-12">
                <Pagination
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </section>

        {/* --- DEEP SEO CONTENT BLOCK (Informational Keywords) --- */}
        <article className="bg-white py-16 border-t border-gray-200">
           <div className="container mx-auto px-4 max-w-5xl">
              <header className="mb-10 text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Essential Travel Tips for Ujjain Yatris</h2>
                  <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
              </header>

              <div className="grid md:grid-cols-3 gap-8">
                 {/* Tip 1 */}
                 <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-600">
                       <FiCalendar className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Best Time to Visit</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                       While Ujjain is a year-round destination, the months of <strong>October to March</strong> offer the most pleasant weather. The holy month of <strong>Sawan (Shravan)</strong> sees huge crowds but offers a unique spiritual experience during the <em>Mahakal Sawari</em>.
                    </p>
                 </div>

                 {/* Tip 2 */}
                 <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                       <FiMapPin className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Mahakal Corridor</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                       The newly inaugurated <strong>Mahakal Lok Corridor</strong> is a must-visit. It features 108 grand pillars and statues depicting Lord Shiva's life. It is best viewed in the evening when the lights create a mesmerizing atmosphere.
                    </p>
                 </div>

                 {/* Tip 3 */}
                 <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                       <FiBookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Bhasma Aarti Booking</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                       <strong>Bhasma Aarti</strong> slots are limited and fill up weeks in advance. We recommend booking online through the official portal at least 15-20 days prior. Need help? Read our detailed guide or contact us.
                    </p>
                 </div>
              </div>
           </div>
        </article>

        {/* --- CTA SECTION --- */}
        <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-16 text-center text-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">Want a Hassle-Free Darshan Experience?</h2>
                <p className="text-gray-800 mb-8 max-w-2xl mx-auto">
                   Don't let planning stress ruin your spiritual journey. Let our local experts handle your taxi, hotel, and darshan arrangements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/contact"
                        className="flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-full shadow-lg hover:bg-primary-dark hover:scale-105 transition-all"
                    >
                        <FiPhone className="w-5 h-5" />
                        Contact Us
                    </Link>

                    <a
                        href={`https://wa.me/${siteData.contactInfo?.phone?.replace(/\D/g, '') || '918720006707'}?text=Hi, I read your blog and need help planning my Ujjain trip.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-white text-gray-900 font-bold px-6 py-3 rounded-full shadow-lg hover:text-primary hover:scale-105 transition-all"
                    >
                        <FaWhatsapp className="w-5 h-5 text-green-500" />
                        Chat with Expert
                    </a>
                </div>
            </div>
        </section>

      </main>
    </>
  )
}