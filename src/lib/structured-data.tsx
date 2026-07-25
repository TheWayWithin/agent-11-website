/**
 * Schema.org structured data helpers.
 *
 * House rule (ported from jamiewatters.work): a schema block never asserts
 * anything the page does not visibly say. FAQPage in particular is for
 * genuinely question-and-answer shaped content ONLY — Google requires the
 * markup to match the on-page content, and so do we.
 */

import { SITE_URL } from './seo'

/** Render a schema object as a JSON-LD script tag. */
export function renderStructuredData(schema: Record<string, unknown>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export interface FAQItem {
  question: string
  answer: string
}

/**
 * FAQPage. Pass the SAME array that renders the visible Q&A section, so the
 * two can never drift apart.
 */
export function getFAQSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

/** The person behind the framework. Used as author/creator throughout. */
export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jamie Watters',
    url: 'https://jamiewatters.work',
    jobTitle: 'Solo founder and software developer',
    description:
      'Creator of AGENT-11, an open-source multi-agent development framework for Claude Code.',
    image: `${SITE_URL}/jamie-watters.jpg`,
    sameAs: [
      'https://jamiewatters.work',
      'https://github.com/TheWayWithin',
      'https://twitter.com/Jamie_within',
      'https://linkedin.com/in/jamie-watters-solo',
    ],
    knowsAbout: [
      'Multi-agent AI systems',
      'Claude Code',
      'Open-source software',
      'Solo founder tooling',
    ],
  }
}

/**
 * A standard content page. `dateModified` is required — every page on this
 * site carries a real last-changed date, sourced from when its copy actually
 * changed, not from "today".
 */
export function getWebPageSchema(opts: {
  name: string
  description: string
  path: string
  dateModified: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    dateModified: opts.dateModified,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: 'AGENT-11',
      url: SITE_URL,
    },
    author: {
      '@type': 'Person',
      name: 'Jamie Watters',
      url: 'https://jamiewatters.work',
    },
  }
}

/** The about page: a ProfilePage carrying the Person as its mainEntity. */
export function getProfilePageSchema(opts: { dateModified: string }) {
  const person = getPersonSchema() as Record<string, unknown>
  delete person['@context']
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: 'About Jamie Watters',
    url: `${SITE_URL}/about`,
    dateModified: opts.dateModified,
    inLanguage: 'en',
    mainEntity: person,
  }
}

export interface CollectionItem {
  name: string
  url: string
  description?: string
}

/** An index page listing things (the portfolio). */
export function getCollectionPageSchema(opts: {
  name: string
  description: string
  path: string
  items: CollectionItem[]
  dateModified: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    dateModified: opts.dateModified,
    inLanguage: 'en',
    author: {
      '@type': 'Person',
      name: 'Jamie Watters',
      url: 'https://jamiewatters.work',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: opts.items.length,
      itemListElement: opts.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url,
        ...(item.description ? { description: item.description } : {}),
      })),
    },
  }
}

/** Breadcrumbs. Always starts at Home. */
export function getBreadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path === '/' ? '' : crumb.path}`,
    })),
  }
}
