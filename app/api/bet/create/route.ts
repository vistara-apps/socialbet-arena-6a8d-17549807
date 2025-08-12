import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { description, stakeAmount, deadline, creatorAddress } = body

    // Validate required fields
    if (!description || !stakeAmount || !deadline || !creatorAddress) {
      return NextResponse.json(
        { error: 'Missing required fields: description, stakeAmount, deadline, creatorAddress' },
        { status: 400 }
      )
    }

    // Check if payment header is present (x402 flow)
    const paymentHeader = request.headers.get('x-payment')
    
    if (!paymentHeader) {
      // Return 402 Payment Required with x402 payment details
      const creationFee = 1 // 1 USDC fee to create a bet
      const paymentChallenge = {
        amount: creationFee.toString(),
        currency: 'USDC',
        network: 'base',
        recipient: '0x742d35Cc6634C0532925a3b8D0C9e3e0C0c0c0c0', // Mock recipient address
        description: `Create bet: ${description.substring(0, 50)}... - ${creationFee} USDC fee`,
        metadata: {
          type: 'bet_creation',
          stakeAmount,
          creatorAddress,
          timestamp: Date.now(),
        }
      }

      return NextResponse.json(
        { 
          error: 'Payment required to create bet',
          paymentChallenge 
        },
        { 
          status: 402,
          headers: {
            'x-payment-required': JSON.stringify(paymentChallenge),
            'x-payment-amount': creationFee.toString(),
            'x-payment-currency': 'USDC',
            'x-payment-network': 'base',
          }
        }
      )
    }

    // Payment header is present, process the bet creation
    console.log('Processing bet creation with payment:', {
      description,
      stakeAmount,
      creatorAddress,
      paymentHeader: paymentHeader.substring(0, 50) + '...'
    })

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Mock successful response
    const betId = `bet_${Math.random().toString(36).substring(2, 15)}`
    const transactionHash = `0x${Math.random().toString(16).substring(2, 66)}`
    
    return NextResponse.json({
      success: true,
      betId,
      description,
      stakeAmount,
      deadline,
      creatorAddress,
      transactionHash,
      status: 'active',
      message: 'Bet created successfully!',
      timestamp: Date.now(),
    })

  } catch (error) {
    console.error('Error processing bet creation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
