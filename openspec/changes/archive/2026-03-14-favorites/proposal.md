## Why

Users discover many interesting books while browsing but have no way to save them for later. A "Favorites" feature allows users to curate their own list of books, making the app more personal and useful. Storing this list in `localStorage` provides persistence without requiring a backend or user accounts.

## What Changes

- Create `useFavoritesStore` using Zustand with `persist` middleware for automatic `localStorage` synchronization.
- Implement a `FavoriteButton` component (heart icon) that toggles a book's presence in the favorites list.
- Add `FavoriteButton` to `BookCard` (visible on hover or always) and `BookDetailPage`.
- Create a `FavoritesPage` at `/favorites` that displays the list of saved books in a grid.
- Introduce a `Header` component shared across all pages to provide navigation between "Home" and "Favorites".
- Show a "empty state" message on the Favorites page when no books are saved.

## Capabilities

### New Capabilities

- `favorites`: Persistent local collection of books that users can curate by toggling a favorite status on any book card or detail page.

### Modified Capabilities

- `book-search`: `BookCard` now includes a `FavoriteButton`.
- `book-detail`: `BookDetailPage` now includes a `FavoriteButton` next to the title.

## Impact

- **New files**: `src/store/favoritesStore.ts`, `src/components/FavoriteButton.tsx`, `src/components/FavoriteButton.module.css`, `src/pages/FavoritesPage.tsx`, `src/pages/FavoritesPage.module.css`, `src/components/Header.tsx`, `src/components/Header.module.css`
- **Modified files**: `src/components/BookCard.tsx`, `src/pages/BookDetailPage.tsx`, `src/App.tsx`
- **Dependencies**: None (using existing Zustand)
