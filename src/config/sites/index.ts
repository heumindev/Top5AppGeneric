import { SiteConfig, SiteId } from '../types'
import top5proteinrecipes from './top5proteinrecipes.json'
import top5ketorecipes from './top5ketorecipes.json'
import top5veganrecipes from './top5veganrecipes.json'

// Type assertion for imported JSON
export const siteConfigs: Record<SiteId, SiteConfig> = {
  top5proteinrecipes: top5proteinrecipes as SiteConfig,
  top5ketorecipes: top5ketorecipes as SiteConfig,
  top5veganrecipes: top5veganrecipes as SiteConfig,
}

export function getSiteConfigById(siteId: SiteId): SiteConfig {
  return siteConfigs[siteId]
}

export function getAllSiteIds(): SiteId[] {
  return Object.keys(siteConfigs) as SiteId[]
}

export function getAllSiteConfigs(): SiteConfig[] {
  return Object.values(siteConfigs)
}
