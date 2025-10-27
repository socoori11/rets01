import React, { createContext, useContext, useState } from 'react'
import type { Product } from '../types/product'
import type { Cart } from '../types/cart' // Cart = { product: Product; qty: number }[]

type CartContextValue = {
  cart: Cart
  add: (p: Product, qty?: number) => void
  inc: (id: number) => void
  dec: (id: number) => void
  remove: (id: number) => void
  clear: () => void
  totalCount: number
  totalPrice: number
}

const CartContext = createContext<CartContextValue | null>(null)

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [cart, setCart] = useState<Cart>([])

  const add = (p: Product, qty: number = 1) => {
    setCart(prev => {
      const found = prev.find(ci => ci.product.id === p.id)
      if (found) {
        return prev.map(ci =>
          ci.product.id === p.id ? { ...ci, qty: ci.qty + Math.max(1, qty) } : ci
        )
      }
      return [...prev, { product: p, qty: Math.max(1, qty) }]
    })
  }

  const inc = (id: number) => {
    setCart(prev => prev.map(ci => (ci.product.id === id ? { ...ci, qty: ci.qty + 1 } : ci)))
  }

  const dec = (id: number) => {
    setCart(prev =>
      prev
        .map(ci => (ci.product.id === id ? { ...ci, qty: Math.max(1, ci.qty - 1) } : ci))
        .filter(ci => ci.qty > 0)
    )
  }

  const remove = (id: number) => {
    setCart(prev => prev.filter(ci => ci.product.id !== id))
  }

  const clear = () => setCart([])

  // 👉 총합은 매 렌더마다 간단히 계산(추가 훅 사용 X)
  const totalCount = cart.reduce((sum, ci) => sum + ci.qty, 0)
  const totalPrice = cart.reduce((sum, ci) => sum + ci.qty * ci.product.price, 0)

  return (
    <CartContext.Provider
      value={{ cart, add, inc, dec, remove, clear, totalCount, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
