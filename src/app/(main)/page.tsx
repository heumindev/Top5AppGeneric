import Link from 'next/link'
import Image from 'next/image'
import { getCurrentSiteConfig } from '@/lib/get-site-config'
import { HeuminCTA, NewsletterSignup } from '@/components/common'

export default async function HomePage() {
  const config = await getCurrentSiteConfig()
  const featuredRecipe = config.recipes[0]

  // Generate ItemList JSON-LD for the Top 5 ranking
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: config.content.itemListName,
    description: `Our curated collection of the 5 best recipes from ${config.branding.name}, tested and perfected for taste, nutrition, and ease of preparation.`,
    numberOfItems: config.recipes.length,
    itemListElement: config.recipes.map((recipe, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: recipe.title,
      url: `https://${config.domain}/recipes/${recipe.slug}`,
      image: `https://${config.domain}${recipe.image}`,
    })),
  }

  // Generate FAQ JSON-LD
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.content.faq.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  // Calculate stats for comparison table
  const avgProtein = Math.round(config.recipes.reduce((acc, r) => acc + r.nutrition.protein, 0) / config.recipes.length)
  const avgCalories = Math.round(config.recipes.reduce((acc, r) => acc + r.nutrition.calories, 0) / config.recipes.length)
  const avgTime = Math.round(config.recipes.reduce((acc, r) => acc + r.totalTime, 0) / config.recipes.length)
  const totalProtein = config.recipes.reduce((acc, r) => acc + r.nutrition.protein, 0)

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero Section */}
      <section className="bg-white">
        <div className="container-site pt-28 md:pt-32 pb-16 md:pb-20">
          {/* Header Content */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Curated top 5 recipes</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-gray-900">
              {config.content.heroTitle}
              <span className="text-primary"> {config.content.heroHighlight}</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              {config.content.heroDescription}
            </p>
          </div>

          {/* Top 5 Recipe Cards - Blog Style */}
          <div className="max-w-5xl mx-auto space-y-6">
            {config.recipes.map((recipe, index) => (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.slug}`}
                className="group flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Recipe Image */}
                <div className="relative w-full md:w-80 lg:w-96 flex-shrink-0 aspect-[16/10] md:aspect-auto md:h-64">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Rank Badge */}
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-primary text-white font-bold text-xl flex items-center justify-center shadow-lg">
                    #{index + 1}
                  </div>
                </div>

                {/* Recipe Info */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    {/* Header with difficulty */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {recipe.difficulty}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {recipe.totalTime} min
                      </span>
                      <span className="text-sm text-gray-500">{recipe.servings} servings</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-gray-900 text-xl md:text-2xl leading-tight mb-3 group-hover:text-primary transition-colors">
                      {recipe.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm md:text-base line-clamp-2 mb-4">
                      {recipe.description}
                    </p>
                  </div>

                  {/* Nutrition Stats */}
                  <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-bold text-primary text-sm">{recipe.nutrition.protein}g</span>
                      </div>
                      <span className="text-xs text-gray-500">Protein</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="font-bold text-gray-700 text-sm">{recipe.nutrition.calories}</span>
                      </div>
                      <span className="text-xs text-gray-500">Calories</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="font-bold text-gray-700 text-sm">{recipe.nutrition.carbs}g</span>
                      </div>
                      <span className="text-xs text-gray-500">Carbs</span>
                    </div>
                    <div className="ml-auto hidden sm:flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                      View Recipe
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* View All Button */}
            <div className="pt-6 text-center">
              <Link href="/recipes" className="btn-primary px-8 py-3">
                View All Recipes
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section bg-background">
        <div className="container-site">
          <NewsletterSignup />
        </div>
      </section>

      {/* Direct Answer Section for AI/SEO */}
      <section className="section bg-surface border-b border-gray-100">
        <div className="container-site">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Quick answer</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                {config.content.directAnswerTitle}
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-text-muted">
              <p>
                {config.content.directAnswerText
                  .replace('{avgProtein}', String(avgProtein))
                  .replace('{avgCalories}', String(avgCalories))
                  .replace('{avgCarbs}', String(Math.round(config.recipes.reduce((acc, r) => acc + r.nutrition.carbs, 0) / config.recipes.length)))
                  .replace('{avgTime}', String(avgTime))}
              </p>
              <p>
                These recipes are optimized for ease of preparation, taking an average of just <strong>{avgTime} minutes</strong> to prepare. Our curated collection delivers exceptional results without sacrificing taste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Protein Comparison Table */}
      <section className="section bg-surface">
        <div className="container-site">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">At a glance</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Recipe comparison
            </h2>
            <p className="text-text-muted mt-3 max-w-xl mx-auto">
              Compare protein content, prep time, and difficulty across all 5 recipes to find your perfect match.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-background rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-4 font-semibold text-text">Recipe</th>
                  <th className="text-center px-6 py-4 font-semibold text-text">Protein</th>
                  <th className="text-center px-6 py-4 font-semibold text-text">Calories</th>
                  <th className="text-center px-6 py-4 font-semibold text-text">Time</th>
                  <th className="text-center px-6 py-4 font-semibold text-text">Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {config.recipes.map((recipe, index) => (
                  <tr key={recipe.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/recipes/${recipe.slug}`} className="flex items-center gap-3 group">
                        <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                          {index + 1}
                        </span>
                        <span className="font-medium group-hover:text-primary transition-colors">{recipe.title}</span>
                      </Link>
                    </td>
                    <td className="text-center px-6 py-4">
                      <span className="font-bold text-primary">{recipe.nutrition.protein}g</span>
                    </td>
                    <td className="text-center px-6 py-4 text-text-muted">
                      {recipe.nutrition.calories} kcal
                    </td>
                    <td className="text-center px-6 py-4 text-text-muted">
                      {recipe.totalTime} min
                    </td>
                    <td className="text-center px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {recipe.difficulty}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-semibold">Average / Total</td>
                  <td className="text-center px-6 py-4 font-bold text-primary">{avgProtein}g avg</td>
                  <td className="text-center px-6 py-4 text-text-muted">{avgCalories} avg</td>
                  <td className="text-center px-6 py-4 text-text-muted">{avgTime} min avg</td>
                  <td className="text-center px-6 py-4 text-text-muted">-</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* How We Select Section */}
      <section className="section bg-background">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our process</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                How we select the top 5 recipes
              </h2>
              <p className="text-text-muted mb-8">
                Not every recipe makes the cut. We evaluate hundreds of high-protein recipes using strict criteria to ensure you get only the best. Here&apos;s what it takes to earn a spot in our top 5:
              </p>

              <div className="space-y-6">
                {[
                  {
                    number: '01',
                    title: 'Protein threshold',
                    description: 'Minimum 30g of protein per serving from quality sources like chicken, fish, eggs, or legumes.'
                  },
                  {
                    number: '02',
                    title: 'Kitchen tested',
                    description: 'Each recipe is made at least 3 times by our team to verify taste, consistency, and ease of preparation.'
                  },
                  {
                    number: '03',
                    title: 'Accessible ingredients',
                    description: 'All ingredients must be available at regular grocery stores. No exotic or hard-to-find items.'
                  },
                  {
                    number: '04',
                    title: 'Time efficient',
                    description: 'Must be completable in under 45 minutes. Our recipes average just {avgTime} minutes total.'
                  }
                ].map((step) => (
                  <div key={step.number} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-center flex-shrink-0">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{step.title}</h3>
                      <p className="text-text-muted text-sm mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-10 text-white">
              <h3 className="text-2xl font-bold mb-8">Collection statistics</h3>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white/5 rounded-2xl">
                  <div className="text-4xl font-bold text-primary">{totalProtein}g</div>
                  <div className="text-sm text-gray-400 mt-1">Total protein</div>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-2xl">
                  <div className="text-4xl font-bold text-white">{config.recipes.length}</div>
                  <div className="text-sm text-gray-400 mt-1">Curated recipes</div>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-2xl">
                  <div className="text-4xl font-bold text-white">{avgTime}</div>
                  <div className="text-sm text-gray-400 mt-1">Avg. minutes</div>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-2xl">
                  <div className="text-4xl font-bold text-white">{config.recipes.filter(r => r.difficulty === 'Easy').length}/{config.recipes.length}</div>
                  <div className="text-sm text-gray-400 mt-1">Easy recipes</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">Quality guaranteed</div>
                    <div className="text-sm text-gray-400">Every recipe kitchen-tested 3+ times</div>
                  </div>
                </div>
              </div>
            </div>
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

      {/* FAQ Section */}
      <section className="section bg-background">
        <div className="container-site">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Frequently asked questions
            </h2>
            <p className="text-text-muted mt-3 max-w-xl mx-auto">
              Everything you need to know about high-protein recipes and nutrition for muscle building.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {config.content.faq.map((faq, index) => (
                <details key={index} className="group bg-surface rounded-2xl border border-gray-100 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none font-semibold text-lg hover:bg-gray-50 transition-colors">
                    {faq.question}
                    <svg className="w-5 h-5 text-primary flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 text-text-muted">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Recipe Preview */}
      <section className="section bg-surface">
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
                  alt={`${featuredRecipe.title} - ${featuredRecipe.nutrition.protein}g protein, ready in ${featuredRecipe.totalTime} minutes`}
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
