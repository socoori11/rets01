import React from 'react'
import { useCart } from '../com/CartContext'

const Cart: React.FC = () => {
  const { cart, inc, dec, remove, clear, totalCount, totalPrice } = useCart()

  if (cart.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <h1>장바구니</h1>
        <p style={{ color: '#666' }}>담긴 상품이 없습니다.</p>
      </div>
    )
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>장바구니</h1>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
        {cart.map(ci => (
          <li key={ci.product.id} style={{
            display: 'grid',
            gridTemplateColumns: '96px 1fr auto',
            gap: 12, alignItems: 'center',
            padding: 12, border: '1px solid #ddd', borderRadius: 12
          }}>
            <img src={ci.product.image} alt={ci.product.title} style={{ width: 96, height: 96, objectFit: 'cover', borderRadius: 8 }} />
            <div style={{ display: 'grid', gap: 6 }}>
              <h3 style={{ margin: 0 }}>{ci.product.title}</h3>
              <p style={{ color: '#1e90ff', fontWeight: 700, margin: 0 }}>
                {(ci.product.price * ci.qty).toLocaleString()}원
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <button onClick={() => dec(ci.product.id)} aria-label={`${ci.product.title} 한 개 빼기`}>−</button>
                <span style={{ minWidth: 20, textAlign: 'center', fontWeight: 700 }} aria-live="polite">{ci.qty}</span>
                <button onClick={() => inc(ci.product.id)} aria-label={`${ci.product.title} 한 개 추가`}>+</button>
              </div>
            </div>
            <button onClick={() => remove(ci.product.id)} aria-label={`${ci.product.title} 제거`} style={{ color: '#c00' }}>
              제거
            </button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 20, display: 'flex', gap: 16, alignItems: 'center', paddingTop: 12, borderTop: '1px solid #eee' }}>
        <div>총 수량: <strong>{totalCount}</strong>개</div>
        <div>총 금액: <strong>{totalPrice.toLocaleString()}원</strong></div>
        <button onClick={clear}>전체 비우기</button>
      </div>
    </div>
  )
}

export default Cart
