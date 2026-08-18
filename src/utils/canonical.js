const CANONICAL_BASE = 'https://www.avantikatravels.com'

function normalizePath(pathname = '/') {
  if (typeof pathname !== 'string') return '/'

  // Ensure leading slash
  let p = pathname.startsWith('/') ? pathname : `/${pathname}`

  // Remove trailing slashes for non-root paths
  if (p.length > 1) p = p.replace(/\/+$/, '')

  return p
}

/* *
 * Build canonical URL for a given pathname.
 * - Always uses https://www.avantikatravels.com
 * - Removes trailing slash except for root
 */
export function buildCanonicalUrl(pathname) {
  const p = normalizePath(pathname)
  if (p === '/') return `${CANONICAL_BASE}/`
  return `${CANONICAL_BASE}${p}`
}

/**
 * Convenience getter for client-side usage.
 */
export function getClientCanonicalUrl() {
  if (typeof window === 'undefined') return buildCanonicalUrl('/')
  return buildCanonicalUrl(window.location.pathname)
}

