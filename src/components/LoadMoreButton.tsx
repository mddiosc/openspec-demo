import styles from './LoadMoreButton.module.css'

interface LoadMoreButtonProps {
  onClick: () => void
  isLoading: boolean
  hasNextPage: boolean
}

export function LoadMoreButton({ onClick, isLoading, hasNextPage }: LoadMoreButtonProps) {
  if (!hasNextPage) return null

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Load more'}
      </button>
    </div>
  )
}
