import Link from 'next/link'
import { PAGE_UPDATED } from '@/lib/page-dates'
import { formatUpdated } from '@/lib/seo'

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <p className="text-lg text-gray-600 mb-8">
            Last updated{' '}
            <time dateTime={PAGE_UPDATED.terms}>{formatUpdated(PAGE_UPDATED.terms)}</time>
          </p>

          <section className="mb-8">
            <p className="text-gray-700 mb-4">
              <strong>The short version.</strong> AGENT-11 is a free, open-source framework
              released under the MIT licence. There is nothing to buy, no account to create and
              no subscription. These terms cover your use of this website; the software itself is
              governed by its licence, and where the two ever disagree, the licence wins.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By using this website you agree to these terms. If you do not agree with them, please
              stop using the site. You do not need to accept anything to use the AGENT-11 software
              itself beyond the terms of the{' '}
              <a
                href="https://github.com/TheWayWithin/agent-11/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                MIT licence
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description of Service</h2>
            <p className="text-gray-700 mb-4">
              AGENT-11 is a set of agent definitions, mission workflows and configuration files
              that you install into your own project&apos;s <code>.claude/</code> directory and run
              with Claude Code. It includes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Eleven specialist agent profiles, installed locally in your project</li>
              <li>Mission workflows run through the <code>/coord</code> command</li>
              <li>Field-manual documentation and templates</li>
            </ul>
            <p className="text-gray-700">
              There is no AGENT-11 server, hosted product or API. The framework runs on your
              machine, inside your own Claude Code session, against your own repository. This
              website is documentation and a download pointer, nothing more.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Payment, No Account</h2>
            <p className="text-gray-700 mb-4">
              AGENT-11 is free. To be specific:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>There are no licence fees, mission charges or subscriptions</li>
              <li>There is no account to create and no credentials to keep safe</li>
              <li>This site takes no payments and stores no payment details</li>
              <li>
                Contributions through{' '}
                <a
                  href="https://buymeacoffee.com/jamiewatters"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700"
                >
                  Buy Me a Coffee
                </a>{' '}
                are entirely voluntary, buy you nothing, and are handled by that platform under its
                own terms
              </li>
            </ul>
            <p className="text-gray-700">
              Running AGENT-11 does cost you your own Claude Code or Anthropic API usage, which you
              pay to Anthropic, not to us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Responsibilities</h2>
            <p className="text-gray-700 mb-4">When you use AGENT-11, you agree to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Use it in compliance with all applicable laws</li>
              <li>Comply with the terms of any service you point it at, including Anthropic&apos;s</li>
              <li>Review AI-generated code before you ship it</li>
              <li>Respect the intellectual property rights of others in what you build</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              Your code and intellectual property remain yours. AGENT-11 claims no ownership of
              anything you build with it, and no rights over your repository.
            </p>
            <p className="text-gray-700">
              The framework itself is copyright Jamie Watters and licensed to you under the MIT
              licence, which lets you use, modify, distribute and sell it, commercially or
              privately, provided you keep the copyright and licence notice. The full text is on
              the <Link href="/license" className="text-primary-600 hover:text-primary-700">licence page</Link>{' '}
              and in the repository. The content of this website — its copy, design and images —
              is not covered by that licence and remains the author&apos;s.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              AGENT-11 is provided <strong>as is, without warranty of any kind</strong>, as set out
              in the MIT licence. It is a tool that instructs an AI model to write and change code
              in your repository. It can get things wrong. Review its output, keep your work in
              version control, and treat anything it produces as a draft until you have checked it.
            </p>
            <p className="text-gray-700">
              To the extent permitted by law, the author is not liable for any claim, damages or
              other liability arising from your use of the framework or this website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Stopping</h2>
            <p className="text-gray-700">
              There is nothing to cancel. Stop using the site whenever you like; delete the
              <code> .claude/</code> directory to remove the framework from a project. Your code and
              data are unaffected either way. Your rights under the MIT licence for code you have
              already obtained continue to apply.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to These Terms</h2>
            <p className="text-gray-700">
              These terms may change as the project does. The date at the top of this page always
              reflects the last change, and the history of every edit is public in the{' '}
              <a
                href="https://github.com/TheWayWithin/agent-11-website"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                website repository
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-700">
              AGENT-11 is a personal open-source project by Jamie Watters. There is no company
              behind it, no support desk and no legal department. For anything about these terms or
              the project, open an issue at{' '}
              <a
                href="https://github.com/TheWayWithin/agent-11/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                github.com/TheWayWithin/agent-11/issues
              </a>
              , or email{' '}
              <a href="mailto:privacy@agent-11.com" className="text-primary-600 hover:text-primary-700">
                privacy@agent-11.com
              </a>{' '}
              if it needs to be private.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
