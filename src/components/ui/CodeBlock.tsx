'use client'

import { useEffect, useRef, useState, memo } from 'react'

// Dynamic import for Prism to avoid SSR issues
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let Prism: any = null
const loadedLanguages = new Set<string>()

// Language-specific imports to reduce initial bundle
const languageLoaders: Record<string, () => Promise<void>> = {
  typescript: async () => {
    if (!loadedLanguages.has('typescript')) {
      // @ts-expect-error Prism language components have no type definitions
      await import('prismjs/components/prism-typescript.js')
      loadedLanguages.add('typescript')
    }
  },
  javascript: async () => {
    if (!loadedLanguages.has('javascript')) {
      // @ts-expect-error Prism language components have no type definitions
      await import('prismjs/components/prism-javascript.js')
      loadedLanguages.add('javascript')
    }
  },
  python: async () => {
    if (!loadedLanguages.has('python')) {
      // @ts-expect-error Prism language components have no type definitions
      await import('prismjs/components/prism-python.js')
      loadedLanguages.add('python')
    }
  },
  bash: async () => {
    if (!loadedLanguages.has('bash')) {
      // @ts-expect-error Prism language components have no type definitions
      await import('prismjs/components/prism-bash.js')
      loadedLanguages.add('bash')
    }
  },
  yaml: async () => {
    if (!loadedLanguages.has('yaml')) {
      // @ts-expect-error Prism language components have no type definitions
      await import('prismjs/components/prism-yaml.js')
      loadedLanguages.add('yaml')
    }
  },
  json: async () => {
    if (!loadedLanguages.has('json')) {
      // @ts-expect-error Prism language components have no type definitions
      await import('prismjs/components/prism-json.js')
      loadedLanguages.add('json')
    }
  },
  markdown: async () => {
    if (!loadedLanguages.has('markdown')) {
      // @ts-expect-error Prism language components have no type definitions
      await import('prismjs/components/prism-markdown.js')
      loadedLanguages.add('markdown')
    }
  }
}

const loadPrism = async (language: string) => {
  if (typeof window !== 'undefined' && !Prism) {
    const PrismJS = await import('prismjs')
    
    // Import theme only once
    try {
      // @ts-expect-error CSS import for styling has no type definitions
      await import('prismjs/themes/prism-tomorrow.css')
    } catch (error) {
      console.warn('Prism.js theme failed to load:', error)
    }
    
    Prism = PrismJS.default
  }
  
  // Load specific language on demand
  if (Prism && languageLoaders[language]) {
    try {
      await languageLoaders[language]()
    } catch (error) {
      console.warn(`Failed to load Prism language: ${language}`, error)
    }
  }
  
  return Prism
}

interface CodeBlockProps {
  code: string
  language: string
  title?: string
  showCopy?: boolean
  showLineNumbers?: boolean
  className?: string
}

const CodeBlock = memo(function CodeBlock({
  code,
  language,
  title,
  showCopy = true,
  showLineNumbers = false,
  className = ''
}: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const highlightCode = async () => {
      const prism = await loadPrism(language)
      if (codeRef.current && prism) {
        prism.highlightElement(codeRef.current)
      }
    }
    
    highlightCode()
  }, [code, language])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    // min-w-0 and max-w-full are load-bearing (A11W-ISS-19). A flex or grid
    // item defaults to min-width:auto, which means it refuses to shrink below
    // its content. A code block's content is long unbreakable lines, so every
    // CodeBlock inside a grid was sizing to its widest line and dragging the
    // whole page with it: the homepage measured 941px wide inside a 393px
    // viewport, and the overflow-x-auto below could not help because the
    // scroll container had already been stretched to fit.
    <div className={`relative group min-w-0 max-w-full ${className}`}>
      {/* Header */}
      {(title || showCopy) && (
        <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg">
          {title && (
            <span className="text-gray-300 text-sm font-medium">{title}</span>
          )}
          {showCopy && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors"
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <svg aria-hidden="true" className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg aria-hidden="true" className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Code Block */}
      <div className={`bg-gray-900 overflow-x-auto ${title || showCopy ? 'rounded-b-lg' : 'rounded-lg'}`}>
        <pre className={`${showLineNumbers ? 'line-numbers' : ''} p-4 text-sm`}>
          <code
            ref={codeRef}
            className={`language-${language}`}
            style={{ fontFamily: 'JetBrains Mono, Monaco, Consolas, monospace' }}
          >
            {code}
          </code>
        </pre>
      </div>
    </div>
  )
})

export default CodeBlock