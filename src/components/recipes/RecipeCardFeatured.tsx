import Link from 'next/link'
import Image from 'next/image'
import { Recipe } from '@/config/types'

interface RecipeCardFeaturedProps {
  recipe: Recipe
  variant?: 'default' | 'large'
}

export function RecipeCardFeatured({ recipe, variant = 'default' }: RecipeCardFeaturedProps) {
  const isLarge = variant === 'large'

  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className={`group block relative rounded-3xl overflow-hidden bg-gray-900 ${
        isLarge ? 'h-full min-h-[500px]' : 'aspect-[4/5]'
      }`}
    >
      {/* Image */}
      <Image
        src={recipe.image}
        alt={recipe.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes={isLarge ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 768px) 100vw, 50vw'}
        priority={isLarge}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        {/* Top badges */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
          <span className="px-3 py-1 bg-primary text-white text-sm font-semibold rounded-full">
            #{recipe.id.split('-')[1] || '1'} Top Pick
          </span>
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
            {recipe.difficulty}
          </span>
        </div>

        {/* Bottom content */}
        <div>
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            {recipe.category}
          </span>

          <h3 className={`font-bold text-white mt-2 mb-3 group-hover:text-primary transition-colors ${
            isLarge ? 'text-3xl md:text-4xl' : 'text-2xl'
          }`}>
            {recipe.title}
          </h3>

          <p className={`text-gray-300 mb-4 line-clamp-2 ${isLarge ? 'text-lg' : 'text-sm'}`}>
            {recipe.description}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{recipe.totalTime} min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center gap-1.5 text-primary font-semibold">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>{recipe.nutrition.protein}g protein</span>
            </div>
          </div>

          {/* CTA */}
          {isLarge && (
            <div className="mt-6 flex items-center gap-2 text-white font-semibold group-hover:text-primary transition-colors">
              <span>View Recipe</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
