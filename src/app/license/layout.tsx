import { Metadata } from 'next'
import { getWebPageSchema, getBreadcrumbSchema, renderStructuredData } from '@/lib/structured-data'
import { PAGE_UPDATED } from '@/lib/page-dates'
import { SITE_URL } from '@/lib/seo'

const DESCRIPTION =
  'AGENT-11 is released under the MIT licence: use it commercially, modify it, distribute it, keep the copyright notice. The full text and what it means.'

export const metadata: Metadata = {
  title: 'Open Source License',
  description: DESCRIPTION,
  keywords: ['agent-11 license', 'mit license', 'open source license'],
  openGraph: {
    title: 'AGENT-11 Open Source License',
    description: DESCRIPTION,
    url: `${SITE_URL}/license`,
  },
  alternates: {
    canonical: `${SITE_URL}/license`,
  },
}

export default function LicenseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {renderStructuredData(
        getWebPageSchema({
          name: 'AGENT-11 Open Source License',
          description: DESCRIPTION,
          path: '/license',
          dateModified: PAGE_UPDATED.license,
        })
      )}
      {renderStructuredData(getBreadcrumbSchema([{ name: 'License', path: '/license' }]))}
      {children}
    </>
  )
}
