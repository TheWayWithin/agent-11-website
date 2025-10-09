import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Field Manual - Documentation',
  description: 'Complete AGENT-11 documentation including 1,370+ line Architecture SOP, deployment guides, and best practices. Your comprehensive guide to multi-agent development by Jamie Watters.',
  keywords: [
    'agent-11 documentation',
    'field manual',
    'architecture sop',
    'deployment guide',
    'agent deployment',
    'multi-agent framework docs'
  ],
  openGraph: {
    title: 'Field Manual - AGENT-11 Documentation',
    description: 'Complete AGENT-11 documentation including 1,370+ line Architecture SOP, deployment guides, and best practices. Your comprehensive guide to multi-agent development.',
    url: 'https://www.agent-11.com/documentation',
  },
  alternates: {
    canonical: 'https://www.agent-11.com/documentation',
  },
}

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
