import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

// Optimize font loading
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  preload: false, // Only load when needed for code blocks
})

export const metadata: Metadata = {
  title: 'AGENT-11 | Your Personal Dev Team That Never Sleeps',
  description: 'Stop wearing 11 hats. Get 11 specialists instead. Build software 10x faster with your personal team of AI specialists. Deploy in minutes, ship in hours.',
  keywords: ['AI development', 'developer tools', 'automation', 'productivity', 'solo founder', 'development team'],
  authors: [{ name: 'AGENT-11 Team' }],
  creator: 'AGENT-11',
  publisher: 'AGENT-11',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://agent-11.dev',
    title: 'AGENT-11 | Your Personal Dev Team That Never Sleeps',
    description: 'Stop wearing 11 hats. Get 11 specialists instead. Build software 10x faster with your personal team of AI specialists.',
    siteName: 'AGENT-11',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGENT-11 | Your Personal Dev Team That Never Sleeps',
    description: 'Stop wearing 11 hats. Get 11 specialists instead. Build software 10x faster with your personal team of AI specialists.',
    creator: '@agent11dev',
  },
  other: {
    'theme-color': '#1e3a8a',
  },
}

// Move viewport to generateViewport function as per Next.js 15 requirements
export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="theme-color" content="#1e3a8a" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
      </head>
      <body className={`antialiased font-sans ${inter.className}`}>
        {children}
      </body>
    </html>
  )
}