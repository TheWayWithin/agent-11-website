import { Metadata } from 'next'
import { getWebPageSchema, getBreadcrumbSchema, renderStructuredData } from '@/lib/structured-data'
import { PAGE_UPDATED } from '@/lib/page-dates'
import { SITE_URL } from '@/lib/seo'

const DESCRIPTION =
  'AGENT-11 documentation: install the framework, run the 13 /coord missions, configure the 11 specialist agents, and troubleshoot. Covers release v6.2.0.'

export const metadata: Metadata = {
  title: 'Field Manual - Documentation',
  description: DESCRIPTION,
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
    description: DESCRIPTION,
    url: `${SITE_URL}/documentation`,
  },
  alternates: {
    canonical: `${SITE_URL}/documentation`,
  },
}

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {renderStructuredData(
        getWebPageSchema({
          name: 'AGENT-11 Documentation',
          description: DESCRIPTION,
          path: '/documentation',
          dateModified: PAGE_UPDATED.documentation,
        })
      )}
      {renderStructuredData(
        getBreadcrumbSchema([{ name: 'Documentation', path: '/documentation' }])
      )}
      {children}
    </>
  )
}
