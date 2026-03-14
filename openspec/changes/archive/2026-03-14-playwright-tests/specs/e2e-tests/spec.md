## ADDED Requirements

### Requirement: Book search flow is tested e2e

The test suite SHALL verify the core search flow: submitting a query, seeing results, and handling edge cases.

#### Scenario: Search returns results

- **WHEN** the user submits a search query with mocked API returning results
- **THEN** the results grid SHALL be visible with at least one book card
- **THEN** the results counter SHALL show "Showing X of Y results"

#### Scenario: Search empty state

- **WHEN** the user submits a query with mocked API returning zero results
- **THEN** the empty state message SHALL be visible
- **THEN** the results grid SHALL NOT be visible

#### Scenario: Empty query is not submitted

- **WHEN** the user clicks Search with an empty input
- **THEN** no API request SHALL be made
- **THEN** the hint message SHALL remain visible

---

### Requirement: Pagination flow is tested e2e

The test suite SHALL verify that "Load more" appends results and the counter updates.

#### Scenario: Load more appends results

- **WHEN** the user searches and clicks "Load more" with mocked page 2 response
- **THEN** additional results SHALL be appended to the grid
- **THEN** the counter SHALL update to reflect the new total

#### Scenario: Load more button hidden when exhausted

- **WHEN** all results are loaded (docs.length === numFound)
- **THEN** the "Load more" button SHALL NOT be visible

---

### Requirement: Sort control flow is tested e2e

The test suite SHALL verify that changing sort triggers a new fetch and the control is only shown with results.

#### Scenario: Sort control visible with results

- **WHEN** search results are displayed
- **THEN** the sort control SHALL be visible

#### Scenario: Sort control hidden without results

- **WHEN** the page loads with no active query
- **THEN** the sort control SHALL NOT be visible

#### Scenario: Changing sort resets results

- **WHEN** the user changes sort selection
- **THEN** a new API request SHALL be made with the new sort parameter
- **THEN** the counter SHALL reset to the first page count

---

### Requirement: Book detail flow is tested e2e

The test suite SHALL verify navigation to the detail page and rendering of key sections.

#### Scenario: Navigate to book detail

- **WHEN** the user clicks a book card
- **THEN** the browser SHALL navigate to `/works/:workId`
- **THEN** the book title SHALL be visible

#### Scenario: Book detail shows author link

- **WHEN** the book detail page loads with author data
- **THEN** the author name SHALL be a link to `/authors/:authorId`

#### Scenario: Back link returns to search

- **WHEN** the user clicks "← Back to results" on the detail page
- **THEN** the browser SHALL navigate to `/`
- **THEN** the search input SHALL still contain the previous query

---

### Requirement: Author detail flow is tested e2e

The test suite SHALL verify navigation to the author page and rendering of key sections.

#### Scenario: Navigate to author detail

- **WHEN** the user clicks the author name link on book detail
- **THEN** the browser SHALL navigate to `/authors/:authorId`
- **THEN** the author name SHALL be visible as a heading

#### Scenario: Author works grid is displayed

- **WHEN** the author page loads with mocked works response
- **THEN** at least one work card SHALL be visible in the grid

#### Scenario: Back button navigates to previous page

- **WHEN** the user clicks "← Back" on the author page
- **THEN** the browser SHALL navigate back to the book detail page
