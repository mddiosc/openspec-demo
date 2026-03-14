## Context

`useBookSearch` currently passes `q`, `fields`, `limit`, and `offset` to the Open Library search endpoint. The generated client already includes `sort` as an optional query parameter with enum `["relevance", "new", "old", "random"]`. The Zustand store currently holds only `query: string`. `useInfiniteQuery` is keyed on `["books", query]` — changing sort must bust this cache to trigger a fresh first page.

## Goals / Non-Goals

**Goals:**
- Add `sort: "relevance" | "new" | "old"` to `useSearchStore` (default: `"relevance"`)
- Pass `sort` to `searchBooks` in `useBookSearch`
- Include `sort` in the `useInfiniteQuery` query key so changing sort triggers a new query
- Add `SortControl` component — a `<select>` with three options
- Render `SortControl` in `SearchPage` next to the results counter, only when results exist
- Changing sort resets pagination automatically (new query key = fresh `useInfiniteQuery`)

**Non-Goals:**
- Year range filter (deferred — requires client-side filtering, API doesn't support it directly)
- `random` sort option (not useful for a search UI)
- Persisting sort to URL params or localStorage

## Decisions

### 1. Sort in query key — not a separate reset mechanism

**Decision**: Query key becomes `["books", query, sort]`. When sort changes, react-query treats it as a new query and starts from page 1 automatically.

**Rationale**: This is the idiomatic react-query pattern. No need to manually call `queryClient.resetQueries()` or track a `page` counter. The previous sort's pages stay in cache — if the user switches back, results are served instantly.

**Alternative considered**: Keep key as `["books", query]` and call `fetchNextPage` with a reset — rejected because it fights react-query's cache model and is error-prone.

---

### 2. `SortControl` as a plain `<select>` — no custom dropdown

**Decision**: Native `<select>` element styled with CSS. Three options: Relevance, Newest first, Oldest first.

**Rationale**: Per project conventions (no UI libraries, plain CSS). Native `<select>` is accessible by default. Custom dropdowns add complexity with no benefit at this scale.

---

### 3. Sort default is `"relevance"` — sent as `undefined` to the API

**Decision**: When sort is `"relevance"`, omit the `sort` param from the API call (pass `undefined`). Open Library's default ordering is relevance, so this avoids unnecessary query params.

**Rationale**: Cleaner URLs in network tab, and avoids any edge case where explicitly passing `sort=relevance` might behave differently from the API's default.

## Risks / Trade-offs

- **Cache growth**: Each `(query, sort)` combination is cached separately. With 3 sort options and N queries, cache could grow. Acceptable — react-query's default `gcTime` (5 min) limits this.
- **Sort + pagination interaction**: Changing sort resets to page 1 (correct). If user loads 3 pages, switches sort, then switches back — the 3 pages are served from cache instantly without refetch. This is desirable behavior.
