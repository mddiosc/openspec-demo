import { useSearchStore, type SortOption } from '../store/searchStore'
import styles from './SortControl.module.css'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'new', label: 'Newest first' },
  { value: 'old', label: 'Oldest first' },
]

export function SortControl() {
  const { sort, setSort } = useSearchStore()

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor="sort-select">
        Sort:
      </label>
      <select
        id="sort-select"
        className={styles.select}
        value={sort}
        onChange={(e) => setSort(e.target.value as SortOption)}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
