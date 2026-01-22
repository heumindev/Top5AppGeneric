import Link from 'next/link'
import Image from 'next/image'
import { getCurrentSiteConfig } from '@/lib/get-site-config'
import { RecipeCardFeatured, RecipeCardCompact } from '@/components/recipes'
import { HeuminCTA } from '@/components/common'

export default async function HomePage() {
  const config = await getCurrentSiteConfig()
  const featuredRecipe = config.recipes[0]
  const otherRecipes = config.recipes.slice(1)

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gray-900 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src={config.branding.heroImage || featuredRecipe.image}
            alt="Hero background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900/30" />
        </div>

        <div className="container-site relative z-10 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-primary-light">Curated top 5 recipes</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                {config.branding.tagline.split(' ').slice(0, 3).join(' ')}
                <span className="text-primary"> {config.branding.tagline.split(' ').slice(3).join(' ')}</span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-lg">
                We&apos;ve tested hundreds of recipes to bring you only the top 5. Each one is perfected for taste, nutrition, and ease of preparation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/recipes" className="btn-primary text-lg px-8 py-4 shadow-lg shadow-primary/25">
                  View all recipes
                </Link>
                <Link href={`/recipes/${featuredRecipe.slug}`} className="btn bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 text-lg px-8 py-4">
                  Today&apos;s pick
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
                <div>
                  <div className="text-3xl font-bold text-primary">{config.recipes.length}</div>
                  <div className="text-sm text-gray-400">Top recipes</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {Math.round(config.recipes.reduce((acc, r) => acc + r.nutrition.protein, 0) / config.recipes.length)}g
                  </div>
                  <div className="text-sm text-gray-400">Avg. protein</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {Math.round(config.recipes.reduce((acc, r) => acc + r.totalTime, 0) / config.recipes.length)}
                  </div>
                  <div className="text-sm text-gray-400">Avg. minutes</div>
                </div>
              </div>
            </div>

            {/* Right: Featured Recipe Card */}
            <div className="hidden lg:block">
              <RecipeCardFeatured recipe={featuredRecipe} />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* The Top 5 Section */}
      <section className="section bg-background relative">
        {/* Section Header */}
        <div className="container-site">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our collection</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2">
                The top <span className="text-primary">5</span> recipes
              </h2>
              <p className="text-text-muted mt-3 max-w-xl">
                Each recipe has been carefully selected and tested to deliver maximum results with minimum effort.
              </p>
            </div>
            <Link href="/recipes" className="btn-outline self-start md:self-auto">
              View all
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Recipe Grid - Bento Style */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Large Featured Card */}
            <div className="md:col-span-2 lg:col-span-2 lg:row-span-2">
              <RecipeCardFeatured recipe={featuredRecipe} variant="large" />
            </div>

            {/* Smaller Cards */}
            {otherRecipes.slice(0, 2).map((recipe) => (
              <RecipeCardCompact key={recipe.id} recipe={recipe} />
            ))}
          </div>

          {/* Bottom Row */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {otherRecipes.slice(2, 4).map((recipe) => (
              <RecipeCardCompact key={recipe.id} recipe={recipe} variant="horizontal" />
            ))}
          </div>
        </div>
      </section>

      {/* Why Top 5 Section */}
      <section className="section bg-surface">
        <div className="container-site">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Why choose us</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2">
              Quality over quantity
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
                title: 'Tested & verified',
                description: 'Every recipe is made at least 3 times in our kitchen before it makes the cut.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Quick & easy',
                description: 'Most recipes ready in under 30 minutes with ingredients you already have.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: 'Nutrition focused',
                description: 'Complete macros for every recipe to help you hit your daily goals.',
              },
            ].map((item, index) => (
              <div key={index} className="group p-8 rounded-2xl bg-background hover:bg-primary hover:shadow-xl hover:shadow-primary/20 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary group-hover:bg-white/20 group-hover:text-white flex items-center justify-center mb-6 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-text-muted group-hover:text-white/80 transition-colors">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heumin CTA Section */}
      <HeuminCTA />

      {/* Quick Recipe Preview */}
      <section className="section bg-background">
        <div className="container-site">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Start cooking</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                  Ready to make your first recipe?
                </h2>
                <p className="text-gray-400 mb-6">
                  Our most popular recipe is ready in just {featuredRecipe.totalTime} minutes and packs {featuredRecipe.nutrition.protein}g of protein per serving.
                </p>
                <Link href={`/recipes/${featuredRecipe.slug}`} className="btn-primary">
                  Try {featuredRecipe.title.split(' ').slice(0, 3).join(' ')}
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={featuredRecipe.image}
                  alt={featuredRecipe.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-3 text-white text-sm">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {featuredRecipe.totalTime} min
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/50" />
                    <span>{featuredRecipe.nutrition.protein}g protein</span>
                    <span className="w-1 h-1 rounded-full bg-white/50" />
                    <span>{featuredRecipe.difficulty}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
