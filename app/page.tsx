import Image from 'next/image'
import Clock from './clock'
import Search from './search'

const DEFAULT = {
  name: 'Ramat Gan',
  country: 'Israel',
  lat: 32.0684,
  lon: 34.8248,
  timezone: 'Asia/Jerusalem',
}

async function resolveCity(cityParam?: string) {
  if (!cityParam) return DEFAULT
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityParam)}&count=1&language=en&format=json`,
      { next: { revalidate: 3600 } }
    )
    const data = await res.json()
    if (!data.results?.length) return DEFAULT
    const r = data.results[0]
    return { name: r.name, country: r.country, lat: r.latitude, lon: r.longitude, timezone: r.timezone }
  } catch {
    return DEFAULT
  }
}

async function fetchWeather(lat: number, lon: number, timezone: string) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,uv_index` +
    `&hourly=temperature_2m` +
    `&daily=sunrise,sunset` +
    `&timezone=${encodeURIComponent(timezone)}` +
    `&temperature_unit=celsius&wind_speed_unit=kmh&forecast_days=2`,
    { next: { revalidate: 300 } }
  )
  return res.json()
}

function uvLabel(uv: number) {
  if (uv <= 2) return 'Low'
  if (uv <= 5) return 'Moderate'
  if (uv <= 7) return 'High'
  if (uv <= 10) return 'Very High'
  return 'Extreme'
}

function sunTime(iso: string) {
  return iso.slice(11, 16).replace(':', '.')
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>
}) {
  const { city: cityParam } = await searchParams
  const location = await resolveCity(cityParam)

  let weather: Record<string, unknown> | null = null
  try {
    weather = await fetchWeather(location.lat, location.lon, location.timezone)
  } catch {}

  const current = weather?.current as Record<string, number> | undefined
  const temp    = current ? Math.round(current.temperature_2m) : '--'
  const feels   = current ? Math.round(current.apparent_temperature) : '--'
  const humidity = current ? Math.round(current.relative_humidity_2m) : '--'
  const wind    = current ? Math.round(current.wind_speed_10m) : '--'
  const uv      = current?.uv_index !== undefined ? Math.round(current.uv_index) : null

  const daily   = weather?.daily as Record<string, string[]> | undefined
  const sunrise = daily?.sunrise?.[0] ? sunTime(daily.sunrise[0]) : '--'
  const sunset  = daily?.sunset?.[0]  ? sunTime(daily.sunset[0])  : '--'

  const hourlyTemps = (weather?.hourly as Record<string, number[]> | undefined)?.temperature_2m
  let hourly: { label: string; temp: number }[] = []
  if (hourlyTemps) {
    const nowLocal = new Date(new Date().toLocaleString('en-US', { timeZone: location.timezone }))
    const h = nowLocal.getHours()
    hourly = Array.from({ length: 6 }, (_, i) => ({
      label: i === 0 ? 'Now' : `${String((h + i) % 24).padStart(2, '0')}:00`,
      temp: Math.round(hourlyTemps[h + i] ?? 0),
    }))
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#1a2a18]">
      <div
        className="relative overflow-hidden"
        style={{
          width: 380,
          height: 580,
          borderRadius: 32,
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
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
        />

        {/* Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 28%, transparent 45%, rgba(0,0,0,0.18) 65%)',
          }}
        />

        {/* Search */}
        <div className="absolute top-5 left-5 right-5">
          <Search />
        </div>

        {/* Main text */}
        <div className="absolute text-white" style={{ top: 82, left: 28, right: 28 }}>
          <div className="flex justify-between items-start">
            <div className="leading-snug">
              <p className="text-[15px]" style={{ opacity: 0.82 }}>Today</p>
              <Clock />
            </div>
            <p
              className="text-[80px] font-bold leading-none -mt-2"
              style={{ letterSpacing: '-2px', textShadow: '0 2px 24px rgba(0,0,0,0.5)' }}
            >
              {temp}°
            </p>
          </div>
          <div className="mt-6">
            <p className="text-[22px] font-bold" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}>
              {location.name}
            </p>
            <p className="text-[15px]" style={{ opacity: 0.72 }}>{location.country}</p>
            <p className="text-[13px] mt-1" style={{ opacity: 0.65 }}>Feels like {feels}°</p>
          </div>
        </div>

        {/* Bottom frosted panel */}
        <div
          className="absolute bottom-0 left-0 right-0 text-white"
          style={{
            background: 'rgba(6, 12, 6, 0.58)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255,255,255,0.10)',
            padding: '18px 28px 22px',
          }}
        >
          {/* Stats */}
          <div className="flex justify-between mb-4">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-widest" style={{ opacity: 0.50 }}>Humidity</p>
              <p className="text-[17px] font-bold mt-1">{humidity}%</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-widest" style={{ opacity: 0.50 }}>Wind</p>
              <p className="text-[17px] font-bold mt-1">{wind} <span className="text-[12px] font-normal">km/h</span></p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-widest" style={{ opacity: 0.50 }}>UV Index</p>
              <p className="text-[17px] font-bold mt-1">
                {uv ?? '--'}
                {uv !== null && <span className="text-[11px] font-normal ml-1" style={{ opacity: 0.65 }}>{uvLabel(uv)}</span>}
              </p>
            </div>
          </div>

          {/* Sunrise / Sunset */}
          <div
            className="flex justify-between mb-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 13 }}
          >
            <p className="text-[13px]" style={{ opacity: 0.75 }}>↑ Sunrise {sunrise}</p>
            <p className="text-[13px]" style={{ opacity: 0.75 }}>Sunset {sunset} ↓</p>
          </div>

          {/* Hourly forecast */}
          <div
            className="flex justify-between"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 13 }}
          >
            {hourly.map((h, i) => (
              <div key={i} className="text-center">
                <p className="text-[10px]" style={{ opacity: 0.50 }}>{h.label}</p>
                <p className="text-[14px] font-bold mt-1">{h.temp}°</p>
              </div>
            ))}
          </div>
        </div>

        {/* Film grain */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
          <defs>
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.15 0 0 0 0" />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>
    </main>
  )
}
