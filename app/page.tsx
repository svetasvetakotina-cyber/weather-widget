import Image from 'next/image'
import Clock from './clock'

async function fetchTemperature(): Promise<number> {
  const res = await fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=32.0684&longitude=34.8248&current=temperature_2m&timezone=Asia%2FJerusalem&temperature_unit=celsius',
    { next: { revalidate: 300 } }
  )
  const data = await res.json()
  return Math.round(data.current.temperature_2m)
}

export default async function Home() {
  let temp = '--'
  try {
    temp = String(await fetchTemperature())
  } catch {}

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#1a2a18]">
      <div
        className="relative w-[380px] h-[380px] rounded-[32px] overflow-hidden"
        style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* Photo */}
        <Image
          src="/bg.jpg"
          alt=""
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />

        {/* Gradient overlay — darkens top and bottom for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 38%, transparent 52%, rgba(0,0,0,0.52) 100%)',
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, transparent 42%, rgba(0,0,0,0.42) 100%)',
          }}
        />

        {/* Film grain */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            <filter id="grain">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.68"
                numOctaves="4"
                stitchTiles="stitch"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.18 0 0 0 0"
              />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        {/* Text */}
        <div className="absolute inset-0 p-7 flex flex-col justify-between text-white">
          <div className="flex justify-between items-start">
            <div className="leading-snug">
              <p
                className="text-[15px]"
                style={{ opacity: 0.82, textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
              >
                Today
              </p>
              <Clock />
            </div>
            <p
              className="text-[80px] font-bold leading-none -mt-2"
              style={{
                letterSpacing: '-2px',
                textShadow: '0 2px 24px rgba(0,0,0,0.5)',
              }}
            >
              {temp}°
            </p>
          </div>

          <div>
            <p
              className="text-[26px] font-bold leading-tight"
              style={{ textShadow: '0 2px 16px rgba(0,0,0,0.65)' }}
            >
              Ramat Gan
            </p>
            <p
              className="text-[18px]"
              style={{ opacity: 0.8, textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}
            >
              Israel
            </p>
          </div>
        </div>

      </div>
    </main>
  )
}
