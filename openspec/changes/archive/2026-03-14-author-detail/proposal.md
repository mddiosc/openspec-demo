## Why

The book detail page shows the author's name and bio, but the author is a dead end — there's no way to explore their other works. A dedicated author page closes this gap, letting users navigate from a book to its author and discover the full bibliography. The `getAuthor` endpoint is already in the generated client and `useAuthorDetail` hook already exists.

## What Changes

- Add an `AuthorDetailPage` at `/authors/:authorId` with photo, bio, birth/death dates, and a list of works
- Make the author name on `BookDetailPage` a clickable link to `/authors/:authorId`
- Fetch the author's works via a new `useAuthorWorks` hook (`GET /authors/{id}/works.json`)
- Display works as a grid of cards (reusing `BookCard` where possible, falling back to a simpler `WorkCard` for works without cover_i)

## Capabilities

### New Capabilities

- `author-detail`: Dedicated page for an author — photo, bio, dates, and a grid of their works — accessible at `/authors/:authorId`

### Modified Capabilities

- `book-detail`: Author name becomes a `<Link>` to `/authors/:authorId` (behavior change — was plain text)

## Impact

- **New files**: `src/pages/AuthorDetailPage.tsx`, `src/pages/AuthorDetailPage.module.css`, `src/hooks/useAuthorWorks.ts`, `src/components/WorkCard.tsx`, `src/components/WorkCard.module.css`
- **Modified files**: `src/pages/BookDetailPage.tsx` (author name → Link), `src/App.tsx` (add `/authors/:authorId` route), `src/api/client.ts` (add `getAuthorWorks` endpoint), `src/api/openapi.yaml` (add author works endpoint)
- **No new npm dependencies**
