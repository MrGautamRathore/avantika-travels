"use client";

import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FiUser,
  FiClock,
  FiCalendar,
  FiArrowLeft,
  FiShare2,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiPhone,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import BlogCard from "@/components/ui/blog-card";
import { useSite } from "@/context/site-context";
import Head from "next/head";
import AIEnhancements from "@/components/seo/AIEnhancements";

export default function BlogDetailsPage({ params }) {
  const resolvedParams = use(params);
  const { blogs, siteData } = useSite();
  const [currentUrl, setCurrentUrl] = useState("");

  const blog = blogs.find((b) => b.slug === resolvedParams.slug);
  const relatedBlogs = blogs
    .filter((b) => b.id !== blog?.id && b.category === blog?.category)
    .slice(0, 3);

  // Calculate Reading Time
  const words = blog?.content ? blog.content.split(" ").length : 0;
  const readTime = Math.ceil(words / 200); // Avg reading speed 200 wpm

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);
  const authorDescriptions = {
    "Spiritual Travel":
      "Specializing in Mahakal Darshan and Omkareshwar Yatra. We ensure your spiritual journey is peaceful, comfortable, and handled with care.",

    "Food & Culture":
      "From Sarafa's night market to Ujjain's street food, we guide you to the authentic tastes and vibrant traditions of the Malwa region.",

    "City Exploration":
      "Discover the hidden gems of Ujjain and Indore. Our local experts help you navigate the cities like a pro, covering all must-visit spots.",

    "Travel Tips":
      "Planning a trip can be overwhelming. We provide practical tips, logistics support, and reliable taxi services to make your MP trip hassle-free.",

    Historical:
      "Madhya Pradesh is a land of ancient history. Let us take you back in time to explore the heritage forts, temples, and architectural marvels.",

    default:
      "Your trusted travel partner in Ujjain. We help devotees and travelers explore the spiritual and natural beauty of Madhya Pradesh with comfort.",
  };
  const currentAuthorDesc =
    authorDescriptions[blog?.category] || authorDescriptions["default"];
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Blog post not found
          </h1>
          <Link
            href="/blogs"
            className="text-primary hover:underline font-medium"
          >
            ← Back to Travel Stories
          </Link>
        </div>
      </div>
    );
  }

  // JSON-LD Schema for Blog Post & Breadcrumbs
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: blog.title,
        image: blog.image?.url || "https://avantikatravels.com/logo.png",
        datePublished: blog.createdAt, // Ensure your DB has this field
        dateModified: blog.updatedAt || blog.createdAt,
        author: {
          "@type": "Person",
          name: blog.author || "Avantika Travels Team",
        },
        publisher: {
          "@type": "Organization",
          name: "Avantika Travels",
          logo: {
            "@type": "ImageObject",
            url: "https://avantikatravels.com/logo.png",
          },
        },
        description: blog.excerpt,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://avantikatravels.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blogs",
            item: "https://avantikatravels.com/blogs",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: blog.title,
          },
        ],
      },
    ],
  };

  // Social Share Handlers
  const shareText = encodeURIComponent(
    `Check out this amazing guide: ${blog.title}`,
  );
  const shareUrl = encodeURIComponent(currentUrl);

  return (
    <>
      <AIEnhancements pageType="blog" data={blog} />
      <Head>
        <title>{`${blog.title} | Avantika Travels`}</title>
        <meta name="description" content={blog.excerpt} />
        <meta
          name="keywords"
          content={`Ujjain tourism, ${blog.category}, ${blog.title}, Mahakal Darshan guide, MP travel tips`}
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://avantikatravels.com/blogs/${blog.slug}`}
        />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:image" content={blog.image?.url || "/logo.png"} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={blog.title} />
        <meta property="twitter:description" content={blog.excerpt} />
        <meta
          property="twitter:image"
          content={blog.image?.url || "/logo.png"}
        />

        <link
          rel="canonical"
          href={`https://avantikatravels.com/blogs/${blog.slug}`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px]">
        <div className="absolute inset-0">
          <Image
            src={blog.image?.url || "/placeholder.svg"}
            alt={`Cover image for ${blog.title}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-end pb-12">
          <div className="w-48">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors w-fit bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to Guides
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {blog.category}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <FiClock className="w-3 h-3" /> {readTime} min read
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-base font-medium">
              <span className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <FiUser className="w-4 h-4" />
                </div>
                {blog.author || "Avantika Editor"}
              </span>
              <span className="flex items-center gap-2">
                <FiCalendar className="w-4 h-4 opacity-70" />
                {new Date(blog.date || Date.now()).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white px-6 md:px-12">
        <div className="container mx-auto px-6 ">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary hover:prose-a:text-primary-dark prose-img:rounded-2xl prose-strong:text-gray-900"
              >
                <div className="whitespace-pre-line">{blog.content}</div>
              </motion.div>

              {/* Share Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-20 pt-10 border-t border-gray-200"
              >
                <div className="max-w-xl mx-auto text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
                    <FiShare2 className="text-primary" />
                    Share this useful guide
                  </h3>

                  <p className="text-gray-500 text-sm mb-6">
                    Help others discover this information
                  </p>

                  {/* Social Icons Container */}
                  <div className="flex items-center justify-center gap-4">
                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-12 h-12 bg-white border border-gray-200 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                      aria-label="Share on Facebook"
                    >
                      <FiFacebook className="w-5 h-5 text-[#1877F2] group-hover:scale-110 transition-transform" />
                    </a>

                    {/* Twitter */}
                    <a
                      href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-12 h-12 bg-white border border-gray-200 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                      aria-label="Share on Twitter"
                    >
                      <FiTwitter className="w-5 h-5 text-[#1DA1F2] group-hover:scale-110 transition-transform" />
                    </a>

                    {/* WhatsApp */}
                    <a
                      href={`https://api.whatsapp.com/send?text=${shareText} ${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-12 h-12 bg-white border border-gray-200 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                      aria-label="Share on WhatsApp"
                    >
                      <FaWhatsapp className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform" />
                    </a>

                    {/* LinkedIn */}
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-12 h-12 bg-white border border-gray-200 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                      aria-label="Share on LinkedIn"
                    >
                      <FiLinkedin className="w-5 h-5 text-[#0A66C2] group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </article>

            {/* Sticky Sidebar */}
            <aside className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="sticky top-24 space-y-8"
              >
                {/* Author/Company Card */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-primary/10  flex items-center justify-center text-primary text-2xl font-bold overflow-hidden relative">
                      {/* Logo Image */}
                      <Image
                        src={"/logo.png"}
                        alt="Avantika Travels"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">
                        Avantika Travels
                      </p>
                      {/* Subtitle bhi dynamic kar sakte hain agar chahein, abhi static rakha hai */}
                      <p className="text-sm text-gray-500">
                        Ujjain & MP Experts
                      </p>
                    </div>
                  </div>

                  {/* DYNAMIC DESCRIPTION HERE */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {currentAuthorDesc}
                  </p>
                </div>
                {/* Primary CTA Card */}
                <div className="rounded-2xl p-8 text-white shadow-lg relative overflow-hidden mt-4">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>

                  <h3 className="font-bold text-2xl mb-2 text-primary">
                    Want to visit Ujjain?
                  </h3>
                  <p className="text-gray-800 mb-6 text-sm">
                    Book your Mahakal Darshan taxi and hotel package with us
                    today.
                  </p>

                  <div className="space-y-3">
                    <Link
                      href={`https://wa.me/${siteData.contactInfo?.phone?.replace(/\D/g, "") || "918720006707"}?text=Hi, I read your blog and need help planning my Ujjain trip.`}
                      className="block w-full bg-gray-100 text-primary text-center font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      View Packages
                    </Link>
                    <Link
                      href={`tel:${siteData.contactInfo?.phone}`}
                      className="flex items-center justify-center gap-2 w-full bg-white border border-gray-200 text-black text-center font-semibold py-3 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <FiPhone className="w-4 h-4" /> Call Expert
                    </Link>
                  </div>
                </div>

                {/* Quick Categories */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4">
                    Explore More Topics
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Ujjain",
                      "Omkareshwar",
                      "Travel Tips",
                      "Food",
                      "Festivals",
                    ].map((tag) => (
                      <Link
                        key={tag}
                        href={`/blogs`}
                        className="text-xs font-medium bg-white border border-gray-200 px-3 py-1.5 rounded-md hover:border-primary hover:text-primary transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Blogs Section */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog, index) => (
                <BlogCard
                  key={relatedBlog.id}
                  blog={relatedBlog}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
