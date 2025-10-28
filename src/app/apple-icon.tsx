import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
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
          borderRadius: '22.5%',
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
              fontSize: 70,
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
              fontSize: 28,
              fontWeight: 'bold',
              color: '#ffffff',
              marginTop: -8,
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
