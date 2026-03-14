## 1. API Client & Providers

- [x] 1.1 Export `openLibraryClient` singleton from `src/api/client.ts` using `createApiClient("https://openlibrary.org")` with `User-Agent` header
- [x] 1.2 Wrap `src/main.tsx` with `QueryClientProvider` (react-query) and `BrowserRouter` (react-router-dom v7)
- [x] 1.3 Define app routes in `src/App.tsx`: route `/` → `SearchPage`

## 2. Zustand Store

- [x] 2.1 Create `src/store/searchStore.ts` with `useSearchStore` — exposes `query: string` and `setQuery: (q: string) => void`

## 3. Search Hook

- [x] 3.1 Create `src/hooks/useBookSearch.ts` — calls `openLibraryClient.searchBooks` via `useQuery` keyed on `["books", query]`, with `fields` projection and `enabled: query.trim().length > 0`

## 4. Components

- [x] 4.1 Create `src/components/SearchInput.tsx` — controlled input bound to `useSearchStore`, fires `setQuery` on submit (Enter or button click), does not submit empty/whitespace queries
- [x] 4.2 Create `src/components/SearchInput.module.css` — basic input + button layout
- [x] 4.3 Create `src/components/BookCard.tsx` — renders cover image (CDN URL) or placeholder, title, authors (comma-separated), first publish year
- [x] 4.4 Create `src/components/BookCard.module.css` — card layout with fixed cover dimensions
- [x] 4.5 Create `src/components/BookGrid.tsx` — receives `docs` array, maps to `BookCard` list
- [x] 4.6 Create `src/components/BookGrid.module.css` — CSS grid layout

## 5. Search Page

- [x] 5.1 Create `src/pages/SearchPage.tsx` — composes `SearchInput` + `BookGrid`, reads from `useBookSearch`, handles loading / empty / error states
- [x] 5.2 Create `src/pages/SearchPage.module.css` — page container and state message styles

## 6. Cleanup & Verification

- [x] 6.1 Remove Vite scaffold boilerplate from `src/App.tsx`, `src/App.css`, `src/index.css`
- [x] 6.2 Run `npm run build` — zero TypeScript errors
- [x] 6.3 Run `npm run dev` and manually test: search "tolkien", verify cards render with covers, test empty query, test no-results case
