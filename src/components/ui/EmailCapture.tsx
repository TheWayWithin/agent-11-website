'use client'

import { useState } from 'react'

interface EmailCaptureProps {
  variant?: 'hero' | 'inline' | 'footer' | 'exit-intent'
  leadMagnet: string
  title?: string
  description?: string
  placeholder?: string
  buttonText?: string
  showSocialProof?: boolean
  onSuccess?: () => void
  className?: string
}

export default function EmailCapture({
  variant = 'inline',
  leadMagnet,
  title,
  description,
  placeholder = 'Enter your email',
  buttonText = 'Get Free Guide',
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
      // Use native form submission for better Netlify Forms compatibility
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString()
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setIsSuccess(true)
      onSuccess?.()

      // Track conversion event
      window.plausible?.('Signup', { props: { lead_magnet: leadMagnet } })

    } catch (err) {
      setError('Something went wrong. Please try again.')
      console.error('Email capture error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className={`text-center p-6 bg-green-50 border border-green-200 rounded-xl ${className}`}>
        <div className="text-3xl mb-3">🎉</div>
        <h3 className="text-lg font-semibold text-green-900 mb-2">
          Check Your Email!
        </h3>
        <p className="text-green-700 mb-4">
          Your <strong>{leadMagnet}</strong> is on its way. Check your inbox (and spam folder) in the next few minutes.
        </p>
        <div className="text-sm text-green-600">
          While you wait, <a 
            href="https://github.com/TheWayWithin/agent-11/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-green-800"
          >
            star our GitHub repo
          </a> to stay updated!
        </div>
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
        <div className="text-2xl mb-3">📚</div>
        {title && (
          <h3 className={`text-xl font-bold mb-3 ${variant === 'footer' ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>
        )}
        <div className={`text-lg font-semibold mb-2 ${variant === 'footer' ? 'text-primary-100' : 'text-primary-600'}`}>
          Get Your Free: {leadMagnet}
        </div>
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
        name="lead-magnet-capture" 
        method="POST" 
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="lead-magnet-capture" />
        <input type="hidden" name="lead-magnet" value={leadMagnet} />
        <input type="hidden" name="variant" value={variant} />
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
            <input
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
                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            🔒 No spam ever. Unsubscribe anytime.
          </div>
        </div>
      )}

      {/* Value Props */}
      <div className="mt-4 text-center">
        <div className={`text-xs ${variant === 'footer' ? 'text-primary-200' : 'text-gray-500'} space-x-4`}>
          <span>✓ Instant download</span>
          <span>✓ Production-ready</span>
          <span>✓ No credit card</span>
        </div>
      </div>
    </div>
  )
}