## Why

The current loading state is a plain text "Loading..." or "Searching...". This causes a jarring layout shift when data arrives and provides poor visual feedback. Loading skeletons (ghost elements that mimic the shape of the content) provide a smoother perceived experience by maintaining the layout during fetch and signaling exactly what type of content is coming.

## What Changes

- Create a reusable `Skeleton` component for various shapes (rectangle, circle, text line)
- Implement `BookCardSkeleton` to mimic the grid cards on Search and Subject pages
- Implement `BookDetailSkeleton` and `AuthorDetailSkeleton` for the detail pages
- Replace all "Loading..." text status indicators with these skeletons
- Ensure skeletons use a subtle animation (pulse) for better feedback

## Capabilities

### New Capabilities

- `loading-skeletons`: Visual placeholder system that maintains layout during asynchronous data fetching across all pages

### Modified Capabilities

- `book-search`: Results grid displays `BookCardSkeleton` while initial fetch is in progress
- `book-detail`: Detail page displays `BookDetailSkeleton` and `AuthorSkeleton` while fetching
- `author-detail`: Author page displays `AuthorDetailSkeleton` and works grid skeletons while fetching
- `subject-browse`: Subject page displays grid skeletons while fetching

## Impact

- **New files**: `src/components/Skeleton.tsx`, `src/components/Skeleton.module.css`, `src/components/BookCardSkeleton.tsx`
- **Modified files**: `src/pages/SearchPage.tsx`, `src/pages/BookDetailPage.tsx`, `src/pages/AuthorDetailPage.tsx`, `src/pages/SubjectBrowsePage.tsx`
- **No new dependencies** — CSS animations and basic React components only
