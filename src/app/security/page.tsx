import Link from 'next/link'
import { PAGE_UPDATED } from '@/lib/page-dates'
import { formatUpdated } from '@/lib/seo'

const ADVISORIES_URL = 'https://github.com/TheWayWithin/agent-11/security/advisories'

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              AGENT-11
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="/documentation" className="text-gray-600 hover:text-gray-900">Docs</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-gray max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Security Policy</h1>
          <p className="text-lg text-gray-600 mb-8">
            Last updated{' '}
            <time dateTime={PAGE_UPDATED.security}>{formatUpdated(PAGE_UPDATED.security)}</time>
          </p>

          <section className="mb-8">
            <p className="text-gray-700">
              <strong>The short version.</strong> Report anything you find through{' '}
              <a
                href={ADVISORIES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                GitHub Security Advisories
              </a>
              , privately. One person reads them. There is no bounty and no guaranteed response
              time, and this page will not pretend otherwise.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Report</h2>
            <p className="text-gray-700 mb-4">
              Use the private advisory form on the framework repository:{' '}
              <a
                href={ADVISORIES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                github.com/TheWayWithin/agent-11/security/advisories
              </a>
              . It keeps the report private until there is a fix, which a public issue does not.
            </p>
            <p className="text-gray-700 mb-4">Please include:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>What the issue is, and what an attacker could do with it</li>
              <li>The steps to reproduce it, ideally from a clean install</li>
              <li>The version or commit you found it on</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Is In Scope</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>
                The AGENT-11 framework in{' '}
                <a
                  href="https://github.com/TheWayWithin/agent-11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700"
                >
                  TheWayWithin/agent-11
                </a>{' '}
                — most usefully the install script, since that is the one piece of this project
                that runs a command on your machine
              </li>
              <li>This website, agent-11.com</li>
            </ul>
            <p className="text-gray-700 mb-4">Out of scope, because they are not ours to fix:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Claude Code and the Anthropic API — report those to Anthropic</li>
              <li>Netlify, GitHub and Plausible — report those to the vendor</li>
              <li>
                What an AI model writes into your repository when you run a mission. Review its
                output; that is your call and your review, not a vulnerability in this framework
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What to Expect</h2>
            <p className="text-gray-700 mb-4">
              AGENT-11 is maintained by one person alongside other work. That sets honest
              expectations:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>No bug bounty. Nothing is paid for reports</li>
              <li>
                No service-level agreement. Reports are read and acted on as fast as one person
                reasonably can, which is not the same as fast
              </li>
              <li>
                Credit in the advisory and the release notes if you want it, and not if you
                don&apos;t
              </li>
              <li>
                Fixes ship as a normal release. The{' '}
                <Link href="/changelog" className="text-primary-600 hover:text-primary-700">
                  changelog
                </Link>{' '}
                records them
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Don&apos;t</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Run automated scanners against this site — it is a static marketing site</li>
              <li>Test anything that degrades the service for other people</li>
              <li>Access, modify or exfiltrate data that is not yours</li>
              <li>Disclose publicly before there has been a chance to fix it</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Machine-Readable Version</h2>
            <p className="text-gray-700">
              This policy is referenced from{' '}
              <a
                href="/.well-known/security.txt"
                className="text-primary-600 hover:text-primary-700"
              >
                /.well-known/security.txt
              </a>
              , per RFC 9116.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
