## 1. Hook — migrate to useInfiniteQuery

- [x] 1.1 Rewrite `src/hooks/useBookSearch.ts` using `useInfiniteQuery` — `initialPageParam: 0`, `getNextPageParam: (lastPage) => lastPage.start + lastPage.docs.length < lastPage.numFound ? lastPage.start + lastPage.docs.length : undefined`
- [x] 1.2 Ensure `queryFn` receives `pageParam` and passes it as `offset` to `searchBooks`

## 2. Load More Button component

- [x] 2.1 Create `src/components/LoadMoreButton.tsx` — receives `onClick`, `isLoading`, `hasNextPage` props; renders button or nothing; shows "Loading…" state
- [x] 2.2 Create `src/components/LoadMoreButton.module.css` — centered button with loading state styles

## 3. SearchPage — wire infinite query

- [x] 3.1 Update `src/pages/SearchPage.tsx` to destructure `data`, `isFetchingNextPage`, `hasNextPage`, `fetchNextPage`, `isError` from `useBookSearch`
- [x] 3.2 Flatten pages: `const docs = data?.pages.flatMap(p => p.docs) ?? []`
- [x] 3.3 Update results counter to show "Showing X of Y results" using `docs.length` and `data.pages[0].numFound`
- [x] 3.4 Render `<LoadMoreButton>` below `<BookGrid>` passing `fetchNextPage`, `isFetchingNextPage`, `hasNextPage`
- [x] 3.5 Show error message near button when `isError` after initial load (use `data` existing + error state)

## 4. Verification

- [x] 4.1 Run `npm run build` — zero TypeScript errors
- [x] 4.2 Run `npm run dev`, search "tolkien", verify 20 results shown with counter "Showing 20 of 2,115"
- [x] 4.3 Click "Load more" — verify 20 more results appended, counter updates to "Showing 40 of 2,115"
- [x] 4.4 Verify button disappears when all results loaded (search a term with < 20 results, e.g. "zork adventure game book")
