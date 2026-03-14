## ADDED Requirements

### Requirement: User can search books by query

The system SHALL provide a search input on the home page that accepts a free-text query. When the user submits the query (via Enter key or search button), the system SHALL fetch matching books from the Open Library API and display them in a grid.

#### Scenario: Successful search with results

- **WHEN** the user types a query and submits
- **THEN** the system displays a loading indicator while fetching
- **THEN** the system renders a grid of book cards with cover, title, author(s), and first publish year

#### Scenario: Search returns no results

- **WHEN** the user submits a query that returns zero results
- **THEN** the system SHALL display an empty-state message (e.g., "No books found for '...'")
- **THEN** the system SHALL NOT display the results grid

#### Scenario: API request fails

- **WHEN** the Open Library API returns an error or is unreachable
- **THEN** the system SHALL display an error message
- **THEN** the system SHALL NOT crash or show a blank page

#### Scenario: Empty query submission

- **WHEN** the user submits an empty or whitespace-only query
- **THEN** the system SHALL NOT fire an API request
- **THEN** the system SHALL keep any previously displayed results visible

---

### Requirement: Search query persists across navigation

The system SHALL retain the active search query in global state (Zustand store) so that returning to the search page from a detail page restores the previous query and results.

#### Scenario: Navigate away and return

- **WHEN** the user searches for a term and then navigates to another route
- **THEN** upon returning to the search page, the input SHALL still contain the previous query
- **THEN** the results grid SHALL be re-rendered from react-query cache (no new network request if cache is fresh)

---

### Requirement: Book card displays key metadata

Each book in the results grid SHALL display:
- Cover image (from Open Library Covers CDN) or a placeholder if unavailable
- Title
- Author name(s) (comma-separated if multiple)
- First publish year (omitted if unavailable)

The cover image SHALL use `https://covers.openlibrary.org/b/id/{cover_i}-M.jpg`.

#### Scenario: Book with cover image

- **WHEN** a search result has a `cover_i` value
- **THEN** the BookCard SHALL render an `<img>` with the correct CDN URL and an accessible `alt` attribute

#### Scenario: Book without cover image

- **WHEN** a search result has no `cover_i` value (null or undefined)
- **THEN** the BookCard SHALL render a placeholder element with the text "No cover available"

#### Scenario: Book with multiple authors

- **WHEN** a search result has more than one entry in `author_name`
- **THEN** the BookCard SHALL display all authors joined by ", "

---

### Requirement: App providers are initialized at the root

The system SHALL initialize `QueryClientProvider` (react-query) and `BrowserRouter` (react-router-dom) at the application root so all pages and components can use hooks from these libraries.

#### Scenario: QueryClient is available in all components

- **WHEN** any component calls `useQuery` or `useMutation`
- **THEN** it SHALL resolve the nearest `QueryClientProvider` without error

#### Scenario: Routing is available in all components

- **WHEN** any component calls `useNavigate` or `useParams`
- **THEN** it SHALL resolve the nearest `Router` context without error
