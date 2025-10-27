import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import App from './App.tsx'

// ✅ 추가: CartProvider
import { CartProvider } from './com/CartContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter basename= '/rets01'>
        <App />
      </BrowserRouter>
    </CartProvider>
  </StrictMode>,
)
