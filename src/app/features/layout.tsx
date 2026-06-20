import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '13 Mission Types - Features',
  description: 'Explore AGENT-11\'s 13 specialized mission types for rapid software development. From BUILD to FIX, MVP to DEPLOY - your AI squad handles it all. Built by Jamie Watters.',
  keywords: [
    'agent-11 features',
    '13 mission types',
    'build mission',
    'fix mission',
    'mvp mission',
    'ai development missions',
    'software development automation'
  ],
  openGraph: {
    title: '13 Mission Types - AGENT-11 Features',
    description: 'Explore AGENT-11\'s 13 specialized mission types for rapid software development. From BUILD to FIX, MVP to DEPLOY - your AI squad handles it all.',
    url: 'https://www.agent-11.com/features',
  },
  alternates: {
    canonical: 'https://www.agent-11.com/features',
  },
}

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
