import type { Metadata, Viewport } from 'next'
import { Inter, Poppins, Playfair_Display, Source_Sans_3 } from 'next/font/google'
import { getCurrentSiteConfig } from '@/lib/get-site-config'
import { SiteProvider } from '@/lib/site-context'
import { ThemeColors } from '@/config/types'
import { GoogleTagManager } from '@/components/GoogleTagManager'
import './globals.css'

// Load all fonts that might be used by different sites
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#DC2626',
}

// Dynamic metadata based on site config
export async function generateMetadata(): Promise<Metadata> {
  const config = await getCurrentSiteConfig()

  return {
    title: {
      default: config.meta.title,
      template: `%s | ${config.branding.name}`,
    },
    description: config.meta.description,
    keywords: config.meta.keywords,
    authors: [{ name: config.branding.name }],
    creator: config.branding.name,
    publisher: config.branding.name,
    metadataBase: new URL(`https://${config.domain}`),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `https://${config.domain}`,
      siteName: config.branding.name,
      title: config.meta.title,
      description: config.meta.description,
      images: [
        {
          url: config.meta.ogImage,
          width: 1200,
          height: 630,
          alt: config.branding.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.meta.title,
      description: config.meta.description,
      images: [config.meta.ogImage],
      creator: config.meta.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-icon.svg',
    },
  }
}

// Generate CSS variables from theme colors
function generateCSSVariables(colors: ThemeColors): string {
  return `
    --color-primary: ${colors.primary};
    --color-primary-dark: ${colors.primaryDark};
    --color-primary-light: ${colors.primaryLight};
    --color-secondary: ${colors.secondary};
    --color-accent: ${colors.accent};
    --color-background: ${colors.background};
    --color-surface: ${colors.surface};
    --color-text: ${colors.text};
    --color-text-muted: ${colors.textMuted};
  `
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const config = await getCurrentSiteConfig()
  const cssVariables = generateCSSVariables(config.theme.colors)

  // Determine font variables based on site config
  const fontVariables = `
    --font-heading: ${config.theme.fonts.heading};
    --font-body: ${config.theme.fonts.body};
  `

  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${playfair.variable} ${sourceSans.variable}`}
    >
      <head>
        <style
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `:root { ${cssVariables} ${fontVariables} }`,
          }}
        />
        {/* Structured data for organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: config.branding.name,
              url: `https://${config.domain}`,
              logo: `https://${config.domain}${config.branding.logo}`,
              description: config.meta.description,
              sameAs: [
                config.social?.instagram,
                config.social?.pinterest,
                config.social?.facebook,
                config.social?.twitter,
                config.social?.youtube,
              ].filter(Boolean),
            }),
          }}
        />
        {/* Structured data for website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: config.branding.name,
              url: `https://${config.domain}`,
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `https://${config.domain}/recipes?q={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <GoogleTagManager />
        <SiteProvider config={config}>
          {children}
        </SiteProvider>
      </body>
    </html>
  )
}
