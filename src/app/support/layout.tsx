import { Metadata } from 'next'
import { getWebPageSchema, getBreadcrumbSchema, renderStructuredData } from '@/lib/structured-data'
import { PAGE_UPDATED } from '@/lib/page-dates'
import { SITE_URL } from '@/lib/seo'

const DESCRIPTION =
  'Get help with AGENT-11: documentation, GitHub issues, and answers on installing, cost, agent selection and where your code goes. Free and open source.'

export const metadata: Metadata = {
  title: 'Support',
  description: DESCRIPTION,
  keywords: ['agent-11 support', 'agent-11 help', 'installation help', 'github issues'],
  openGraph: {
    title: 'AGENT-11 Support',
    description: DESCRIPTION,
    url: `${SITE_URL}/support`,
  },
  alternates: {
    canonical: `${SITE_URL}/support`,
  },
}

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {renderStructuredData(
        getWebPageSchema({
          name: 'AGENT-11 Support',
          description: DESCRIPTION,
          path: '/support',
          dateModified: PAGE_UPDATED.support,
        })
      )}
      {renderStructuredData(getBreadcrumbSchema([{ name: 'Support', path: '/support' }]))}
      {children}
    </>
  )
}
