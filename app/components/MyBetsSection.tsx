
'use client'

import { BetCard } from './BetCard'
import { Trophy, TrendingUp, DollarSign } from 'lucide-react'

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

interface MyBetsSectionProps {
  bets: Bet[]
}

export function MyBetsSection({ bets }: MyBetsSectionProps) {
  const activeBets = bets.filter(bet => bet.status === 'active')
  const resolvedBets = bets.filter(bet => bet.status === 'resolved')
  const wins = resolvedBets.filter(bet => bet.outcome === 'win')
  const totalWinnings = wins.reduce((sum, bet) => sum + bet.potentialPayout, 0)
  const totalStaked = bets.reduce((sum, bet) => sum + bet.stakeAmount, 0)

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="flex items-center justify-center text-primary mb-2">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-text">{bets.length}</div>
          <div className="text-sm text-muted">Total Bets</div>
        </div>
        
        <div className="card text-center">
          <div className="flex items-center justify-center text-green-600 mb-2">
            <Trophy className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-text">{wins.length}</div>
          <div className="text-sm text-muted">Wins</div>
        </div>
        
        <div className="card text-center">
          <div className="flex items-center justify-center text-accent mb-2">
            <DollarSign className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-text">{totalWinnings}</div>
          <div className="text-sm text-muted">USDC Won</div>
        </div>
      </div>

      {/* Active Bets */}
      {activeBets.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-text mb-4 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Active Bets ({activeBets.length})</span>
          </h3>
          <div className="space-y-4">
            {activeBets.map((bet) => (
              <BetCard
                key={bet.betId}
                bet={bet}
                onJoin={() => {}} // No action needed for own bets
              />
            ))}
          </div>
        </div>
      )}

      {/* Resolved Bets */}
      {resolvedBets.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-text mb-4 flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-primary" />
            <span>Bet History ({resolvedBets.length})</span>
          </h3>
          <div className="space-y-4">
            {resolvedBets.map((bet) => (
              <BetCard
                key={bet.betId}
                bet={bet}
                onJoin={() => {}} // No action needed for resolved bets
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {bets.length === 0 && (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-lg font-bold text-text mb-2">No Bets Yet</h3>
          <p className="text-muted mb-6">
            Start predicting social media outcomes to see your bets here.
          </p>
          <button className="btn-primary">
            Browse Active Bets
          </button>
        </div>
      )}
    </div>
  )
}
