import { useSearchStore } from '../store/searchStore'
import { useBookSearch } from '../hooks/useBookSearch'
import { SearchInput } from '../components/SearchInput'
import { BookGrid } from '../components/BookGrid'
import { LoadMoreButton } from '../components/LoadMoreButton'
import { SortControl } from '../components/SortControl'
import { BookCardSkeleton } from '../components/BookCardSkeleton'
import styles from './SearchPage.module.css'

export default function SearchPage() {
  const query = useSearchStore((s) => s.query)
  const sort = useSearchStore((s) => s.sort)
  const {
    data,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useBookSearch(query, sort)

  const docs = data?.pages.flatMap((p) => p.docs) ?? []
  const totalFound = data?.pages[0]?.numFound ?? 0

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Open Library Explorer</h1>
        <SearchInput />
      </header>

      <section className={styles.results}>
        {isLoading && (
          <div className={styles.skeletonGrid} aria-busy="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <BookCardSkeleton key={i} />
            ))}
          </div>
        )}

        {isError && !data && (
          <p className={styles.error}>
            Something went wrong:{' '}
            {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        )}

        {!isLoading && !isError && data && docs.length === 0 && (
          <p className={styles.status}>
            No books found for &ldquo;{query}&rdquo;
          </p>
        )}

        {docs.length > 0 && (
          <>
            <div className={styles.resultsHeader}>
              <p className={styles.count}>
                Showing {docs.length.toLocaleString()} of {totalFound.toLocaleString()} results
              </p>
              <SortControl />
            </div>
            <BookGrid docs={docs} />

            {isError && data && (
              <p className={styles.error}>
                Failed to load more results. Please try again.
              </p>
            )}

            <LoadMoreButton
              onClick={() => fetchNextPage()}
              isLoading={isFetchingNextPage}
              hasNextPage={hasNextPage}
            />
          </>
        )}

        {!query && !isLoading && (
          <p className={styles.hint}>
            Type a title, author, or topic and press Search.
          </p>
        )}
      </section>
    </main>
  )
}
