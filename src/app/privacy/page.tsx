import Link from 'next/link'
import { PAGE_UPDATED } from '@/lib/page-dates'
import { formatUpdated } from '@/lib/seo'

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <p className="text-lg text-gray-600 mb-8">
            Last updated{' '}
            <time dateTime={PAGE_UPDATED.privacy}>{formatUpdated(PAGE_UPDATED.privacy)}</time>
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-700 mb-4">
              <strong>The short version.</strong> This site sets no cookies and does not track you.
              It counts visits with privacy-friendly analytics that cannot identify you. The only
              personal information it can hold is an email address, and only if you type one into
              the form yourself. There are no accounts, no payments and no advertising.
            </p>
            <p className="text-gray-700">
              AGENT-11 itself is software you install and run on your own machine. It has no server
              of ours to talk to, so it sends us nothing at all.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What This Site Collects</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics</h3>
            <p className="text-gray-700 mb-4">
              We use{' '}
              <a
                href="https://plausible.io/data-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                Plausible Analytics
              </a>
              , which is cookieless and collects no personal data. It records aggregate counts only:
              page views, the page you came from, rough country, and whether you are on desktop or
              mobile. None of it is tied to you or kept as a profile. We also count two specific
              actions so we know which parts of the site are useful:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>
                <strong>Install Copy</strong> — someone used the copy button on the home page to
                copy the install command. It records that it happened, not who did it.
              </li>
              <li>
                <strong>Signup</strong> — someone submitted the release-updates form, and which
                form on the site it was. The email address itself is not sent to Plausible.
              </li>
            </ul>
            <p className="text-gray-700 mb-6">
              Plausible is the only third-party service your browser loads on this site. If you
              block it, everything on the site still works.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Public GitHub figures</h3>
            <p className="text-gray-700 mb-6">
              Some pages show public numbers from the AGENT-11 repository, such as stars and recent
              activity. Your browser asks this site for them and this site asks GitHub — the request
              is made by our server, not by you, so GitHub does not see your visit. Following one of
              our links to GitHub is a different matter, and is covered below.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">If you submit the email form</h3>
            <p className="text-gray-700 mb-4">
              The form on this site signs you up for AGENT-11 release updates, and does nothing
              else. It is handled by Netlify Forms. What the page sends is exactly this:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>The email address you typed</li>
              <li>Which form on the site you used</li>
              <li>The time you submitted it</li>
              <li>A hidden honeypot field, used only to discard bot submissions</li>
            </ul>
            <p className="text-gray-700 mb-6">
              Netlify records its own delivery details alongside that, as any form host does. The
              submission is stored in this site&apos;s Netlify account so Jamie can tell you when a
              new version of the framework ships. It is used for that and nothing else: not sold,
              not shared, not published, not used for advertising, and not passed on to any other
              service. There is no automated sequence, so signing up does not put anything in your
              inbox today.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Hosting</h3>
            <p className="text-gray-700 mb-6">
              The site is hosted on Netlify. Like any web host, Netlify processes the requests your
              browser makes — including your IP address — in order to serve you the pages. That
              handling is covered by{' '}
              <a
                href="https://www.netlify.com/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                Netlify&apos;s privacy policy
              </a>
              .
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">What this site does not do</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>It sets no cookies, so there is no cookie banner to click</li>
              <li>It loads no analytics beyond Plausible, no ad network and no tracking pixel</li>
              <li>It does not follow you across other websites or build a profile of you</li>
              <li>It has no accounts, logins, or passwords</li>
              <li>It takes no payments and stores no payment details</li>
              <li>Its fonts are served from this site, not from a third party</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Code and Project Data</h2>
            <p className="text-gray-700 mb-4">
              <strong>Important:</strong> AGENT-11 is a set of files installed in your own
              project&apos;s <code>.claude/</code> directory. Your source code stays in your
              repository. There is no AGENT-11 server, so none of your code, prompts or mission
              output is ever sent to us — we could not receive it if we wanted to.
            </p>
            <p className="text-gray-700">
              What does leave your machine is whatever your own Claude Code session sends to
              Anthropic in order to work, exactly as it would without AGENT-11. That is between you
              and Anthropic, under their terms and privacy policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Links to Other Sites</h2>
            <p className="text-gray-700">
              This site links out to GitHub, Buy Me a Coffee, X and LinkedIn. Following any of those
              links takes you to a service with its own privacy policy and its own tracking. Nothing
              is shared with them until you click.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Your Information Is Kept</h2>
            <p className="text-gray-700 mb-4">
              This is a small project, so here is the honest version rather than a list of
              certifications:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>The site is served over HTTPS, and HTTP requests are redirected to it</li>
              <li>
                Form submissions are held in this site&apos;s Netlify account rather than in a
                database of our own, and are read by one person
              </li>
              <li>
                The less that is collected, the less there is to lose — which is the main reason so
                little is collected
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Choices</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>
                <strong>Analytics:</strong> block <code>plausible.io</code> in your browser or an ad
                blocker and the site records nothing about your visit. There is nothing to opt into,
                because nothing about you is stored either way.
              </li>
              <li>
                <strong>Your email:</strong> ask and it will be deleted from the form store. Ask and
                you will be told what is held. There is no other record of you to export.
              </li>
              <li>
                <strong>Don&apos;t submit the form</strong> and this site holds nothing about you at
                all.
              </li>
            </ul>
            <p className="text-gray-700">
              Requests go to the contact address below, where a person reads them. This is a
              one-person project, so there is no ticketing system and no guaranteed response time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700">
              If what the site collects changes, this page changes with it, and the date at the top
              is updated. Every edit is public in the{' '}
              <a
                href="https://github.com/TheWayWithin/agent-11-website"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                website repository
              </a>
              , so you can check what changed and when rather than taking our word for it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-700">
              AGENT-11 is a personal open-source project by Jamie Watters; there is no company
              behind it and no data protection department. For anything on this page, including
              deleting your email address, contact{' '}
              <a href="mailto:privacy@agent-11.com" className="text-primary-600 hover:text-primary-700">
                privacy@agent-11.com
              </a>
              . For anything public, open an issue at{' '}
              <a
                href="https://github.com/TheWayWithin/agent-11/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                github.com/TheWayWithin/agent-11/issues
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
