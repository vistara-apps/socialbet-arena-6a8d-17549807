import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { betId, amount, participantAddress } = body

    // Validate required fields
    if (!betId || !amount || !participantAddress) {
      return NextResponse.json(
        { error: 'Missing required fields: betId, amount, participantAddress' },
        { status: 400 }
      )
    }

    // Check if payment header is present (x402 flow)
    const paymentHeader = request.headers.get('x-payment')
    
    if (!paymentHeader) {
      // Return 402 Payment Required with x402 payment details
      const paymentChallenge = {
        amount: amount.toString(), // Amount in USDC (with decimals)
        currency: 'USDC',
        network: 'base',
        recipient: '0x742d35Cc6634C0532925a3b8D0C9e3e0C0c0c0c0', // Mock recipient address
        description: `Join bet ${betId} - ${amount} USDC stake`,
        metadata: {
          betId,
          participantAddress,
          timestamp: Date.now(),
        }
      }

      return NextResponse.json(
        { 
          error: 'Payment required to join bet',
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

    // Payment header is present, process the bet join
    console.log('Processing bet join with payment:', {
      betId,
      amount,
      participantAddress,
      paymentHeader: paymentHeader.substring(0, 50) + '...' // Log partial payment header
    })

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock successful response
    const transactionHash = `0x${Math.random().toString(16).substring(2, 66)}`
    
    return NextResponse.json({
      success: true,
      betId,
      participantAddress,
      amount,
      transactionHash,
      status: 'confirmed',
      message: 'Successfully joined bet!',
      timestamp: Date.now(),
    })

  } catch (error) {
    console.error('Error processing bet join:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
