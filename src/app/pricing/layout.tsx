import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Open Source Framework - Pricing',
  description: 'AGENT-11 is 100% free and open-source. Deploy all 11 specialists, access 13 missions, and use unlimited projects with MIT License. Optional Pro Support available. Built by Jamie Watters.',
  keywords: [
    'agent-11 pricing',
    'open source',
    'free framework',
    'pro support',
    'mit license',
    'enterprise support'
  ],
  openGraph: {
    title: 'Open Source Framework - AGENT-11 Pricing',
    description: 'AGENT-11 is 100% free and open-source. Deploy all 11 specialists, access 13 missions, and use unlimited projects with MIT License. Optional Pro Support available.',
    url: 'https://www.agent-11.com/pricing',
  },
  alternates: {
    canonical: 'https://www.agent-11.com/pricing',
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
