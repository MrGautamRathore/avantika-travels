// middleware.js (Update)
import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl.clone()
  const { pathname, hostname, search } = url

  // ✅ Static pages ke liye canonical header
  const staticPages = ['/places','/blogs', '/packages', '/terms-and-conditions', '/privacy-policy']
  
  if (staticPages.includes(pathname) && !search) {
    const response = NextResponse.next()
    
    // ✅ Explicit canonical header
    response.headers.set(
      'Link', 
      `<https://avantikatravels.com${pathname}>; rel="canonical"`
    )
    
    // ✅ Agar www hai toh redirect karo
   /*  if (hostname === 'www.avantikatravels.com') {
      const newUrl = new URL(`https://avantikatravels.com${pathname}`)
      return NextResponse.redirect(newUrl, 301)
    } */
    
    return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/places/:path*','/blogs/:path*', '/packages/:path*', '/terms-and-conditions', '/privacy-policy'],
}