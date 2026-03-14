## Why

The book detail page shows subjects as tags but they are inert — clicking "Fantasy" does nothing. Making subjects clickable closes a key discovery loop: users can explore books by topic directly from a work they already found interesting. The `getSubject` endpoint is already in the generated client and `SubjectTag` only needs to become a `<Link>`.

## What Changes

- Add a `SubjectBrowsePage` at `/subjects/:subject` that fetches books by topic via `GET /subjects/{subject}.json`
- Make `SubjectTag` components in `BookDetailPage` clickable links to `/subjects/:subject`
- Display subject books in a grid reusing `BookCard` — subjects API returns `cover_id` and `authors` compatible with the card
- Show subject name as page heading and total work count
- Link each book card to `/works/:workId` (same as search results)

## Capabilities

### New Capabilities

- `subject-browse`: Dedicated page for browsing books by subject at `/subjects/:subject`, showing a grid of works from the Open Library subjects API

### Modified Capabilities

- `book-detail`: `SubjectTag` becomes a `<Link>` to `/subjects/:subject` (behavior change — tags were previously inert `<span>` elements)

## Impact

- **New files**: `src/pages/SubjectBrowsePage.tsx`, `src/pages/SubjectBrowsePage.module.css`, `src/hooks/useSubjectBooks.ts`
- **Modified files**: `src/components/SubjectTag.tsx` (span → Link), `src/App.tsx` (add route), `src/api/client.ts` (subject path fix if needed)
- **No new dependencies** — `getSubject` endpoint already generated, `BookCard` reusable as-is
