import { NavLink } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          📚 <span>Explorer</span>
        </NavLink>
        <div className={styles.actions}>
          <nav className={styles.nav}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              Search
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              Favorites
            </NavLink>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
