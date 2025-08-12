'use client'

import { Clock, Users, DollarSign, Target, TrendingUp, AlertCircle, CheckCircle, Fire } from 'lucide-react'

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
  creator?: {
    name: string
    avatar: string
    reputation: number
    verified: boolean
  }
  isHot?: boolean
  participantAvatars?: string[]
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
    
    if (diff <= 0) return { text: 'Expired', urgent: true }
    
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 24) {
      const days = Math.floor(hours / 24)
      return { text: `${days}d ${hours % 24}h`, urgent: false }
    }
    
    const timeText = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
    const urgent = hours < 2 // Mark as urgent if less than 2 hours remaining
    
    return { text: timeText, urgent }
  }

  const returnMultiplier = (bet.potentialPayout / bet.stakeAmount).toFixed(1)
  const timeInfo = timeUntilDeadline()
  const isClosingSoon = timeInfo.urgent && bet.status === 'active'

  return (
    <div
      className={`card-hover cursor-pointer transition-all duration-200 relative overflow-hidden ${
        isSelected ? 'ring-2 ring-primary shadow-glow' : ''
      } ${isClosingSoon ? 'ring-1 ring-accent/50' : ''}`}
      onClick={() => onJoin(bet)}
    >
      {/* Hot/Trending Indicator */}
      {bet.isHot && (
        <div className="absolute top-3 right-3 bg-accent text-white text-xs px-2 py-1 rounded-full font-medium flex items-center space-x-1 animate-pulse-glow">
          <Fire className="w-3 h-3" />
          <span>Hot</span>
        </div>
      )}
      
      {/* Closing Soon Indicator */}
      {isClosingSoon && !bet.isHot && (
        <div className="absolute top-3 right-3 bg-accent/90 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center space-x-1">
          <AlertCircle className="w-3 h-3" />
          <span>Closing Soon</span>
        </div>
      )}

      {/* Creator Info */}
      {bet.creator && (
        <div className="flex items-center space-x-2 mb-3">
          <div className="relative">
            <img 
              src={bet.creator.avatar} 
              alt={bet.creator.name}
              className="w-6 h-6 rounded-full"
              onError={(e) => {
                e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${bet.creator?.name}`
              }}
            />
            {bet.creator.verified && (
              <CheckCircle className="w-3 h-3 text-primary absolute -bottom-0.5 -right-0.5 bg-white rounded-full" />
            )}
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-sm font-medium text-text">{bet.creator.name}</span>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3 text-primary" />
              <span className="text-xs text-muted">{bet.creator.reputation}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-4">
        <h3 className="font-bold text-text mb-2 leading-tight text-lg">
          {bet.description}
        </h3>
        <div className="flex items-center text-sm text-muted space-x-1">
          <Target className="w-4 h-4" />
          <span>{bet.outcomeTarget}</span>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
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
          <div className={`text-sm font-bold ${returnMultiplier >= '2.0' ? 'text-accent' : 'text-text'}`}>
            {returnMultiplier}x
          </div>
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

      {/* Participant Avatars */}
      {bet.participantAvatars && bet.participantAvatars.length > 0 && (
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex -space-x-2">
            {bet.participantAvatars.slice(0, 4).map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`Participant ${index + 1}`}
                className="w-6 h-6 rounded-full border-2 border-white"
                onError={(e) => {
                  e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`
                }}
              />
            ))}
            {bet.participantAvatars.length > 4 && (
              <div className="w-6 h-6 rounded-full border-2 border-white bg-muted flex items-center justify-center">
                <span className="text-xs text-white font-medium">+{bet.participantAvatars.length - 4}</span>
              </div>
            )}
          </div>
          <span className="text-xs text-muted">joined recently</span>
        </div>
      )}

      {/* Time Remaining */}
      {bet.status === 'active' && (
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className={`flex items-center text-sm space-x-1 ${
            timeInfo.urgent ? 'text-accent font-medium' : 'text-muted'
          }`}>
            <Clock className={`w-4 h-4 ${timeInfo.urgent ? 'animate-pulse' : ''}`} />
            <span>{timeInfo.text} remaining</span>
          </div>
          
          <div className="text-sm font-bold text-accent">
            Win {bet.potentialPayout} USDC
          </div>
        </div>
      )}
      
      {/* Resolved Results */}
      {bet.status === 'resolved' && (
        <div className="pt-3 border-t border-border">
          <div className={`text-sm font-medium flex items-center space-x-2 ${
            bet.outcome === 'win' ? 'text-green-600' : 'text-red-600'
          }`}>
            {bet.outcome === 'win' ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>🎉 You won {bet.potentialPayout} USDC!</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4" />
                <span>😔 Better luck next time</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
