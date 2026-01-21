import { MetadataRoute } from 'next'
import { getAllSiteConfigs } from '@/config/sites'

export default function sitemap(): MetadataRoute.Sitemap {
  const configs = getAllSiteConfigs()
  const sitemap: MetadataRoute.Sitemap = []

  // Generate sitemap entries for each site
  configs.forEach((config) => {
    const baseUrl = `https://${config.domain}`

    // Homepage
    sitemap.push({
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    })

    // Recipes page
    sitemap.push({
      url: `${baseUrl}/recipes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    })

    // About page
    sitemap.push({
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })

    // Protein Guide page (SEO content)
    sitemap.push({
      url: `${baseUrl}/protein-guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })

    // Individual recipe pages
    config.recipes.forEach((recipe) => {
      sitemap.push({
        url: `${baseUrl}/recipes/${recipe.slug}`,
        lastModified: new Date(recipe.dateModified || recipe.datePublished),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    })
  })

  return sitemap
}
