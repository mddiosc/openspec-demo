## Why

The search page shows books in a grid but clicking them does nothing. Users need a dedicated detail page to read the full description, see a larger cover, explore subjects, and learn about the author — the core value of a book discovery app.

## What Changes

- Add a `BookDetailPage` at `/works/:workId` that fetches and displays full work data from the Open Library API
- Make `BookCard` components in the search grid clickable, navigating to the detail page
- Fetch work details (`GET /works/{id}.json`) and author details (`GET /authors/{id}.json`) via react-query
- Display: large cover, title, description, first publish date, subjects (as tags), and author name + bio
- Add a "Back to results" link to return to the search page without losing query state

## Capabilities

### New Capabilities

- `book-detail`: Full detail view for a single book work — cover, description, subjects, author info — accessible via URL `/works/:workId`

### Modified Capabilities

- `book-search`: `BookCard` gains a clickable link to `/works/:workId` (behavior change — cards were previously non-interactive)

## Impact

- **New files**: `src/pages/BookDetailPage.tsx`, `src/pages/BookDetailPage.module.css`, `src/hooks/useWorkDetail.ts`, `src/hooks/useAuthorDetail.ts`, `src/components/SubjectTag.tsx`, `src/components/SubjectTag.module.css`
- **Modified files**: `src/components/BookCard.tsx` (wrap in `<Link>`), `src/App.tsx` (add `/works/:workId` route)
- **API**: Uses `getWork` and `getAuthor` endpoints from `src/api/client.ts` (already generated)
- **No new dependencies** — react-router-dom `Link` and `useParams` cover navigation needs
