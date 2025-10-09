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
  metadataBase: new URL('https://www.agent-11.com'),
  title: {
    default: 'AGENT-11 | Your Personal Dev Team That Never Sleeps - by Jamie Watters',
    template: '%s | AGENT-11'
  },
  description: 'Stop wearing 11 hats. Get 11 specialists instead. Multi-agent development framework by Jamie Watters. Build software 10x faster with your personal team of AI specialists. Deploy in minutes, ship in hours.',
  keywords: [
    'AI development',
    'developer tools',
    'automation',
    'productivity',
    'solo founder',
    'development team',
    'jamie watters',
    'agent-11 creator',
    'multi-agent framework',
    'solo founder tools',
    'claude code agents',
    'ai framework developer',
    'multi-agent systems'
  ],
  authors: [{ name: 'Jamie Watters', url: 'https://jamiewatters.work' }],
  creator: 'Jamie Watters',
  publisher: 'AGENT-11',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.agent-11.com',
    title: 'AGENT-11 | Your Personal Dev Team That Never Sleeps - by Jamie Watters',
    description: 'Stop wearing 11 hats. Get 11 specialists instead. Multi-agent development framework by Jamie Watters. Build software 10x faster with your personal team of AI specialists.',
    siteName: 'AGENT-11',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AGENT-11 - Multi-Agent Development Framework'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGENT-11 | Your Personal Dev Team That Never Sleeps - by Jamie Watters',
    description: 'Stop wearing 11 hats. Get 11 specialists instead. Multi-agent development framework by Jamie Watters. Build software 10x faster with your personal team of AI specialists.',
    creator: '@agent11dev',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.agent-11.com',
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
  // Schema.org structured data for SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AGENT-11",
    "url": "https://www.agent-11.com",
    "logo": "https://www.agent-11.com/logo.png",
    "description": "Multi-agent development framework for solo founders and development teams",
    "founder": {
      "@type": "Person",
      "name": "Jamie Watters",
      "url": "https://jamiewatters.work"
    },
    "sameAs": [
      "https://github.com/TheWayWithin/agent-11"
    ]
  }

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AGENT-11",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Cross-platform",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Person",
      "name": "Jamie Watters"
    },
    "description": "Multi-agent development framework that provides 11 specialized AI agents for building software faster"
  }

  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="theme-color" content="#1e3a8a" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />

        {/* Schema.org structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </head>
      <body className={`antialiased font-sans ${inter.className}`}>
        {children}
        
        {/* Static form for Netlify form detection - hidden from users */}
        <form 
          name="lead-magnet-capture" 
          method="POST" 
          data-netlify="true" 
          data-netlify-honeypot="bot-field"
          style={{ display: 'none' }}
        >
          <input type="hidden" name="form-name" value="lead-magnet-capture" />
          <input name="bot-field" />
          <input type="email" name="email" />
          <input name="lead-magnet" />
          <input name="variant" />
          <input name="timestamp" />
        </form>
      </body>
    </html>
  )
}