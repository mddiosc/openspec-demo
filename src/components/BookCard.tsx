import { Link } from 'react-router-dom'
import type { z } from 'zod'
import type { schemas } from '../api/client'
import styles from './BookCard.module.css'

type SearchDoc = z.infer<typeof schemas.SearchDoc>

interface BookCardProps {
  book: SearchDoc
}

export function BookCard({ book }: BookCardProps) {
  const authors = book.author_name?.join(', ') ?? 'Unknown author'
  const year = book.first_publish_year ?? null
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null
  const workId = book.key?.split('/').pop()

  return (
    <Link to={`/works/${workId}`} className={styles.link}>
      <article className={styles.card}>
        <div className={styles.cover}>
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={`Cover of ${book.title}`}
              className={styles.coverImg}
              loading="lazy"
            />
          ) : (
            <div className={styles.coverPlaceholder}>No cover available</div>
          )}
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{book.title}</h3>
          <p className={styles.authors}>{authors}</p>
          {year && <p className={styles.year}>{year}</p>}
        </div>
      </article>
    </Link>
  )
}
