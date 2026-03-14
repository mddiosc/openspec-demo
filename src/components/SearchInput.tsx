import { useState, type KeyboardEvent, type FormEvent } from 'react'
import { useSearchStore } from '../store/searchStore'
import styles from './SearchInput.module.css'

export function SearchInput() {
  const { query, setQuery } = useSearchStore()
  const [inputValue, setInputValue] = useState(query)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = inputValue.trim()
    if (trimmed.length > 0) {
      setQuery(trimmed)
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      const trimmed = inputValue.trim()
      if (trimmed.length > 0) {
        setQuery(trimmed)
      }
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} role="search">
      <input
        className={styles.input}
        type="search"
        placeholder="Search books, authors..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Search books"
      />
      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  )
}
