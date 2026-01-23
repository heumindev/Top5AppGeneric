import { SiteConfig, SiteId } from '../types'
import top5proteinrecipes from './top5proteinrecipes.json'
import top5ketorecipes from './top5ketorecipes.json'
import top5veganrecipes from './top5veganrecipes.json'
import top5dinnerrecipes from './top5dinnerrecipes.json'
import top5mealpreprecipes from './top5mealpreprecipes.json'
import top5proteindesserts from './top5proteindesserts.json'
import top5weightlossrecipes from './top5weightlossrecipes.json'
import top5matcharecipes from './top5matcharecipes.json'

// Type assertion for imported JSON
export const siteConfigs: Record<SiteId, SiteConfig> = {
  top5proteinrecipes: top5proteinrecipes as SiteConfig,
  top5ketorecipes: top5ketorecipes as SiteConfig,
  top5veganrecipes: top5veganrecipes as SiteConfig,
  top5dinnerrecipes: top5dinnerrecipes as SiteConfig,
  top5mealpreprecipes: top5mealpreprecipes as SiteConfig,
  top5proteindesserts: top5proteindesserts as SiteConfig,
  top5weightlossrecipes: top5weightlossrecipes as SiteConfig,
  top5matcharecipes: top5matcharecipes as SiteConfig,
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
