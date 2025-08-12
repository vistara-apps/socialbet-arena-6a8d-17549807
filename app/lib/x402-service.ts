'use client'

import axios from 'axios'
import { withPaymentInterceptor } from 'x402-axios'
import type { WalletClient } from 'viem'

export interface PaymentConfig {
  maxAmount: number // Maximum amount in USDC (with decimals)
  timeout?: number // Request timeout in milliseconds
}

export interface BetPaymentData {
  betId: string
  amount: number
  participantAddress: string
}

export interface PaymentResult {
  success: boolean
  transactionHash?: string
  error?: string
  paymentResponse?: any
}

export class X402PaymentService {
  private axiosWithPayment: any
  private walletClient: WalletClient | null = null

  constructor(private config: PaymentConfig = { maxAmount: 100 }) {
    // Initialize axios instance
    this.axiosWithPayment = null
  }

  /**
   * Initialize the payment service with a wallet client
   */
  initialize(walletClient: WalletClient) {
    if (!walletClient.account) {
      throw new Error('Wallet client must have an account connected')
    }

    this.walletClient = walletClient
    
    // Create axios instance with x402 payment wrapper
    const axiosInstance = axios.create({
      timeout: this.config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Add x402 payment interceptor to axios
    // Cast to the expected wallet type since we've verified account exists
    this.axiosWithPayment = withPaymentInterceptor(axiosInstance, walletClient as any)
  }

  /**
   * Check if the service is properly initialized
   */
  isInitialized(): boolean {
    return this.axiosWithPayment !== null && this.walletClient !== null
  }

  /**
   * Join a bet with payment
   */
  async joinBet(betData: BetPaymentData): Promise<PaymentResult> {
    if (!this.isInitialized()) {
      return {
        success: false,
        error: 'Payment service not initialized. Please connect your wallet.',
      }
    }

    try {
      const response = await this.axiosWithPayment.post('/api/bet/join', betData)
      
      return {
        success: true,
        transactionHash: response.data.transactionHash,
        paymentResponse: response.data,
      }
    } catch (error: any) {
      console.error('Payment failed:', error)
      
      return {
        success: false,
        error: this.parseError(error),
      }
    }
  }

  /**
   * Create a new bet with payment
   */
  async createBet(betData: any): Promise<PaymentResult> {
    if (!this.isInitialized()) {
      return {
        success: false,
        error: 'Payment service not initialized. Please connect your wallet.',
      }
    }

    try {
      const response = await this.axiosWithPayment.post('/api/bet/create', betData)
      
      return {
        success: true,
        transactionHash: response.data.transactionHash,
        paymentResponse: response.data,
      }
    } catch (error: any) {
      console.error('Payment failed:', error)
      
      return {
        success: false,
        error: this.parseError(error),
      }
    }
  }

  /**
   * Test payment endpoint (for development)
   */
  async testPayment(amount: number): Promise<PaymentResult> {
    if (!this.isInitialized()) {
      return {
        success: false,
        error: 'Payment service not initialized. Please connect your wallet.',
      }
    }

    try {
      const response = await this.axiosWithPayment.get('/api/test-payment', {
        params: { amount },
      })
      
      return {
        success: true,
        paymentResponse: response.data,
      }
    } catch (error: any) {
      console.error('Test payment failed:', error)
      
      return {
        success: false,
        error: this.parseError(error),
      }
    }
  }

  /**
   * Parse error messages from payment failures
   */
  private parseError(error: any): string {
    if (error.response?.data?.error) {
      return error.response.data.error
    }
    
    if (error.message) {
      return error.message
    }
    
    if (error.code === 'USER_REJECTED_REQUEST') {
      return 'Payment was cancelled by user'
    }
    
    if (error.code === 'INSUFFICIENT_FUNDS') {
      return 'Insufficient USDC balance'
    }
    
    return 'Payment failed. Please try again.'
  }

  /**
   * Get wallet address
   */
  getWalletAddress(): string | null {
    return this.walletClient?.account?.address || null
  }
}

// Singleton instance
export const paymentService = new X402PaymentService()
