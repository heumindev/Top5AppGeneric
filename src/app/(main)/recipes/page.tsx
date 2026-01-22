import { Metadata } from 'next'
import { getCurrentSiteConfig } from '@/lib/get-site-config'
import { RecipeGrid } from '@/components/recipes'
import { HeuminCTA } from '@/components/common'

export async function generateMetadata(): Promise<Metadata> {
  const config = await getCurrentSiteConfig()
  const canonicalUrl = `https://${config.domain}/recipes`

  return {
    title: `All Recipes | ${config.branding.name}`,
    description: `Browse all ${config.recipes.length} delicious recipes from ${config.branding.name}. ${config.branding.tagline}`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `All Recipes | ${config.branding.name}`,
      description: `Browse all ${config.recipes.length} delicious recipes from ${config.branding.name}.`,
      type: 'website',
      url: canonicalUrl,
    },
  }
}

export default async function RecipesPage() {
  const config = await getCurrentSiteConfig()

  // JSON-LD for recipe collection
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${config.branding.name} - All Recipes`,
    description: `Browse all ${config.recipes.length} recipes`,
    numberOfItems: config.recipes.length,
    itemListElement: config.recipes.map((recipe, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Recipe',
        name: recipe.title,
        description: recipe.description,
        url: `https://${config.domain}/recipes/${recipe.slug}`,
        image: `https://${config.domain}${recipe.image}`,
      },
    })),
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-32 pb-20">
        <div className="container-site">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium text-primary-light">Our collection</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Top <span className="text-primary">5</span> protein recipes
            </h1>
            <p className="text-xl text-gray-300">
              Explore our collection of {config.recipes.length} carefully curated recipes. Each one is tested, perfected, and ready to become your new favorite.
            </p>
          </div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="section bg-background">
        <div className="container-site">
          {/* Stats Bar */}
          <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">{config.recipes.length}</span>
              <span className="text-text-muted">recipes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">
                {config.recipes.filter(r => r.difficulty === 'Easy').length}
              </span>
              <span className="text-text-muted">easy</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">
                {Math.round(config.recipes.reduce((acc, r) => acc + r.totalTime, 0) / config.recipes.length)}
              </span>
              <span className="text-text-muted">avg. minutes</span>
            </div>
          </div>

          {/* Recipe Grid */}
          <RecipeGrid recipes={config.recipes} columns={3} />
        </div>
      </section>

      {/* Heumin CTA */}
      <HeuminCTA variant="compact" />
    </>
  )
}
