'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Recipe } from '@/config/types'
import { useSiteConfig } from '@/lib/site-context'
import { HeuminCTA } from '@/components/common'

interface RecipeDetailProps {
  recipe: Recipe
}

export function RecipeDetail({ recipe }: RecipeDetailProps) {
  const config = useSiteConfig()
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set())
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

  const toggleIngredient = (index: number) => {
    const newChecked = new Set(checkedIngredients)
    if (newChecked.has(index)) {
      newChecked.delete(index)
    } else {
      newChecked.add(index)
    }
    setCheckedIngredients(newChecked)
  }

  const toggleStep = (step: number) => {
    const newCompleted = new Set(completedSteps)
    if (newCompleted.has(step)) {
      newCompleted.delete(step)
    } else {
      newCompleted.add(step)
    }
    setCompletedSteps(newCompleted)
  }

  const handlePrint = () => window.print()

  const difficultyColor = {
    Easy: 'bg-green-500',
    Medium: 'bg-yellow-500',
    Hard: 'bg-red-500',
  }

  // Get other recipes for "More Recipes" section
  const otherRecipes = config.recipes.filter(r => r.id !== recipe.id).slice(0, 3)

  return (
    <article>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px]">
        {/* Background Image */}
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/30" />

        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="container-site pb-12 pt-32">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 no-print">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/recipes" className="hover:text-white transition-colors">Recipes</Link>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-white">{recipe.title}</span>
            </nav>

            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary text-white text-sm font-semibold rounded-full">
                {recipe.category}
              </span>
              <span className={`px-3 py-1 text-white text-sm font-semibold rounded-full ${difficultyColor[recipe.difficulty]}`}>
                {recipe.difficulty}
              </span>
              {recipe.tags.slice(0, 2).map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl">
              {recipe.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-white/80 mb-6 max-w-2xl">
              {recipe.description}
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap items-center gap-6 text-white">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-bold">{recipe.totalTime} min</div>
                  <div className="text-xs text-white/60">Total Time</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-bold">{recipe.servings}</div>
                  <div className="text-xs text-white/60">Servings</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/80 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-bold">{recipe.nutrition.protein}g</div>
                  <div className="text-xs text-white/60">Protein</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-bold">{recipe.nutrition.calories}</div>
                  <div className="text-xs text-white/60">Calories</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Bar */}
      <div className="sticky top-20 z-40 bg-surface border-b border-gray-100 no-print">
        <div className="container-site">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4 text-sm text-text-muted">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Prep: {recipe.prepTime}m
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
                Cook: {recipe.cookTime}m
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-muted hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-site py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: Ingredients (Sticky on desktop) */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-40">
              {/* Ingredients Card */}
              <div className="bg-surface rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-primary-dark p-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Ingredients
                  </h2>
                  <p className="text-white/70 text-sm mt-1">
                    {checkedIngredients.size} of {recipe.ingredients.length} checked
                  </p>
                </div>

                <div className="p-6">
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={checkedIngredients.has(index)}
                            onChange={() => toggleIngredient(index)}
                            className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                          />
                          <span className={`flex-1 transition-all ${checkedIngredients.has(index) ? 'line-through text-text-muted' : 'text-text'}`}>
                            <strong className="font-medium">{ingredient.amount} {ingredient.unit}</strong>{' '}
                            {ingredient.item}
                            {ingredient.notes && (
                              <span className="block text-sm text-text-muted mt-0.5">
                                {ingredient.notes}
                              </span>
                            )}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Nutrition Card */}
              <div className="mt-6 bg-surface rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Nutrition per serving
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-primary">{recipe.nutrition.calories}</div>
                    <div className="text-xs text-text-muted uppercase tracking-wider">Calories</div>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-xl">
                    <div className="text-2xl font-bold text-primary">{recipe.nutrition.protein}g</div>
                    <div className="text-xs text-text-muted uppercase tracking-wider">Protein</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-text">{recipe.nutrition.carbs}g</div>
                    <div className="text-xs text-text-muted uppercase tracking-wider">Carbs</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-text">{recipe.nutrition.fat}g</div>
                    <div className="text-xs text-text-muted uppercase tracking-wider">Fat</div>
                  </div>
                </div>

                {(recipe.nutrition.fiber || recipe.nutrition.sugar) && (
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-around text-sm text-text-muted">
                    {recipe.nutrition.fiber && <span>Fiber: {recipe.nutrition.fiber}g</span>}
                    {recipe.nutrition.sugar && <span>Sugar: {recipe.nutrition.sugar}g</span>}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Right: Instructions */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </span>
              Instructions
            </h2>

            <ol className="space-y-6">
              {recipe.instructions.map((instruction) => (
                <li
                  key={instruction.step}
                  className={`relative pl-16 transition-opacity ${completedSteps.has(instruction.step) ? 'opacity-50' : ''}`}
                >
                  {/* Step Number */}
                  <button
                    onClick={() => toggleStep(instruction.step)}
                    className={`absolute left-0 top-0 w-10 h-10 rounded-xl font-bold text-lg flex items-center justify-center transition-all cursor-pointer ${
                      completedSteps.has(instruction.step)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-text hover:bg-primary hover:text-white'
                    }`}
                  >
                    {completedSteps.has(instruction.step) ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      instruction.step
                    )}
                  </button>

                  {/* Content */}
                  <div className="bg-surface rounded-xl p-6 shadow-sm border border-gray-100">
                    <p className={`text-lg leading-relaxed ${completedSteps.has(instruction.step) ? 'line-through' : ''}`}>
                      {instruction.instruction}
                    </p>

                    {/* Tip */}
                    {instruction.tip && (
                      <div className="mt-4 flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/10">
                        <span className="text-xl">💡</span>
                        <p className="text-sm text-primary">
                          <strong>Pro tip:</strong> {instruction.tip}
                        </p>
                      </div>
                    )}

                    {/* Duration */}
                    {instruction.duration && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-text-muted">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{instruction.duration}</span>
                      </div>
                    )}
                  </div>

                  {/* Connector line */}
                  {instruction.step < recipe.instructions.length && (
                    <div className="absolute left-5 top-12 bottom-0 w-px bg-gray-200 -translate-x-1/2" style={{ height: 'calc(100% - 2.5rem)' }} />
                  )}
                </li>
              ))}
            </ol>

            {/* Tips Section */}
            {recipe.tips && recipe.tips.length > 0 && (
              <div className="mt-12 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Pro Tips for Success
                </h3>
                <ul className="space-y-4">
                  {recipe.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/recipes?tag=${encodeURIComponent(tag)}`}
                    className="px-4 py-2 bg-gray-100 text-text-muted text-sm rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More Recipes Section */}
      {otherRecipes.length > 0 && (
        <section className="bg-gray-50 py-16 no-print">
          <div className="container-site">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">More Recipes You&apos;ll Love</h2>
              <Link href="/recipes" className="text-primary font-medium hover:underline">
                View all →
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {otherRecipes.map((r) => (
                <Link
                  key={r.id}
                  href={`/recipes/${r.slug}`}
                  className="group bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                      {r.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-sm text-text-muted">
                      <span>{r.totalTime} min</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span className="text-primary font-medium">{r.nutrition.protein}g protein</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Heumin CTA */}
      <HeuminCTA variant="compact" />
    </article>
  )
}
