'use client'

import { createContext, useContext, ReactNode } from 'react'
import { SiteConfig } from '@/config/types'

// Context for the current site configuration
const SiteContext = createContext<SiteConfig | null>(null)

interface SiteProviderProps {
  config: SiteConfig
  children: ReactNode
}

/**
 * Provider component that wraps the app and provides site config to all components
 */
export function SiteProvider({ config, children }: SiteProviderProps) {
  return (
    <SiteContext.Provider value={config}>
      {children}
    </SiteContext.Provider>
  )
}

/**
 * Hook to access the current site configuration
 * Must be used within a SiteProvider
 */
export function useSiteConfig(): SiteConfig {
  const context = useContext(SiteContext)

  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteProvider')
  }

  return context
}

/**
 * Hook to access the current site's theme
 */
export function useTheme() {
  const config = useSiteConfig()
  return config.theme
}

/**
 * Hook to access the current site's branding
 */
export function useBranding() {
  const config = useSiteConfig()
  return config.branding
}

/**
 * Hook to access the current site's recipes
 */
export function useRecipes() {
  const config = useSiteConfig()
  return config.recipes
}

/**
 * Hook to get a specific recipe by slug
 */
export function useRecipeBySlug(slug: string) {
  const config = useSiteConfig()
  return config.recipes.find(recipe => recipe.slug === slug)
}

/**
 * Hook to access the current site's meta information
 */
export function useSiteMeta() {
  const config = useSiteConfig()
  return config.meta
}
