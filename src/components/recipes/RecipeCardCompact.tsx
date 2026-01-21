import Link from 'next/link'
import Image from 'next/image'
import { Recipe } from '@/config/types'

interface RecipeCardCompactProps {
  recipe: Recipe
  variant?: 'default' | 'horizontal'
}

export function RecipeCardCompact({ recipe, variant = 'default' }: RecipeCardCompactProps) {
  const isHorizontal = variant === 'horizontal'

  if (isHorizontal) {
    return (
      <Link
        href={`/recipes/${recipe.slug}`}
        className="group flex bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
      >
        {/* Image */}
        <div className="relative w-1/3 min-w-[140px]">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 33vw, 200px"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              {recipe.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="text-xs text-text-muted">{recipe.difficulty}</span>
          </div>

          <h3 className="font-bold text-lg text-text group-hover:text-primary transition-colors line-clamp-1">
            {recipe.title}
          </h3>

          <p className="text-sm text-text-muted mt-1 line-clamp-1">
            {recipe.description}
          </p>

          <div className="flex items-center gap-4 mt-3 text-sm text-text-muted">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {recipe.totalTime} min
            </span>
            <span className="font-semibold text-primary">
              {recipe.nutrition.protein}g protein
            </span>
          </div>
        </div>
      </Link>
    )
  }

  // Default vertical card
  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group block bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Floating badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-900 rounded-full">
            {recipe.difficulty}
          </span>
        </div>

        {/* Hover overlay content */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-3 text-white text-sm">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {recipe.totalTime} min
            </span>
            <span className="w-1 h-1 rounded-full bg-white/50" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            {recipe.category}
          </span>
        </div>

        <h3 className="font-bold text-lg text-text group-hover:text-primary transition-colors line-clamp-2">
          {recipe.title}
        </h3>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-sm text-text-muted">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {recipe.totalTime} min
          </div>
          <div className="font-semibold text-primary text-sm">
            {recipe.nutrition.protein}g protein
          </div>
        </div>
      </div>
    </Link>
  )
}
