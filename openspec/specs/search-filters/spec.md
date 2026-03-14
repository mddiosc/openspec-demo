## ADDED Requirements

### Requirement: User can sort search results

The system SHALL provide a sort control on the search page that allows the user to order results by relevance (default), newest first, or oldest first. Changing the sort SHALL reset pagination and fetch a fresh first page.

#### Scenario: Default sort is relevance

- **WHEN** the user performs a search without changing the sort
- **THEN** results SHALL be ordered by relevance (Open Library default)
- **THEN** the sort control SHALL show "Relevance" as the selected option

#### Scenario: User changes sort to newest

- **WHEN** the user selects "Newest first" from the sort control
- **THEN** the system SHALL refetch results ordered by publication year descending
- **THEN** pagination SHALL reset to page 1

#### Scenario: User changes sort to oldest

- **WHEN** the user selects "Oldest first" from the sort control
- **THEN** the system SHALL refetch results ordered by publication year ascending
- **THEN** pagination SHALL reset to page 1

#### Scenario: Sort control only visible with results

- **WHEN** there are no results (empty state, error, or no query)
- **THEN** the sort control SHALL NOT be visible

#### Scenario: Sort persists across navigation

- **WHEN** the user changes sort and navigates to a book detail page and back
- **THEN** the sort control SHALL still show the previously selected sort option
- **THEN** the results SHALL be served from cache (no new network request)
