import type { Metadata } from 'next'
import {
  getCollectionPageSchema,
  getBreadcrumbSchema,
  renderStructuredData,
} from '@/lib/structured-data'
import { PAGE_UPDATED } from '@/lib/page-dates'
import { SITE_URL } from '@/lib/seo'

const DESCRIPTION =
  'The tools Jamie Watters has built as a solo founder: AGENT-11, LLM.txt Mastery, AI Impact Scanner, Evolve-7, Solo Market and more, with what each one does.'

/**
 * The nine projects the page lists, in page order. Names and URLs mirror the
 * visible cards exactly — no status claims are repeated here, because several
 * are labelled in-development on the page itself.
 */
const PROJECTS = [
  { name: 'AGENT-11', url: 'https://github.com/TheWayWithin/agent-11' },
  { name: 'LLM.txt Mastery', url: 'https://llmtxtmastery.com' },
  { name: 'AI Impact Scanner', url: 'https://aimpactscanner.com' },
  { name: 'Evolve-7', url: 'https://evolve-7.com' },
  { name: 'Solo Market', url: 'https://solomarket.work' },
  { name: 'JamieWatters.work', url: 'https://jamiewatters.work' },
  { name: 'AI Search Mastery', url: 'https://aisearchmastery.com' },
  { name: 'Mastery-AI Framework', url: 'https://aisearchmastery.com/mastery-ai-framework/' },
  { name: 'BOS-AI', url: 'https://github.com/TheWayWithin/BOS-AI' },
]

export const metadata: Metadata = {
  title: 'Solo Founder Ecosystem - Tools by Jamie Watters',
  description: DESCRIPTION,
  keywords: ['solo founder tools', 'jamie watters ecosystem', 'agent-11', 'llm.txt mastery', 'ai impact scanner', 'evolve-7', 'solo market', 'developer tools', 'ai frameworks', 'solo founder marketing'],
  openGraph: {
    title: 'The Solo Founder Ecosystem: 9 Tools That Work Together',
    description: DESCRIPTION,
    type: 'website',
    url: `${SITE_URL}/portfolio`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solo Founder Ecosystem - 9 Tools by Jamie Watters',
    description: DESCRIPTION,
  },
  alternates: {
    canonical: `${SITE_URL}/portfolio`,
  },
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {renderStructuredData(
        getCollectionPageSchema({
          name: 'Solo Founder Ecosystem',
          description: DESCRIPTION,
          path: '/portfolio',
          items: PROJECTS,
          dateModified: PAGE_UPDATED.portfolio,
        })
      )}
      {renderStructuredData(getBreadcrumbSchema([{ name: 'Portfolio', path: '/portfolio' }]))}
      {children}
    </>
  )
}
