## Context

The app has a working search page (`/`) backed by react-query and a Zodios client. The `getWork` and `getAuthor` endpoints are already in the generated client but unused. `BookCard` renders a static article element with no interactivity. react-router-dom v7 is already wired at the root.

## Goals / Non-Goals

**Goals:**
- Add route `/works/:workId` → `BookDetailPage`
- Fetch work data with `useWorkDetail` hook (react-query + `getWork`)
- Fetch author data with `useAuthorDetail` hook (react-query + `getAuthor`), triggered only when the work response includes an author key
- Display: large cover, title, description, first publish date, subjects as tags, author name + bio
- Make `BookCard` a `<Link>` to `/works/:workId` (extract workId from `book.key`)
- "Back to results" link (`<Link to="/">`) that preserves Zustand query state

**Non-Goals:**
- Multiple authors (show first author only for simplicity)
- Edition listing or reading/borrowing links
- Breadcrumb navigation
- Social sharing

## Decisions

### 1. Two separate queries — work + author — not a single combined fetch

**Decision**: `useWorkDetail` and `useAuthorDetail` are independent hooks. `useAuthorDetail` receives the `authorKey` extracted from the work response and is `enabled` only when that key is available.

**Rationale**: The Open Library API has no combined endpoint. Keeping them separate allows react-query to cache each independently — if the user visits two books by the same author, the second visit hits cache. Waterfall is acceptable here since author data is secondary content.

**Alternative considered**: Fetching author inside `useWorkDetail` with `Promise.all` — rejected because it couples two separate cache entries and makes partial loading states harder to handle.

---

### 2. Extract `workId` from `book.key` on the `BookCard` side

**Decision**: `book.key` is `/works/OL27482W`. `BookCard` extracts the path segment (`OL27482W`) and builds the route `/works/OL27482W`. `BookDetailPage` reads `:workId` from `useParams` and passes it directly to `getWork`.

**Rationale**: Keeps the URL clean and human-readable. The Zodios `getWork` endpoint accepts the bare ID (e.g. `OL27482W`), not the full path. Transformation is co-located with the link, not scattered across the app.

---

### 3. Description can be string or `{ type, value }` object

**Decision**: `BookDetailPage` normalises the description field: if it's a string, use it directly; if it's an object with a `value` field, use `value`; otherwise render nothing.

**Rationale**: The Open Library API returns description in two formats depending on the work. The Zod schema already models this as `z.union([z.string(), TextValue])`. The page handles both without crashing.

---

### 4. Large cover uses `-L` size suffix, not `-M`

**Decision**: Detail page uses `https://covers.openlibrary.org/b/id/{cover_id}-L.jpg` for the hero cover. Search cards keep `-M`.

**Rationale**: `-M` (medium) is ~180px wide — sufficient for grid cards. `-L` (large) is ~400px — appropriate for a detail hero. Using `-L` everywhere would slow down search results unnecessarily.

## Risks / Trade-offs

- **Author waterfall** → Author fetch only starts after work fetch completes. Acceptable UX — author section shows a skeleton/loading state while work content is already visible.
- **Missing description** → Many Open Library works have no description. The page SHALL render gracefully without it (omit the section entirely).
- **Missing cover on detail page** → Show a large styled placeholder div, same pattern as `BookCard`.
- **`workId` extraction fragility** → If `book.key` format changes (unlikely for a stable API), the link breaks silently. Mitigated by keeping the extraction logic in one place (`BookCard`).
