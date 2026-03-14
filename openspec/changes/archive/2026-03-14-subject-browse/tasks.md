## 1. Routing

- [x] 1.1 Add route `/subjects/:subject` → `SubjectBrowsePage` in `src/App.tsx`

## 2. Hook

- [x] 2.1 Create `src/hooks/useSubjectBooks.ts` — calls `openLibraryClient.getSubject` via `useQuery` keyed on `["subject", subject]`, enabled when `subject` is truthy

## 3. SubjectTag — span → Link

- [x] 3.1 Update `src/components/SubjectTag.tsx` — replace `<span>` with `<Link to={/subjects/${encodeURIComponent(subject)}}>` from react-router-dom

## 4. SubjectBrowsePage

- [x] 4.1 Create `src/pages/SubjectBrowsePage.tsx` — reads `:subject` from `useParams`, calls `useSubjectBooks`
- [x] 4.2 Add `subjectBookToSearchDoc` adapter — maps `SubjectBook` (`cover_id`, `authors[]{name}`) to `SearchDoc` shape for `BookCard`
- [x] 4.3 Render heading with decoded subject name and `work_count`
- [x] 4.4 Render `<BookGrid>` with adapted docs
- [x] 4.5 Handle loading, empty, and error states
- [x] 4.6 Back link: `<button onClick={() => navigate(-1)}>← Back</button>`
- [x] 4.7 Create `src/pages/SubjectBrowsePage.module.css`

## 5. Verification

- [x] 5.1 Run `npm run build` — zero TypeScript errors
- [x] 5.2 Open a book detail, click a subject tag — verify navigation to `/subjects/:subject` and grid loads
- [x] 5.3 Run `npm run test:e2e` — existing 22 tests still pass
