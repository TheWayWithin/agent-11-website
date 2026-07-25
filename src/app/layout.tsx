import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { SITE_URL, SITE_UPDATED, FRAMEWORK_VERSION, FRAMEWORK_RELEASED } from '@/lib/seo'

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
  description: 'Stop wearing 11 hats. AGENT-11 deploys 11 specialist AI agents into Claude Code with one install command. Free and open source, MIT licensed, by Jamie Watters.',
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
    description: 'Stop wearing 11 hats. AGENT-11 deploys 11 specialist AI agents into Claude Code with one install command. Free and open source, MIT licensed, by Jamie Watters.',
    siteName: 'AGENT-11',
    // No explicit images array: the file-based src/app/opengraph-image.tsx
    // generates /opengraph-image. The previous '/og-image.png' override
    // pointed at a file that does not exist and returned 404.
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGENT-11 | Your Personal Dev Team That Never Sleeps - by Jamie Watters',
    description: 'Stop wearing 11 hats. AGENT-11 deploys 11 specialist AI agents into Claude Code with one install command. Free and open source, MIT licensed, by Jamie Watters.',
    // Jamie's own account — the handle published on /about and /pricing.
    creator: '@Jamie_within',
  },
  alternates: {
    canonical: 'https://www.agent-11.com',
  },
  verification: {
    google: '5Nh5uUhbcSpIrNu4URA_5U9kUMvbx1zP0NWRNFF0SXg',
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
    "url": SITE_URL,
    // favicon.svg is the only logo asset that actually exists; the previous
    // /logo.png returned 404.
    "logo": `${SITE_URL}/favicon.svg`,
    "description": "Multi-agent development framework for solo founders and development teams",
    "founder": {
      "@type": "Person",
      "name": "Jamie Watters",
      "url": "https://jamiewatters.work"
    },
    "sameAs": [
      "https://github.com/TheWayWithin/agent-11",
      "https://jamiewatters.work"
    ]
  }

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AGENT-11",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Cross-platform",
    "softwareVersion": FRAMEWORK_VERSION,
    // Release date of v6.2.0 per the GitHub release tag and CHANGELOG.
    "datePublished": FRAMEWORK_RELEASED,
    "dateModified": FRAMEWORK_RELEASED,
    "license": "https://github.com/TheWayWithin/agent-11/blob/main/LICENSE",
    "downloadUrl": "https://github.com/TheWayWithin/agent-11",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Person",
      "name": "Jamie Watters",
      "url": "https://jamiewatters.work"
    },
    "description": "Multi-agent development framework that provides 11 specialized AI agents for building software faster"
  }

  // The site itself, carrying the date any page's copy last changed.
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AGENT-11",
    "url": SITE_URL,
    "inLanguage": "en",
    "dateModified": SITE_UPDATED,
    "publisher": {
      "@type": "Person",
      "name": "Jamie Watters",
      "url": "https://jamiewatters.work"
    }
  }

  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="theme-color" content="#1e3a8a" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />

        {/* Plausible analytics (PRJ-25 standard) — site-specific script issued for agent-11.com */}
        <script async src="https://plausible.io/js/pa-fMMu1bZfmlPvsdEPvlQo_.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()',
          }}
        />

        {/* Schema.org structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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