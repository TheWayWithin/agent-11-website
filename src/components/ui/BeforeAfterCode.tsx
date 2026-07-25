'use client'

import CodeBlock from './CodeBlock'

export interface BeforeAfterCodeProps {
  beforeCode: string
  afterCode: string
  language: string
  beforeTitle?: string
  afterTitle?: string
  improvements?: string[]
  className?: string
}

export default function BeforeAfterCode({
  beforeCode,
  afterCode,
  language,
  beforeTitle = 'Before',
  afterTitle = 'After',
  improvements = [],
  className = ''
}: BeforeAfterCodeProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Improvements Banner */}
      {improvements.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-green-800 font-semibold mb-2">Improvements:</h4>
          <ul className="space-y-1">
            {improvements.map((improvement, index) => (
              <li key={index} className="flex items-center gap-2 text-green-700 text-sm">
                <svg aria-hidden="true" className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {improvement}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Code Comparison */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Before */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <h4 className="text-gray-700 font-medium">{beforeTitle}</h4>
          </div>
          <CodeBlock
            code={beforeCode}
            language={language}
            showCopy={true}
            className="opacity-75"
          />
        </div>

        {/* After */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <h4 className="text-gray-700 font-medium">{afterTitle}</h4>
          </div>
          <CodeBlock
            code={afterCode}
            language={language}
            showCopy={true}
          />
        </div>
      </div>
    </div>
  )
}