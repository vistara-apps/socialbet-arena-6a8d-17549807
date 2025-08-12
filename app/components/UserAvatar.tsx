
'use client'

import { User } from 'lucide-react'

interface UserAvatarProps {
  size?: 'default' | 'small'
  address?: string
  ensName?: string
  avatar?: string
}

export function UserAvatar({ 
  size = 'default', 
  address, 
  ensName, 
  avatar 
}: UserAvatarProps) {
  const sizeClasses = {
    default: 'w-8 h-8',
    small: 'w-6 h-6'
  }

  const iconSizeClasses = {
    default: 'w-4 h-4',
    small: 'w-3 h-3'
  }

  // Generate a color based on address for consistent avatars
  const getAvatarColor = (addr?: string) => {
    if (!addr) return 'bg-primary'
    const colors = [
      'bg-primary', 'bg-accent', 'bg-purple-500', 
      'bg-green-500', 'bg-blue-500', 'bg-pink-500'
    ]
    const hash = addr.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    return colors[Math.abs(hash) % colors.length]
  }

  const displayName = ensName || (address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'User')

  return (
    <div className="flex items-center space-x-2">
      <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center ${getAvatarColor(address)}`}>
        {avatar ? (
          <img 
            src={avatar} 
            alt={displayName}
            className={`${sizeClasses[size]} rounded-full object-cover`}
          />
        ) : (
          <User className={`${iconSizeClasses[size]} text-white`} />
        )}
      </div>
      {size === 'default' && (
        <span className="text-sm font-medium text-text">{displayName}</span>
      )}
    </div>
  )
}
