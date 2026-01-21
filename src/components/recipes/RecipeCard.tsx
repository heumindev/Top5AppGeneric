import Link from 'next/link'
import Image from 'next/image'
import { Recipe } from '@/config/types'

interface RecipeCardProps {
  recipe: Recipe
  priority?: boolean
}

export function RecipeCard({ recipe, priority = false }: RecipeCardProps) {
  const difficultyClasses = {
    Easy: 'recipe-difficulty-easy',
    Medium: 'recipe-difficulty-medium',
    Hard: 'recipe-difficulty-hard',
  }

  return (
    <article className="card-hover group">
      <Link href={`/recipes/${recipe.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />
          {/* Difficulty Badge */}
          <div className="absolute top-4 right-4">
            <span className={difficultyClasses[recipe.difficulty]}>
              {recipe.difficulty}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category & Tags */}
          <div className="flex items-center gap-2 mb-2">
            <span className="badge-primary text-xs">
              {recipe.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-2 text-text group-hover:text-primary transition-colors line-clamp-2">
            {recipe.title}
          </h3>

          {/* Description */}
          <p className="text-text-muted text-sm mb-4 line-clamp-2">
            {recipe.description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-text-muted">
            <div className="flex items-center gap-4">
              {/* Prep Time */}
              <div className="recipe-time">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{recipe.totalTime} min</span>
              </div>
              {/* Servings */}
              <div className="recipe-time">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>{recipe.servings} servings</span>
              </div>
            </div>

            {/* Protein highlight (if high) */}
            {recipe.nutrition.protein >= 20 && (
              <div className="font-semibold text-primary">
                {recipe.nutrition.protein}g protein
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}
