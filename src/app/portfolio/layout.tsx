import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Solo Founder Ecosystem - Tools by Jamie Watters | AGENT-11, LLM.txt Mastery & More',
  description: 'Explore 9 specialized tools for solo founders: AGENT-11 (multi-agent dev framework), LLM.txt Mastery (AI-ready docs), AI Impact Scanner, Evolve-7, and Solo Market. Built by Jamie Watters.',
  keywords: ['solo founder tools', 'jamie watters ecosystem', 'agent-11', 'llm.txt mastery', 'ai impact scanner', 'evolve-7', 'solo market', 'developer tools', 'ai frameworks', 'solo founder marketing'],
  openGraph: {
    title: 'The Solo Founder Ecosystem: 9 Tools That Work Together',
    description: 'Nine specialized tools designed to solve the most painful problems solo founders face: shipping fast, staying discoverable, measuring impact, evolving sustainably, and marketing without a team.',
    type: 'website',
    images: ['/og-image.png']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solo Founder Ecosystem - 9 Tools by Jamie Watters',
    description: 'Specialized tools for solo founders: AGENT-11, LLM.txt Mastery, AI Impact Scanner, Evolve-7, Solo Market, and more.',
    images: ['/og-image.png']
  }
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
