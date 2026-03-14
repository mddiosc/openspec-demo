## 1. ErrorBoundary component

- [x] 1.1 Create `src/components/ErrorBoundary.tsx` — class component with `state = { hasError, error }`, `getDerivedStateFromError`, `componentDidCatch` (console.error), and default fallback UI with "Try again" button and "← Back to search" link
- [x] 1.2 Create `src/components/ErrorBoundary.module.css` — centered fallback layout

## 2. NotFoundPage

- [x] 2.1 Create `src/pages/NotFoundPage.tsx` — "Page not found" heading + link to `/`
- [x] 2.2 Create `src/pages/NotFoundPage.module.css`

## 3. Wire up in App.tsx and main.tsx

- [x] 3.1 Wrap each route element in `App.tsx` with `<ErrorBoundary>` using `key` equal to the route path
- [x] 3.2 Add `path="*"` route → `<NotFoundPage>` in `App.tsx`
- [x] 3.3 Wrap app root in `main.tsx` with a global `<ErrorBoundary>`

## 4. Tests

- [x] 4.1 Add test to `tests/book-search.spec.ts` — navigate to unknown URL, verify Not Found page is shown
- [x] 4.2 Create `tests/error-boundary.spec.ts` — verify 404 page content and back link

## 5. Verification

- [ ] 5.1 Run `npm run build` — zero TypeScript errors
- [ ] 5.2 Navigate to `/unknown-route` — verify Not Found page renders
- [ ] 5.3 Run `npm run test:e2e` — all tests pass
