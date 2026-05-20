'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

interface Suggestion {
  name: string
  country: string
  admin1?: string
}

export default function Search() {
  const router = useRouter()
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [open, setOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value.length < 2) {
      setSuggestions([])
      setOpen(false)
      return
    }
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(value)}&count=5&language=en&format=json`
        )
        const data = await res.json()
        setSuggestions(data.results ?? [])
        setOpen(true)
      } catch {
        setSuggestions([])
      }
    }, 300)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [value])

  // Close on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function select(city: Suggestion) {
    router.push(`/?city=${encodeURIComponent(city.name)}`)
    setValue('')
    setOpen(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (suggestions.length > 0) {
      select(suggestions[0])
    } else if (value.trim()) {
      router.push(`/?city=${encodeURIComponent(value.trim())}`)
      setValue('')
      setOpen(false)
    }
  }

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* Search bar */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: open && suggestions.length > 0 ? '20px 20px 0 0' : 50,
          padding: '9px 16px',
          transition: 'border-radius 0.15s',
        }}
      >
        <button
          type="submit"
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="6.5" cy="6.5" r="5" stroke="white" strokeWidth="1.5" strokeOpacity="0.75" />
            <path d="M10.5 10.5L14 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.75" />
          </svg>
        </button>
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Search city..."
          className="search-input"
          style={{
            background: 'none',
            border: 'none',
            outline: 'none',
            color: 'white',
            fontSize: 14,
            width: '100%',
            fontFamily: 'var(--font-playfair), Georgia, serif',
          }}
        />
      </form>

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(10,16,10,0.82)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderTop: 'none',
            borderRadius: '0 0 20px 20px',
            overflow: 'hidden',
            zIndex: 10,
          }}
        >
          {suggestions.map((s, i) => (
            <button
              key={i}
              onMouseDown={() => select(s)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '10px 16px',
                background: 'none',
                border: 'none',
                borderTop: i > 0 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                cursor: 'pointer',
                color: 'white',
                fontFamily: 'var(--font-playfair), Georgia, serif',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
              <span style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</span>
              <span style={{ fontSize: 12, opacity: 0.6, marginLeft: 6 }}>
                {s.admin1 ? `${s.admin1}, ` : ''}{s.country}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
