import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Latest: v2.3.0 - Changelog',
  description: 'AGENT-11 changelog and version history. Latest release v2.3.0 includes Field Manual, 17 mission types, and 6 slash commands. See what\'s new in the multi-agent framework by Jamie Watters.',
  keywords: [
    'agent-11 changelog',
    'version history',
    'v2.3.0',
    'field manual release',
    'whats new',
    'release notes'
  ],
  openGraph: {
    title: 'Latest: v2.3.0 - AGENT-11 Changelog',
    description: 'AGENT-11 changelog and version history. Latest release v2.3.0 includes Field Manual, 17 mission types, and 6 slash commands.',
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
