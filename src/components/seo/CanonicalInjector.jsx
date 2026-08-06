'use client'

import { useEffect, useState } from 'react'
import Head from 'next/head'
import { getClientCanonicalUrl } from '@/utils/canonical'

export function CanonicalInjector() {
  const [canonicalUrl, setCanonicalUrl] = useState('')

  useEffect(() => {
    setCanonicalUrl(getClientCanonicalUrl())
  }, [])

  // Avoid rendering an incorrect canonical during the first hydration tick.
  if (!canonicalUrl) return null

  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  )
}

