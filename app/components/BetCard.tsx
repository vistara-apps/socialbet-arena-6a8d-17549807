
'use client'

import { Clock, Users, DollarSign, Target } from 'lucide-react'

type Bet = {
  betId: string
  description: string
  outcomeTarget: string
  deadline: string
  stakeAmount: number
  potentialPayout: number
  currentParticipants: number
  status: 'active' | 'resolved'
  outcome?: 'win' | 'loss'
}

interface BetCardProps {
  bet: Bet
  onJoin: (bet: Bet) => void
  isSelected?: boolean
}

export function BetCard({ bet, onJoin, isSelected = false }: BetCardProps) {
  const timeUntilDeadline = () => {
    const deadline = new Date(bet.deadline)
    const now = new Date()
    const diff = deadline.getTime() - now.getTime()
    
    if (diff <= 0) return 'Expired'
    
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 24) {
      const days = Math.floor(hours / 24)
      return `${days}d ${hours % 24}h`
    }
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }

  const returnMultiplier = (bet.potentialPayout / bet.stakeAmount).toFixed(1)

  return (
    <div
      className={`card-hover cursor-pointer transition-all duration-200 ${
        isSelected ? 'ring-2 ring-primary shadow-glow' : ''
      }`}
      onClick={() => onJoin(bet)}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-text mb-2 leading-tight">
            {bet.description}
          </h3>
          <div className="flex items-center text-sm text-muted space-x-1">
            <Target className="w-4 h-4" />
            <span>{bet.outcomeTarget}</span>
          </div>
        </div>
        
        {bet.status === 'active' && (
          <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
            Live
          </div>
        )}
        
        {bet.status === 'resolved' && (
          <div className={`text-xs px-2 py-1 rounded-full font-medium ${
            bet.outcome === 'win' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {bet.outcome === 'win' ? 'Won' : 'Lost'}
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center text-primary mb-1">
            <DollarSign className="w-4 h-4" />
          </div>
          <div className="text-sm font-bold text-text">{bet.stakeAmount} USDC</div>
          <div className="text-xs text-muted">Stake</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center text-accent mb-1">
            <Target className="w-4 h-4" />
          </div>
          <div className="text-sm font-bold text-text">{returnMultiplier}x</div>
          <div className="text-xs text-muted">Return</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center text-primary mb-1">
            <Users className="w-4 h-4" />
          </div>
          <div className="text-sm font-bold text-text">{bet.currentParticipants}</div>
          <div className="text-xs text-muted">Players</div>
        </div>
      </div>

      {/* Time Remaining */}
      {bet.status === 'active' && (
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center text-sm text-muted space-x-1">
            <Clock className="w-4 h-4" />
            <span>{timeUntilDeadline()} remaining</span>
          </div>
          
          <div className="text-sm font-bold text-accent">
            Win {bet.potentialPayout} USDC
          </div>
        </div>
      )}
      
      {/* Resolved Results */}
      {bet.status === 'resolved' && (
        <div className="pt-3 border-t border-border">
          <div className={`text-sm font-medium ${
            bet.outcome === 'win' ? 'text-green-600' : 'text-red-600'
          }`}>
            {bet.outcome === 'win' 
              ? `🎉 You won ${bet.potentialPayout} USDC!` 
              : `😔 Better luck next time`
            }
          </div>
        </div>
      )}
    </div>
  )
}
