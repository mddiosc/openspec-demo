## Why

The app has 5 implemented capabilities but zero automated tests. Every feature has been verified manually, which doesn't scale and won't catch regressions as the project grows. Playwright e2e tests covering the critical user flows provide a safety net and document the expected behavior in executable form — directly derived from the canonical specs in `openspec/specs/`.

## What Changes

- Install and configure Playwright as a dev dependency
- Write e2e tests covering the scenarios defined in the canonical specs for all 5 capabilities:
  - `book-search`: search, empty state, error state, empty query guard
  - `pagination`: load more button, counter, button disappears when exhausted
  - `search-filters`: sort control visibility, sort changes results
  - `book-detail`: navigate to detail, cover, description, subjects, author link
  - `author-detail`: navigate to author, photo/placeholder, bio, works grid, back link
- Add `test:e2e` script to `package.json`
- Use API mocking (Playwright's `route`) to avoid hitting the real Open Library API in tests — fast, deterministic, no rate limits

## Capabilities

### New Capabilities

- `e2e-tests`: Playwright test suite covering all 5 canonical capabilities with mocked API responses

### Modified Capabilities

_(none — tests are additive, no production code changes)_

## Impact

- **New files**: `playwright.config.ts`, `tests/` directory with one test file per capability, `tests/mocks/` with fixture JSON responses
- **Modified files**: `package.json` (add `@playwright/test` dev dependency, `test:e2e` script)
- **No production code changes**
