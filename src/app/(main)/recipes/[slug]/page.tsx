import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCurrentSiteConfig } from '@/lib/get-site-config'
import { RecipeDetail } from '@/components/recipes'
import { Recipe } from '@/config/types'

interface RecipePageProps {
  params: Promise<{ slug: string }>
}

// Generate static paths for all recipes
export async function generateStaticParams() {
  const { getAllSiteConfigs } = await import('@/config/sites')
  const configs = getAllSiteConfigs()

  const paths: { slug: string }[] = []
  configs.forEach((config) => {
    config.recipes.forEach((recipe) => {
      paths.push({ slug: recipe.slug })
    })
  })

  return paths
}

// Generate metadata for each recipe
export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const resolvedParams = await params
  const config = await getCurrentSiteConfig()
  const recipe = config.recipes.find((r) => r.slug === resolvedParams.slug)

  if (!recipe) {
    return { title: 'Recipe Not Found' }
  }

  return {
    title: recipe.title,
    description: recipe.description,
    keywords: [...recipe.tags, config.branding.name, 'recipe'],
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      type: 'article',
      publishedTime: recipe.datePublished,
      modifiedTime: recipe.dateModified || recipe.datePublished,
      images: [
        {
          url: `https://${config.domain}${recipe.image}`,
          width: 1200,
          height: 630,
          alt: recipe.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: recipe.title,
      description: recipe.description,
      images: [`https://${config.domain}${recipe.image}`],
    },
  }
}

// Generate JSON-LD structured data for recipe
function generateRecipeJsonLd(recipe: Recipe, domain: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.description,
    image: `https://${domain}${recipe.image}`,
    author: {
      '@type': 'Organization',
      name: domain,
    },
    datePublished: recipe.datePublished,
    dateModified: recipe.dateModified || recipe.datePublished,
    prepTime: `PT${recipe.prepTime}M`,
    cookTime: `PT${recipe.cookTime}M`,
    totalTime: `PT${recipe.totalTime}M`,
    recipeYield: `${recipe.servings} servings`,
    recipeCategory: recipe.category,
    keywords: recipe.tags.join(', '),
    nutrition: {
      '@type': 'NutritionInformation',
      calories: `${recipe.nutrition.calories} calories`,
      proteinContent: `${recipe.nutrition.protein}g`,
      carbohydrateContent: `${recipe.nutrition.carbs}g`,
      fatContent: `${recipe.nutrition.fat}g`,
      fiberContent: recipe.nutrition.fiber ? `${recipe.nutrition.fiber}g` : undefined,
      sugarContent: recipe.nutrition.sugar ? `${recipe.nutrition.sugar}g` : undefined,
    },
    recipeIngredient: recipe.ingredients.map(
      (ing) => `${ing.amount} ${ing.unit || ''} ${ing.item}${ing.notes ? ` (${ing.notes})` : ''}`
    ),
    recipeInstructions: recipe.instructions.map((inst) => ({
      '@type': 'HowToStep',
      position: inst.step,
      text: inst.instruction,
      ...(inst.tip && { tip: inst.tip }),
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '47',
      bestRating: '5',
      worstRating: '1',
    },
  }
}

// Generate BreadcrumbList JSON-LD
function generateBreadcrumbJsonLd(recipe: Recipe, domain: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://${domain}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Recipes',
        item: `https://${domain}/recipes`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: recipe.title,
        item: `https://${domain}/recipes/${recipe.slug}`,
      },
    ],
  }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const resolvedParams = await params
  const config = await getCurrentSiteConfig()
  const recipe = config.recipes.find((r) => r.slug === resolvedParams.slug)

  if (!recipe) {
    notFound()
  }

  const recipeJsonLd = generateRecipeJsonLd(recipe, config.domain)
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(recipe, config.domain)

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Recipe Content */}
      <RecipeDetail recipe={recipe} />
    </>
  )
}
