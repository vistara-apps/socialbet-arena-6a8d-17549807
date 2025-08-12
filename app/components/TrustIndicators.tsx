'use client'

import { CheckCircle, Shield, Star, TrendingUp, Award, Zap } from 'lucide-react'

interface VerificationBadgeProps {
  verified: boolean
  type?: 'user' | 'creator' | 'expert'
  size?: 'sm' | 'md' | 'lg'
}

export function VerificationBadge({ verified, type = 'user', size = 'md' }: VerificationBadgeProps) {
  if (!verified) return null

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  const typeConfig = {
    user: { icon: CheckCircle, color: 'text-primary', bg: 'bg-primary/10' },
    creator: { icon: Star, color: 'text-accent', bg: 'bg-accent/10' },
    expert: { icon: Award, color: 'text-green-600', bg: 'bg-green-100' }
  }

  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <div className={`${config.bg} ${config.color} rounded-full p-1 flex items-center justify-center`}>
      <Icon className={sizeClasses[size]} />
    </div>
  )
}

interface ReputationScoreProps {
  score: number
  totalBets?: number
  winRate?: number
  showDetails?: boolean
}

export function ReputationScore({ score, totalBets, winRate, showDetails = false }: ReputationScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-primary'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Expert'
    if (score >= 80) return 'Pro'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'New'
  }

  return (
    <div className="flex items-center space-x-1">
      <TrendingUp className="w-3 h-3 text-primary" />
      <span className={`text-xs font-medium ${getScoreColor(score)}`}>
        {score}%
      </span>
      {showDetails && (
        <span className="text-xs text-muted">
          ({getScoreLabel(score)})
        </span>
      )}
      {totalBets && (
        <span className="text-xs text-muted">
          • {totalBets} bets
        </span>
      )}
    </div>
  )
}

interface TrustScoreProps {
  score: number
  factors: {
    verification: boolean
    reputation: number
    activity: number
    social: number
  }
  showBreakdown?: boolean
}

export function TrustScore({ score, factors, showBreakdown = false }: TrustScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600'
    if (score >= 70) return 'text-primary'
    if (score >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getTrustLevel = (score: number) => {
    if (score >= 85) return 'Highly Trusted'
    if (score >= 70) return 'Trusted'
    if (score >= 50) return 'Moderate'
    return 'New User'
  }

  return (
    <div className="flex items-center space-x-2">
      <Shield className="w-4 h-4 text-primary" />
      <div className="flex items-center space-x-1">
        <span className={`text-sm font-medium ${getScoreColor(score)}`}>
          {score}
        </span>
        <span className="text-xs text-muted">
          {getTrustLevel(score)}
        </span>
      </div>
      
      {showBreakdown && (
        <div className="text-xs text-muted">
          <div className="flex items-center space-x-2">
            {factors.verification && <CheckCircle className="w-3 h-3 text-green-600" />}
            <span>Rep: {factors.reputation}%</span>
            <span>Activity: {factors.activity}/10</span>
          </div>
        </div>
      )}
    </div>
  )
}

interface SocialProofProps {
  participantCount: number
  recentJoins?: string[]
  trending?: boolean
  hotStreak?: number
}

export function SocialProof({ participantCount, recentJoins, trending, hotStreak }: SocialProofProps) {
  return (
    <div className="flex items-center space-x-3">
      {/* Participant Count */}
      <div className="flex items-center space-x-1">
        <div className="flex -space-x-1">
          {recentJoins?.slice(0, 3).map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt={`Recent participant ${index + 1}`}
              className="w-5 h-5 rounded-full border border-white"
              onError={(e) => {
                e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`
              }}
            />
          ))}
        </div>
        <span className="text-xs text-muted">
          {participantCount} joined
        </span>
      </div>

      {/* Trending Indicator */}
      {trending && (
        <div className="flex items-center space-x-1 text-accent">
          <Zap className="w-3 h-3" />
          <span className="text-xs font-medium">Trending</span>
        </div>
      )}

      {/* Hot Streak */}
      {hotStreak && hotStreak > 0 && (
        <div className="flex items-center space-x-1 text-accent">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <span className="text-xs font-medium">{hotStreak} streak</span>
        </div>
      )}
    </div>
  )
}

interface ActivityIndicatorProps {
  lastActive: string
  isOnline?: boolean
}

export function ActivityIndicator({ lastActive, isOnline }: ActivityIndicatorProps) {
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <div className="flex items-center space-x-1">
      <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
      <span className="text-xs text-muted">
        {isOnline ? 'Online' : getTimeAgo(lastActive)}
      </span>
    </div>
  )
}

interface CommunityEndorsementProps {
  endorsements: {
    type: 'like' | 'share' | 'comment'
    count: number
  }[]
  showDetails?: boolean
}

export function CommunityEndorsement({ endorsements, showDetails = false }: CommunityEndorsementProps) {
  const totalEngagement = endorsements.reduce((sum, e) => sum + e.count, 0)
  
  if (totalEngagement === 0) return null

  return (
    <div className="flex items-center space-x-2 text-xs text-muted">
      <span>{totalEngagement} community interactions</span>
      {showDetails && (
        <div className="flex items-center space-x-1">
          {endorsements.map((endorsement, index) => (
            <span key={index}>
              {endorsement.count} {endorsement.type}s
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
