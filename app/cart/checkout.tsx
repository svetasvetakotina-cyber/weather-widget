'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '../cart-context'
import { COUNTRIES, shippingFor } from '../data'

export default function Checkout() {
  const { detailed, subtotal, setQty, remove, clear, count } = useCart()
  const [country, setCountry] = useState('United States')
  const [submitted, setSubmitted] = useState<{ id: string; total: number; country: string } | null>(null)
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', postal: '', notes: '' })

  if (count === 0 && !submitted) {
    return (
      <div
        className="rounded-2xl text-center py-20 px-6"
        style={{ background: 'white', border: '1px dashed rgba(58, 42, 31, 0.2)' }}
      >
        <p className="text-[48px] mb-4">☕</p>
        <p className="text-[20px] font-semibold mb-2" style={{ color: '#3a2a1f', fontFamily: 'var(--font-playfair), Georgia, serif' }}>
          Nothing brewing yet
        </p>
        <p className="text-[14px] mb-6" style={{ color: '#7a5a42' }}>
          Your cart is empty. Go pick out some beans.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-full text-[14px] font-semibold transition-transform hover:scale-105"
          style={{ background: '#3a2a1f', color: '#faf4eb' }}
        >
          Browse coffees
        </Link>
      </div>
    )
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl text-center py-20 px-6"
        style={{ background: 'white', border: '1px solid rgba(58, 42, 31, 0.1)' }}
      >
        <p className="text-[56px] mb-4">🎉</p>
        <p className="text-[28px] font-bold mb-2" style={{ color: '#3a2a1f', fontFamily: 'var(--font-playfair), Georgia, serif' }}>
          Your order is on its way
        </p>
        <p className="text-[15px] mb-6 max-w-md mx-auto" style={{ color: '#5a4636' }}>
          Order <span className="font-mono font-bold">{submitted.id}</span> — we&apos;ve emailed a confirmation.
          Total <strong>${submitted.total.toFixed(2)}</strong>, shipping to <strong>{submitted.country}</strong> in 3–7 days.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-full text-[14px] font-semibold transition-transform hover:scale-105"
          style={{ background: '#3a2a1f', color: '#faf4eb' }}
        >
          Order more coffee
        </Link>
      </div>
    )
  }

  const shipping = shippingFor(country)
  const freeShipping = subtotal >= 40
  const shippingCharge = freeShipping ? 0 : shipping
  const total = subtotal + shippingCharge

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const id = 'BRW-' + Math.random().toString(36).slice(2, 8).toUpperCase()
    setSubmitted({ id, total, country })
    clear()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
      {/* Items + Form */}
      <div className="flex flex-col gap-8">
        {/* Items */}
        <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid rgba(58, 42, 31, 0.08)' }}>
          <div className="px-6 py-4 border-b" style={{ borderColor: 'rgba(58, 42, 31, 0.08)' }}>
            <h2 className="text-[18px] font-bold" style={{ color: '#3a2a1f', fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              {count} {count === 1 ? 'item' : 'items'}
            </h2>
          </div>
          <ul>
            {detailed.map(({ id, qty, coffee, lineTotal }) => (
              <li key={id} className="flex items-center gap-4 px-6 py-4 border-b last:border-0" style={{ borderColor: 'rgba(58, 42, 31, 0.06)' }}>
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center text-[32px]"
                  style={{ background: '#f3ead8' }}
                >
                  {coffee.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[16px] leading-tight" style={{ color: '#3a2a1f' }}>
                    {coffee.name} <span className="text-[14px]" style={{ opacity: 0.7 }}>{coffee.flag}</span>
                  </p>
                  <p className="text-[12px] mt-0.5" style={{ color: '#7a5a42' }}>
                    {coffee.origin} · {coffee.roast} · ${coffee.price.toFixed(2)} each
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQty(id, qty - 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[16px] font-bold transition-colors hover:bg-[#f3ead8]"
                    style={{ border: '1px solid rgba(58, 42, 31, 0.2)', color: '#3a2a1f' }}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-7 text-center font-semibold text-[14px]" style={{ color: '#3a2a1f' }}>{qty}</span>
                  <button
                    onClick={() => setQty(id, qty + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[16px] font-bold transition-colors hover:bg-[#f3ead8]"
                    style={{ border: '1px solid rgba(58, 42, 31, 0.2)', color: '#3a2a1f' }}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <p className="font-bold w-20 text-right text-[15px]" style={{ color: '#3a2a1f' }}>
                  ${lineTotal.toFixed(2)}
                </p>
                <button
                  onClick={() => remove(id)}
                  className="text-[12px] opacity-60 hover:opacity-100 transition-opacity"
                  style={{ color: '#3a2a1f' }}
                  aria-label="Remove"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="rounded-2xl p-6 md:p-8 space-y-5" style={{ background: 'white', border: '1px solid rgba(58, 42, 31, 0.08)' }}>
          <h2 className="text-[20px] font-bold" style={{ color: '#3a2a1f', fontFamily: 'var(--font-playfair), Georgia, serif' }}>
            Shipping details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Full name" value={form.name} onChange={v => setForm({ ...form, name: v })} required />
            <Field label="Email" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} required />
            <div className="md:col-span-2">
              <Field label="Street address" value={form.address} onChange={v => setForm({ ...form, address: v })} required />
            </div>
            <Field label="City" value={form.city} onChange={v => setForm({ ...form, city: v })} required />
            <Field label="Postal code" value={form.postal} onChange={v => setForm({ ...form, postal: v })} required />
            <div className="md:col-span-2">
              <label className="block">
                <span className="text-[12px] uppercase tracking-wider font-semibold" style={{ color: '#7a5a42' }}>Country</span>
                <select
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  className="mt-1.5 w-full px-4 py-3 rounded-lg text-[14px] outline-none transition-colors"
                  style={{ border: '1px solid rgba(58, 42, 31, 0.2)', color: '#3a2a1f', background: 'white' }}
                  required
                >
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
            </div>
            <div className="md:col-span-2">
              <label className="block">
                <span className="text-[12px] uppercase tracking-wider font-semibold" style={{ color: '#7a5a42' }}>Brewing notes (optional)</span>
                <textarea
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  placeholder="Whole bean or ground? Drip, espresso, French press..."
                  className="mt-1.5 w-full px-4 py-3 rounded-lg text-[14px] outline-none resize-none"
                  style={{ border: '1px solid rgba(58, 42, 31, 0.2)', color: '#3a2a1f' }}
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-full text-[15px] font-semibold transition-transform hover:scale-[1.01] active:scale-[0.99]"
            style={{ background: '#d97a3c', color: 'white' }}
          >
            Place order · ${total.toFixed(2)}
          </button>
          <p className="text-[11px] text-center" style={{ color: '#7a5a42' }}>
            This is a demo. No card is charged and no order is shipped.
          </p>
        </form>
      </div>

      {/* Summary */}
      <aside className="rounded-2xl p-6 h-fit lg:sticky lg:top-24" style={{ background: 'white', border: '1px solid rgba(58, 42, 31, 0.08)' }}>
        <h2 className="text-[18px] font-bold mb-4" style={{ color: '#3a2a1f', fontFamily: 'var(--font-playfair), Georgia, serif' }}>
          Order summary
        </h2>
        <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
        <Row
          label={`Shipping to ${country}`}
          value={freeShipping ? 'FREE' : `$${shippingCharge.toFixed(2)}`}
          valueColor={freeShipping ? '#2d8659' : undefined}
        />
        {!freeShipping && (
          <p className="text-[12px] mt-1 mb-3" style={{ color: '#a07c5e' }}>
            Add <strong>${(40 - subtotal).toFixed(2)}</strong> more for free shipping.
          </p>
        )}
        <div className="border-t my-4" style={{ borderColor: 'rgba(58, 42, 31, 0.1)' }} />
        <div className="flex justify-between items-baseline">
          <span className="font-bold text-[16px]" style={{ color: '#3a2a1f' }}>Total</span>
          <span className="font-bold text-[24px]" style={{ color: '#3a2a1f', fontFamily: 'var(--font-playfair), Georgia, serif' }}>
            ${total.toFixed(2)}
          </span>
        </div>
        <p className="text-[11px] mt-4" style={{ color: '#7a5a42' }}>
          Estimated delivery: <strong>3–7 business days</strong>. All coffees roasted the day before they ship.
        </p>
      </aside>
    </div>
  )
}

function Field({
  label, value, onChange, type = 'text', required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="text-[12px] uppercase tracking-wider font-semibold" style={{ color: '#7a5a42' }}>
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        className="mt-1.5 w-full px-4 py-3 rounded-lg text-[14px] outline-none transition-colors focus:border-[#3a2a1f]"
        style={{ border: '1px solid rgba(58, 42, 31, 0.2)', color: '#3a2a1f' }}
      />
    </label>
  )
}

function Row({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div className="flex justify-between items-baseline py-1.5">
      <span className="text-[14px]" style={{ color: '#5a4636' }}>{label}</span>
      <span className="text-[14px] font-semibold" style={{ color: valueColor ?? '#3a2a1f' }}>{value}</span>
    </div>
  )
}
