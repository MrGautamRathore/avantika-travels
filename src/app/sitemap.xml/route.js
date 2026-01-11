import { getServerSideSitemap } from 'next-sitemap'
//import { NextResponse } from 'next/server'

// Helper function to sanitize and encode URLs
function sanitizeUrl(url) {
  if (!url || typeof url !== 'string') return '';
  // Encode special characters but keep slashes and colons
  return encodeURI(url).replace(/%5B/g, '[').replace(/%5D/g, ']').replace(/%40/g, '@');
}

// Helper function to format date to ISO string
function formatDate(date) {
  if (!date) return new Date().toISOString();
  const d = new Date(date);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

// Helper function to validate sitemap entry
function validateSitemapEntry(entry) {
  return entry.url && entry.url.trim() !== '' &&
         entry.lastModified && entry.changeFrequency && entry.priority !== undefined;
}

export async function GET(request) {
  try {
    // Base URL for the sitemap
    const baseUrl = 'https://avantikatravels.com'

    // Static pages with their priorities and change frequencies
    const staticPages = [
      {
        url: sanitizeUrl(baseUrl),
        lastModified: formatDate(new Date()),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: sanitizeUrl(`${baseUrl}/about`),
        lastModified: formatDate(new Date()),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: sanitizeUrl(`${baseUrl}/contact`),
        lastModified: formatDate(new Date()),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: sanitizeUrl(`${baseUrl}/places`),
        lastModified: formatDate(new Date()),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: sanitizeUrl(`${baseUrl}/packages`),
        lastModified: formatDate(new Date()),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: sanitizeUrl(`${baseUrl}/blogs`),
        lastModified: formatDate(new Date()),
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: sanitizeUrl(`${baseUrl}/services`),
        lastModified: formatDate(new Date()),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: sanitizeUrl(`${baseUrl}/booking`),
        lastModified: formatDate(new Date()),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: sanitizeUrl(`${baseUrl}/privacy-policy`),
        lastModified: formatDate(new Date()),
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: sanitizeUrl(`${baseUrl}/terms-and-conditions`),
        lastModified: formatDate(new Date()),
        changeFrequency: 'yearly',
        priority: 0.3,
      },
    ]

    // Fetch dynamic content from API
    let dynamicPages = []

    try {
      // Fetch places
      const placesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/places`, {
        cache: 'no-store'
      })

      if (placesResponse.ok) {
        const places = await placesResponse.json()
        const placePages = places
          .filter(place => place.slug && place.slug.trim() !== '')
          .map(place => ({
            url: sanitizeUrl(`${baseUrl}/places/${place.slug}`),
            lastModified: formatDate(place.updatedAt || place.createdAt),
            changeFrequency: 'weekly',
            priority: 0.8,
          }))
          .filter(validateSitemapEntry)
        dynamicPages.push(...placePages)
      }

      // Fetch packages
      const packagesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/packages`, {
        cache: 'no-store'
      })

      if (packagesResponse.ok) {
        const packages = await packagesResponse.json()
        const packagePages = packages
          .filter(pkg => pkg.slug && pkg.slug.trim() !== '')
          .map(pkg => ({
            url: sanitizeUrl(`${baseUrl}/packages/${pkg.slug}`),
            lastModified: formatDate(pkg.updatedAt || pkg.createdAt),
            changeFrequency: 'weekly',
            priority: 0.8,
          }))
          .filter(validateSitemapEntry)
        dynamicPages.push(...packagePages)
      }

      // Fetch blogs
      const blogsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/blogs`, {
        cache: 'no-store'
      })

      if (blogsResponse.ok) {
        const blogs = await blogsResponse.json()
        const blogPages = blogs
          .filter(blog => blog.slug && blog.slug.trim() !== '' && blog.published !== false)
          .map(blog => ({
            url: sanitizeUrl(`${baseUrl}/blogs/${blog.slug}`),
            lastModified: formatDate(blog.updatedAt || blog.createdAt || blog.date),
            changeFrequency: 'monthly',
            priority: 0.6,
          }))
          .filter(validateSitemapEntry)
        dynamicPages.push(...blogPages)
      }

      // Fetch package categories
      const packageCategories = [
        'holiday', 'adventure', 'honeymoon', 'pilgrimage', 'family', 'weekend'
      ]

      const categoryPages = packageCategories.map(category => ({
        url: sanitizeUrl(`${baseUrl}/packages?type=${category}`),
        lastModified: formatDate(new Date()),
        changeFrequency: 'weekly',
        priority: 0.7,
      }))

      dynamicPages.push(...categoryPages)

    } catch (error) {
      console.error('Error fetching dynamic content for sitemap:', error)
      // Continue with static pages only
    }

    // Combine all pages and filter valid entries
    const allPages = [...staticPages, ...dynamicPages].filter(validateSitemapEntry)

    // Return sitemap using next-sitemap
    return getServerSideSitemap(allPages)

  } catch (error) {
    console.error('Error generating sitemap:', error)

    // Fallback sitemap with basic pages
    const fallbackPages = [
      {
        url: sanitizeUrl(process.env.NEXT_PUBLIC_BASE_URL || 'https://avantikatravels.com'),
        lastModified: formatDate(new Date()),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: sanitizeUrl(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://avantikatravels.com'}/places`),
        lastModified: formatDate(new Date()),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: sanitizeUrl(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://avantikatravels.com'}/packages`),
        lastModified: formatDate(new Date()),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: sanitizeUrl(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://avantikatravels.com'}/blogs`),
        lastModified: formatDate(new Date()),
        changeFrequency: 'daily',
        priority: 0.8,
      },
    ].filter(validateSitemapEntry)

    return getServerSideSitemap(fallbackPages)
  }
}
