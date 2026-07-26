'use client'

import { useState } from 'react'
import Link from 'next/link'

/**
 * Release-updates signup.
 *
 * This was a lead-magnet capture that promised an "AGENT-11 Quick Start Kit"
 * and "Advanced Collaboration Patterns" by email. Neither artifact existed and
 * nothing sent them — the success state said "check your inbox" for a message
 * that was never going to arrive (A11W-ISS-6).
 *
 * It is now what it always actually was: a list of addresses. The copy asks
 * for exactly that and promises exactly that. Everything the old kits claimed
 * to contain is already public in the repository, so the success state links
 * straight to it rather than pretending it is in transit.
 *
 * The honeypot and the Plausible Signup event are unchanged. The form is now
 * named "release-updates" and posts to the static /__forms.html so that
 * Netlify actually records it — see that file for why posting to "/" silently
 * discarded every submission this form ever took. There were no historical
 * submissions to orphan by renaming: the dashboard held zero.
 */

interface EmailCaptureProps {
  variant?: 'hero' | 'inline' | 'footer' | 'exit-intent'
  title?: string
  description?: string
  placeholder?: string
  buttonText?: string
  showSocialProof?: boolean
  onSuccess?: () => void
  className?: string
}

const REPO_URL = 'https://github.com/TheWayWithin/agent-11'

export default function EmailCapture({
  variant = 'inline',
  title,
  description,
  placeholder = 'Enter your email',
  buttonText = 'Keep me posted',
  showSocialProof = true,
  onSuccess,
  className = ''
}: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check honeypot - if filled, it's likely spam
    if (honeypot) {
      console.log('Bot detected, ignoring submission')
      return
    }

    if (!email.trim()) {
      setError('Email is required')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)

      // POST to the static /__forms.html, not to "/". Netlify's form handler
      // never sees a POST to "/" on a Next.js site — @netlify/plugin-nextjs
      // routes it to the Next handler, which returns 200 and drops it. That is
      // why this form recorded nothing for its entire life: the success state
      // was driven by a 200 that meant "Next.js answered", not "Netlify saved
      // your address". Verified 2026-07-26. See public/__forms.html.
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString()
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setIsSuccess(true)
      onSuccess?.()

      // Track conversion event. The prop is now where on the site the signup
      // came from — there is no lead magnet to name.
      window.plausible?.('Signup', { props: { source: variant } })

    } catch (err) {
      setError('Something went wrong. Please try again.')
      console.error('Email capture error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className={`p-6 bg-green-50 border border-green-200 rounded-xl ${className}`}>
        <div className="text-3xl mb-3 text-center">✅</div>
        <h3 className="text-lg font-semibold text-green-900 mb-2 text-center">
          You&apos;re on the list
        </h3>
        <p className="text-green-800 mb-4">
          Your address is recorded for AGENT-11 release updates. Nothing is arriving in your
          inbox today — there is no welcome sequence and no attachment. You will hear from us
          when there is a release worth telling you about.
        </p>
        <p className="text-green-800 font-medium mb-2">
          Everything is already public. Start here:
        </p>
        <ul className="text-green-800 space-y-2 mb-4">
          <li>
            →{' '}
            <Link href="/documentation" className="underline underline-offset-4 hover:text-green-900">
              The quick start guide
            </Link>{' '}
            — install and run your first mission
          </li>
          <li>
            →{' '}
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-green-900"
            >
              The framework on GitHub
            </a>{' '}
            — every agent, mission and template, MIT licensed
          </li>
          <li>
            →{' '}
            <a
              href={`${REPO_URL}/releases`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-green-900"
            >
              Watch the repo&apos;s releases
            </a>{' '}
            — the one way to get notified that does not depend on us
          </li>
        </ul>
        <p className="text-sm text-green-700">
          Want your address removed? See the{' '}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-green-900">
            privacy policy
          </Link>
          .
        </p>
      </div>
    )
  }

  const variantStyles = {
    hero: 'bg-gradient-to-br from-primary-50 to-white border border-primary-200',
    inline: 'bg-gray-50 border border-gray-200',
    footer: 'bg-primary-600 text-white',
    'exit-intent': 'bg-white border-2 border-primary-500 shadow-2xl'
  }

  const inputStyles = {
    hero: 'border-primary-300 focus:border-primary-500 focus:ring-primary-500',
    inline: 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
    footer: 'border-primary-500 focus:border-primary-400 bg-white text-gray-900',
    'exit-intent': 'border-primary-300 focus:border-primary-500 focus:ring-primary-500'
  }

  const buttonStyles = {
    hero: 'bg-primary-600 hover:bg-primary-700 text-white',
    inline: 'bg-primary-600 hover:bg-primary-700 text-white',
    footer: 'bg-white hover:bg-gray-100 text-primary-600',
    'exit-intent': 'bg-primary-600 hover:bg-primary-700 text-white'
  }

  return (
    <div className={`rounded-xl p-6 ${variantStyles[variant]} ${className}`}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-2xl mb-3">📬</div>
        {title && (
          <h3 className={`text-xl font-bold mb-3 ${variant === 'footer' ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>
        )}
        {description && (
          <p className={`text-sm ${variant === 'footer' ? 'text-primary-100' : 'text-gray-600'}`}>
            {description}
          </p>
        )}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        name="release-updates"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="release-updates" />
        <input type="hidden" name="source" value={variant} />
        <input type="hidden" name="timestamp" value={new Date().toISOString()} />

        {/* Honeypot field - hidden from users but visible to bots */}
        <div style={{ display: 'none' }}>
          <label>
            Don&apos;t fill this out if you&apos;re human:
            <input
              name="bot-field"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor={`email-${variant}`} className="sr-only">
              Email address
            </label>
            <input
              id={`email-${variant}`}
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError(null)
              }}
              placeholder={placeholder}
              required
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${inputStyles[variant]}`}
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed ${buttonStyles[variant]} ${isSubmitting ? 'animate-pulse' : ''}`}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <svg aria-hidden="true" className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Sending...
              </div>
            ) : (
              buttonText
            )}
          </button>
        </div>

        {error && (
          <div className="text-red-600 text-sm text-center">
            {error}
          </div>
        )}
      </form>

      {/* Social Proof */}
      {showSocialProof && (
        <div className="mt-4 text-center">
          <div className={`text-xs ${variant === 'footer' ? 'text-primary-200' : 'text-gray-500'}`}>
            🔒 Release updates only. Nothing else, ever.
          </div>
        </div>
      )}

      {/* Value Props */}
      <div className="mt-4 text-center">
        <div className={`text-xs ${variant === 'footer' ? 'text-primary-200' : 'text-gray-500'} space-x-4`}>
          <span>✓ Free and MIT licensed</span>
          <span>✓ No account needed</span>
          <span>✓ Ask any time to be removed</span>
        </div>
      </div>
    </div>
  )
}
