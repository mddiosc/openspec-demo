## 1. Install & configure

- [x] 1.1 Install `@playwright/test` as dev dependency and run `npx playwright install chromium`
- [x] 1.2 Create `playwright.config.ts` — baseURL `http://localhost:5173`, chromium only, `webServer` config with `npm run dev`, `reuseExistingServer: true`
- [x] 1.3 Add `"test:e2e": "playwright test"` script to `package.json`

## 2. Fixtures

- [x] 2.1 Create `tests/mocks/search-tolkien.json` — minimal search response with 3 docs, numFound: 100, start: 0
- [x] 2.2 Create `tests/mocks/search-tolkien-p2.json` — page 2 response, start: 20, 3 docs, numFound: 100
- [x] 2.3 Create `tests/mocks/search-empty.json` — numFound: 0, docs: []
- [x] 2.4 Create `tests/mocks/work-hobbit.json` — minimal work response with title, covers, description, subjects, authors
- [x] 2.5 Create `tests/mocks/author-tolkien.json` — minimal author response with name, bio, birth_date, photos
- [x] 2.6 Create `tests/mocks/author-tolkien-works.json` — minimal works response with 3 entries

## 3. Test helper

- [x] 3.1 Create `tests/helpers/mockApi.ts` — reusable `setupApiMocks(page, overrides?)` function that registers `page.route()` intercepts for all fixtures

## 4. Test files

- [x] 4.1 Create `tests/book-search.spec.ts` — search happy path, empty state, empty query guard
- [x] 4.2 Create `tests/pagination.spec.ts` — load more appends results, counter updates, button hidden when exhausted
- [x] 4.3 Create `tests/search-filters.spec.ts` — sort control visibility, changing sort triggers new request
- [x] 4.4 Create `tests/book-detail.spec.ts` — navigate to detail, title visible, author link, back link preserves query
- [x] 4.5 Create `tests/author-detail.spec.ts` — navigate to author, name heading, works grid, back button

## 5. Verification

- [x] 5.1 Run `npm run test:e2e` — all tests pass
- [x] 5.2 Run `npm run test:e2e -- --reporter=list` and confirm each test name maps to a spec scenario
