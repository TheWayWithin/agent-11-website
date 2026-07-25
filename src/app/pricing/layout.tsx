import { Metadata } from 'next'
import { getWebPageSchema, getBreadcrumbSchema, renderStructuredData } from '@/lib/structured-data'
import { PAGE_UPDATED } from '@/lib/page-dates'
import { SITE_URL } from '@/lib/seo'

const DESCRIPTION =
  'AGENT-11 is free and open source under the MIT licence: all 11 agents, all 13 missions, unlimited commercial use. Nothing is sold here; support is voluntary.'

export const metadata: Metadata = {
  title: 'Open Source Framework - Pricing',
  description: DESCRIPTION,
  // 'pro support' and 'enterprise support' removed: no such offering exists.
  keywords: [
    'agent-11 pricing',
    'open source',
    'free framework',
    'mit license'
  ],
  openGraph: {
    title: 'Open Source Framework - AGENT-11 Pricing',
    description: DESCRIPTION,
    url: `${SITE_URL}/pricing`,
  },
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {renderStructuredData(
        getWebPageSchema({
          name: 'AGENT-11 Pricing',
          description: DESCRIPTION,
          path: '/pricing',
          dateModified: PAGE_UPDATED.pricing,
        })
      )}
      {renderStructuredData(getBreadcrumbSchema([{ name: 'Pricing', path: '/pricing' }]))}
      {children}
    </>
  )
}
