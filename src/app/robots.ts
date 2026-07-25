import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  // Derived, never re-typed. The Sitemap: and Host: lines below are the first
  // thing a crawler reads, so they must name the same host as the canonicals.
  const baseUrl = SITE_URL

  return {
    rules: [
      // Primary search engines - ALLOW ALL
      {
        userAgent: ['Googlebot', 'Googlebot-Image', 'Googlebot-Video'],
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
      {
        userAgent: ['Bingbot', 'msnbot'],
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },

      // AI Search Features - ALLOW (improves discoverability)
      {
        userAgent: 'ChatGPT-User', // ChatGPT Search
        allow: '/',
      },
      {
        userAgent: ['Claude-Web', 'anthropic-ai'], // Claude search
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot', // Perplexity AI
        allow: '/',
      },
      {
        userAgent: 'Applebot-Extended', // Apple Intelligence
        allow: '/',
      },

      // AI Training Crawlers - ALLOW (strategic decision)
      // We are an AI framework - being used to train AI models is on-brand
      {
        userAgent: 'GPTBot', // OpenAI training
        allow: '/',
        crawlDelay: 10, // Polite crawling
      },
      {
        userAgent: 'ClaudeBot', // Anthropic training
        allow: '/',
        crawlDelay: 10,
      },
      {
        userAgent: 'Google-Extended', // Google AI training
        allow: '/',
        crawlDelay: 10,
      },
      {
        userAgent: 'GoogleOther', // Google experimental crawlers
        allow: '/',
        crawlDelay: 10,
      },

      // All other bots - DEFAULT ALLOW with restrictions
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/_next/static/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
