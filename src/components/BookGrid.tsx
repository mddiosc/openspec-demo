import type { z } from 'zod'
import type { schemas } from '../api/client'
import { BookCard } from './BookCard'
import styles from './BookGrid.module.css'

type SearchDoc = z.infer<typeof schemas.SearchDoc>

interface BookGridProps {
  docs: SearchDoc[]
}

export function BookGrid({ docs }: BookGridProps) {
  return (
    <ul className={styles.grid} aria-label="Search results">
      {docs.map((book) => (
        <li key={book.key}>
          <BookCard book={book} />
        </li>
      ))}
    </ul>
  )
}
