import { Metadata } from 'next'
import { getWebPageSchema, getBreadcrumbSchema, renderStructuredData } from '@/lib/structured-data'
import { PAGE_UPDATED } from '@/lib/page-dates'
import { SITE_URL } from '@/lib/seo'

const DESCRIPTION =
  'Terms of service for agent-11.com and the AGENT-11 framework: acceptance, use, intellectual property and liability. The framework is MIT licensed and free.'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: DESCRIPTION,
  openGraph: {
    title: 'AGENT-11 Terms of Service',
    description: DESCRIPTION,
    url: `${SITE_URL}/terms`,
  },
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {renderStructuredData(
        getWebPageSchema({
          name: 'AGENT-11 Terms of Service',
          description: DESCRIPTION,
          path: '/terms',
          dateModified: PAGE_UPDATED.terms,
        })
      )}
      {renderStructuredData(getBreadcrumbSchema([{ name: 'Terms', path: '/terms' }]))}
      {children}
    </>
  )
}
