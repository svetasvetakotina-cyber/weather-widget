import Menu from './menu'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at top right, #d97a3c22 0%, transparent 60%), linear-gradient(180deg, #faf4eb 0%, #f3ead8 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <span
              className="inline-block text-[11px] uppercase tracking-[0.22em] mb-5 px-3 py-1.5 rounded-full"
              style={{ background: '#3a2a1f', color: '#faf4eb' }}
            >
              ✈ Free shipping over $40 — worldwide
            </span>
            <h1
              className="text-[44px] md:text-[64px] leading-[1.05] font-bold tracking-tight mb-6"
              style={{ color: '#3a2a1f', fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Coffee from every<br />
              <span style={{ color: '#d97a3c' }}>corner of the world.</span>
            </h1>
            <p className="text-[17px] md:text-[19px] leading-relaxed mb-8 max-w-xl" style={{ color: '#5a4636' }}>
              Single-origin beans roasted by small producers across 5 continents.
              Pick your country, brew your way, and we&apos;ll ship anywhere on Earth in 3–7 days.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href="#menu"
                className="px-7 py-3.5 rounded-full text-[15px] font-semibold transition-transform hover:scale-105"
                style={{ background: '#3a2a1f', color: '#faf4eb' }}
              >
                Browse the menu
              </a>
              <a
                href="#how-it-works"
                className="px-7 py-3.5 rounded-full text-[15px] font-semibold transition-all hover:bg-[#3a2a1f] hover:text-[#faf4eb]"
                style={{ border: '1px solid #3a2a1f', color: '#3a2a1f' }}
              >
                How it works
              </a>
            </div>

            <div className="flex gap-8 mt-12 flex-wrap">
              <Stat value="47" label="countries we ship to" />
              <Stat value="12" label="origins on the menu" />
              <Stat value="3–7d" label="delivery, every time" />
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <div id="menu">
        <div className="max-w-6xl mx-auto px-6 pt-12">
          <h2
            className="text-[32px] md:text-[40px] font-bold tracking-tight mb-2"
            style={{ color: '#3a2a1f', fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Today&apos;s menu
          </h2>
          <p className="text-[15px]" style={{ color: '#7a5a42' }}>
            Twelve coffees. Twelve places. Pick a region or search by tasting note.
          </p>
        </div>
        <Menu />
      </div>

      {/* How it works */}
      <section id="how-it-works" style={{ background: '#3a2a1f', color: '#faf4eb' }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2
            className="text-[32px] md:text-[40px] font-bold tracking-tight mb-12 text-center"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            From a hillside to your kitchen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Step n="1" title="Pick your beans" body="Browse twelve single-origins from five continents. Filter by region, search by tasting note." />
            <Step n="2" title="Tell us where" body="Ship anywhere — we calculate delivery to your country at checkout. No surprise fees." />
            <Step n="3" title="Brew fresh" body="Roasted the day before it ships. Whole-bean or pre-ground, your call. Arrives in 3–7 days." />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#2a1d14', color: '#c5b09a' }}>
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-4 text-[13px]">
          <p>© {new Date().getFullYear()} Brewline Coffee Co. — roasted in 7 cities, shipped to 47.</p>
          <p>Made with ☕ and a long extraction.</p>
        </div>
      </footer>
    </>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p
        className="text-[32px] font-bold leading-none"
        style={{ color: '#3a2a1f', fontFamily: 'var(--font-playfair), Georgia, serif' }}
      >
        {value}
      </p>
      <p className="text-[12px] uppercase tracking-wider mt-1" style={{ color: '#7a5a42' }}>
        {label}
      </p>
    </div>
  )
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div>
      <p
        className="text-[48px] font-bold leading-none mb-3"
        style={{ color: '#d97a3c', fontFamily: 'var(--font-playfair), Georgia, serif' }}
      >
        {n}
      </p>
      <h3 className="text-[20px] font-bold mb-2" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
        {title}
      </h3>
      <p className="text-[14px] leading-relaxed" style={{ color: '#c5b09a' }}>
        {body}
      </p>
    </div>
  )
}
