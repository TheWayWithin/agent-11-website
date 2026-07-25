import { Metadata } from 'next'
import { getWebPageSchema, getBreadcrumbSchema, renderStructuredData } from '@/lib/structured-data'
import { PAGE_UPDATED } from '@/lib/page-dates'
import { SITE_URL } from '@/lib/seo'

const DESCRIPTION =
  'The agent-11.com privacy policy: what the site collects, how it is used, and your rights. AGENT-11 itself runs locally in your own project, on your machine.'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: DESCRIPTION,
  openGraph: {
    title: 'AGENT-11 Privacy Policy',
    description: DESCRIPTION,
    url: `${SITE_URL}/privacy`,
  },
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {renderStructuredData(
        getWebPageSchema({
          name: 'AGENT-11 Privacy Policy',
          description: DESCRIPTION,
          path: '/privacy',
          dateModified: PAGE_UPDATED.privacy,
        })
      )}
      {renderStructuredData(getBreadcrumbSchema([{ name: 'Privacy', path: '/privacy' }]))}
      {children}
    </>
  )
}
