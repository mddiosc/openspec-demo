## Context

The app is a fresh Vite + React 19 scaffold with no pages or routing yet. The generated Zodios client (`src/api/client.ts`) exposes a `searchBooks` endpoint typed against the Open Library OpenAPI spec. All dependencies (@tanstack/react-query, zustand, react-router-dom v7, @zodios/core) are installed but not wired up.

## Goals / Non-Goals

**Goals:**
- Wire up `QueryClientProvider` and `BrowserRouter` at the app root
- Implement a `SearchPage` at `/` with a controlled search input and results grid
- Fetch results via react-query using the generated Zodios client
- Persist the active query in a Zustand store so it survives in-app navigation
- Show book covers via the Open Library Covers CDN (`covers.openlibrary.org`)
- Handle loading, empty-state, and error-state UI

**Non-Goals:**
- Pagination (deferred to a future change)
- Debounced auto-search (user submits explicitly via Enter or button)
- Sorting or filtering controls
- Offline support or service workers

## Decisions

### 1. Zodios client instantiation — singleton at module level

**Decision**: Create `src/api/client.ts` export `openLibraryClient` as a singleton `createApiClient("https://openlibrary.org")`.

**Rationale**: Zodios clients are stateless and cheap to create. A module-level singleton avoids React context overhead and keeps hooks simple (`openLibraryClient.searchBooks(...)`). No need for dependency injection at this scale.

**Alternative considered**: React Context — rejected as unnecessary indirection for a single API.

---

### 2. Search state in Zustand, server state in react-query

**Decision**: The raw search string lives in a Zustand store (`useSearchStore`). The actual API call and its loading/error/data states live in react-query (`useQuery`), keyed by `["books", query]`.

**Rationale**: Separating client state (what the user typed) from server state (API response) follows react-query's intended model. Zustand makes the query string available to any component without prop-drilling, and react-query handles caching, background refetch, and deduplication automatically.

**Alternative considered**: All state in `useState` local to `SearchPage` — rejected because the query would be lost on navigation.

---

### 3. Search on submit, not on keystroke

**Decision**: The `useBookSearch` hook only fires when the user submits (Enter key or search button click), not on every keystroke.

**Rationale**: Open Library rate-limits at 1 req/s without a `User-Agent` header. Triggering on keystroke would require debouncing and still risks hitting rate limits during fast typing. Submit-on-enter is simpler and more predictable.

---

### 4. Fields projection on the search endpoint

**Decision**: Always request `fields=key,title,author_name,cover_i,first_publish_year,edition_count` to limit response payload.

**Rationale**: The default search response includes 50+ fields per doc. Projecting only what `BookCard` needs keeps payloads small (~10x reduction) and avoids unnecessary parsing.

---

### 5. CSS Modules — no utility framework

**Decision**: Each component gets its own `.module.css` file. No Tailwind, no CSS-in-JS.

**Rationale**: Per project conventions. Keeps the demo focused on architecture, not styling tools.

## Risks / Trade-offs

- **Rate limiting** → Using `User-Agent: OpenLibraryExplorer (demo@example.com)` header on every request raises the limit to 3 req/s. react-query's built-in deduplication prevents duplicate in-flight requests.
- **No cover fallback** → Some books have no `cover_i`. BookCard will render a placeholder div with text when `cover_i` is null/undefined.
- **Zodios + React 19 compatibility** → Zodios v10 uses axios under the hood and is not React-aware; it works as a plain async client called inside react-query's `queryFn`. No known issues.
- **`openapi-zod-client` codegen requires tslib workaround** → `tslib` must be manually placed in `node_modules/tanu/node_modules/`. Documented in project README. Regenerate with `npm run codegen` (script to be added).
