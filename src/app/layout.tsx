import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Analytics from '@/components/Analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VoiceToSocial - Turn Voice Recordings Into Social Media Content',
  description: 'Upload a webinar, seminar, or coaching session. Get LinkedIn posts, Instagram captions, Twitter threads, and more - all optimized for each platform.',
  keywords: 'voice to social media, AI content creation, social media automation, content repurposing',
  authors: [{ name: 'VoiceToSocial' }],
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
        <Analytics />
      </body>
    </html>
  )
}