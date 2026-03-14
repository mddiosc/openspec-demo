import { create } from 'zustand'

type SortOption = 'relevance' | 'new' | 'old'

interface SearchState {
  query: string
  sort: SortOption
  setQuery: (query: string) => void
  setSort: (sort: SortOption) => void
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  sort: 'relevance',
  setQuery: (query) => set({ query }),
  setSort: (sort) => set({ sort }),
}))

export type { SortOption }
