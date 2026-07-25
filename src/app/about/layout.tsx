import type { Metadata } from 'next'
import {
  getProfilePageSchema,
  getBreadcrumbSchema,
  renderStructuredData,
} from '@/lib/structured-data'
import { PAGE_UPDATED } from '@/lib/page-dates'
import { SITE_URL } from '@/lib/seo'

const DESCRIPTION =
  'Jamie Watters builds AGENT-11 and other open-source tools for solo founders, in the open. Why the framework exists, how he works, and what else he has shipped.'

export const metadata: Metadata = {
  title: 'About Jamie Watters - AGENT-11 Creator',
  description: DESCRIPTION,
  keywords: ['jamie watters', 'agent-11 creator', 'solo founder tools', 'ai framework developer', 'multi-agent systems', 'claude code agents', 'developer tools', 'solo founder ecosystem'],
  authors: [{ name: 'Jamie Watters', url: 'https://jamiewatters.work' }],
  openGraph: {
    title: 'Building Tools for Solo Founders Who Ship Fast',
    description: DESCRIPTION,
    type: 'profile',
    url: `${SITE_URL}/about`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Jamie Watters - AGENT-11 Creator',
    description: DESCRIPTION,
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {renderStructuredData(getProfilePageSchema({ dateModified: PAGE_UPDATED.about }))}
      {renderStructuredData(getBreadcrumbSchema([{ name: 'About', path: '/about' }]))}
      {children}
    </>
  )
}
