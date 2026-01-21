import { Recipe } from '@/config/types'
import { RecipeCard } from './RecipeCard'

interface RecipeGridProps {
  recipes: Recipe[]
  columns?: 2 | 3 | 4
}

export function RecipeGrid({ recipes, columns = 3 }: RecipeGridProps) {
  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted text-lg">No recipes found.</p>
      </div>
    )
  }

  return (
    <div className={`grid ${gridClasses[columns]} gap-6 md:gap-8`}>
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          priority={index < 3}
        />
      ))}
    </div>
  )
}
