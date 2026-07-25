import { Metadata } from 'next'
import { getWebPageSchema, getBreadcrumbSchema, renderStructuredData } from '@/lib/structured-data'
import { PAGE_UPDATED } from '@/lib/page-dates'
import { SITE_URL } from '@/lib/seo'

const DESCRIPTION =
  'All 13 AGENT-11 missions, the 11 specialist agents, and the v6.2 quality gates that stop agents grading their own work. Free and open source, MIT licensed.'

export const metadata: Metadata = {
  title: '13 Mission Types - Features',
  description: DESCRIPTION,
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
    description: DESCRIPTION,
    url: `${SITE_URL}/features`,
  },
  alternates: {
    canonical: `${SITE_URL}/features`,
  },
}

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {renderStructuredData(
        getWebPageSchema({
          name: 'AGENT-11 Features',
          description: DESCRIPTION,
          path: '/features',
          dateModified: PAGE_UPDATED.features,
        })
      )}
      {renderStructuredData(getBreadcrumbSchema([{ name: 'Features', path: '/features' }]))}
      {children}
    </>
  )
}
