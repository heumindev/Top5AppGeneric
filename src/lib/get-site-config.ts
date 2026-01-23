import { headers } from 'next/headers'
import { SiteConfig, SiteId, DomainMapping } from '@/config/types'
import { siteConfigs } from '@/config/sites'

// Domain to SiteId mapping
// Add new domains here when adding new sites
const domainMapping: DomainMapping = {
  // Production domains
  'top5proteinrecipes.com': 'top5proteinrecipes',
  'www.top5proteinrecipes.com': 'top5proteinrecipes',
  'top5ketorecipes.com': 'top5ketorecipes',
  'www.top5ketorecipes.com': 'top5ketorecipes',
  'top5veganrecipes.com': 'top5veganrecipes',
  'www.top5veganrecipes.com': 'top5veganrecipes',
  'top5dinnerrecipes.com': 'top5dinnerrecipes',
  'www.top5dinnerrecipes.com': 'top5dinnerrecipes',
  'top5mealpreprecipes.com': 'top5mealpreprecipes',
  'www.top5mealpreprecipes.com': 'top5mealpreprecipes',
  'top5proteindesserts.com': 'top5proteindesserts',
  'www.top5proteindesserts.com': 'top5proteindesserts',
  'top5weightlossrecipes.com': 'top5weightlossrecipes',
  'www.top5weightlossrecipes.com': 'top5weightlossrecipes',
  'top5matcharecipes.com': 'top5matcharecipes',
  'www.top5matcharecipes.com': 'top5matcharecipes',

  // Local development domains (add to /etc/hosts: 127.0.0.1 protein.localhost keto.localhost vegan.localhost dinner.localhost mealprep.localhost proteindesserts.localhost weightloss.localhost)
  'protein.localhost': 'top5proteinrecipes',
  'protein.localhost:3000': 'top5proteinrecipes',
  'keto.localhost': 'top5ketorecipes',
  'keto.localhost:3000': 'top5ketorecipes',
  'vegan.localhost': 'top5veganrecipes',
  'vegan.localhost:3000': 'top5veganrecipes',
  'dinner.localhost': 'top5dinnerrecipes',
  'dinner.localhost:3000': 'top5dinnerrecipes',
  'mealprep.localhost': 'top5mealpreprecipes',
  'mealprep.localhost:3000': 'top5mealpreprecipes',
  'proteindesserts.localhost': 'top5proteindesserts',
  'proteindesserts.localhost:3000': 'top5proteindesserts',
  'weightloss.localhost': 'top5weightlossrecipes',
  'weightloss.localhost:3000': 'top5weightlossrecipes',
  'matcha.localhost': 'top5matcharecipes',
  'matcha.localhost:3000': 'top5matcharecipes',

  // Default fallback for localhost without subdomain
  'localhost': 'top5proteinrecipes',
  'localhost:3000': 'top5proteinrecipes',
}

// Default site ID for fallback
const DEFAULT_SITE_ID: SiteId = 'top5proteinrecipes'

/**
 * Get the site ID from a hostname
 */
export function getSiteIdFromHost(hostname: string): SiteId {
  // Remove port if present for matching
  const hostWithoutPort = hostname.split(':')[0]

  return domainMapping[hostname] || domainMapping[hostWithoutPort] || DEFAULT_SITE_ID
}

/**
 * Get the site config from a hostname
 */
export function getSiteConfigFromHost(hostname: string): SiteConfig {
  const siteId = getSiteIdFromHost(hostname)
  return siteConfigs[siteId]
}

/**
 * Get the current site config from request headers (server-side)
 * This reads the x-site-id header set by middleware
 */
export async function getCurrentSiteConfig(): Promise<SiteConfig> {
  const headersList = await headers()
  const siteId = headersList.get('x-site-id') as SiteId || DEFAULT_SITE_ID
  return siteConfigs[siteId]
}

/**
 * Get the current site ID from request headers (server-side)
 */
export async function getCurrentSiteId(): Promise<SiteId> {
  const headersList = await headers()
  return (headersList.get('x-site-id') as SiteId) || DEFAULT_SITE_ID
}

/**
 * Get site config by ID
 */
export function getSiteConfigById(siteId: SiteId): SiteConfig {
  return siteConfigs[siteId]
}

/**
 * Check if a domain is valid/configured
 */
export function isValidDomain(hostname: string): boolean {
  const hostWithoutPort = hostname.split(':')[0]
  return hostname in domainMapping || hostWithoutPort in domainMapping
}

/**
 * Get all configured domains
 */
export function getAllDomains(): string[] {
  return Object.keys(domainMapping)
}
