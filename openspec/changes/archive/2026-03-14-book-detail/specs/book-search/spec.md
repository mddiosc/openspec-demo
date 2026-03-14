## MODIFIED Requirements

### Requirement: Book card displays key metadata

Each book in the results grid SHALL display:
- Cover image (from Open Library Covers CDN) or a placeholder if unavailable
- Title
- Author name(s) (comma-separated if multiple)
- First publish year (omitted if unavailable)

The cover image SHALL use `https://covers.openlibrary.org/b/id/{cover_i}-M.jpg`.

The entire card SHALL be wrapped in a navigable link to `/works/:workId`, where `workId` is extracted from `book.key` (e.g. `/works/OL27482W` → `OL27482W`).

#### Scenario: Book with cover image

- **WHEN** a search result has a `cover_i` value
- **THEN** the BookCard SHALL render an `<img>` with the correct CDN URL and an accessible `alt` attribute

#### Scenario: Book without cover image

- **WHEN** a search result has no `cover_i` value (null or undefined)
- **THEN** the BookCard SHALL render a placeholder element with the text "No cover available"

#### Scenario: Book with multiple authors

- **WHEN** a search result has more than one entry in `author_name`
- **THEN** the BookCard SHALL display all authors joined by ", "

#### Scenario: User clicks a book card

- **WHEN** the user clicks anywhere on a BookCard
- **THEN** the system SHALL navigate to `/works/:workId` for that book
