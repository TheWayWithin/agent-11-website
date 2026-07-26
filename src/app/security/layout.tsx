import { Metadata } from 'next'
import { getWebPageSchema, getBreadcrumbSchema, renderStructuredData } from '@/lib/structured-data'
import { PAGE_UPDATED } from '@/lib/page-dates'
import { SITE_URL } from '@/lib/seo'

const DESCRIPTION =
  'How to report a security issue in AGENT-11 or agent-11.com: private GitHub advisories, what is in scope, and what to expect from a one-person project.'

export const metadata: Metadata = {
  title: 'Security Policy',
  description: DESCRIPTION,
  openGraph: {
    title: 'AGENT-11 Security Policy',
    description: DESCRIPTION,
    url: `${SITE_URL}/security`,
  },
  alternates: {
    canonical: `${SITE_URL}/security`,
  },
}

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {renderStructuredData(
        getWebPageSchema({
          name: 'AGENT-11 Security Policy',
          description: DESCRIPTION,
          path: '/security',
          dateModified: PAGE_UPDATED.security,
        })
      )}
      {renderStructuredData(getBreadcrumbSchema([{ name: 'Security', path: '/security' }]))}
      {children}
    </>
  )
}
