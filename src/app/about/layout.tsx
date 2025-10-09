import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Jamie Watters - AGENT-11 Creator & Solo Founder Advocate',
  description: 'Meet Jamie Watters, creator of AGENT-11 and builder of tools that help solo founders ship fast. Explore the philosophy, expertise, and ecosystem behind the framework.',
  keywords: ['jamie watters', 'agent-11 creator', 'solo founder tools', 'ai framework developer', 'multi-agent systems', 'claude code agents', 'developer tools', 'solo founder ecosystem'],
  openGraph: {
    title: 'Building Tools for Solo Founders Who Ship Fast',
    description: 'Hi, I\'m Jamie Watters. I build AI frameworks like AGENT-11 that help solo founders turn technical complexity into competitive advantage.',
    type: 'profile',
    images: ['/og-image.png']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Jamie Watters - AGENT-11 Creator',
    description: 'Creator of AGENT-11 and builder of tools that help solo founders ship fast.',
    images: ['/og-image.png']
  }
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
