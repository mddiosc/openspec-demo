import { useFavoritesStore } from '../store/favoritesStore'
import type { z } from 'zod'
import type { schemas } from '../api/client'
import styles from './FavoriteButton.module.css'

type SearchDoc = z.infer<typeof schemas.SearchDoc>

interface FavoriteButtonProps {
  book: SearchDoc
}

export function FavoriteButton({ book }: FavoriteButtonProps) {
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite)
  const isFavorite = useFavoritesStore((s) => s.isFavorite(book.key ?? ''))

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(book)
  }

  return (
    <button
      className={`${styles.button} ${isFavorite ? styles.active : ''}`}
      onClick={handleToggle}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        viewBox="0 0 24 24"
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.icon}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  )
}
