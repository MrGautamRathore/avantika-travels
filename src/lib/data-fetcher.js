// lib/data-fetcher.js
export async function getSiteData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
  
  try {
    const [placesRes, siteRes] = await Promise.all([
      fetch(`${apiUrl}/places`, { next: { revalidate: 3600 } }),
      fetch(`${apiUrl}/site`, { next: { revalidate: 3600 } }),
    ])

    const places = placesRes.ok ? await placesRes.json() : []
    const siteData = siteRes.ok ? await siteRes.json() : {}

    return { places, siteData }
  } catch (error) {
    console.error('❌ Data fetch error:', error)
    return { places: [], siteData: {} }
  }
}