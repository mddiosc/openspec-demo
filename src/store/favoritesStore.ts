import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { z } from 'zod'
import type { schemas } from '../api/client'

type SearchDoc = z.infer<typeof schemas.SearchDoc>

interface FavoritesState {
  favorites: SearchDoc[]
  toggleFavorite: (book: SearchDoc) => void
  isFavorite: (key: string) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (book) => {
        const current = get().favorites
        const exists = current.find((f) => f.key === book.key)
        
        if (exists) {
          set({ favorites: current.filter((f) => f.key !== book.key) })
        } else {
          set({ favorites: [...current, book] })
        }
      },
      isFavorite: (key) => get().favorites.some((f) => f.key === key),
    }),
    {
      name: 'book-explorer-favorites',
    }
  )
)
