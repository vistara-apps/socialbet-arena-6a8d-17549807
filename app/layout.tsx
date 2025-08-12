
'use client'

import { type ReactNode } from 'react'
import './globals.css'
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>SocialBet Arena</title>
        <meta name="description" content="Predict, Bet, and Profit on Social Media Outcomes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
