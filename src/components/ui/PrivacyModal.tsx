'use client'

import Link from 'next/link'
import { PAGE_UPDATED } from '@/lib/page-dates'
import { formatUpdated } from '@/lib/seo'

/**
 * A short, truthful summary of what this site collects, with /privacy as the
 * authoritative version. Deliberately kept thin: the more it restates, the
 * more there is to drift out of sync with the policy page.
 *
 * Note for whoever wires this up: as of A11W-ISS-4 this component is not
 * mounted anywhere in the app. It was left in the tree, corrected rather than
 * deleted, because a modal that lies is worse than one nobody can open.
 *
 * What it used to claim, and why every line of it is gone: Google Analytics
 * (the site loads Plausible and nothing else), marketing and retargeting
 * cookies (the site sets no cookies at all — document.cookie is empty on
 * production), consent records "kept for 3 years", a live readout of
 * localStorage keys nothing ever writes, a "Request Data Deletion" button
 * wired to no handler, and a last-updated stamp built from new Date() that
 * always read as today no matter how stale the content was.
 */

interface PrivacyModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 id="privacy-modal-title" className="text-2xl font-bold text-gray-900">
            Privacy in short
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] text-sm text-gray-700 space-y-6">
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">No cookies, no tracking</h3>
            <p>
              This site sets no cookies, so there is nothing to consent to. Visits are counted with{' '}
              <a
                href="https://plausible.io/data-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                Plausible
              </a>
              , which is cookieless and collects aggregate counts that cannot identify you. It is
              the only third-party service the site loads — no other analytics, no ad network, no
              tracking pixel.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">The only data we can hold</h3>
            <p className="mb-3">
              An email address, and only if you type one into the form. Submitting it stores your
              email, which resource you asked for, which form you used and the time — nothing else,
              held in this site&apos;s Netlify Forms dashboard.
            </p>
            <p>
              There are no accounts, no passwords and no payments. If you never use the form, this
              site holds nothing about you.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Your code</h3>
            <p>
              AGENT-11 runs locally in your own project. There is no AGENT-11 server, so none of
              your code or mission output ever reaches us.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Deleting your email</h3>
            <p>
              Email{' '}
              <a href="mailto:privacy@agent-11.com" className="text-primary-600 hover:text-primary-700">
                privacy@agent-11.com
              </a>{' '}
              and it will be removed from the form store. A person reads it; there is no company
              behind this project.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500">
            Last updated{' '}
            <time dateTime={PAGE_UPDATED.privacy}>{formatUpdated(PAGE_UPDATED.privacy)}</time> ·{' '}
            <Link href="/privacy" className="text-primary-600 hover:text-primary-700 underline">
              full privacy policy
            </Link>
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
