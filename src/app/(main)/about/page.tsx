import { Metadata } from 'next'
import { getCurrentSiteConfig } from '@/lib/get-site-config'
import { HeuminCTA } from '@/components/common'

export async function generateMetadata(): Promise<Metadata> {
  const config = await getCurrentSiteConfig()

  return {
    title: `About | ${config.branding.name}`,
    description: `Learn more about ${config.branding.name}. ${config.branding.tagline}`,
    openGraph: {
      title: `About | ${config.branding.name}`,
      description: `Learn more about ${config.branding.name}. ${config.branding.tagline}`,
      type: 'website',
    },
  }
}

export default async function AboutPage() {
  const config = await getCurrentSiteConfig()

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-32 pb-20">
        <div className="container-site">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium text-primary-light">Our Story</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="text-primary">{config.branding.name}</span>
            </h1>
            <p className="text-xl text-gray-300">
              {config.branding.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section bg-background">
        <div className="container-site">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2>Our Mission</h2>
            <p>
              At {config.branding.name}, we believe that great food doesn&apos;t have to be complicated.
              Our mission is to provide you with carefully curated, tested recipes that are both
              delicious and achievable for home cooks of all skill levels.
            </p>

            <h2>Why Top 5?</h2>
            <p>
              We focus on quality over quantity. Instead of overwhelming you with hundreds of
              mediocre recipes, we present only the top 5 recipes in each category &mdash; the
              ones that have been tested, refined, and proven to deliver exceptional results
              every single time.
            </p>

            <h2>Our Promise</h2>
            <ul>
              <li>
                <strong>Tested Recipes:</strong> Every recipe is made multiple times in our
                kitchen before it reaches you.
              </li>
              <li>
                <strong>Clear Instructions:</strong> Step-by-step guidance with helpful tips
                and timing information.
              </li>
              <li>
                <strong>Nutritional Info:</strong> Complete nutrition facts so you can make
                informed choices.
              </li>
              <li>
                <strong>No Ads:</strong> A clean, distraction-free experience focused on
                what matters &mdash; the food.
              </li>
            </ul>

            </div>
        </div>
      </section>

      {/* Heumin CTA */}
      <HeuminCTA variant="compact" />
    </>
  )
}
