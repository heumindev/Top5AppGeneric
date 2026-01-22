import { Metadata } from 'next'
import Link from 'next/link'
import { getCurrentSiteConfig } from '@/lib/get-site-config'
import { HeuminCTA } from '@/components/common'

export async function generateMetadata(): Promise<Metadata> {
  const config = await getCurrentSiteConfig()
  const guide = config.content.guide
  const canonicalUrl = `https://${config.domain}/guide`

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      type: 'article',
      url: canonicalUrl,
    },
  }
}

export default async function GuidePage() {
  const config = await getCurrentSiteConfig()
  const guide = config.content.guide

  // Generate FAQ Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faq.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-32 pb-20">
        <div className="container-site">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium text-primary-light">Complete guide</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {guide.heroTitle} <span className="text-primary">{guide.heroHighlight}</span>
            </h1>
            <p className="text-xl text-gray-300">
              {guide.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="bg-white border-b sticky top-16 z-30">
        <div className="container-site">
          <div className="flex gap-6 py-4 overflow-x-auto text-sm font-medium">
            {guide.sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-gray-600 hover:text-primary whitespace-nowrap"
              >
                {section.title.split('?')[0].replace('What ', '').replace('How ', '').replace('Why ', '').slice(0, 20)}
              </a>
            ))}
            <a href="#faq" className="text-gray-600 hover:text-primary whitespace-nowrap">FAQ</a>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="section bg-background">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">

            {/* Dynamic Sections */}
            {guide.sections.map((section) => (
              <section key={section.id} id={section.id} className="mb-16">
                <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
                <p className="text-lg text-text-muted mb-6">{section.content}</p>

                {/* Render items as cards */}
                {section.items && (
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {section.items.map((item, i) => (
                      <div key={i} className="p-4 bg-white rounded-xl border border-gray-100">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-text-muted">{item.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Render table */}
                {section.table && (
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
                    <div className="grid grid-cols-3 bg-gray-50 p-4 font-semibold text-sm">
                      <span>Food</span>
                      <span>Amount</span>
                      <span>Category</span>
                    </div>
                    {section.table.map((row, i) => (
                      <div key={i} className="grid grid-cols-3 p-4 border-t border-gray-100 text-sm">
                        <span className="font-medium">{row.food}</span>
                        <span className="text-primary font-semibold">{row.amount}</span>
                        <span className="text-text-muted">{row.category}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}

            {/* FAQ Section */}
            <section id="faq" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Frequently asked questions</h2>

              <div className="space-y-4">
                {guide.faq.map((item, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 p-6">
                    <h3 className="font-bold text-lg mb-2">{item.question}</h3>
                    <p className="text-text-muted">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA to Recipes */}
            <section className="bg-gray-900 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-3">Ready to start cooking?</h2>
              <p className="text-gray-400 mb-6">
                Browse our top 5 recipes, each with complete nutrition info.
              </p>
              <Link
                href="/recipes"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all"
              >
                View all recipes
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </section>

          </div>
        </div>
      </article>

      {/* Heumin CTA */}
      <HeuminCTA variant="compact" />
    </>
  )
}
