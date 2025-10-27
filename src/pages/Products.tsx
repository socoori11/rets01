import React, { useEffect, useState } from 'react'
import { useCart } from '../com/CartContext'
import type { Product } from '../types/product'
// import styles from './Products.module.scss'

const Products: React.FC = () => {
  const [list, setList] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  const { cart, add, inc, dec } = useCart()

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('products.json')
        if (!res.ok) throw new Error('상품을 불러오지 못했습니다.')
        const data: Product[] = await res.json()
        setList(data)
      } catch (e: any) {
        setError(e.message ?? '에러가 발생했습니다.')
      }
    }
    load()
  }, [])

  if (error) return <div style={{ color: '#c00', padding: 20 }}>{error}</div>

  const getQty = (id: number) => cart.find(ci => ci.product.id === id)?.qty ?? 0

  return (
    <div style={{ padding: 20 }}>
      <h1>상품소개</h1>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {list.map(p => {
          const qty = getQty(p.id)
          return (
            <article key={p.id} style={{ border: '1px solid #ddd', borderRadius: 12, overflow: 'hidden' }}>
              <img src={p.image} alt={p.title} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
              <div style={{ padding: 12 }}>
                <h3 style={{ margin: '4px 0' }}>{p.title}</h3>
                <p style={{ color: '#1e90ff', fontWeight: 700 }}>{p.price.toLocaleString()}원</p>
              </div>

              <div style={{ padding: 12, borderTop: '1px solid #eee' }}>
                {qty === 0 ? (
                  <button
                    onClick={() => add(p, 1)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 12, background: '#1e90ff', color: '#fff', fontWeight: 700 }}
                  >
                    담기
                  </button>
                ) : (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    <button onClick={() => dec(p.id)} aria-label={`${p.title} 한 개 빼기`}>−</button>
                    <span style={{ minWidth: 20, textAlign: 'center', fontWeight: 700 }} aria-live="polite">{qty}</span>
                    <button onClick={() => inc(p.id)} aria-label={`${p.title} 한 개 추가`}>+</button>
                  </div>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default Products
