'use client'

import { useState, useMemo } from 'react'
import { COFFEES, REGIONS, Region } from './data'
import { useCart } from './cart-context'

export default function Menu() {
  const [region, setRegion] = useState<Region>('All')
  const [query, setQuery] = useState('')
  const { add, items } = useCart()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return COFFEES.filter(c => {
      if (region !== 'All' && c.region !== region) return false
      if (!q) return true
      return (
        c.name.toLowerCase().includes(q) ||
        c.origin.toLowerCase().includes(q) ||
        c.notes.join(' ').toLowerCase().includes(q)
      )
    })
  }, [region, query])

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      {/* Filter bar */}
      <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2 flex-wrap">
          {REGIONS.map(r => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className="px-4 py-2 rounded-full text-[13px] font-semibold transition-all"
              style={{
                background: region === r ? '#3a2a1f' : 'transparent',
                color: region === r ? '#faf4eb' : '#3a2a1f',
                border: region === r ? '1px solid #3a2a1f' : '1px solid rgba(58, 42, 31, 0.2)',
              }}
            >
              {r}
            </button>
          ))}
        </div>

        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{ border: '1px solid rgba(58, 42, 31, 0.2)', background: 'white', minWidth: 220 }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="6.5" cy="6.5" r="5" stroke="#3a2a1f" strokeWidth="1.5" strokeOpacity="0.6" />
            <path d="M10.5 10.5L14 14" stroke="#3a2a1f" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
          </svg>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search beans, origin, notes..."
            className="bg-transparent outline-none text-[14px] w-full"
            style={{ color: '#3a2a1f' }}
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20" style={{ color: '#7a5a42' }}>
          <p className="text-[18px]">No coffees match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(c => {
            const inCart = items.find(i => i.id === c.id)?.qty ?? 0
            return (
              <article
                key={c.id}
                className="relative flex flex-col rounded-2xl overflow-hidden transition-transform hover:-translate-y-1"
                style={{
                  background: 'white',
                  border: '1px solid rgba(58, 42, 31, 0.08)',
                  boxShadow: '0 4px 16px rgba(58, 42, 31, 0.06)',
                }}
              >
                <div
                  className="aspect-[5/3] flex items-center justify-center text-[80px] relative"
                  style={{
                    background: gradientFor(c.id),
                  }}
                >
                  <span style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.25))' }}>{c.emoji}</span>
                  <span
                    className="absolute top-3 left-3 text-[11px] font-semibold px-2 py-1 rounded-full"
                    style={{ background: 'rgba(255, 255, 255, 0.92)', color: '#3a2a1f' }}
                  >
                    {c.roast} roast
                  </span>
                  <span
                    className="absolute top-3 right-3 text-[20px]"
                    title={c.origin}
                  >
                    {c.flag}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3
                      className="text-[20px] font-bold leading-tight"
                      style={{ color: '#3a2a1f', fontFamily: 'var(--font-playfair), Georgia, serif' }}
                    >
                      {c.name}
                    </h3>
                    <p className="text-[18px] font-bold whitespace-nowrap" style={{ color: '#3a2a1f' }}>
                      ${c.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-[12px] uppercase tracking-wider mb-3" style={{ color: '#a07c5e' }}>
                    {c.origin}
                  </p>
                  <p className="text-[14px] leading-relaxed mb-4 flex-1" style={{ color: '#5a4636' }}>
                    {c.description}
                  </p>
                  <div className="flex gap-1.5 flex-wrap mb-4">
                    {c.notes.map(n => (
                      <span
                        key={n}
                        className="text-[11px] px-2 py-1 rounded-full"
                        style={{ background: '#f3ead8', color: '#7a5a42' }}
                      >
                        {n}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => add(c.id)}
                    className="w-full py-3 rounded-full text-[14px] font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: '#3a2a1f', color: '#faf4eb' }}
                  >
                    {inCart > 0 ? `Add another (${inCart} in cart)` : 'Add to cart'}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

function gradientFor(id: string): string {
  // Simple deterministic warm gradient per coffee
  const palettes: Record<string, string> = {
    'ethiopia-yirgacheffe': 'linear-gradient(135deg, #c39862 0%, #6b3f1d 100%)',
    'colombia-huila': 'linear-gradient(135deg, #b07a4a 0%, #4a2a18 100%)',
    'italy-espresso': 'linear-gradient(135deg, #6b3a1f 0%, #1f1108 100%)',
    'vietnam-cafe-sua-da': 'linear-gradient(135deg, #d4a86a 0%, #3a2210 100%)',
    'turkey-kahve': 'linear-gradient(135deg, #8b5a3c 0%, #2a160a 100%)',
    'brazil-santos': 'linear-gradient(135deg, #c08a5a 0%, #5a3018 100%)',
    'kenya-aa': 'linear-gradient(135deg, #a86a4a 0%, #3a1a10 100%)',
    'japan-kyoto-cold-brew': 'linear-gradient(135deg, #7aaab8 0%, #2a3a48 100%)',
    'guatemala-antigua': 'linear-gradient(135deg, #a06548 0%, #3a1810 100%)',
    'australia-flat-white': 'linear-gradient(135deg, #e2c5a4 0%, #8a6240 100%)',
    'morocco-spiced': 'linear-gradient(135deg, #c47238 0%, #4a1f0a 100%)',
    'usa-portland-pour-over': 'linear-gradient(135deg, #b8895c 0%, #4a2e18 100%)',
  }
  return palettes[id] ?? 'linear-gradient(135deg, #a07a5a 0%, #3a2a1f 100%)'
}
