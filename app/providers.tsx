'use client'

import { type ReactNode } from 'react'
import { MiniKitProvider } from '@coinbase/onchainkit/minikit'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { base } from 'viem/chains'
import { wagmiConfig } from './lib/wagmi'

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <MiniKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || 'demo-key'}
          chain={base}
          config={{
            appearance: {
              mode: 'auto',
              theme: 'default',
              name: 'SocialBet Arena',
              logo: '/icon.png',
            },
          }}
        >
          {children}
        </MiniKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
