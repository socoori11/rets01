import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.scss'

const NavBar = () => {
  const menus = [
    { name: '홈', path: '/home' },
    { name: '날씨', path: '/weather' },
    { name: '상품소개', path: '/products' },
    { name: '장바구니', path: '/cart' },
    { name: '갤러리', path: '/gallery' },
  ]

  return (
    <header className={styles.navbar}>
      <h1 className={styles.logo}>타입 프로젝트</h1>
      <nav>
        <ul className={styles.menuList}>
          {menus.map((m) => (
            <li key={m.path}>
              <NavLink
                to={m.path}
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                // isActive :: router-dom 명령 일치하면 true
                }
              >
                {m.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default NavBar
