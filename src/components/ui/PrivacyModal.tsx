'use client'

import { useState } from 'react'

interface PrivacyModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'cookies' | 'data'>('privacy')

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
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Privacy & Data Protection</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {[
            { id: 'privacy', label: 'Privacy Policy' },
            { id: 'cookies', label: 'Cookie Policy' },
            { id: 'data', label: 'Your Data' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'privacy' | 'cookies' | 'data')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] text-sm text-gray-700 space-y-4">
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Information We Collect</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Email addresses provided voluntarily through our forms</li>
                  <li>Usage data and analytics (when consented)</li>
                  <li>Device and browser information for optimization</li>
                  <li>Performance metrics to improve user experience</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How We Use Your Information</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Send you requested information and updates about Agent-11</li>
                  <li>Improve our website and user experience</li>
                  <li>Provide customer support when needed</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Rights</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Rectification:</strong> Correct inaccurate information</li>
                  <li><strong>Erasure:</strong> Request deletion of your data</li>
                  <li><strong>Portability:</strong> Export your data in a readable format</li>
                  <li><strong>Objection:</strong> Opt out of certain data processing</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Security</h3>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal data 
                  against unauthorized access, alteration, disclosure, or destruction. All data transmission 
                  is encrypted using industry-standard SSL/TLS protocols.
                </p>
              </section>
            </div>
          )}

          {activeTab === 'cookies' && (
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Essential Cookies</h3>
                <p className="mb-3">
                  These cookies are necessary for the website to function and cannot be disabled.
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Session management and security</li>
                  <li>Form submission and error handling</li>
                  <li>Performance monitoring for stability</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Analytics Cookies</h3>
                <p className="mb-3">
                  These cookies help us understand how visitors interact with our website (requires consent).
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Google Analytics for usage statistics</li>
                  <li>Conversion tracking for optimization</li>
                  <li>Performance metrics and error reporting</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Marketing Cookies</h3>
                <p className="mb-3">
                  These cookies are used to track visitors across websites for marketing purposes (requires consent).
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Email campaign effectiveness tracking</li>
                  <li>Social media integration</li>
                  <li>Retargeting and personalization</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Managing Cookies</h3>
                <p>
                  You can control cookie settings through your browser preferences or by updating your 
                  consent preferences below. Note that disabling certain cookies may affect website functionality.
                </p>
              </section>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Data We Store</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Based on your current session:</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Email capture consent: {typeof window !== 'undefined' && localStorage.getItem('agent11-cookie-consent') || 'Not set'}</li>
                    <li>• Exit intent shown: {typeof window !== 'undefined' && localStorage.getItem('agent11-exit-intent-shown') ? 'Yes' : 'No'}</li>
                    <li>• Session duration: Active</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Retention</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong>Email addresses:</strong> Retained until you unsubscribe</li>
                  <li><strong>Analytics data:</strong> Anonymized after 14 months</li>
                  <li><strong>Session data:</strong> Cleared when you close your browser</li>
                  <li><strong>Consent records:</strong> Kept for 3 years for compliance</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Request Data Deletion</h3>
                <p className="mb-4">
                  You can request deletion of your personal data at any time. This includes:
                </p>
                <ul className="space-y-2 list-disc list-inside mb-4">
                  <li>Email address and subscription data</li>
                  <li>Form submission history</li>
                  <li>Associated analytics data</li>
                </ul>
                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                  Request Data Deletion
                </button>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact & Support</h3>
                <p>
                  For privacy-related questions or to exercise your data rights, contact us at:{' '}
                  <a href="mailto:privacy@agent-11.com" className="text-primary-600 hover:text-primary-700">
                    privacy@agent-11.com
                  </a>
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
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