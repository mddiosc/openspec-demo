## 1. API — add author works endpoint

- [x] 1.1 Add `GET /authors/{authorId}/works.json` endpoint to `src/api/openapi.yaml` with `AuthorWorksResponse` schema (`entries` array of `{ key, title, covers?, description? }`)
- [x] 1.2 Regenerate `src/api/client.ts` with `openapi-zod-client` (or add endpoint manually to the endpoints array if codegen fails)

## 2. Hook

- [x] 2.1 Create `src/hooks/useAuthorWorks.ts` — calls `openLibraryClient.getAuthorWorks` via `useQuery` keyed on `["authorWorks", authorId]`, enabled when `authorId` is truthy

## 3. Components

- [x] 3.1 Create `src/components/WorkCard.tsx` — displays cover (`covers[0]` with `-M` suffix) or placeholder, title, first publish date
- [x] 3.2 Create `src/components/WorkCard.module.css` — same card layout as BookCard

## 4. Author Detail Page

- [x] 4.1 Add route `/authors/:authorId` → `AuthorDetailPage` in `src/App.tsx`
- [x] 4.2 Create `src/pages/AuthorDetailPage.tsx` — reads `:authorId` from `useParams`, calls `useAuthorDetail` and `useAuthorWorks`
- [x] 4.3 Author photo section: `https://covers.openlibrary.org/a/id/{photo_id}-L.jpg` or placeholder
- [x] 4.4 Author info section: name, bio (if available), birth/death dates (if available)
- [x] 4.5 Works grid: map `entries` to `<WorkCard>`, show loading state, handle empty
- [x] 4.6 Back link: `<button onClick={() => history.back()}>← Back</button>` using `useNavigate(-1)`
- [x] 4.7 Error state: message + link to `/`
- [x] 4.8 Create `src/pages/AuthorDetailPage.module.css`

## 5. Update BookDetailPage

- [x] 5.1 In `src/pages/BookDetailPage.tsx` extract `authorId` from `rawAuthorKey` and wrap author name in `<Link to={/authors/${authorId}}>`

## 6. Verification

- [x] 6.1 Run `npm run build` — zero TypeScript errors
- [x] 6.2 Search "tolkien", open The Hobbit, click "J.R.R. Tolkien" — verify author page loads with photo, bio, and works grid
- [x] 6.3 Verify "← Back" returns to book detail page
