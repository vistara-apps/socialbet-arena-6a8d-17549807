
'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MarketData {
  label: string
  value: string
  change: number
  trend: 'up' | 'down'
}

export function MarketTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const marketData: MarketData[] = [
    { label: 'Active Bets', value: '247', change: 12, trend: 'up' },
    { label: 'Total Volume', value: '$15.2K', change: 8.5, trend: 'up' },
    { label: 'Success Rate', value: '68%', change: -2.1, trend: 'down' },
    { label: 'Avg Payout', value: '2.3x', change: 5.2, trend: 'up' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % marketData.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [marketData.length])

  const current = marketData[currentIndex]

  return (
    <div className="card mb-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            current.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}>
            {current.trend === 'up' ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
          </div>
          <div>
            <div className="text-sm text-muted">{current.label}</div>
            <div className="text-xl font-bold text-text">{current.value}</div>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`text-sm font-medium ${
            current.trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {current.trend === 'up' ? '+' : ''}{current.change}%
          </div>
          <div className="text-xs text-muted">24h change</div>
        </div>
      </div>
      
      {/* Indicator dots */}
      <div className="flex justify-center space-x-1 mt-4">
        {marketData.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-primary' : 'bg-border'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
