'use client'

import { createContext, useContext, useCallback, useSyncExternalStore, ReactNode } from 'react'
import { COFFEES, Coffee } from './data'

export type CartItem = { id: string; qty: number }

const STORAGE_KEY = 'brewline:cart:v1'

// Module-level external store for the cart
let cartState: CartItem[] = []
const listeners = new Set<() => void>()

function readFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

function writeToStorage(items: CartItem[]) {
  if (typeof window === 'undefined') return
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) } catch {}
}

function setCart(updater: (prev: CartItem[]) => CartItem[]) {
  cartState = updater(cartState)
  writeToStorage(cartState)
  listeners.forEach(l => l())
}

function subscribe(listener: () => void): () => void {
  // Hydrate from localStorage on first subscribe (client-only)
  if (listeners.size === 0) {
    const stored = readFromStorage()
    if (stored.length > 0 || cartState.length > 0) {
      cartState = stored
    }
    // Sync across tabs
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        cartState = readFromStorage()
        listeners.forEach(l => l())
      }
    }
    window.addEventListener('storage', onStorage)
    listeners.add(listener)
    // Notify so React picks up the hydrated state
    listener()
    return () => {
      listeners.delete(listener)
      if (listeners.size === 0) window.removeEventListener('storage', onStorage)
    }
  }
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

function getSnapshot(): CartItem[] { return cartState }
function getServerSnapshot(): CartItem[] { return [] }

type CartContextValue = {
  items: CartItem[]
  add: (id: string) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
  count: number
  subtotal: number
  detailed: (CartItem & { coffee: Coffee; lineTotal: number })[]
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const add = useCallback((id: string) => {
    setCart(prev => {
      const found = prev.find(i => i.id === id)
      if (found) return prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { id, qty: 1 }]
    })
  }, [])

  const remove = useCallback((id: string) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }, [])

  const setQty = useCallback((id: string, qty: number) => {
    setCart(prev => {
      if (qty <= 0) return prev.filter(i => i.id !== id)
      return prev.map(i => i.id === id ? { ...i, qty } : i)
    })
  }, [])

  const clear = useCallback(() => setCart(() => []), [])

  const detailed = items
    .map(item => {
      const coffee = COFFEES.find(c => c.id === item.id)
      if (!coffee) return null
      return { ...item, coffee, lineTotal: coffee.price * item.qty }
    })
    .filter((x): x is CartItem & { coffee: Coffee; lineTotal: number } => x !== null)

  const count = detailed.reduce((sum, i) => sum + i.qty, 0)
  const subtotal = detailed.reduce((sum, i) => sum + i.lineTotal, 0)

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, count, subtotal, detailed }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
