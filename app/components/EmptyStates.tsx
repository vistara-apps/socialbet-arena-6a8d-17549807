'use client'

import { TrendingUp, Plus, Trophy, Search, AlertCircle, RefreshCw } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary'
  }
  icon?: React.ReactNode
  illustration?: React.ReactNode
}

export function EmptyState({ title, description, action, icon, illustration }: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4">
      {illustration && (
        <div className="mb-6 flex justify-center">
          {illustration}
        </div>
      )}
      
      {icon && !illustration && (
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            {icon}
          </div>
        </div>
      )}
      
      <h3 className="text-lg font-bold text-text mb-2">{title}</h3>
      <p className="text-muted mb-6 max-w-sm mx-auto leading-relaxed">{description}</p>
      
      {action && (
        <button
          onClick={action.onClick}
          className={action.variant === 'secondary' ? 'btn-secondary' : 'btn-primary'}
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

export function NoBetsEmptyState({ onCreateBet }: { onCreateBet: () => void }) {
  const illustration = (
    <div className="relative">
      <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-2">
        <TrendingUp className="w-12 h-12 text-primary" />
      </div>
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center animate-bounce">
        <Plus className="w-4 h-4 text-white" />
      </div>
    </div>
  )

  return (
    <EmptyState
      title="No Active Bets"
      description="Be the first to create a prediction! Start a bet on social outcomes and let others join the fun."
      action={{
        label: "Create First Bet",
        onClick: onCreateBet,
        variant: 'primary'
      }}
      illustration={illustration}
    />
  )
}

export function NoMyBetsEmptyState({ onBrowseBets }: { onBrowseBets: () => void }) {
  const illustration = (
    <div className="relative">
      <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-2">
        <Trophy className="w-12 h-12 text-primary" />
      </div>
      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
        <Search className="w-3 h-3 text-accent" />
      </div>
    </div>
  )

  return (
    <EmptyState
      title="No Bets Yet"
      description="You haven't joined any predictions yet. Browse active bets and start making your predictions!"
      action={{
        label: "Browse Active Bets",
        onClick: onBrowseBets,
        variant: 'primary'
      }}
      illustration={illustration}
    />
  )
}

export function SearchEmptyState({ searchTerm, onClearSearch }: { searchTerm: string, onClearSearch: () => void }) {
  return (
    <EmptyState
      title="No Results Found"
      description={`No bets match "${searchTerm}". Try adjusting your search or browse all active predictions.`}
      action={{
        label: "Clear Search",
        onClick: onClearSearch,
        variant: 'secondary'
      }}
      icon={<Search className="w-8 h-8 text-primary" />}
    />
  )
}

export function ErrorState({ 
  title = "Something went wrong", 
  description = "We're having trouble loading the bets. Please try again.",
  onRetry 
}: { 
  title?: string
  description?: string
  onRetry: () => void 
}) {
  return (
    <EmptyState
      title={title}
      description={description}
      action={{
        label: "Try Again",
        onClick: onRetry,
        variant: 'primary'
      }}
      icon={<AlertCircle className="w-8 h-8 text-accent" />}
    />
  )
}

export function NetworkErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <EmptyState
      title="Connection Problem"
      description="Check your internet connection and try again. Your bets are safe!"
      action={{
        label: "Retry",
        onClick: onRetry,
        variant: 'primary'
      }}
      icon={<RefreshCw className="w-8 h-8 text-accent" />}
    />
  )
}

export function MaintenanceState() {
  const illustration = (
    <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-2">
      <AlertCircle className="w-12 h-12 text-primary" />
    </div>
  )

  return (
    <EmptyState
      title="Under Maintenance"
      description="We're making improvements to give you a better betting experience. Check back soon!"
      illustration={illustration}
    />
  )
}
