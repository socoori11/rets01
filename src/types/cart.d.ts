import type { Product } from './product'

// 🛒 장바구니의 단일 항목
export interface CartItem {
  product: Product
  qty: number
}

// 🧺 장바구니 전체 배열
export type Cart = CartItem[]
