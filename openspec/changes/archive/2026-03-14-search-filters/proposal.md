## Why

Search results are returned by relevance with no way to control ordering. Users looking for the newest editions or oldest historical works have no way to refine results. Adding sort controls gives users immediate, meaningful control over what they see — a standard expectation for any search interface.

## What Changes

- Add a sort control to the search page: `relevance` (default), `new` (newest first), `old` (oldest first)
- Persist the active sort in the Zustand store alongside the query
- Reset to page 1 (clear infinite query cache) when sort changes
- The sort selector is only visible when there are results

## Capabilities

### New Capabilities

- `search-filters`: Sort control for search results (relevance / newest / oldest), persisted in global store, resets pagination on change

### Modified Capabilities

- `book-search`: Search now accepts a `sort` parameter in addition to `query`. The results header area includes the sort control when results are present.

## Impact

- **Modified files**: `src/store/searchStore.ts` (add `sort` state), `src/hooks/useBookSearch.ts` (pass `sort` param), `src/pages/SearchPage.tsx` (render sort control)
- **New files**: `src/components/SortControl.tsx`, `src/components/SortControl.module.css`
- **No new dependencies** — Open Library `sort` param is already in the generated client schema
