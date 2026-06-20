import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Latest: v6.2.0 - Changelog',
  description: 'AGENT-11 changelog and version history. Latest release v6.2.0 brings read-only quality gates, the ratchet optimiser, and a phase-gated meta-loop. See what\'s new in the multi-agent framework by Jamie Watters.',
  keywords: [
    'agent-11 changelog',
    'version history',
    'v6.2.0',
    'field manual release',
    'whats new',
    'release notes'
  ],
  openGraph: {
    title: 'Latest: v6.2.0 - AGENT-11 Changelog',
    description: 'AGENT-11 changelog and version history. Latest release v6.2.0 brings read-only quality gates, the ratchet optimiser, and a phase-gated meta-loop.',
    url: 'https://www.agent-11.com/changelog',
  },
  alternates: {
    canonical: 'https://www.agent-11.com/changelog',
  },
}

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
