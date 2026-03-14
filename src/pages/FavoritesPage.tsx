import { useFavoritesStore } from '../store/favoritesStore'
import { BookGrid } from '../components/BookGrid'
import styles from './FavoritesPage.module.css'

export default function FavoritesPage() {
  const favorites = useFavoritesStore((s) => s.favorites)

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Your Favorites</h1>
        <p className={styles.count}>
          {favorites.length} {favorites.length === 1 ? 'book' : 'books'} saved
        </p>
      </header>

      {favorites.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>You haven't added any favorites yet.</p>
          <p className={styles.emptySubtext}>
            Search for books and click the heart icon to save them here.
          </p>
        </div>
      ) : (
        <BookGrid docs={favorites} />
      )}
    </main>
  )
}
