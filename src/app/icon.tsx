import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 512, height: 512 }
export const contentType = 'image/png'

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '15%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 200,
              fontWeight: 'bold',
              color: '#ffffff',
              letterSpacing: '-0.05em',
              lineHeight: 1,
            }}
          >
            A
          </div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              color: '#ffffff',
              marginTop: -20,
            }}
          >
            11
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
