import { Metadata } from 'next'
import Link from 'next/link'
import { getCurrentSiteConfig } from '@/lib/get-site-config'
import { HeuminCTA } from '@/components/common'

export async function generateMetadata(): Promise<Metadata> {
  const config = await getCurrentSiteConfig()
  const canonicalUrl = `https://${config.domain}/protein-guide`

  return {
    title: 'Complete Protein Guide: Benefits, Sources & Daily Requirements | Top 5 Protein Recipes',
    description: 'Learn everything about protein: what it does for your body, best high-protein foods, daily requirements, and how to get enough protein for muscle building.',
    keywords: [
      'what does protein do',
      'high protein foods',
      'protein benefits',
      'how much protein per day',
      'protein for muscle building',
      'healthy protein sources',
      'protein breakfast ideas',
      'eggs protein content',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Complete Protein Guide: Benefits, Sources & Daily Requirements',
      description: 'Everything you need to know about protein for a healthy diet and muscle building.',
      type: 'article',
      url: canonicalUrl,
    },
  }
}

// FAQ Schema for SEO
function generateFAQSchema() {
  const faqs = [
    {
      question: 'What does protein do for your body?',
      answer: 'Protein is essential for building and repairing muscles, producing enzymes and hormones, supporting immune function, and maintaining healthy skin, hair, and nails. It also helps you feel full longer, which aids in weight management.',
    },
    {
      question: 'What foods are high in protein?',
      answer: 'The best high-protein foods include chicken breast (31g per 100g), eggs (13g per 100g), Greek yogurt (10g per 100g), salmon (25g per 100g), lean beef (26g per 100g), cottage cheese (11g per 100g), lentils (9g per 100g), and tofu (8g per 100g).',
    },
    {
      question: 'Is it good to eat a lot of protein?',
      answer: 'Moderate to high protein intake is beneficial for most people, especially those who exercise regularly. The recommended daily intake is 0.8g per kg of body weight for sedentary adults, and 1.2-2.0g per kg for active individuals. However, extremely high protein intake may stress the kidneys in people with pre-existing kidney conditions.',
    },
    {
      question: 'Which fruits have the most protein?',
      answer: 'While fruits are not primary protein sources, guava leads with 4.2g per cup, followed by avocado (4g per fruit), jackfruit (2.8g per cup), kiwi (2g per cup), and blackberries (2g per cup).',
    },
    {
      question: 'What are healthy protein sources?',
      answer: 'Healthy protein sources include lean meats (chicken, turkey), fish (salmon, tuna), eggs, dairy (Greek yogurt, cottage cheese), legumes (lentils, chickpeas, black beans), nuts and seeds, tofu, and tempeh. These provide protein along with other essential nutrients.',
    },
    {
      question: 'Do bananas have a lot of protein?',
      answer: 'No, bananas are not a significant protein source. One medium banana contains only about 1.3g of protein. Bananas are better known for their potassium, vitamin B6, and carbohydrate content for quick energy.',
    },
    {
      question: 'Which vegetables have the most protein?',
      answer: 'High-protein vegetables include edamame (18g per cup), lentils (18g per cup), black beans (15g per cup), chickpeas (15g per cup), green peas (9g per cup), spinach (5g per cup cooked), broccoli (4g per cup), and Brussels sprouts (4g per cup).',
    },
    {
      question: 'How much protein is in 2 eggs?',
      answer: 'Two large eggs contain approximately 12-14 grams of protein. Each large egg has about 6-7 grams of protein, with the white containing about 3.6g and the yolk containing about 2.7g.',
    },
    {
      question: 'Are 4 eggs per day too much?',
      answer: 'For most healthy adults, eating 4 eggs per day is safe and provides about 24-28g of protein. Recent research shows dietary cholesterol from eggs has minimal impact on blood cholesterol for most people. However, those with heart disease or diabetes should consult their doctor.',
    },
    {
      question: 'How do I get 40 grams of protein at breakfast?',
      answer: 'Combine protein sources: 3 eggs (21g) + Greek yogurt (10g) + handful of almonds (6g) = 37g. Or try: protein smoothie with protein powder (25g) + milk (8g) + peanut butter (8g) = 41g. Our high-protein breakfast recipes make it easy to hit your goals.',
    },
    {
      question: 'How many eggs should I eat for muscle building?',
      answer: 'For muscle building, aim for 3-4 eggs as part of your breakfast, providing 18-24g of protein. Combine with other protein sources throughout the day to reach 1.6-2.2g of protein per kg of body weight for optimal muscle growth.',
    },
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export default async function ProteinGuidePage() {
  const config = await getCurrentSiteConfig()
  const faqSchema = generateFAQSchema()

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
              Everything you need to know about <span className="text-primary">protein</span>
            </h1>
            <p className="text-xl text-gray-300">
              Your complete guide to protein: benefits, best sources, daily requirements, and answers to the most common protein questions.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="bg-white border-b sticky top-16 z-30">
        <div className="container-site">
          <div className="flex gap-6 py-4 overflow-x-auto text-sm font-medium">
            <a href="#benefits" className="text-gray-600 hover:text-primary whitespace-nowrap">Benefits</a>
            <a href="#sources" className="text-gray-600 hover:text-primary whitespace-nowrap">Best sources</a>
            <a href="#daily-intake" className="text-gray-600 hover:text-primary whitespace-nowrap">Daily intake</a>
            <a href="#breakfast" className="text-gray-600 hover:text-primary whitespace-nowrap">Breakfast ideas</a>
            <a href="#faq" className="text-gray-600 hover:text-primary whitespace-nowrap">FAQ</a>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="section bg-background">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">

            {/* What Does Protein Do */}
            <section id="benefits" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">What does protein do for your body?</h2>
              <p className="text-lg text-text-muted mb-6">
                Protein is one of the three macronutrients essential for life. It plays a crucial role in nearly every biological process in your body.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  { title: 'Muscle building & repair', desc: 'Provides amino acids needed to build and repair muscle tissue after exercise.' },
                  { title: 'Enzyme production', desc: 'Creates enzymes that drive chemical reactions for digestion and metabolism.' },
                  { title: 'Hormone regulation', desc: 'Helps produce hormones like insulin that regulate blood sugar.' },
                  { title: 'Immune function', desc: 'Builds antibodies that fight infections and keep you healthy.' },
                  { title: 'Satiety & weight management', desc: 'Keeps you feeling full longer, reducing overall calorie intake.' },
                  { title: 'Healthy hair, skin & nails', desc: 'Provides keratin and collagen for strong hair, skin, and nails.' },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-white rounded-xl border border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Best Protein Sources */}
            <section id="sources" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">What foods are high in protein?</h2>
              <p className="text-lg text-text-muted mb-6">
                The best protein sources provide complete amino acids along with other essential nutrients. Here are the top high-protein foods:
              </p>

              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
                <div className="grid grid-cols-3 bg-gray-50 p-4 font-semibold text-sm">
                  <span>Food</span>
                  <span>Protein per 100g</span>
                  <span>Category</span>
                </div>
                {[
                  { food: 'Chicken Breast', protein: '31g', category: 'Meat' },
                  { food: 'Lean Beef', protein: '26g', category: 'Meat' },
                  { food: 'Salmon', protein: '25g', category: 'Fish' },
                  { food: 'Tuna', protein: '24g', category: 'Fish' },
                  { food: 'Greek Yogurt', protein: '10g', category: 'Dairy' },
                  { food: 'Eggs', protein: '13g', category: 'Dairy' },
                  { food: 'Cottage Cheese', protein: '11g', category: 'Dairy' },
                  { food: 'Lentils (cooked)', protein: '9g', category: 'Legumes' },
                  { food: 'Chickpeas (cooked)', protein: '9g', category: 'Legumes' },
                  { food: 'Tofu', protein: '8g', category: 'Plant-based' },
                ].map((item, i) => (
                  <div key={i} className="grid grid-cols-3 p-4 border-t border-gray-100 text-sm">
                    <span className="font-medium">{item.food}</span>
                    <span className="text-primary font-semibold">{item.protein}</span>
                    <span className="text-text-muted">{item.category}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold mb-4">Which vegetables have the most protein?</h3>
              <p className="text-text-muted mb-4">
                While vegetables aren&apos;t primary protein sources, legumes and some greens offer significant amounts:
              </p>
              <ul className="list-disc list-inside text-text-muted space-y-2 mb-6">
                <li><strong>Edamame:</strong> 18g per cup - the highest protein vegetable</li>
                <li><strong>Lentils:</strong> 18g per cup cooked</li>
                <li><strong>Black Beans:</strong> 15g per cup cooked</li>
                <li><strong>Green Peas:</strong> 9g per cup</li>
                <li><strong>Spinach:</strong> 5g per cup cooked</li>
                <li><strong>Broccoli:</strong> 4g per cup</li>
              </ul>

              <h3 className="text-xl font-bold mb-4">Do fruits have protein?</h3>
              <p className="text-text-muted mb-4">
                Fruits are not significant protein sources, but some contain more than others:
              </p>
              <ul className="list-disc list-inside text-text-muted space-y-2">
                <li><strong>Guava:</strong> 4.2g per cup - highest protein fruit</li>
                <li><strong>Avocado:</strong> 4g per fruit</li>
                <li><strong>Jackfruit:</strong> 2.8g per cup</li>
                <li><strong>Banana:</strong> Only 1.3g per fruit (not a protein source)</li>
              </ul>
            </section>

            {/* Daily Intake */}
            <section id="daily-intake" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">How much protein do you need?</h2>

              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-lg mb-4">Daily protein recommendations</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-primary/10">
                    <span>Sedentary adult</span>
                    <span className="font-semibold">0.8g per kg body weight</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-primary/10">
                    <span>Active adult</span>
                    <span className="font-semibold">1.2-1.6g per kg body weight</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-primary/10">
                    <span>Muscle building</span>
                    <span className="font-semibold text-primary">1.6-2.2g per kg body weight</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Athletes</span>
                    <span className="font-semibold">1.4-2.0g per kg body weight</span>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">Is it good to eat a lot of protein?</h3>
              <p className="text-text-muted mb-4">
                For most healthy adults, a high-protein diet is safe and beneficial. Research shows that protein intakes up to 2g per kg of body weight have no adverse effects on kidney function in healthy individuals.
              </p>
              <p className="text-text-muted mb-6">
                However, those with pre-existing kidney conditions should consult a doctor before significantly increasing protein intake.
              </p>

              <h3 className="text-xl font-bold mb-4">Are 4 eggs per day too much?</h3>
              <p className="text-text-muted">
                For most healthy adults, 4 eggs per day (providing ~24g protein) is safe. Recent research has debunked the myth that dietary cholesterol significantly raises blood cholesterol for most people. The American Heart Association no longer sets a specific limit on dietary cholesterol for healthy adults.
              </p>
            </section>

            {/* Breakfast Ideas */}
            <section id="breakfast" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">How to get 40g protein at breakfast</h2>
              <p className="text-lg text-text-muted mb-6">
                Starting your day with a high-protein breakfast helps control hunger, stabilize blood sugar, and supports muscle building. Here are proven combinations:
              </p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    name: 'The classic',
                    items: ['3 whole eggs (21g)', 'Greek yogurt 150g (15g)', 'Handful almonds (6g)'],
                    total: '42g protein',
                  },
                  {
                    name: 'Smoothie power',
                    items: ['Protein powder scoop (25g)', 'Milk 250ml (8g)', 'Peanut butter 2tbsp (8g)'],
                    total: '41g protein',
                  },
                  {
                    name: 'Savory start',
                    items: ['4 egg omelet (24g)', 'Cottage cheese 100g (11g)', 'Turkey slices 50g (6g)'],
                    total: '41g protein',
                  },
                ].map((combo, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg">{combo.name}</h3>
                      <span className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full">{combo.total}</span>
                    </div>
                    <ul className="text-text-muted text-sm space-y-1">
                      {combo.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold mb-4">How many eggs for muscle building?</h3>
              <p className="text-text-muted">
                For optimal muscle building, aim for 3-4 whole eggs at breakfast (18-24g protein). Combine with other protein sources throughout the day to reach your total daily protein goal of 1.6-2.2g per kg of body weight.
              </p>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Frequently asked questions</h2>

              <div className="space-y-4">
                {[
                  {
                    q: 'What is the difference between protein and proteins?',
                    a: 'There is no difference—they refer to the same thing. "Protein" is the macronutrient category, while "proteins" is simply the plural form referring to multiple protein molecules or sources.',
                  },
                  {
                    q: 'Which bread toppings have the most protein?',
                    a: 'High-protein bread toppings include: peanut butter (8g per 2 tbsp), cottage cheese (11g per 100g), smoked salmon (20g per 100g), eggs (6g each), turkey breast (20g per 100g), and hummus (8g per 100g).',
                  },
                  {
                    q: 'Why do some say you should only eat one banana per day?',
                    a: 'This is a myth. While bananas are higher in sugar than some fruits, they are nutritious and safe to eat in moderation. For most people, 2-3 bananas per day is perfectly fine. The concern mainly applies to those monitoring potassium or sugar intake.',
                  },
                  {
                    q: 'Which fruit should you eat every day?',
                    a: 'For overall health, berries (blueberries, strawberries) are excellent daily choices due to their antioxidants. For protein specifically, avocado provides the most at 4g per fruit, though all fruits are relatively low in protein.',
                  },
                  {
                    q: 'What are the healthiest protein sources?',
                    a: 'The healthiest proteins are minimally processed and come with additional nutrients: fatty fish (omega-3s), eggs (complete nutrition), Greek yogurt (probiotics), legumes (fiber), and lean poultry (low saturated fat).',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 p-6">
                    <h3 className="font-bold text-lg mb-2">{item.q}</h3>
                    <p className="text-text-muted">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA to Recipes */}
            <section className="bg-gray-900 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-3">Ready to cook high-protein meals?</h2>
              <p className="text-gray-400 mb-6">
                Browse our top 5 protein-packed recipes, each with complete nutrition info.
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
