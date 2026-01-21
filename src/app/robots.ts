import { MetadataRoute } from 'next'
import { getAllSiteConfigs } from '@/config/sites'

export default function robots(): MetadataRoute.Robots {
  const configs = getAllSiteConfigs()

  // Generate sitemap URLs for all domains
  const sitemaps = configs.map((config) => `https://${config.domain}/sitemap.xml`)

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/'],
      },
    ],
    sitemap: sitemaps,
  }
}
