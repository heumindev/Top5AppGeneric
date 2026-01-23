'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useSiteConfig } from '@/lib/site-context'

interface NewsletterSignupProps {
  variant?: 'default' | 'compact'
}

export function NewsletterSignup({ variant = 'default' }: NewsletterSignupProps) {
  const config = useSiteConfig()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          siteName: config.branding.name
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Thanks for subscribing!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  // Compact variant for sidebars or smaller spaces
  if (variant === 'compact') {
    return (
      <div className="relative rounded-xl overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={config.recipes[0]?.image || '/images/hero.jpg'}
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/85" />
        </div>

        <div className="relative p-5 text-white">
          <p className="font-medium text-sm mb-3">Get new recipes in your inbox</p>

          {status === 'success' ? (
            <p className="text-green-300 text-sm">{message}</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full px-3 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-3 py-2 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-2 text-red-300 text-xs">{message}</p>
          )}
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div className="relative rounded-2xl overflow-hidden">
      {/* Background Image - subtle */}
      <div className="absolute inset-0">
        <Image
          src={config.recipes[1]?.image || config.recipes[0]?.image || '/images/hero.jpg'}
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/85" />
      </div>

      <div className="relative py-12 px-6 md:py-16 md:px-10 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            Newsletter
          </h3>
          <p className="text-white/70 text-sm md:text-base mb-6">
            Get the latest {config.branding.logoText.toLowerCase()} recipes delivered to your inbox.
          </p>

          {status === 'success' ? (
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-5 py-2.5">
              <svg className="w-5 h-5 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">{message}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-3 text-red-300 text-sm">{message}</p>
          )}

          <p className="text-white/50 text-xs mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  )
}
