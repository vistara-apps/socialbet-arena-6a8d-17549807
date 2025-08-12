'use client'

export function BetCardSkeleton() {
  return (
    <div className="card animate-pulse">
      {/* Creator Info Skeleton */}
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-6 h-6 bg-border rounded-full"></div>
        <div className="flex items-center space-x-1">
          <div className="w-16 h-4 bg-border rounded"></div>
          <div className="w-8 h-3 bg-border rounded"></div>
        </div>
      </div>

      {/* Header Skeleton */}
      <div className="mb-4">
        <div className="w-full h-6 bg-border rounded mb-2"></div>
        <div className="w-3/4 h-4 bg-border rounded"></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="text-center">
            <div className="w-4 h-4 bg-border rounded mx-auto mb-1"></div>
            <div className="w-12 h-4 bg-border rounded mx-auto mb-1"></div>
            <div className="w-8 h-3 bg-border rounded mx-auto"></div>
          </div>
        ))}
      </div>

      {/* Participant Avatars Skeleton */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="flex -space-x-2">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="w-6 h-6 bg-border rounded-full border-2 border-white"></div>
          ))}
        </div>
        <div className="w-20 h-3 bg-border rounded"></div>
      </div>

      {/* Footer Skeleton */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="w-24 h-4 bg-border rounded"></div>
        <div className="w-20 h-4 bg-border rounded"></div>
      </div>
    </div>
  )
}

export function BetListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <BetCardSkeleton />
        </div>
      ))}
    </div>
  )
}

export function MarketTickerSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-4 bg-border rounded"></div>
          <div className="w-20 h-4 bg-border rounded"></div>
        </div>
        <div className="w-12 h-4 bg-border rounded"></div>
      </div>
    </div>
  )
}

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-border border-t-primary`}></div>
  )
}

export function PageLoadingState() {
  return (
    <div className="min-h-screen bg-bg">
      <div className="container-app py-4">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-border rounded-lg"></div>
            <div>
              <div className="w-32 h-6 bg-border rounded mb-1"></div>
              <div className="w-20 h-4 bg-border rounded"></div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-8 bg-border rounded"></div>
            <div className="w-8 h-8 bg-border rounded"></div>
          </div>
        </div>

        {/* Market Ticker Skeleton */}
        <MarketTickerSkeleton />

        {/* Navigation Tabs Skeleton */}
        <div className="flex space-x-1 mb-6 bg-surface rounded-lg p-1 border border-border">
          <div className="flex-1 h-10 bg-border rounded-md"></div>
          <div className="flex-1 h-10 bg-border rounded-md"></div>
        </div>

        {/* Create Bet Button Skeleton */}
        <div className="w-full h-12 bg-border rounded-md mb-4"></div>

        {/* Bet List Skeleton */}
        <BetListSkeleton />
      </div>
    </div>
  )
}
