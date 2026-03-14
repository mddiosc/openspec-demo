## Why

The search page is hardcoded to 20 results. Open Library often returns thousands of matches (e.g. "tolkien" → 2,115), but users can only see the first 20. A "Load more" pattern lets users progressively fetch more results without losing context or navigating away.

## What Changes

- Replace the fixed `limit: 20` in `useBookSearch` with infinite query support via `useInfiniteQuery`
- Add a "Load more" button below the results grid that fetches the next page
- Show total result count and how many are currently displayed
- Disable / hide "Load more" when all results have been fetched
- Show a loading indicator on the button while the next page is fetching

## Capabilities

### New Capabilities

- `pagination`: Progressive loading of search results via a "Load more" button, using react-query's `useInfiniteQuery` and Open Library's `offset` parameter

### Modified Capabilities

- `book-search`: The results count display now includes how many are loaded vs total (e.g. "Showing 40 of 2,115 results"). The "Load more" button becomes part of the search results view.

## Impact

- **Modified files**: `src/hooks/useBookSearch.ts` (replace `useQuery` with `useInfiniteQuery`), `src/pages/SearchPage.tsx` (flatten pages, add Load more button), `src/components/BookGrid.tsx` (accept flattened docs)
- **No new dependencies** — `useInfiniteQuery` is already part of `@tanstack/react-query` v5
- **No API changes** — Open Library `offset` param is already in the generated client
