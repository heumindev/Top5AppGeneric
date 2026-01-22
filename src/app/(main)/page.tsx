import Link from 'next/link'
import Image from 'next/image'
import { getCurrentSiteConfig } from '@/lib/get-site-config'
import { RecipeCardFeatured, RecipeCardCompact } from '@/components/recipes'
import { HeuminCTA } from '@/components/common'

// FAQ data for homepage
const faqData = [
  {
    question: "How much protein do I need daily for muscle building?",
    answer: "For muscle building, most research suggests consuming 1.6-2.2 grams of protein per kilogram of body weight daily. For a 70kg (154lb) person, that's approximately 112-154 grams of protein per day, spread across 4-5 meals."
  },
  {
    question: "What are the best high-protein foods for building muscle?",
    answer: "The best high-protein foods include chicken breast (31g per 100g), Greek yogurt (10g per 100g), eggs (13g per 100g), lean beef (26g per 100g), salmon (25g per 100g), cottage cheese (11g per 100g), and legumes like lentils (9g per 100g cooked)."
  },
  {
    question: "When is the best time to eat protein for muscle growth?",
    answer: "Research shows protein timing matters less than total daily intake. However, consuming 20-40g of protein within 2 hours after exercise can optimize muscle protein synthesis. Spreading protein intake evenly across meals (every 3-4 hours) is also beneficial."
  },
  {
    question: "Can I get enough protein without meat?",
    answer: "Yes, you can meet protein needs without meat. Plant-based protein sources include tofu (8g per 100g), tempeh (19g per 100g), legumes, quinoa (4g per 100g cooked), seitan (25g per 100g), and protein-rich dairy like Greek yogurt and cottage cheese."
  },
  {
    question: "What makes a recipe high-protein?",
    answer: "A recipe is considered high-protein when it provides 20+ grams of protein per serving. Our top 5 recipes average 35-50g of protein per serving, making them ideal for muscle building and recovery. We focus on lean protein sources combined with complementary ingredients."
  },
  {
    question: "How do you select the top 5 protein recipes?",
    answer: "We evaluate recipes based on four criteria: protein content per serving (minimum 30g), ease of preparation (under 45 minutes), ingredient accessibility, and taste tested by our team. Each recipe is made at least 3 times before earning a spot in our top 5."
  },
  {
    question: "Are high-protein recipes good for weight loss?",
    answer: "Yes, high-protein recipes support weight loss in multiple ways. Protein increases satiety (feeling full), has a higher thermic effect (burns more calories during digestion), and helps preserve muscle mass during calorie restriction. Our recipes are designed to be satisfying while supporting your goals."
  },
  {
    question: "How can I meal prep high-protein recipes?",
    answer: "Most of our recipes are meal-prep friendly. Cook proteins in bulk, portion into containers, and refrigerate for up to 4 days or freeze for up to 3 months. Prep ingredients on Sunday for easy weeknight cooking. Each recipe includes storage tips and reheating instructions."
  }
]

export default async function HomePage() {
  const config = await getCurrentSiteConfig()
  const featuredRecipe = config.recipes[0]
  const otherRecipes = config.recipes.slice(1)

  // Generate ItemList JSON-LD for the Top 5 ranking
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Top 5 High-Protein Recipes for Muscle Building',
    description: 'Our curated collection of the 5 best high-protein recipes, tested and perfected for taste, nutrition, and ease of preparation.',
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
    mainEntity: faqData.map((faq) => ({
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
      <section className="relative min-h-screen flex items-center bg-gray-900 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src={config.branding.heroImage || featuredRecipe.image}
            alt="High-protein meal with grilled chicken, vegetables, and quinoa - representing nutritious muscle-building recipes"
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
                Top 5 High-Protein
                <span className="text-primary"> Recipes for Muscle Building</span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-lg">
                We&apos;ve tested hundreds of recipes to bring you only the top 5. Each one delivers 30-50g of protein per serving, perfected for taste, nutrition, and ease of preparation.
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
                  <div className="text-3xl font-bold text-white">{avgProtein}g</div>
                  <div className="text-sm text-gray-400">Avg. protein</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{avgTime}</div>
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

      {/* Direct Answer Section for AI/SEO */}
      <section className="section bg-surface border-b border-gray-100">
        <div className="container-site">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Quick answer</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                What are the best high-protein recipes?
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-text-muted">
              <p>
                <strong>The best high-protein recipes for muscle building</strong> combine lean protein sources with complementary nutrients. Our top 5 high-protein recipes average <strong>{avgProtein}g of protein per serving</strong>, with the highest being {config.recipes[0].title} at {config.recipes[0].nutrition.protein}g. Each recipe is designed to support muscle growth, post-workout recovery, and sustained energy throughout the day.
              </p>
              <p>
                These recipes use accessible ingredients like chicken breast, Greek yogurt, eggs, and legumes. They&apos;re optimized for meal prep, taking an average of just <strong>{avgTime} minutes</strong> to prepare. Whether you&apos;re looking to build muscle, lose weight while preserving lean mass, or simply eat more protein-rich meals, these curated recipes deliver exceptional nutrition without sacrificing taste.
              </p>
            </div>
          </div>
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
                Each recipe has been carefully selected and tested to deliver maximum protein with minimum effort.
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
              {faqData.map((faq, index) => (
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
