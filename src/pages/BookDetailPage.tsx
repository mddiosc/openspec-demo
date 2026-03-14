import { useParams, Link } from 'react-router-dom'
import { useWorkDetail } from '../hooks/useWorkDetail'
import { useAuthorDetail } from '../hooks/useAuthorDetail'
import { SubjectTag } from '../components/SubjectTag'
import styles from './BookDetailPage.module.css'

function getDescription(
  desc: string | { type?: string; value?: string } | null | undefined
): string | null {
  if (!desc) return null
  if (typeof desc === 'string') return desc
  if (typeof desc === 'object' && 'value' in desc && typeof desc.value === 'string') {
    return desc.value
  }
  return null
}

export default function BookDetailPage() {
  const { workId } = useParams<{ workId: string }>()

  const {
    data: work,
    isLoading: workLoading,
    isError: workError,
  } = useWorkDetail(workId)

  // Extract first author key from work response — e.g. "/authors/OL23919A" → "OL23919A"
  const rawAuthorKey = work?.authors?.[0]?.author?.key
  const authorId = rawAuthorKey?.split('/').pop()

  const { data: author, isLoading: authorLoading } = useAuthorDetail(authorId)

  const coverUrl =
    work?.covers && work.covers.length > 0
      ? `https://covers.openlibrary.org/b/id/${work.covers[0]}-L.jpg`
      : null

  const description = getDescription(work?.description)
  const authorBio = getDescription(author?.bio)

  if (workLoading) {
    return (
      <main className={styles.page}>
        <p className={styles.status}>Loading...</p>
      </main>
    )
  }

  if (workError || !work) {
    return (
      <main className={styles.page}>
        <p className={styles.error}>Failed to load book details.</p>
        <Link to="/" className={styles.backLink}>← Back to results</Link>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <Link to="/" className={styles.backLink}>← Back to results</Link>

      <div className={styles.layout}>
        {/* Cover */}
        <div className={styles.coverCol}>
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={`Cover of ${work.title}`}
              className={styles.cover}
            />
          ) : (
            <div className={styles.coverPlaceholder}>No cover available</div>
          )}
        </div>

        {/* Info */}
        <div className={styles.infoCol}>
          <h1 className={styles.title}>{work.title}</h1>

          {/* First publish date */}
          {work.first_publish_date && (
            <p className={styles.publishDate}>
              First published: {work.first_publish_date}
            </p>
          )}

          {/* Author */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Author</h2>
            {authorLoading ? (
              <p className={styles.status}>Loading author...</p>
            ) : author ? (
              <div>
                <Link
                  to={`/authors/${authorId}`}
                  className={styles.authorLink}
                >
                  {author.name}
                </Link>
                {authorBio && (
                  <p className={styles.authorBio}>{authorBio}</p>
                )}
              </div>
            ) : null}
          </section>

          {/* Description */}
          {description && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Description</h2>
              <p className={styles.description}>{description}</p>
            </section>
          )}

          {/* Subjects */}
          {work.subjects && work.subjects.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Subjects</h2>
              <div className={styles.subjects}>
                {work.subjects.slice(0, 20).map((subject) => (
                  <SubjectTag key={subject} subject={subject} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  )
}
