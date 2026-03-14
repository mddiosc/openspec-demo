import { useQuery } from '@tanstack/react-query'
import { openLibraryClient } from '../api/client'

export function useWorkDetail(workId: string | undefined) {
  return useQuery({
    queryKey: ['work', workId],
    queryFn: () =>
      openLibraryClient.getWork({
        params: { workId: `${workId}.json` },
      }),
    enabled: Boolean(workId),
    staleTime: 1000 * 60 * 10,
  })
}
