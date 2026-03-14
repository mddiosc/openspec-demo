## Context

The app currently relies entirely on remote data with no local persistence beyond react-query's memory cache. The `SearchDoc` shape is used by `BookCard` to display search results. We want to store a collection of these `SearchDoc` objects locally.

## Goals / Non-Goals

**Goals:**
- Persist favorites in `localStorage` across browser sessions.
- Immediate UI updates when toggling favorite status.
- Reusable `FavoriteButton` that works in both grid and detail views.
- Global navigation via a new `Header` component.
- `FavoritesPage` reusing the `BookGrid` component.

**Non-Goals:**
- Syncing favorites across different browsers/devices.
- Favoriting authors or subjects (books only).
- Organizing favorites into folders or categories.

## Decisions

### 1. Zustand `persist` middleware

**Decision**: Use `zustand/middleware`'s `persist` function to manage the favorites store.

**Rationale**: It handles serializing to/from `localStorage` automatically, including hydration. It's built-in to the library we are already using and requires minimal boilerplate.

---

### 2. Store `SearchDoc` objects, not just IDs

**Decision**: The store will contain an array of `SearchDoc` objects, not just their keys.

**Rationale**: This allows the `FavoritesPage` to render immediately without needing to refetch every favorited book from the API. Since `SearchDoc` is small, this is memory-efficient for hundreds of books.

---

### 3. `FavoriteButton` as a standalone component

**Decision**: A purely visual/logic component that takes a `book: SearchDoc` and handles the interaction with `useFavoritesStore`.

**Rationale**: Decouples the favorite logic from `BookCard` and `BookDetailPage`, making it easier to place anywhere in the UI.

---

### 4. Global `Header` for navigation

**Decision**: Create a `src/components/Header.tsx` and place it at the top of the route tree in `App.tsx`.

**Rationale**: Provides a consistent entry point to the Favorites page. It also makes the app feel more like a real product rather than a set of disconnected pages.

## Risks / Trade-offs

- **LocalStorage quota**: Storing full objects might hit the 5MB limit if a user favorites thousands of books. Mitigation: only store essential fields (`key`, `title`, `author_name`, `cover_i`, `first_publish_year`).
- **Data staleness**: If a book's title or author changes in the Open Library database, the favorite entry will stay with the old data. Mitigation: acceptable for this app; users can remove and re-add if needed.
- **Hydration mismatches**: Since `localStorage` is only available on the client, we must ensure the UI doesn't "flicker" or crash during hydration. Zustand's `persist` handles this well.
