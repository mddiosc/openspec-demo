## MODIFIED Requirements

### Requirement: User can search books by query

The system SHALL provide a search input on the home page that accepts a free-text query. When the user submits the query (via Enter key or search button), the system SHALL fetch matching books from the Open Library API and display them in a grid. Results SHALL be loaded progressively — the first 20 results are shown immediately, with additional pages loadable via the "Load more" button.

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
