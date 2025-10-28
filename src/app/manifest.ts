import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AGENT-11 - Multi-Agent Development Framework',
    short_name: 'AGENT-11',
    description: 'Your Personal Dev Team That Never Sleeps. Deploy 11 specialized AI agents to build, test, and deploy your product. Built by Jamie Watters for solo founders.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#1e3a8a',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['productivity', 'development', 'business'],
    lang: 'en-US',
    dir: 'ltr',
    orientation: 'portrait-primary',
  }
}
