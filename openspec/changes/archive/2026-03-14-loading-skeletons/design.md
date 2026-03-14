## Context

The app currently uses conditional rendering like `{isLoading && <p>Loading...</p>}`. This causes the page content to disappear and reappear abruptly. We have four main types of content: search/subject grids (BookCards), book details, and author details. Each needs a matching skeleton shape.

## Goals / Non-Goals

**Goals:**
- Generic `Skeleton` component with variants for common shapes
- Specific `BookCardSkeleton` matching `BookCard.tsx` layout exactly
- Integration in all page components to handle initial loading states
- Pulse animation via CSS `@keyframes`
- No layout shift — skeletons must have same dimensions as the real components

**Non-Goals:**
- Skeleton for "Load more" next page (spinner or button text change is sufficient)
- Content-specific skeletons (e.g. varying number of lines based on real bio length — use fixed number of lines)
- Integration with suspense (deferred to future React optimization)

## Decisions

### 1. CSS-only Skeleton Pulse Animation

**Decision**: Use a single `@keyframes pulse` in `Skeleton.module.css` that varies opacity.

**Rationale**: CSS animations are high-performance and requires zero JavaScript logic. Minimal overhead.

---

### 2. `BookCardSkeleton` Grid size

**Decision**: In `SearchPage` and `SubjectBrowsePage`, render a fixed number of 10 `BookCardSkeleton` items while loading.

**Rationale**: 10 items fill most screen heights without overwhelming the DOM. Matches the grid look-and-feel immediately.

---

### 3. Component-based Skeleton Composition

**Decision**: `BookCardSkeleton` will be a separate component. Page-specific skeletons (Detail pages) will be composed directly in the page files or as local components within those files.

**Rationale**: `BookCardSkeleton` is reused across 2-3 pages. Detail page layouts are unique to those pages, so keeping them local reduces file clutter unless they need to be shared.

## Risks / Trade-offs

- **Matching CSS dimensions**: Skeletons must exactly match real component margins/paddings/heights. Any deviation causes a "blink" when data arrives. Mitigation: use shared CSS variables or careful manual matching.
- **Accessibility**: Skeletons should be marked with `aria-hidden="true"` or `aria-busy="true"` so screen readers don't try to read them as empty content.
