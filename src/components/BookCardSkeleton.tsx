import { Skeleton } from './Skeleton'
import styles from './BookCardSkeleton.module.css'

export function BookCardSkeleton() {
  return (
    <article className={styles.card}>
      <div className={styles.cover}>
        <Skeleton variant="rect" height="100%" />
      </div>
      <div className={styles.info}>
        <Skeleton variant="text" width="80%" height="1.1rem" />
        <Skeleton variant="text" width="60%" height="0.9rem" />
        <Skeleton variant="text" width="30%" height="0.8rem" />
      </div>
    </article>
  )
}
