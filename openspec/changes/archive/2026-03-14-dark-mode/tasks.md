## 1. Theme Store

- [x] 1.1 Create `src/store/themeStore.ts` — using Zustand `persist`, store `theme: 'light' | 'dark'`, provide `toggleTheme` action. initialize with system preference if no stored value.

## 2. Global Styles & Variables

- [x] 2.1 Update `src/index.css` — define root CSS variables for:
  - `--bg-primary`
  - `--bg-secondary`
  - `--text-primary`
  - `--text-secondary`
  - `--text-muted`
  - `--border-color`
  - `--accent-color`
  - `--accent-hover`
- [x] 2.2 Add `[data-theme='dark']` overrides in `src/index.css` for these variables.
- [x] 2.3 Add global transition for background and color properties.

## 3. Component Migration (CSS Variables)

- [x] 3.1 Update `src/components/Header.module.css` to use variables.
- [x] 3.2 Update `src/components/BookCard.module.css` to use variables.
- [x] 3.3 Update `src/components/SearchInput.module.css` to use variables.
- [x] 3.4 Update `src/components/SortControl.module.css` to use variables.
- [x] 3.5 Update `src/components/LoadMoreButton.module.css` to use variables.
- [x] 3.6 Update `src/components/FavoriteButton.module.css` to use variables.
- [x] 3.7 Update `src/pages/SearchPage.module.css` to use variables.
- [x] 3.8 Update `src/pages/BookDetailPage.module.css` to use variables.
- [x] 3.9 Update `src/pages/AuthorDetailPage.module.css` to use variables.
- [x] 3.10 Update `src/pages/SubjectBrowsePage.module.css` to use variables.
- [x] 3.11 Update `src/pages/FavoritesPage.module.css` to use variables.
- [x] 3.12 Update `src/pages/NotFoundPage.module.css` to use variables.
- [x] 3.13 Update `src/components/ErrorBoundary.module.css` to use variables.
- [x] 3.14 Update `src/components/Skeleton.module.css` to use variables.

## 4. UI Components

- [x] 4.1 Create `src/components/ThemeToggle.tsx` — button with icon switching between Sun/Moon.
- [x] 4.2 Create `src/components/ThemeToggle.module.css`.
- [x] 4.3 Add `ThemeToggle` to `Header.tsx`.

## 5. App Level Logic

- [x] 5.1 Update `src/App.tsx` (or `main.tsx`) with a `useEffect` that updates `document.documentElement.setAttribute('data-theme', theme)`.

## 6. Verification

- [x] 6.1 Run `npm run build` — zero TypeScript errors.
- [x] 6.2 Manual test: toggle theme, verify all pages and components adapt correctly.
- [x] 6.3 Create `tests/dark-mode.spec.ts` — e2e test for theme toggle and persistence.
- [x] 6.4 Run `npm run test:e2e` — all tests pass.
