import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ChartUpp - Connect with Micro-Influencers & Grow Your Brand',
  description: 'ChartUpp connects small businesses with the right micro-influencers to drive exposure, conversions, and measurable ROI. Join early access today.',
  keywords: 'micro-influencers, influencer marketing, small business growth, brand partnerships, influencer discovery',
  authors: [{ name: 'ChartUpp' }],
  robots: 'index, follow',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}