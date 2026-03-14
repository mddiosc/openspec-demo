## Context

`useBookSearch` currently uses `useQuery` with a fixed `limit: 20` and `offset: 0`. `SearchPage` renders the 20 docs directly. react-query v5 ships `useInfiniteQuery` which manages multiple pages of data natively, including loading states per page, cache keying, and a `fetchNextPage` function.

## Goals / Non-Goals

**Goals:**
- Migrate `useBookSearch` from `useQuery` to `useInfiniteQuery`
- Each page fetches 20 results using Open Library's `offset` param (`page * 20`)
- `SearchPage` flattens all pages into a single docs array for `BookGrid`
- "Load more" button calls `fetchNextPage`, disabled while fetching or when no more pages exist
- Display "Showing X of Y results" counter

**Non-Goals:**
- Numbered page navigation (1, 2, 3…) — "Load more" only
- Scroll-triggered infinite scroll (requires IntersectionObserver — deferred)
- Resetting scroll position on new search
- Per-page cache invalidation

## Decisions

### 1. `useInfiniteQuery` with `offset`-based pagination

**Decision**: Use `getNextPageParam` to compute the next `offset` from the last page's `start` + `docs.length`. Stop when `start + docs.length >= numFound`.

**Rationale**: Open Library uses `offset`/`limit` (not cursor-based). `useInfiniteQuery` natively manages an array of pages, each cached under `["books", query]`. Switching from `useQuery` is minimal — same query key, same `queryFn` shape, different hook.

```ts
getNextPageParam: (lastPage) => {
  const loaded = lastPage.start + lastPage.docs.length
  return loaded < lastPage.numFound ? loaded : undefined
}
```

**Alternative considered**: Keep `useQuery` and manage offset in Zustand — rejected because it duplicates what `useInfiniteQuery` does natively and loses per-page caching.

---

### 2. Flatten pages in `SearchPage`, not in the hook

**Decision**: `useBookSearch` returns the raw `InfiniteData<SearchResponse>` object. `SearchPage` flattens with `data.pages.flatMap(p => p.docs)`.

**Rationale**: Keeps the hook generic. If a future consumer needs per-page metadata (e.g. to show "page 2 of 5"), it can access `data.pages` directly without changes to the hook.

---

### 3. "Load more" button — not infinite scroll

**Decision**: Explicit button click triggers `fetchNextPage`. Button shows "Loading…" while `isFetchingNextPage` is true and is hidden when `!hasNextPage`.

**Rationale**: Infinite scroll requires an `IntersectionObserver` and is harder to test. A button is explicit, accessible, and sufficient for this app's scale. Can be upgraded later.

## Risks / Trade-offs

- **Query key collision**: `useInfiniteQuery` and `useQuery` cannot share the same key in the same cache. Since we're replacing `useQuery` entirely, this is not an issue — but it means the initial search cache from `useQuery` is invalidated on upgrade (acceptable, users just re-search).
- **Rate limiting**: Each "Load more" click fires one request. At 1 req/s limit, rapid clicking could get throttled. react-query's built-in deduplication prevents duplicate in-flight requests.
- **Large result sets**: Flattening all pages into one array means the DOM grows unbounded. Acceptable for a demo; virtualization would be needed at scale.
