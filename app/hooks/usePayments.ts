'use client'

import { useEffect, useState } from 'react'
import { useWalletClient } from 'wagmi'
import { paymentService, type PaymentResult, type BetPaymentData } from '../lib/x402-service'

export interface PaymentState {
  isInitialized: boolean
  isProcessing: boolean
  error: string | null
  lastResult: PaymentResult | null
}

export function usePayments() {
  const { data: walletClient } = useWalletClient()
  const [state, setState] = useState<PaymentState>({
    isInitialized: false,
    isProcessing: false,
    error: null,
    lastResult: null,
  })

  // Initialize payment service when wallet client is available
  useEffect(() => {
    if (walletClient) {
      try {
        paymentService.initialize(walletClient)
        setState(prev => ({
          ...prev,
          isInitialized: true,
          error: null,
        }))
      } catch (error) {
        console.error('Failed to initialize payment service:', error)
        setState(prev => ({
          ...prev,
          isInitialized: false,
          error: 'Failed to initialize payment service',
        }))
      }
    } else {
      setState(prev => ({
        ...prev,
        isInitialized: false,
        error: null,
      }))
    }
  }, [walletClient])

  const joinBet = async (betData: BetPaymentData): Promise<PaymentResult> => {
    setState(prev => ({ ...prev, isProcessing: true, error: null }))

    try {
      const result = await paymentService.joinBet(betData)
      
      setState(prev => ({
        ...prev,
        isProcessing: false,
        lastResult: result,
        error: result.success ? null : result.error || 'Payment failed',
      }))

      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setState(prev => ({
        ...prev,
        isProcessing: false,
        error: errorMessage,
        lastResult: { success: false, error: errorMessage },
      }))

      return { success: false, error: errorMessage }
    }
  }

  const createBet = async (betData: any): Promise<PaymentResult> => {
    setState(prev => ({ ...prev, isProcessing: true, error: null }))

    try {
      const result = await paymentService.createBet(betData)
      
      setState(prev => ({
        ...prev,
        isProcessing: false,
        lastResult: result,
        error: result.success ? null : result.error || 'Payment failed',
      }))

      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setState(prev => ({
        ...prev,
        isProcessing: false,
        error: errorMessage,
        lastResult: { success: false, error: errorMessage },
      }))

      return { success: false, error: errorMessage }
    }
  }

  const testPayment = async (amount: number): Promise<PaymentResult> => {
    setState(prev => ({ ...prev, isProcessing: true, error: null }))

    try {
      const result = await paymentService.testPayment(amount)
      
      setState(prev => ({
        ...prev,
        isProcessing: false,
        lastResult: result,
        error: result.success ? null : result.error || 'Payment failed',
      }))

      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setState(prev => ({
        ...prev,
        isProcessing: false,
        error: errorMessage,
        lastResult: { success: false, error: errorMessage },
      }))

      return { success: false, error: errorMessage }
    }
  }

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }))
  }

  const getWalletAddress = (): string | null => {
    return paymentService.getWalletAddress()
  }

  return {
    ...state,
    joinBet,
    createBet,
    testPayment,
    clearError,
    getWalletAddress,
    walletClient,
  }
}
