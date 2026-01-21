import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSiteIdFromHost } from '@/lib/get-site-config'

export function middleware(request: NextRequest) {
  // Get the hostname from the request
  const hostname = request.headers.get('host') || 'localhost:3000'

  // Determine the site ID based on the hostname
  const siteId = getSiteIdFromHost(hostname)

  // Clone the request headers and add the site ID
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-site-id', siteId)
  requestHeaders.set('x-hostname', hostname)

  // Create response with updated headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // Also set the site ID in the response headers for client-side access
  response.headers.set('x-site-id', siteId)

  return response
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    // Match all paths except static files and api routes that don't need site context
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|sites/).*)',
  ],
}
