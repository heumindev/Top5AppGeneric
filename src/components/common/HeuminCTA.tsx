'use client'

import Link from 'next/link'
import Image from 'next/image'

interface HeuminCTAProps {
  variant?: 'full' | 'compact'
}

export function HeuminCTA({ variant = 'full' }: HeuminCTAProps) {
  if (variant === 'compact') {
    return (
      <section className="relative py-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/sites/top5proteinrecipes/hero.jpg"
            alt="Meal planning background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/85" />
        </div>

        <div className="container-site relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Plan Your Weekly Meals with AI
            </h3>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Use Heumin to create personalized meal plans with these protein recipes. Track nutrition and generate shopping lists automatically.
            </p>
            <Link
              href="https://heumin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all"
            >
              Try Heumin Free
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/sites/top5proteinrecipes/hero.jpg"
          alt="Meal planning background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/90" />
      </div>

      <div className="container-site relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-6">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm font-medium text-primary-light">AI-Powered Meal Planning</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Turn These Recipes Into Your Weekly Meal Plan
          </h2>

          {/* Description */}
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Heumin creates personalized meal plans based on your protein goals. Get smart shopping lists, nutrition tracking, and never wonder what to cook again.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-white/80">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Personalized Plans
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Smart Shopping Lists
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Nutrition Tracking
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://heumin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-all shadow-lg shadow-primary/25"
            >
              Start Planning Free
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="https://heumin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
