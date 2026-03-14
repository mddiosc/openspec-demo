import { useQuery } from '@tanstack/react-query'
import { openLibraryClient } from '../api/client'

export function useAuthorDetail(authorId: string | undefined) {
  return useQuery({
    queryKey: ['author', authorId],
    queryFn: () =>
      openLibraryClient.getAuthor({
        params: { authorId: `${authorId}.json` },
      }),
    enabled: Boolean(authorId),
    staleTime: 1000 * 60 * 10,
  })
}
