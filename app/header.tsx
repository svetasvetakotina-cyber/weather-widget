'use client'

import Link from 'next/link'
import { useCart } from './cart-context'

export default function Header() {
  const { count } = useCart()
  return (
    <header className="sticky top-0 z-20 backdrop-blur-md border-b border-[#3a2a1f]/15" style={{ background: 'rgba(250, 244, 235, 0.85)' }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-3xl transition-transform group-hover:rotate-12">☕</span>
          <div className="leading-tight">
            <p className="font-bold text-[20px] tracking-tight" style={{ color: '#3a2a1f', fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Brewline
            </p>
            <p className="text-[10px] uppercase tracking-[0.18em]" style={{ color: '#7a5a42' }}>
              World coffee, delivered
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-[14px] font-medium hover:opacity-70 transition-opacity hidden sm:inline"
            style={{ color: '#3a2a1f' }}
          >
            Menu
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center gap-2 px-4 py-2 rounded-full transition-transform hover:scale-105"
            style={{ background: '#3a2a1f', color: '#faf4eb' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="text-[13px] font-semibold">Cart</span>
            {count > 0 && (
              <span
                className="ml-1 rounded-full text-[11px] font-bold flex items-center justify-center"
                style={{ background: '#d97a3c', color: 'white', minWidth: 20, height: 20, padding: '0 6px' }}
              >
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
