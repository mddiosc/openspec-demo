## 1. Favorites Store

- [x] 1.1 Create `src/store/favoritesStore.ts` — using Zustand `persist` middleware, store an array of `SearchDoc` items, provide `toggleFavorite` and `isFavorite` actions

## 2. Shared Components

- [x] 2.1 Create `src/components/FavoriteButton.tsx` — toggle button with heart icon (filled/outline), accepts `book: SearchDoc`
- [x] 2.2 Create `src/components/FavoriteButton.module.css` — styling for the toggle button
- [x] 2.3 Create `src/components/Header.tsx` — global navigation with links to "Search" and "Favorites"
- [x] 2.4 Create `src/components/Header.module.css` — header layout and active link styles

## 3. Pages

- [x] 3.1 Create `src/pages/FavoritesPage.tsx` — reads from `useFavoritesStore`, renders `BookGrid` with saved books, handles empty state
- [x] 3.2 Create `src/pages/FavoritesPage.module.css` — page container styles

## 4. Integration

- [x] 4.1 Update `src/App.tsx` — add `Header` above the `Routes`, add `/favorites` route
- [x] 4.2 Update `src/components/BookCard.tsx` — add `FavoriteButton` in the corner of the card
- [x] 4.3 Update `src/pages/BookDetailPage.tsx` — add `FavoriteButton` next to the title (will need a `workToSearchDoc` adapter)

## 5. Verification

- [ ] 5.1 Run `npm run build` — zero TypeScript errors
- [ ] 5.2 Manual test: favorite a book in search, verify it appears in Favorites page, reload page and check persistence
- [ ] 5.3 Create `tests/favorites.spec.ts` — e2e tests for toggling and persistence
- [ ] 5.4 Run `npm run test:e2e` — all tests pass
