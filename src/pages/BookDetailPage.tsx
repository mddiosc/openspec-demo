import { useParams, Link } from 'react-router-dom'
import { useWorkDetail } from '../hooks/useWorkDetail'
import { useAuthorDetail } from '../hooks/useAuthorDetail'
import { SubjectTag } from '../components/SubjectTag'
import { Skeleton } from '../components/Skeleton'
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

function BookDetailSkeleton() {
  return (
    <div className={styles.layout} aria-busy="true">
      <div className={styles.coverCol}>
        <Skeleton variant="rect" height="420px" />
      </div>
      <div className={styles.infoCol}>
        <Skeleton variant="text" width="70%" height="2.5rem" className={styles.title} />
        <Skeleton variant="text" width="40%" height="1rem" className={styles.publishDate} />
        
        <div className={styles.section}>
          <Skeleton variant="text" width="80px" height="0.75rem" />
          <Skeleton variant="text" width="150px" height="1.2rem" />
          <Skeleton variant="text" width="100%" height="4rem" />
        </div>

        <div className={styles.section}>
          <Skeleton variant="text" width="100px" height="0.75rem" />
          <Skeleton variant="text" width="100%" height="8rem" />
        </div>
      </div>
    </div>
  )
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

  if (workError) {
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

      {workLoading || !work ? (
        <BookDetailSkeleton />
      ) : (
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
                <div>
                  <Skeleton variant="text" width="150px" height="1.2rem" />
                  <Skeleton variant="text" width="100%" height="3rem" />
                </div>
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
      )}
    </main>
  )
}
