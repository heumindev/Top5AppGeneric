import { NextRequest, NextResponse } from 'next/server'
import { query, initializeDatabase } from '@/lib/db'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { email, siteName } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Get request details
    const headersList = await headers()
    const host = headersList.get('host') || 'unknown'
    const userAgent = headersList.get('user-agent') || null
    const forwardedFor = headersList.get('x-forwarded-for')
    const ipAddress = forwardedFor?.split(',')[0].trim() || null

    // Ensure the table exists
    await initializeDatabase()

    // Insert the email into the database
    await query(
      `INSERT INTO newsletter_subscribers (email, site_domain, site_name, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email, site_domain) DO UPDATE SET
         subscribed_at = CURRENT_TIMESTAMP,
         status = 'active'`,
      [email.toLowerCase(), host, siteName || null, ipAddress, userAgent]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter API error:', error)

    // Check for duplicate email error
    if (error instanceof Error && error.message.includes('duplicate')) {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve subscribers (protected - add auth in production)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const domain = searchParams.get('domain')

    await initializeDatabase()

    let result
    if (domain) {
      result = await query(
        'SELECT email, site_domain, subscribed_at, status FROM newsletter_subscribers WHERE site_domain = $1 ORDER BY subscribed_at DESC',
        [domain]
      )
    } else {
      result = await query(
        'SELECT email, site_domain, subscribed_at, status FROM newsletter_subscribers ORDER BY subscribed_at DESC'
      )
    }

    return NextResponse.json({ subscribers: result.rows })
  } catch (error) {
    console.error('Newsletter GET error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve subscribers' },
      { status: 500 }
    )
  }
}
