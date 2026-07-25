import { Metadata } from 'next'
import { getWebPageSchema, getBreadcrumbSchema, renderStructuredData } from '@/lib/structured-data'
import { PAGE_UPDATED } from '@/lib/page-dates'
import { SITE_URL } from '@/lib/seo'

const DESCRIPTION =
  'AGENT-11 release history, newest first. v6.2.0 (June 2026) added read-only quality gates, default-fail verification, the ratchet optimiser and a meta-loop.'

export const metadata: Metadata = {
  title: 'Latest: v6.2.0 - Changelog',
  description: DESCRIPTION,
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
    description: DESCRIPTION,
    url: `${SITE_URL}/changelog`,
  },
  alternates: {
    canonical: `${SITE_URL}/changelog`,
  },
}

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {renderStructuredData(
        getWebPageSchema({
          name: 'AGENT-11 Changelog',
          description: DESCRIPTION,
          path: '/changelog',
          dateModified: PAGE_UPDATED.changelog,
        })
      )}
      {renderStructuredData(getBreadcrumbSchema([{ name: 'Changelog', path: '/changelog' }]))}
      {children}
    </>
  )
}
