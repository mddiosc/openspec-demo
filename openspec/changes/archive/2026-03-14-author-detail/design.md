## Context

`useAuthorDetail` already exists and fetches `GET /authors/{id}.json`. The author's works require a separate endpoint: `GET /authors/{id}/works.json`, which is not yet in the OpenAPI spec or generated client. `BookDetailPage` renders the author name as plain text with `authorId` available. The photo CDN for authors is `https://covers.openlibrary.org/a/id/{photo_id}-L.jpg`.

## Goals / Non-Goals

**Goals:**
- Add `GET /authors/{id}/works.json` to `openapi.yaml` and regenerate `client.ts`
- Create `useAuthorWorks` hook via `useQuery`
- `AuthorDetailPage` at `/authors/:authorId`: photo, name, bio, dates, works grid
- Make author name in `BookDetailPage` a `<Link to="/authors/:authorId">`
- Extract `authorId` from the raw author key (`/authors/OL23919A` → `OL23919A`) — same pattern as `workId`
- `WorkCard` component for works that may lack `cover_i` — simpler than `BookCard`

**Non-Goals:**
- Pagination of author works (API returns up to 50, sufficient for most authors)
- Author search
- Related authors

## Decisions

### 1. Add author works endpoint to OpenAPI spec and regenerate client

**Decision**: Extend `src/api/openapi.yaml` with `/authors/{authorId}/works.json` → `AuthorWorksResponse` schema, then regenerate `src/api/client.ts` with `openapi-zod-client`.

**Rationale**: Keeps the typed client as the single source of truth for all API calls. Consistent with how `searchBooks`, `getWork`, and `getAuthor` are already handled.

**Alternative considered**: Call `fetch` directly — rejected, breaks the typed client pattern established in the project.

---

### 2. Separate `WorkCard` component — not reusing `BookCard`

**Decision**: Create a minimal `WorkCard` for the author works grid. It receives a work entry from the author works response, which has a different shape than `SearchDoc` (no `cover_i`, uses `covers[0]` instead).

**Rationale**: The author works API returns `{ key, title, covers?, description? }` — different fields from the search response. Forcing `BookCard` to accept both shapes would pollute its interface. A dedicated `WorkCard` is cleaner and follows the composition convention.

---

### 3. Author photo uses `/a/id/` CDN path, not `/b/id/`

**Decision**: Author photos: `https://covers.openlibrary.org/a/id/{photo_id}-L.jpg`. Book covers: `https://covers.openlibrary.org/b/id/{cover_id}-L.jpg`.

**Rationale**: Open Library uses different CDN paths for authors (`/a/`) vs books (`/b/`). Using the wrong path returns a 404.

---

### 4. `authorId` extraction — same pattern as `workId`

**Decision**: In `BookDetailPage`, extract `authorId` from `rawAuthorKey` (`/authors/OL23919A` → `OL23919A`) and build the link `/authors/OL23919A`. `AuthorDetailPage` reads `:authorId` from `useParams` and passes `${authorId}.json` to `getAuthor` (same `.json` suffix workaround as `useWorkDetail`).

**Rationale**: Consistent with the existing pattern. One place to change if the API path format ever changes.

## Risks / Trade-offs

- **Regenerating `client.ts`** requires the `tslib` workaround in `node_modules/tanu/node_modules/`. If it fails, edit the endpoints array in `client.ts` manually (same as the `.json` suffix fix done earlier).
- **Author works response shape**: The API returns `entries` array, not `docs`. Schema must match exactly or Zod will strip fields silently (`.passthrough()` mitigates this).
- **Authors without photos**: Many Open Library authors have no `photos` array. `AuthorDetailPage` must handle this gracefully with a placeholder.
