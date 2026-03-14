import { Link } from 'react-router-dom'
import type { z } from 'zod'
import type { schemas } from '../api/client'
import styles from './WorkCard.module.css'

type AuthorWork = z.infer<typeof schemas.AuthorWork>

interface WorkCardProps {
  work: AuthorWork
}

export function WorkCard({ work }: WorkCardProps) {
  const workId = work.key?.split('/').pop()
  const coverUrl =
    work.covers && work.covers.length > 0
      ? `https://covers.openlibrary.org/b/id/${work.covers[0]}-M.jpg`
      : null

  return (
    <Link to={`/works/${workId}`} className={styles.link}>
      <article className={styles.card}>
        <div className={styles.cover}>
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={`Cover of ${work.title}`}
              className={styles.coverImg}
              loading="lazy"
            />
          ) : (
            <div className={styles.coverPlaceholder}>No cover</div>
          )}
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{work.title}</h3>
          {work.first_publish_date && (
            <p className={styles.date}>{work.first_publish_date}</p>
          )}
        </div>
      </article>
    </Link>
  )
}
