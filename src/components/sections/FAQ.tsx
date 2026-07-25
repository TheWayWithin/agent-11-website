import Image from 'next/image'
import { getFAQSchema, renderStructuredData, type FAQItem } from '@/lib/structured-data'
import { FRAMEWORK_VERSION, FRAMEWORK_RELEASED, SITE_UPDATED, formatUpdated } from '@/lib/seo'

const INSTALL_COMMAND =
  'bash <(curl -fsSL https://raw.githubusercontent.com/TheWayWithin/agent-11/main/project/deployment/scripts/secure-install.sh)'

/**
 * Rendered as the visible FAQ section below AND as FAQPage JSON-LD — the two
 * must stay in sync, because Google (and every AI crawler that follows it)
 * requires the markup to match what a reader can actually see.
 *
 * Every answer here is a fact already published elsewhere on this site or in
 * the TheWayWithin/agent-11 repository. Nothing is invented to fill a slot.
 */
const HOMEPAGE_FAQ: FAQItem[] = [
  {
    question: 'What is AGENT-11?',
    answer:
      "AGENT-11 is an open-source multi-agent development framework for Claude Code. One install command deploys 11 specialist agents — coordinator, strategist, architect, developer, designer, tester, documenter, operator, analyst, marketer and support — into your project's .claude/ directory. You then run work as missions through the /coord command.",
  },
  {
    question: 'How do I install AGENT-11?',
    answer: `Run this from your project directory: ${INSTALL_COMMAND}. Every install deploys all 11 specialists, and the coordinator pulls in whichever the mission needs. There is no squad size to pick.`,
  },
  {
    question: 'How much does AGENT-11 cost?',
    answer:
      'AGENT-11 is free and open source (MIT). There are no licence fees and no per-mission charges. Your only cost is your own Claude Code / Anthropic API usage, which depends on how much you run it.',
  },
  {
    question: 'Where does my code go when I run a mission?',
    answer:
      "AGENT-11 is a set of files installed locally in your project's .claude/ directory; the agents and your code stay in your repo. Like any Claude Code session, the code and context you work on are processed by Claude (Anthropic). There is no AGENT-11 server, and nothing is sent to us.",
  },
  {
    question: 'Which version is current?',
    answer: `v${FRAMEWORK_VERSION}, released ${formatUpdated(FRAMEWORK_RELEASED)}. It added read-only quality gates, default-fail verification, the ratchet optimiser and a phase-gated meta-loop in /coord continue. The full history is on the changelog page and in the repository CHANGELOG.`,
  },
  {
    question: 'Who builds AGENT-11, and how is it funded?',
    answer:
      'Jamie Watters builds and maintains it as a solo founder, in the open. The source is on GitHub under the MIT licence, so you can read every line before you run it. Nothing on this site is for sale; support is voluntary, through GitHub stars or Buy Me a Coffee.',
  },
]

export default function FAQ() {
  return (
    <>
      {renderStructuredData(getFAQSchema(HOMEPAGE_FAQ))}
      <section className="py-16 lg:py-24 bg-white" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Questions people actually ask
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Short answers, and where to check them for yourself.
          </p>

          <dl className="space-y-8">
            {HOMEPAGE_FAQ.map((item) => (
              <div key={item.question}>
                <dt className="text-lg font-semibold text-gray-900 mb-2">{item.question}</dt>
                <dd className="text-gray-600 leading-relaxed break-words">{item.answer}</dd>
              </div>
            ))}
          </dl>

          {/* Disclosure. Sits in this eagerly-rendered section deliberately, so
              it is present in the initial HTML that crawlers read. */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-3">How this project works</h3>
            <Image
              src="/jamie-watters.jpg"
              alt="Jamie Watters, the solo founder who builds and maintains AGENT-11"
              width={72}
              height={72}
              className="rounded-full mb-4"
            />
            <p className="text-gray-600 leading-relaxed">
              AGENT-11 is built and maintained by{' '}
              <a
                href="https://jamiewatters.work"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-primary-600"
              >
                Jamie Watters
              </a>
              , a solo founder, with Claude (Anthropic) doing much of the coding under his review —
              the framework was used to build itself, and that method is the subject of the project
              rather than a secret behind it. It is free under the{' '}
              <a
                href="https://github.com/TheWayWithin/agent-11/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-primary-600"
              >
                MIT licence
              </a>
              . Nothing on this site is for sale, there are no sponsors and no affiliate links, and
              support is voluntary. Every claim here can be checked against{' '}
              <a
                href="https://github.com/TheWayWithin/agent-11"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-primary-600"
              >
                the source on GitHub
              </a>
              . Site last updated{' '}
              <time dateTime={SITE_UPDATED}>{formatUpdated(SITE_UPDATED)}</time>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
