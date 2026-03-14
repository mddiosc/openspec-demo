## Why

The app has no entry point for users. A book search feature is the core interaction of the Open Library Explorer — without it, users have no way to discover books. This is the foundational feature that makes the app usable.

## What Changes

- Add a `SearchPage` as the default route (`/`) with a search input and results grid
- Integrate the Open Library search API (`GET /search.json`) through the generated Zodios client
- Display book cards with cover image, title, author(s), and first publish year
- Manage the active search query in a Zustand store so state persists across navigation
- Handle loading, empty, and error states for the search results

## Capabilities

### New Capabilities

- `book-search`: Full-text search of books via Open Library API, displaying paginated results in a responsive grid with cover images, title, authors, and year

### Modified Capabilities

_(none — this is a greenfield feature)_

## Impact

- **New files**: `src/pages/SearchPage.tsx`, `src/components/BookCard.tsx`, `src/components/SearchInput.tsx`, `src/components/BookGrid.tsx`, `src/hooks/useBookSearch.ts`, `src/store/searchStore.ts`
- **Modified files**: `src/main.tsx` (add QueryClient provider + Router), `src/App.tsx` (define routes)
- **API**: Uses `searchBooks` endpoint from `src/api/client.ts` (already generated)
- **Dependencies**: `@tanstack/react-query`, `zustand`, `@zodios/core` (all already installed)
