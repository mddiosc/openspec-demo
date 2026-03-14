import { useQuery } from '@tanstack/react-query'
import { openLibraryClient } from '../api/client'

export function useSubjectBooks(subject: string | undefined) {
  return useQuery({
    queryKey: ['subject', subject],
    queryFn: () =>
      openLibraryClient.getSubject({
        // Open Library subjects API requires lowercase — uppercase causes 301 redirect
        // that browsers block cross-origin. Spaces become underscores automatically.
        params: { subject: `${subject!.toLowerCase()}.json` },
        queries: { limit: 20 },
      }),
    enabled: Boolean(subject),
    staleTime: 1000 * 60 * 10,
  })
}
