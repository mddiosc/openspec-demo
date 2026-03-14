import { useQuery } from '@tanstack/react-query'
import { openLibraryClient } from '../api/client'

export function useAuthorWorks(authorId: string | undefined) {
  return useQuery({
    queryKey: ['authorWorks', authorId],
    queryFn: () =>
      openLibraryClient.getAuthorWorks({
        params: { authorId: `${authorId}` },
        queries: { limit: 50 },
      }),
    enabled: Boolean(authorId),
    staleTime: 1000 * 60 * 10,
  })
}
