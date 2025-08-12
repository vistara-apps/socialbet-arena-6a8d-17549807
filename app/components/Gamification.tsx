'use client'

import { Trophy, Star, Zap, Target, Award, TrendingUp, Fire, Crown } from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  unlocked: boolean
  progress?: number
  maxProgress?: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

interface AchievementBadgeProps {
  achievement: Achievement
  size?: 'sm' | 'md' | 'lg'
  showProgress?: boolean
}

export function AchievementBadge({ achievement, size = 'md', showProgress = false }: AchievementBadgeProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  const rarityColors = {
    common: 'bg-gray-100 border-gray-300 text-gray-600',
    rare: 'bg-blue-100 border-blue-300 text-blue-600',
    epic: 'bg-purple-100 border-purple-300 text-purple-600',
    legendary: 'bg-yellow-100 border-yellow-300 text-yellow-600'
  }

  const rarityGlow = {
    common: '',
    rare: 'shadow-blue-200',
    epic: 'shadow-purple-200',
    legendary: 'shadow-yellow-200 animate-pulse-glow'
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <div
        className={`
          ${sizeClasses[size]} 
          ${achievement.unlocked ? rarityColors[achievement.rarity] : 'bg-gray-100 border-gray-200 text-gray-400'}
          ${achievement.unlocked && achievement.rarity === 'legendary' ? rarityGlow[achievement.rarity] : ''}
          rounded-full border-2 flex items-center justify-center relative
          ${achievement.unlocked ? 'shadow-md' : 'opacity-50'}
        `}
      >
        {achievement.icon}
        
        {!achievement.unlocked && (
          <div className="absolute inset-0 bg-gray-500/20 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
          </div>
        )}
      </div>
      
      {size !== 'sm' && (
        <div className="text-center">
          <div className={`text-xs font-medium ${achievement.unlocked ? 'text-text' : 'text-muted'}`}>
            {achievement.title}
          </div>
          {showProgress && achievement.progress !== undefined && achievement.maxProgress && (
            <div className="text-xs text-muted">
              {achievement.progress}/{achievement.maxProgress}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

interface StreakCounterProps {
  currentStreak: number
  bestStreak: number
  type: 'wins' | 'predictions' | 'daily'
}

export function StreakCounter({ currentStreak, bestStreak, type }: StreakCounterProps) {
  const getStreakIcon = () => {
    switch (type) {
      case 'wins': return <Trophy className="w-4 h-4" />
      case 'predictions': return <Target className="w-4 h-4" />
      case 'daily': return <Zap className="w-4 h-4" />
    }
  }

  const getStreakColor = (streak: number) => {
    if (streak >= 10) return 'text-yellow-600 bg-yellow-100'
    if (streak >= 5) return 'text-purple-600 bg-purple-100'
    if (streak >= 3) return 'text-blue-600 bg-blue-100'
    return 'text-gray-600 bg-gray-100'
  }

  return (
    <div className="flex items-center space-x-3">
      <div className={`flex items-center space-x-2 px-3 py-2 rounded-full ${getStreakColor(currentStreak)}`}>
        {getStreakIcon()}
        <span className="text-sm font-bold">{currentStreak}</span>
        <span className="text-xs">streak</span>
        {currentStreak >= 5 && <Fire className="w-3 h-3 animate-bounce-subtle" />}
      </div>
      
      {bestStreak > currentStreak && (
        <div className="text-xs text-muted">
          Best: {bestStreak}
        </div>
      )}
    </div>
  )
}

interface ProgressBarProps {
  current: number
  max: number
  label: string
  color?: 'primary' | 'accent' | 'success'
  showPercentage?: boolean
}

export function ProgressBar({ current, max, label, color = 'primary', showPercentage = true }: ProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100)
  
  const colorClasses = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    success: 'bg-green-500'
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-text">{label}</span>
        {showPercentage && (
          <span className="text-xs text-muted">{Math.round(percentage)}%</span>
        )}
      </div>
      
      <div className="w-full bg-border rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-muted">
        <span>{current}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}

interface UserLevelProps {
  level: number
  xp: number
  xpToNext: number
  title: string
}

export function UserLevel({ level, xp, xpToNext, title }: UserLevelProps) {
  const getLevelIcon = (level: number) => {
    if (level >= 50) return <Crown className="w-5 h-5 text-yellow-600" />
    if (level >= 25) return <Award className="w-5 h-5 text-purple-600" />
    if (level >= 10) return <Star className="w-5 h-5 text-blue-600" />
    return <TrendingUp className="w-5 h-5 text-gray-600" />
  }

  const getLevelColor = (level: number) => {
    if (level >= 50) return 'from-yellow-400 to-yellow-600'
    if (level >= 25) return 'from-purple-400 to-purple-600'
    if (level >= 10) return 'from-blue-400 to-blue-600'
    return 'from-gray-400 to-gray-600'
  }

  return (
    <div className="flex items-center space-x-3 p-4 bg-surface border border-border rounded-lg">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getLevelColor(level)} flex items-center justify-center text-white font-bold`}>
        {level}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          {getLevelIcon(level)}
          <span className="font-bold text-text">{title}</span>
        </div>
        
        <ProgressBar
          current={xp}
          max={xpToNext}
          label="XP to next level"
          color="primary"
          showPercentage={false}
        />
      </div>
    </div>
  )
}

interface LeaderboardEntryProps {
  rank: number
  user: {
    name: string
    avatar: string
    score: number
    change: number // Position change from last period
  }
  isCurrentUser?: boolean
}

export function LeaderboardEntry({ rank, user, isCurrentUser = false }: LeaderboardEntryProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />
      case 2: return <Award className="w-5 h-5 text-gray-400" />
      case 3: return <Award className="w-5 h-5 text-yellow-600" />
      default: return <span className="text-sm font-bold text-muted">#{rank}</span>
    }
  }

  const getChangeIndicator = (change: number) => {
    if (change > 0) return <TrendingUp className="w-3 h-3 text-green-500" />
    if (change < 0) return <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />
    return <div className="w-3 h-3 bg-gray-300 rounded-full" />
  }

  return (
    <div className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
      isCurrentUser ? 'bg-primary/10 border border-primary/20' : 'hover:bg-surface'
    }`}>
      <div className="flex items-center justify-center w-8">
        {getRankIcon(rank)}
      </div>
      
      <img
        src={user.avatar}
        alt={user.name}
        className="w-8 h-8 rounded-full"
        onError={(e) => {
          e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`
        }}
      />
      
      <div className="flex-1">
        <div className="font-medium text-text">{user.name}</div>
        <div className="text-xs text-muted">{user.score} points</div>
      </div>
      
      <div className="flex items-center space-x-1">
        {getChangeIndicator(user.change)}
        {user.change !== 0 && (
          <span className={`text-xs ${user.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(user.change)}
          </span>
        )}
      </div>
    </div>
  )
}

// Sample achievements data
export const sampleAchievements: Achievement[] = [
  {
    id: 'first-bet',
    title: 'First Steps',
    description: 'Place your first bet',
    icon: <Target className="w-6 h-6" />,
    unlocked: true,
    rarity: 'common'
  },
  {
    id: 'win-streak-5',
    title: 'Hot Streak',
    description: 'Win 5 bets in a row',
    icon: <Fire className="w-6 h-6" />,
    unlocked: false,
    progress: 3,
    maxProgress: 5,
    rarity: 'rare'
  },
  {
    id: 'social-butterfly',
    title: 'Social Butterfly',
    description: 'Create 10 bets that others join',
    icon: <Star className="w-6 h-6" />,
    unlocked: false,
    progress: 7,
    maxProgress: 10,
    rarity: 'epic'
  },
  {
    id: 'prophet',
    title: 'Prophet',
    description: 'Achieve 90% win rate with 50+ bets',
    icon: <Crown className="w-6 h-6" />,
    unlocked: false,
    progress: 42,
    maxProgress: 50,
    rarity: 'legendary'
  }
]
