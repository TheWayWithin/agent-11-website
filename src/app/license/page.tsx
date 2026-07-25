import Link from 'next/link'
import { PAGE_UPDATED } from '@/lib/page-dates'
import { formatUpdated } from '@/lib/seo'

export default function LicensePage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Open Source License</h1>
          <p className="text-lg text-gray-600 mb-2">AGENT-11 Core Framework</p>
          <p className="text-sm text-gray-500 mb-8">
            Last updated{' '}
            <time dateTime={PAGE_UPDATED.license}>{formatUpdated(PAGE_UPDATED.license)}</time> ·{' '}
            <a
              href="https://github.com/TheWayWithin/agent-11/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-primary-600"
            >
              the authoritative licence text is in the repository
            </a>
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">MIT License</h2>
            <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm">
              <p className="mb-4">Copyright (c) 2025 Jamie Watters</p>
              
              <p className="mb-4">
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the Software), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:
              </p>
              
              <p className="mb-4">
                The above copyright notice and this permission notice shall be included in all
                copies or substantial portions of the Software.
              </p>
              
              <p className="mb-4">
                THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What This Means</h2>
            <p className="text-gray-700 mb-4">
              The AGENT-11 core framework is open source under the MIT License, which means you can:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Use it commercially</li>
              <li>Modify the source code</li>
              <li>Distribute it</li>
              <li>Place warranty</li>
              <li>Use it privately</li>
            </ul>
            
            <p className="text-gray-700 mb-4">
              The only requirements are:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Include the original license and copyright notice</li>
              <li>State any significant changes made to the original software</li>
            </ul>
          </section>

          {/* The former "Enterprise Services" section listed premium mission
              libraries, an enterprise SLA, hosted infrastructure and paid
              custom development under "separate commercial licenses". None of
              those exist, have existed, or are planned — removed under
              A11W-ISS-4 rather than left implying a paid tier. */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">There Is No Paid Tier</h2>
            <p className="text-gray-700">
              Everything is under the licence above. There is no premium edition, no hosted
              service, no enterprise agreement and no support contract to buy — what is in the
              repository is the whole product. If you want to support the work, that is what{' '}
              <a
                href="https://buymeacoffee.com/jamiewatters"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                Buy Me a Coffee
              </a>{' '}
              is for, and it is entirely voluntary.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Dependencies</h2>
            <p className="text-gray-700 mb-4">
              AGENT-11 includes several open source dependencies, each with their own licenses:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Node.js runtime (MIT License)</li>
              <li>Various npm packages (see package.json for details)</li>
              <li>Python dependencies (see requirements.txt for details)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contributing</h2>
            <p className="text-gray-700 mb-4">
              We welcome contributions to the AGENT-11 project. By contributing, you agree that 
              your contributions will be licensed under the same MIT License.
            </p>
            <p className="text-gray-700">
              Visit our{' '}
              <a href="https://github.com/TheWayWithin/agent-11" className="text-primary-600 hover:text-primary-700" target="_blank" rel="noopener noreferrer">
                GitHub repository
              </a>{' '}
              to get started.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}