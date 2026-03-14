import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSubjectBooks } from '../hooks/useSubjectBooks'
import { BookGrid } from '../components/BookGrid'
import { BookCardSkeleton } from '../components/BookCardSkeleton'
import type { z } from 'zod'
import type { schemas } from '../api/client'
import styles from './SubjectBrowsePage.module.css'

type SubjectBook = z.infer<typeof schemas.SubjectBook>
type SearchDoc = z.infer<typeof schemas.SearchDoc>

function subjectBookToSearchDoc(book: SubjectBook): SearchDoc {
  return {
    key: book.key,
    title: book.title,
    author_name: book.authors?.map((a) => a.name ?? '').filter(Boolean),
    cover_i: book.cover_id ?? undefined,
    first_publish_year: book.first_publish_year ?? undefined,
  }
}

export default function SubjectBrowsePage() {
  const { subject } = useParams<{ subject: string }>()
  const navigate = useNavigate()
  const decodedSubject = subject ? decodeURIComponent(subject) : ''

  const { data, isLoading, isError } = useSubjectBooks(decodedSubject)

  const docs = (data?.works ?? []).map(subjectBookToSearchDoc)

  if (isError) {
    return (
      <main className={styles.page}>
        <p className={styles.error}>Failed to load subject books.</p>
        <Link to="/" className={styles.backLink}>← Back to search</Link>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <button className={styles.backLink} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <header className={styles.header}>
        <h1 className={styles.title}>{data?.name ?? decodedSubject}</h1>
        {isLoading ? (
          <div className={styles.countSkeleton} />
        ) : data?.work_count !== undefined ? (
          <p className={styles.count}>
            {data.work_count.toLocaleString()} works — showing {docs.length}
          </p>
        ) : null}
      </header>

      {isLoading ? (
        <div className={styles.skeletonGrid} aria-busy="true">
          {Array.from({ length: 10 }).map((_, i) => (
            <BookCardSkeleton key={i} />
          ))}
        </div>
      ) : docs.length === 0 ? (
        <p className={styles.status}>No books found for this subject.</p>
      ) : (
        <BookGrid docs={docs} />
      )}
    </main>
  )
}
