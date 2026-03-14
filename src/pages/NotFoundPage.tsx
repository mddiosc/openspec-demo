import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  return (
    <main className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>We couldn't find the page you're looking for.</p>
        <Link to="/" className={styles.homeLink}>
          ← Back to search
        </Link>
      </div>
    </main>
  )
}
