import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuthorDetail } from '../hooks/useAuthorDetail'
import { useAuthorWorks } from '../hooks/useAuthorWorks'
import { WorkCard } from '../components/WorkCard'
import styles from './AuthorDetailPage.module.css'

function getBio(bio: string | { type?: string; value?: string } | null | undefined): string | null {
  if (!bio) return null
  if (typeof bio === 'string') return bio
  if (typeof bio === 'object' && 'value' in bio && typeof bio.value === 'string') return bio.value
  return null
}

export default function AuthorDetailPage() {
  const { authorId } = useParams<{ authorId: string }>()
  const navigate = useNavigate()

  const {
    data: author,
    isLoading: authorLoading,
    isError: authorError,
  } = useAuthorDetail(authorId)

  const {
    data: worksData,
    isLoading: worksLoading,
  } = useAuthorWorks(authorId)

  const photoUrl =
    author?.photos && author.photos.length > 0
      ? `https://covers.openlibrary.org/a/id/${author.photos[0]}-L.jpg`
      : null

  const bio = getBio(author?.bio)
  const entries = worksData?.entries ?? []

  if (authorLoading) {
    return (
      <main className={styles.page}>
        <p className={styles.status}>Loading author...</p>
      </main>
    )
  }

  if (authorError || !author) {
    return (
      <main className={styles.page}>
        <p className={styles.error}>Failed to load author.</p>
        <Link to="/" className={styles.backLink}>← Back to search</Link>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <button className={styles.backLink} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className={styles.layout}>
        {/* Photo column */}
        <div className={styles.photoCol}>
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={author.name}
              className={styles.photo}
            />
          ) : (
            <div className={styles.photoPlaceholder}>No photo available</div>
          )}
        </div>

        {/* Info column */}
        <div className={styles.infoCol}>
          <h1 className={styles.name}>{author.name}</h1>

          {(author.birth_date || author.death_date) && (
            <p className={styles.dates}>
              {author.birth_date ?? '?'}
              {author.death_date ? ` — ${author.death_date}` : ''}
            </p>
          )}

          {bio && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Biography</h2>
              <p className={styles.bio}>{bio}</p>
            </section>
          )}
        </div>
      </div>

      {/* Works grid */}
      <section className={styles.worksSection}>
        <h2 className={styles.worksTitle}>Works</h2>
        {worksLoading ? (
          <p className={styles.status}>Loading works...</p>
        ) : entries.length === 0 ? (
          <p className={styles.status}>No works available.</p>
        ) : (
          <ul className={styles.worksGrid}>
            {entries.map((work) => (
              <li key={work.key}>
                <WorkCard work={work} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
