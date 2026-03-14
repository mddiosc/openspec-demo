## Context

The app is a client-side React SPA served by Vite on port 5173. All data comes from the Open Library REST API. There are no unit tests. The canonical specs in `openspec/specs/` define 5 capabilities with ~30 scenarios — these are the source of truth for what to test.

## Goals / Non-Goals

**Goals:**
- Install `@playwright/test` and configure it to run against `http://localhost:5173`
- Mock all Open Library API calls with `page.route()` using fixture JSON files — no real network calls in tests
- One test file per capability, mirroring the spec structure
- Tests run with `npm run test:e2e` (starts dev server via `webServer` config)
- Chromium only for CI speed

**Non-Goals:**
- Unit tests or component tests (Vitest) — separate concern
- Visual regression tests
- Multi-browser testing (Firefox, Safari) — can be added later
- CI pipeline integration (GitHub Actions) — deferred

## Decisions

### 1. API mocking with `page.route()` — not MSW

**Decision**: Intercept all `https://openlibrary.org/**` requests in Playwright using `page.route()` and return fixture JSON from `tests/mocks/`.

**Rationale**: MSW requires service worker setup and changes to production code. `page.route()` works at the network level in Playwright without touching the app. Fixtures are plain JSON files versioned with the tests — deterministic and fast.

**Alternative considered**: Real API calls — rejected because Open Library rate-limits at 1 req/s, tests would be slow and flaky.

---

### 2. One fixture file per endpoint, one test file per capability

**Decision**:
```
tests/
  mocks/
    search-tolkien.json        ← GET /search.json?q=tolkien
    search-tolkien-p2.json     ← GET /search.json?q=tolkien&offset=20
    search-empty.json          ← GET /search.json?q=zzznoresults
    work-hobbit.json           ← GET /works/OL27482W.json
    author-tolkien.json        ← GET /authors/OL26320A.json
    author-tolkien-works.json  ← GET /authors/OL26320A/works.json
  book-search.spec.ts
  pagination.spec.ts
  search-filters.spec.ts
  book-detail.spec.ts
  author-detail.spec.ts
```

**Rationale**: Mirrors the `openspec/specs/` structure — easy to trace a failing test back to its spec. Fixtures are minimal — only the fields the app actually uses.

---

### 3. `webServer` in `playwright.config.ts` — auto-start dev server

**Decision**: Use Playwright's `webServer` config option to run `npm run dev` before tests and wait for `http://localhost:5173` to be ready.

**Rationale**: No manual server management. Tests are self-contained — `npm run test:e2e` is the only command needed.

---

### 4. Test scope — happy path + key edge cases per spec

**Decision**: Each test file covers:
- The primary happy path scenario
- The most important edge cases (empty state, no cover/photo, error state where specified in specs)
- Navigation flows (back links, detail → back)

Not every scenario in every spec gets a test — focus on the highest-value coverage.

## Risks / Trade-offs

- **Fixture staleness**: If the Open Library API changes its response shape, fixtures won't reflect it. Mitigated by keeping fixtures minimal and clearly documented.
- **Dev server startup time**: `webServer` adds ~3s to test startup. Acceptable.
- **Port conflicts**: If port 5173 is already in use, tests fail. Playwright's `webServer` uses `reuseExistingServer: true` in development to avoid this.
