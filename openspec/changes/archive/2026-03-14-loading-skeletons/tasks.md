## 1. Base Skeleton component

- [x] 1.1 Create `src/components/Skeleton.tsx` — reusable component with `width`, `height`, `variant` ("rect" | "circle" | "text") props
- [x] 1.2 Create `src/components/Skeleton.module.css` — pulse animation and shape styles

## 2. Specialized Skeletons

- [x] 2.1 Create `src/components/BookCardSkeleton.tsx` — composes `Skeleton` to mimic `BookCard` (cover + title line + author line)
- [x] 2.2 Create `src/components/BookCardSkeleton.module.css` — grid-compatible layout

## 3. Page Integration

- [x] 3.1 Update `src/pages/SearchPage.tsx` — replace `Searching...` text with 10 `BookCardSkeleton` items in a grid
- [x] 3.2 Update `src/pages/SubjectBrowsePage.tsx` — replace `Loading...` text with 10 `BookCardSkeleton` items in a grid
- [x] 3.3 Update `src/pages/BookDetailPage.tsx` — replace `Loading...` text with a layout-matching skeleton (Cover + lines)
- [x] 3.4 Update `src/pages/AuthorDetailPage.tsx` — replace `Loading author...` and `Loading works...` with structured skeletons

## 4. Tests

- [x] 4.1 Update `tests/helpers/mockApi.ts` to add an artificial delay to some mocked responses (e.g. 500ms) to allow testing skeletons
- [x] 4.2 Add test to `tests/book-search.spec.ts` — verify skeletons are visible before data arrives

## 5. Verification

- [ ] 5.1 Run `npm run build` — zero TypeScript errors
- [ ] 5.2 Manual verification on Search, Detail, and Author pages — ensure skeletons look correct and pulse
- [ ] 5.3 Run `npm run test:e2e` — ensure all tests pass
