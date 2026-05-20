'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Search() {
  const router = useRouter()
  const [value, setValue] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = value.trim()
    if (q) {
      router.push(`/?city=${encodeURIComponent(q)}`)
      setValue('')
    }
  }

  return (
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
        borderRadius: 50,
        padding: '9px 16px',
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
  )
}
