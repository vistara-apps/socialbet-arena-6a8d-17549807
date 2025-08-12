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
import { usePayments } from './hooks/usePayments'
import { BetCard } from './components/BetCard'
import { CreateBetModal } from './components/CreateBetModal'
import { MyBetsSection } from './components/MyBetsSection'
import { MarketTicker } from './components/MarketTicker'
import { UserAvatar } from './components/UserAvatar'
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
  const addFrame = useAddFrame()
  const openUrl = useOpenUrl()
  const close = useClose()
  const viewProfile = useViewProfile()
  const sendNotification = useNotification()
  
  // x402 payment integration
  const { 
    isInitialized: isPaymentReady, 
    isProcessing: isPaymentProcessing, 
    error: paymentError,
    joinBet: processPayment,
    createBet: processCreateBet,
    testPayment: processTestPayment,
    clearError,
    getWalletAddress 
  } = usePayments()

  // Mock data for demo
  const [activeBets] = useState<Bet[]>([
    {
      betId: '1',
      description: 'Will @vitalik.eth\'s next cast get 1000+ likes?',
      outcomeTarget: '1000 likes in 24h',
      deadline: '2024-01-15T18:00:00Z',
      stakeAmount: 5,
      potentialPayout: 12,
      currentParticipants: 23,
      status: 'active'
    },
    {
      betId: '2',
      description: 'Base chain TVL reaches $2B by month end?',
      outcomeTarget: '$2B TVL by Jan 31',
      deadline: '2024-01-31T23:59:59Z',
      stakeAmount: 10,
      potentialPayout: 25,
      currentParticipants: 8,
      status: 'active'
    },
    {
      betId: '3',
      description: 'Farcaster daily active users hit 100k?',
      outcomeTarget: '100k DAU this week',
      deadline: '2024-01-20T23:59:59Z',
      stakeAmount: 3,
      potentialPayout: 8,
      currentParticipants: 45,
      status: 'active'
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
    
    // Clear any previous payment errors
    if (paymentError) {
      clearError()
    }
  }, [paymentError, clearError])

  const handleCreateBet = useCallback(() => {
    setShowCreateModal(true)
  }, [])

  const handleViewProfile = useCallback(() => {
    viewProfile()
  }, [viewProfile])

  // Primary button for joining selected bet
  usePrimaryButton(
    { 
      text: selectedBet 
        ? isPaymentProcessing 
          ? 'Processing...' 
          : `Bet ${selectedBet.stakeAmount} USDC`
        : !isPaymentReady 
          ? 'Connect Wallet' 
          : 'Select a Bet',
      disabled: !selectedBet || isPaymentProcessing || !isPaymentReady
    },
    async () => {
      if (selectedBet && isPaymentReady) {
        try {
          const walletAddress = getWalletAddress()
          if (!walletAddress) {
            sendNotification({
              title: 'Wallet Error ❌',
              body: 'Please connect your wallet to place bets'
            })
            return
          }

          // Process payment via x402
          const result = await processPayment({
            betId: selectedBet.betId,
            amount: selectedBet.stakeAmount,
            participantAddress: walletAddress,
          })

          if (result.success) {
            sendNotification({
              title: 'Bet Placed! 🎰',
              body: `Your ${selectedBet.stakeAmount} USDC bet is active!`
            })
            setSelectedBet(null)
          } else {
            sendNotification({
              title: 'Payment Failed ❌',
              body: result.error || 'Unable to process payment'
            })
          }
        } catch (error) {
          console.error('Bet placement failed:', error)
          sendNotification({
            title: 'Error ❌',
            body: 'Failed to place bet. Please try again.'
          })
        }
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

        {/* Payment Status */}
        {paymentError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-red-600 text-sm font-medium">Payment Error:</span>
              <span className="text-red-700 text-sm">{paymentError}</span>
              <button
                onClick={clearError}
                className="text-red-600 hover:text-red-800 text-sm underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {!isPaymentReady && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-600 text-sm font-medium">⚠️ Wallet not connected</span>
              <span className="text-yellow-700 text-sm">Connect your wallet to place bets</span>
            </div>
          </div>
        )}

        {/* Test Payment Button (Development) */}
        {isPaymentReady && process.env.NODE_ENV === 'development' && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-blue-600 text-sm font-medium">🧪 Development Mode</span>
                <p className="text-blue-700 text-sm">Test x402 payment flow</p>
              </div>
              <button
                onClick={async () => {
                  const result = await processTestPayment(1)
                  sendNotification({
                    title: result.success ? 'Test Payment Success! ✅' : 'Test Payment Failed ❌',
                    body: result.success ? 'x402 flow is working!' : result.error || 'Payment failed'
                  })
                }}
                disabled={isPaymentProcessing}
                className="btn-secondary text-sm px-3 py-2"
              >
                {isPaymentProcessing ? 'Testing...' : 'Test Payment'}
              </button>
            </div>
          </div>
        )}

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
        {activeTab === 'browse' ? (
          <div className="space-y-4">
            {/* Create Bet Button */}
            <button
              onClick={handleCreateBet}
              className="w-full btn-accent flex items-center justify-center space-x-2 animate-fade-in"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Bet</span>
            </button>

            {/* Active Bets */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-text flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-primary" />
                <span>Active Predictions</span>
              </h2>
              
              {activeBets.map((bet, index) => (
                <div
                  key={bet.betId}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <BetCard
                    bet={bet}
                    onJoin={handleJoinBet}
                    isSelected={selectedBet?.betId === bet.betId}
                    isProcessing={isPaymentProcessing && selectedBet?.betId === bet.betId}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <MyBetsSection bets={myBets} />
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
            onSubmit={async (betData) => {
              try {
                const walletAddress = getWalletAddress()
                if (!walletAddress) {
                  sendNotification({
                    title: 'Wallet Error ❌',
                    body: 'Please connect your wallet to create bets'
                  })
                  return
                }

                // Process bet creation payment via x402
                const result = await processCreateBet({
                  ...betData,
                  creatorAddress: walletAddress,
                })

                if (result.success) {
                  setShowCreateModal(false)
                  sendNotification({
                    title: 'Bet Created! 🚀',
                    body: 'Your prediction is now live for others to join!'
                  })
                } else {
                  sendNotification({
                    title: 'Creation Failed ❌',
                    body: result.error || 'Unable to create bet'
                  })
                }
              } catch (error) {
                console.error('Bet creation failed:', error)
                sendNotification({
                  title: 'Error ❌',
                  body: 'Failed to create bet. Please try again.'
                })
              }
            }}
          />
        )}
      </div>
    </div>
  )
}
