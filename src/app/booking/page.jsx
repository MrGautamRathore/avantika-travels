import { Suspense } from "react"
import BookingForm from "./BookingForm"

// SEO Metadata for Booking Page
export const metadata = {
  title: "Book Your Madhya Pradesh Tour Package | Avantika Travels",
  description: "Book your customized Madhya Pradesh tour package online with Avantika Travels. Secure booking for Mahakal Mandir tours, Ujjain pilgrimage, and spiritual journeys. Instant confirmation and best prices.",
  keywords: [
    "book tour package",
    "online booking",
    "tour reservation",
    "Mahakal Mandir tours",
    "Ujjain pilgrimage",
    "Madhya Pradesh travel",
    "Avantika Travels",
    "spiritual tours",
    "pilgrimage packages",
    "Ujjain tours",
    "Indore tours",
    "best travel agency",
    "book taxi Ujjain",
    "pilgrimage booking",
    "temple tour booking",
    "Madhya Pradesh holiday packages",
    "spiritual journey booking",
    "Mahakal Temple darshan booking",
    "Ujjain travel booking",
    "Indore travel booking",
    "Dewas travel booking",
    "best tour packages Avantika Travels",
    "cheap pilgrimage packages",
    "affordable spiritual tours",
    "book Mahakal Mandir tour",
    "Ujjain taxi booking",
    "Indore car rental",
    "Madhya Pradesh tour reservation",
    "online pilgrimage booking",
    "temple darshan booking",
    "sacred sites tour booking",
    "religious tourism booking",
    "central India travel booking"
  ],
  openGraph: {
    title: "Book Your Madhya Pradesh Tour Package | Avantika Travels",
    description: "Secure online booking for Mahakal Mandir tours and Ujjain pilgrimage packages. Best spiritual journeys with Avantika Travels.",
    url: "https://avantikatravels.com/booking",
    siteName: "Avantika Travels",
    images: [
      {
        url: "/logo2.jpg",
        width: 940,
        height: 940,
        alt: "Avantika Travels - Book Your Tour Package",
      },
      {
        url: "/icon.jpg",
        width: 940,
        height: 940,
        alt: "Ujjain Travels and Madhya Pradesh Tours with Avantika Travels",
      },
      {
        url: "/logo.png",
        width: 846,
        height: 846,
        alt: "Avantika Travels - Best Travel Agency in Ujjain",
      }
      
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Your Madhya Pradesh Tour Package | Avantika Travels",
    description: "Secure online booking for Mahakal Mandir tours and Ujjain pilgrimage packages.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://avantikatravels.com/booking",
  },
};

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingForm />
    </Suspense>
  )
}
