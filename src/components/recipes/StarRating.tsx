interface StarRatingProps {
  rating?: number
  reviewCount?: number
  showReviewCount?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'light' | 'dark'
}

function StarIcon({ filled, partial = 0, size, emptyColor }: { filled: boolean; partial?: number; size: string; emptyColor: string }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const uniqueId = `star-gradient-${Math.random().toString(36).substr(2, 9)}`

  if (partial > 0 && !filled) {
    // Partial star with gradient
    return (
      <svg className={sizeClasses[size as keyof typeof sizeClasses]} viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <linearGradient id={uniqueId}>
            <stop offset={`${partial * 100}%`} stopColor="#facc15" />
            <stop offset={`${partial * 100}%`} stopColor={emptyColor === 'white' ? 'rgba(255,255,255,0.4)' : '#d1d5db'} />
          </linearGradient>
        </defs>
        <path
          fill={`url(#${uniqueId})`}
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        />
      </svg>
    )
  }

  const emptyClassName = emptyColor === 'white' ? 'text-white/40' : 'text-gray-300'

  return (
    <svg
      className={`${sizeClasses[size as keyof typeof sizeClasses]} ${filled ? 'text-yellow-400' : emptyClassName}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

export function StarRating({
  rating = 4.8,
  reviewCount = 47,
  showReviewCount = true,
  size = 'md',
  variant = 'light',
}: StarRatingProps) {
  const fullStars = Math.floor(rating)
  const partialFill = rating - fullStars

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  const textColorClass = variant === 'dark' ? 'text-white' : 'text-text'
  const mutedColorClass = variant === 'dark' ? 'text-white/70' : 'text-text-muted'
  const emptyStarColor = variant === 'dark' ? 'white' : 'gray'

  return (
    <div className="flex items-center gap-2" aria-label={`Rating: ${rating} out of 5 stars based on ${reviewCount} reviews`}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            filled={star <= fullStars}
            partial={star === fullStars + 1 ? partialFill : 0}
            size={size}
            emptyColor={emptyStarColor}
          />
        ))}
      </div>
      <span className={`font-semibold ${textColorClass} ${textSizeClasses[size]}`}>
        {rating.toFixed(1)}
      </span>
      {showReviewCount && (
        <span className={`${mutedColorClass} ${textSizeClasses[size]}`}>
          ({reviewCount} reviews)
        </span>
      )}
    </div>
  )
}
