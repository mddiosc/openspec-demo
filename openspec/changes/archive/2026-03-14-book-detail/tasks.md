## 1. Routing

- [x] 1.1 Add route `/works/:workId` → `BookDetailPage` in `src/App.tsx`

## 2. Hooks

- [x] 2.1 Create `src/hooks/useWorkDetail.ts` — calls `openLibraryClient.getWork({ params: { workId } })` via `useQuery` keyed on `["work", workId]`, enabled when `workId` is truthy
- [x] 2.2 Create `src/hooks/useAuthorDetail.ts` — calls `openLibraryClient.getAuthor({ params: { authorId } })` via `useQuery` keyed on `["author", authorId]`, enabled when `authorId` is truthy

## 3. Components

- [x] 3.1 Create `src/components/SubjectTag.tsx` — renders a single subject string as a styled tag element
- [x] 3.2 Create `src/components/SubjectTag.module.css` — pill/badge styles
- [x] 3.3 Update `src/components/BookCard.tsx` — wrap the card content in a `<Link to={/works/${workId}}>` where `workId` is extracted from `book.key.split('/').pop()`

## 4. Book Detail Page

- [x] 4.1 Create `src/pages/BookDetailPage.tsx` — reads `:workId` from `useParams`, calls `useWorkDetail` and `useAuthorDetail`, renders all sections
- [x] 4.2 `BookDetailPage` cover section: large cover image (`-L` suffix) or styled placeholder
- [x] 4.3 `BookDetailPage` description section: normalise `string | { type, value }` — render text or omit section if absent
- [x] 4.4 `BookDetailPage` subjects section: map subjects array to `<SubjectTag>` elements, omit section if empty
- [x] 4.5 `BookDetailPage` author section: show name + bio (if available), show loading indicator while author fetch is in progress
- [x] 4.6 `BookDetailPage` back link: `<Link to="/">← Back to results</Link>`
- [x] 4.7 `BookDetailPage` error state: message + link back to `/` when work fetch fails
- [x] 4.8 Create `src/pages/BookDetailPage.module.css` — two-column layout (cover left, info right), responsive single column below 768px

## 5. Verification

- [x] 5.1 Run `npm run build` — zero TypeScript errors
- [x] 5.2 Run `npm run dev`, search "tolkien", click The Hobbit — verify detail page loads with cover, description, subjects, author
- [x] 5.3 Verify "Back to results" preserves search query and results
