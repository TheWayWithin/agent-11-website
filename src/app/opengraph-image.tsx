import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'AGENT-11 - Multi-Agent Development Framework for Solo Founders'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Main Title */}
        <div
          style={{
            display: 'flex',
            fontSize: 96,
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: 30,
            letterSpacing: '-0.02em',
          }}
        >
          AGENT-11
        </div>

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            fontSize: 40,
            color: '#a0a0a0',
            textAlign: 'center',
            marginBottom: 40,
            maxWidth: '900px',
            lineHeight: 1.3,
          }}
        >
          Your Personal Dev Team That Never Sleeps
        </div>

        {/* Feature Highlights */}
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: '#60a5fa',
            textAlign: 'center',
            gap: '40px',
          }}
        >
          <span>11 AI Specialists</span>
          <span style={{ color: '#4b5563' }}>•</span>
          <span>Multi-Agent Framework</span>
          <span style={{ color: '#4b5563' }}>•</span>
          <span>For Solo Founders</span>
        </div>

        {/* Attribution */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 40,
            right: 60,
            fontSize: 22,
            color: '#6b7280',
          }}
        >
          by Jamie Watters
        </div>
      </div>
    ),
    { ...size }
  )
}
