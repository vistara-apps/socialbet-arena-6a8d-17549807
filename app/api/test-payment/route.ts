import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const amount = searchParams.get('amount') || '1'

    // Check if payment header is present (x402 flow)
    const paymentHeader = request.headers.get('x-payment')
    
    if (!paymentHeader) {
      // Return 402 Payment Required with x402 payment details
      const paymentChallenge = {
        amount: amount.toString(),
        currency: 'USDC',
        network: 'base',
        recipient: '0x742d35Cc6634C0532925a3b8D0C9e3e0C0c0c0c0', // Mock recipient address
        description: `Test payment - ${amount} USDC`,
        metadata: {
          type: 'test_payment',
          timestamp: Date.now(),
        }
      }

      return NextResponse.json(
        { 
          error: 'Payment required for test endpoint',
          paymentChallenge 
        },
        { 
          status: 402,
          headers: {
            'x-payment-required': JSON.stringify(paymentChallenge),
            'x-payment-amount': amount.toString(),
            'x-payment-currency': 'USDC',
            'x-payment-network': 'base',
          }
        }
      )
    }

    // Payment header is present, return success
    console.log('Test payment successful:', {
      amount,
      paymentHeader: paymentHeader.substring(0, 50) + '...'
    })

    return NextResponse.json({
      success: true,
      message: 'Test payment completed successfully!',
      amount,
      timestamp: Date.now(),
      paymentVerified: true,
    })

  } catch (error) {
    console.error('Error processing test payment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
