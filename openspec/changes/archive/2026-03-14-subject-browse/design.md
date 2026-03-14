## Context

`SubjectTag` is currently a plain `<span>`. The `getSubject` endpoint exists in the client at path `/subjects/:subject` returning `SubjectResponse` (`{ key, name, work_count, works: SubjectBook[] }`). `SubjectBook` has `{ key, title, authors[]{key, name}, cover_id, first_publish_year }` — slightly different from `SearchDoc` (`cover_i` vs `cover_id`). `BookCard` expects `SearchDoc` so we need either an adapter or a separate card.

## Goals / Non-Goals

**Goals:**
- `SubjectTag` becomes `<Link to="/subjects/:subject">` — subject string URL-encoded
- Route `/subjects/:subject` → `SubjectBrowsePage`
- `useSubjectBooks` hook via `useQuery` keyed on `["subject", subject]`
- Page shows: heading with subject name + work count, grid of books
- Book cards in the subject page link to `/works/:workId`
- Back link to previous page with `useNavigate(-1)`
- Loading and error states

**Non-Goals:**
- Pagination of subject results (API returns up to 20 by default, sufficient)
- Sub-subject navigation
- Subject search

## Decisions

### 1. Adapt `SubjectBook` to `SearchDoc` shape — thin adapter function

**Decision**: Create a local `subjectBookToSearchDoc` adapter in `SubjectBrowsePage` that maps `SubjectBook` fields to the `SearchDoc` shape expected by `BookCard`:
- `cover_id` → `cover_i`
- `authors[0].name` → `author_name[0]`
- `key` stays as `/works/OL...W`

**Rationale**: Reusing `BookCard` avoids duplicating card UI. The adapter is 5 lines and lives in the page component — no need to pollute the shared `BookCard` interface with an overloaded prop type.

**Alternative considered**: New `SubjectBookCard` component — rejected as unnecessary duplication.

---

### 2. Subject URL encoding — `encodeURIComponent` on link, `useParams` decodes automatically

**Decision**: `SubjectTag` encodes the subject string: `to={/subjects/${encodeURIComponent(subject)}}`. React Router's `useParams` automatically decodes it in `SubjectBrowsePage`.

**Rationale**: Subject strings can contain spaces and special characters (e.g. "Science fiction", "20th century"). Without encoding the URL would break. `encodeURIComponent` + React Router's automatic decode is the standard pattern.

---

### 3. Pass decoded subject directly to `getSubject` — Open Library accepts spaces as `_` or `%20`

**Decision**: Pass `subject` from `useParams` (already decoded) directly to the `getSubject` param. Open Library's subjects API accepts multi-word subjects as URL path segments with spaces encoded as `_` or `%20`.

**Rationale**: No special transformation needed — the API handles standard URL encoding.

## Risks / Trade-offs

- **Subject string variety**: Open Library subjects are free-form strings. Very long or unusual subjects might produce empty results. The page handles empty gracefully.
- **`SubjectBook` cover field**: `cover_id` (number) vs `cover_i` (number) — both refer to the same CDN ID. The adapter maps them directly.
- **No pagination**: Subject pages show max 20 works. For popular subjects this is a limitation. Acceptable for now — can add pagination later.
