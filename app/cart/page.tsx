import Checkout from './checkout'

export default function CartPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 min-h-[70vh]">
      <h1
        className="text-[36px] md:text-[44px] font-bold tracking-tight mb-2"
        style={{ color: '#3a2a1f', fontFamily: 'var(--font-playfair), Georgia, serif' }}
      >
        Your cart
      </h1>
      <p className="text-[15px] mb-10" style={{ color: '#7a5a42' }}>
        Review your beans and ship them anywhere on Earth.
      </p>
      <Checkout />
    </main>
  )
}
