// Site IDs - add new sites here
export type SiteId = 'top5proteinrecipes' | 'top5ketorecipes' | 'top5veganrecipes' | 'top5dinnerrecipes' | 'top5mealpreprecipes' | 'top5proteindesserts' | 'top5weightlossrecipes'

// Theme colors
export interface ThemeColors {
  primary: string
  primaryDark: string
  primaryLight: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textMuted: string
}

// Theme fonts
export interface ThemeFonts {
  heading: string
  body: string
}

// Complete theme configuration
export interface Theme {
  colors: ThemeColors
  fonts: ThemeFonts
}

// Site branding
export interface Branding {
  name: string
  tagline: string
  logo: string
  favicon: string
  heroImage?: string
  logoText: string // Short text for logo (e.g., "PROTEIN", "DINNER")
}

// FAQ item for homepage
export interface FAQItem {
  question: string
  answer: string
}

// Navigation item
export interface NavItem {
  name: string
  href: string
}

// Guide section for the guide page
export interface GuideSection {
  id: string
  title: string
  content: string
  items?: { title: string; description: string }[]
  table?: { food: string; amount: string; category: string }[]
}

// Guide page content
export interface GuideContent {
  title: string
  metaTitle: string
  metaDescription: string
  heroTitle: string
  heroHighlight: string
  heroDescription: string
  sections: GuideSection[]
  faq: FAQItem[]
}

// Site-specific content
export interface SiteContent {
  heroTitle: string
  heroHighlight: string // The highlighted word/phrase in hero title
  heroDescription: string
  itemListName: string // For JSON-LD structured data
  directAnswerTitle: string
  directAnswerText: string
  navigation: NavItem[]
  faq: FAQItem[]
  guide: GuideContent
}

// SEO metadata
export interface SiteMeta {
  title: string
  description: string
  keywords: string[]
  ogImage: string
  twitterHandle?: string
}

// Nutrition information for recipes
export interface NutritionInfo {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber?: number
  sugar?: number
}

// Recipe ingredient
export interface Ingredient {
  item: string
  amount: string
  unit?: string
  notes?: string
}

// Recipe instruction step
export interface InstructionStep {
  step: number
  instruction: string
  tip?: string
  duration?: string
}

// Complete recipe definition
export interface Recipe {
  id: string
  slug: string
  title: string
  description: string
  image: string
  prepTime: number // in minutes
  cookTime: number // in minutes
  totalTime: number // in minutes
  servings: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  tags: string[]
  ingredients: Ingredient[]
  instructions: InstructionStep[]
  nutrition: NutritionInfo
  tips?: string[]
  datePublished: string
  dateModified?: string
}

// Social links
export interface SocialLinks {
  instagram?: string
  pinterest?: string
  facebook?: string
  twitter?: string
  youtube?: string
}

// Complete site configuration
export interface SiteConfig {
  id: SiteId
  domain: string
  branding: Branding
  theme: Theme
  meta: SiteMeta
  content: SiteContent
  social?: SocialLinks
  recipes: Recipe[]
}

// Domain to SiteId mapping type
export type DomainMapping = Record<string, SiteId>
