'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
  useClose,
  useViewProfile,
  usePrimaryButton,
  useNotification,
} from '@coinbase/onchainkit/minikit'
import { BetCard } from './components/BetCard'
import { CreateBetModal } from './components/CreateBetModal'
import { MyBetsSection } from './components/MyBetsSection'
import { MarketTicker } from './components/MarketTicker'
import { UserAvatar } from './components/UserAvatar'
import { BetListSkeleton, LoadingSpinner } from './components/LoadingStates'
import { NoBetsEmptyState, NoMyBetsEmptyState, ErrorState } from './components/EmptyStates'
import { Plus, TrendingUp, Trophy, User } from 'lucide-react'

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

export default function SocialBetArena() {
  const { setFrameReady, isFrameReady, context } = useMiniKit()
  const [activeTab, setActiveTab] = useState<'browse' | 'my-bets'>('browse')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedBet, setSelectedBet] = useState<Bet | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const addFrame = useAddFrame()
  const openUrl = useOpenUrl()
  const close = useClose()
  const viewProfile = useViewProfile()
  const sendNotification = useNotification()

  // Enhanced mock data for demo
  const [activeBets] = useState<Bet[]>([
    {
      betId: '1',
      description: 'Will @vitalik.eth\'s next cast get 1000+ likes?',
      outcomeTarget: '1000 likes in 24h',
      deadline: '2024-01-15T18:00:00Z',
      stakeAmount: 5,
      potentialPayout: 12,
      currentParticipants: 23,
      status: 'active',
      creator: {
        name: 'CryptoSage',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoSage',
        reputation: 87,
        verified: true
      },
      isHot: true,
      participantAvatars: [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=user2',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=user3',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=user4',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=user5'
      ]
    },
    {
      betId: '2',
      description: 'Base chain TVL reaches $2B by month end?',
      outcomeTarget: '$2B TVL by Jan 31',
      deadline: '2024-01-31T23:59:59Z',
      stakeAmount: 10,
      potentialPayout: 25,
      currentParticipants: 8,
      status: 'active',
      creator: {
        name: 'DeFiAnalyst',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DeFiAnalyst',
        reputation: 72,
        verified: false
      },
      participantAvatars: [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=defi1',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=defi2',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=defi3'
      ]
    },
    {
      betId: '3',
      description: 'Farcaster daily active users hit 100k?',
      outcomeTarget: '100k DAU this week',
      deadline: '2024-01-13T23:59:59Z', // Made this closer to demonstrate urgency
      stakeAmount: 3,
      potentialPayout: 8,
      currentParticipants: 45,
      status: 'active',
      creator: {
        name: 'SocialMetrics',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SocialMetrics',
        reputation: 94,
        verified: true
      },
      participantAvatars: [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=social1',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=social2'
      ]
    }
  ])

  const [myBets] = useState<Bet[]>([
    {
      betId: '4',
      description: 'Coinbase stock price > $100 today?',
      outcomeTarget: '$100+ by market close',
      deadline: '2024-01-12T21:00:00Z',
      stakeAmount: 15,
      potentialPayout: 28,
      currentParticipants: 12,
      status: 'resolved',
      outcome: 'win'
    }
  ])

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  const handleAddFrame = useCallback(async () => {
    const result = await addFrame()
    if (result) {
      console.log('Frame added:', result.url, result.token)
      await sendNotification({
        title: 'SocialBet Arena Added! 🎯',
        body: 'Start predicting and betting on social outcomes!'
      })
    }
  }, [addFrame, sendNotification])

  const handleJoinBet = useCallback((bet: Bet) => {
    setSelectedBet(bet)
    // In a real app, this would trigger wallet connection and transaction
    console.log('Joining bet:', bet.betId)
  }, [])

  const handleCreateBet = useCallback(() => {
    setShowCreateModal(true)
  }, [])

  const handleViewProfile = useCallback(() => {
    viewProfile()
  }, [viewProfile])

  // Primary button for joining selected bet
  usePrimaryButton(
    { 
      text: selectedBet ? `Bet ${selectedBet.stakeAmount} USDC` : 'Select a Bet',
      disabled: !selectedBet 
    },
    () => {
      if (selectedBet) {
        // Handle bet joining logic
        console.log('Processing bet for:', selectedBet.betId)
        sendNotification({
          title: 'Bet Placed! 🎰',
          body: `Your ${selectedBet.stakeAmount} USDC bet is active!`
        })
        setSelectedBet(null)
      }
    }
  )

  return (
    <div className="min-h-screen bg-bg">
      <div className="container-app py-4">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text">SocialBet Arena</h1>
              <p className="text-sm text-muted">Predict & Profit</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {context && !context.client.added && (
              <button
                onClick={handleAddFrame}
                className="btn-primary text-sm px-3 py-2"
              >
                Save
              </button>
            )}
            <button
              onClick={handleViewProfile}
              className="btn-secondary text-sm px-3 py-2"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Market Ticker */}
        <MarketTicker />

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-surface rounded-lg p-1 border border-border">
          <button
            onClick={() => setActiveTab('browse')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'browse'
                ? 'bg-primary text-white shadow-md'
                : 'text-muted hover:text-text'
            }`}
          >
            Browse Bets
          </button>
          <button
            onClick={() => setActiveTab('my-bets')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'my-bets'
                ? 'bg-primary text-white shadow-md'
                : 'text-muted hover:text-text'
            }`}
          >
            My Bets ({myBets.length})
          </button>
        </div>

        {/* Content */}
        {error ? (
          <ErrorState 
            title="Unable to Load Bets"
            description={error}
            onRetry={() => {
              setError(null)
              setIsLoading(true)
              // Simulate retry
              setTimeout(() => setIsLoading(false), 1000)
            }}
          />
        ) : activeTab === 'browse' ? (
          <div className="space-y-4">
            {/* Create Bet Button */}
            <button
              onClick={handleCreateBet}
              className="w-full btn-accent flex items-center justify-center space-x-2 animate-fade-in"
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
              <span>{isLoading ? 'Loading...' : 'Create New Bet'}</span>
            </button>

            {/* Active Bets */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-text flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-primary" />
                <span>Active Predictions</span>
                {isLoading && <LoadingSpinner size="sm" />}
              </h2>
              
              {isLoading ? (
                <BetListSkeleton count={3} />
              ) : activeBets.length === 0 ? (
                <NoBetsEmptyState onCreateBet={handleCreateBet} />
              ) : (
                activeBets.map((bet, index) => (
                  <div
                    key={bet.betId}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <BetCard
                      bet={bet}
                      onJoin={handleJoinBet}
                      isSelected={selectedBet?.betId === bet.betId}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {isLoading ? (
              <BetListSkeleton count={2} />
            ) : myBets.length === 0 ? (
              <NoMyBetsEmptyState onBrowseBets={() => setActiveTab('browse')} />
            ) : (
              <MyBetsSection bets={myBets} />
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-border text-center">
          <button
            onClick={() => openUrl('https://base.org')}
            className="text-sm text-muted hover:text-primary transition-colors duration-200"
          >
            Built on Base ⚡
          </button>
        </footer>

        {/* Create Bet Modal */}
        {showCreateModal && (
          <CreateBetModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onSubmit={(betData) => {
              console.log('Creating bet:', betData)
              setShowCreateModal(false)
              sendNotification({
                title: 'Bet Created! 🚀',
                body: 'Your prediction is now live for others to join!'
              })
            }}
          />
        )}
      </div>
    </div>
  )
}
