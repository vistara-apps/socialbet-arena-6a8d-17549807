
'use client'

import { type ReactNode } from 'react'
import { MiniKitProvider } from '@coinbase/onchainkit/minikit'
import { base } from 'viem/chains'

export function Providers({ children }: { children: ReactNode }) {
  return (
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
  )
}
