import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import './globals.css'
import { CartProvider } from './cart-context'
import Header from './header'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Brewline — World Coffee, Delivered',
  description: 'Single-origin coffee from 12 countries, shipped anywhere on Earth in 3–7 days.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ background: '#faf4eb', color: '#3a2a1f' }}>
        <CartProvider>
          <Header />
          <div className="flex-1">{children}</div>
        </CartProvider>
      </body>
    </html>
  )
}
