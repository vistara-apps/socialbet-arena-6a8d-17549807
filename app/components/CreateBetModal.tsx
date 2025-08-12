
'use client'

import { useState } from 'react'
import { X, Calendar, DollarSign, Target } from 'lucide-react'

interface CreateBetModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (betData: any) => void
}

export function CreateBetModal({ isOpen, onClose, onSubmit }: CreateBetModalProps) {
  const [formData, setFormData] = useState({
    description: '',
    outcomeTarget: '',
    deadline: '',
    stakeAmount: '',
    socialUrl: ''
  })

  const [predictionType, setPredictionType] = useState<'engagement' | 'followers' | 'custom'>('engagement')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      predictionType,
      stakeAmount: parseFloat(formData.stakeAmount)
    })
    setFormData({
      description: '',
      outcomeTarget: '',
      deadline: '',
      stakeAmount: '',
      socialUrl: ''
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-xl font-bold text-text">Create New Bet</h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-text transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Prediction Type */}
          <div>
            <label className="block text-sm font-medium text-text mb-3">
              Prediction Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'engagement', label: 'Likes/Shares', icon: '❤️' },
                { key: 'followers', label: 'Followers', icon: '👥' },
                { key: 'custom', label: 'Custom', icon: '🎯' }
              ].map((type) => (
                <button
                  key={type.key}
                  type="button"
                  onClick={() => setPredictionType(type.key as any)}
                  className={`p-3 rounded-md border text-sm font-medium transition-all ${
                    predictionType === type.key
                      ? 'bg-primary text-white border-primary'
                      : 'bg-surface text-muted border-border hover:border-primary'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg mb-1">{type.icon}</div>
                    <div>{type.label}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Social URL */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Social Media Post URL (optional)
            </label>
            <input
              type="url"
              value={formData.socialUrl}
              onChange={(e) => setFormData({ ...formData, socialUrl: e.target.value })}
              placeholder="https://warpcast.com/username/0x123..."
              className="input-field w-full"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Bet Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Will this post get 1000+ likes in 24 hours?"
              className="input-field w-full h-20 resize-none"
              required
            />
          </div>

          {/* Outcome Target */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              <Target className="w-4 h-4 inline mr-1" />
              Target Outcome *
            </label>
            <input
              type="text"
              value={formData.outcomeTarget}
              onChange={(e) => setFormData({ ...formData, outcomeTarget: e.target.value })}
              placeholder="1000+ likes, 500 new followers, etc."
              className="input-field w-full"
              required
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Deadline *
            </label>
            <input
              type="datetime-local"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="input-field w-full"
              required
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          {/* Stake Amount */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Stake Amount (USDC) *
            </label>
            <input
              type="number"
              value={formData.stakeAmount}
              onChange={(e) => setFormData({ ...formData, stakeAmount: e.target.value })}
              placeholder="5"
              min="1"
              step="0.01"
              className="input-field w-full"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              Create Bet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
