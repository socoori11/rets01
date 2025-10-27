import { Routes, Route } from 'react-router-dom'
import NavBar from './com/NavBar'

// 각 페이지
import Home from './pages/Home'
import Weather from './pages/Weather'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Gallery from './pages/Gallery'

const App = () => {
  return (
    <>
      {/* 상단 네비게이션 */}
      <NavBar />

      {/* 페이지 라우터 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </>
  )
}

export default App
