import { useInfiniteQuery } from '@tanstack/react-query'
import { openLibraryClient } from '../api/client'
import type { SortOption } from '../store/searchStore'

const FIELDS = 'key,title,author_name,author_key,cover_i,first_publish_year,edition_count'
const PAGE_SIZE = 20

export function useBookSearch(query: string, sort: SortOption) {
  return useInfiniteQuery({
    queryKey: ['books', query, sort],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      openLibraryClient.searchBooks({
        queries: {
          q: query,
          fields: FIELDS,
          limit: PAGE_SIZE,
          offset: pageParam,
          sort: sort === 'relevance' ? undefined : sort,
        },
      }),
    getNextPageParam: (lastPage) => {
      const loaded = lastPage.start + lastPage.docs.length
      return loaded < lastPage.numFound ? loaded : undefined
    },
    enabled: query.trim().length > 0,
    staleTime: 1000 * 60 * 5,
  })
}
