'use client'

interface LoadingSkeletonProps {
  className?: string
  width?: string
  height?: string
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  variant?: 'text' | 'rectangular' | 'circular'
  count?: number
  showShimmer?: boolean
}

export default function LoadingSkeleton({ 
  className = '',
  width = 'w-full',
  height = 'h-4',
  rounded = 'md',
  variant = 'text',
  count = 1,
  showShimmer = true
}: LoadingSkeletonProps) {
  const getRoundedClass = () => {
    switch (rounded) {
      case 'none': return 'rounded-none'
      case 'sm': return 'rounded-sm'
      case 'md': return 'rounded-md'
      case 'lg': return 'rounded-lg'
      case 'full': return 'rounded-full'
      default: return 'rounded-md'
    }
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full aspect-square'
      case 'text':
        return `${getRoundedClass()} ${height}`
      case 'rectangular':
        return `${getRoundedClass()} ${height}`
      default:
        return `${getRoundedClass()} ${height}`
    }
  }

  const shimmerClass = showShimmer 
    ? 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%]'
    : 'bg-gray-200 animate-pulse'

  const skeletonItems = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`
        ${width}
        ${getVariantClasses()}
        ${shimmerClass}
        ${className}
        ${index > 0 ? 'mt-2' : ''}
      `}
    />
  ))

  return count === 1 ? skeletonItems[0] : <div className="space-y-2">{skeletonItems}</div>
}