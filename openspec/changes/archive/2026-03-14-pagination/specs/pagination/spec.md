## ADDED Requirements

### Requirement: User can load more search results

The system SHALL display a "Load more" button below the results grid when there are more results available than currently shown. Clicking it SHALL fetch the next 20 results and append them to the existing grid without replacing it.

#### Scenario: More results available

- **WHEN** the total result count exceeds the number of currently displayed results
- **THEN** the system SHALL display a "Load more" button below the grid

#### Scenario: User clicks Load more

- **WHEN** the user clicks the "Load more" button
- **THEN** the system SHALL fetch the next page of results
- **THEN** the button SHALL show a loading indicator while fetching
- **THEN** upon completion the new results SHALL be appended to the existing grid

#### Scenario: All results loaded

- **WHEN** the number of displayed results equals `numFound`
- **THEN** the system SHALL NOT display the "Load more" button

#### Scenario: Next page fetch fails

- **WHEN** the "Load more" request fails
- **THEN** the system SHALL display an error message near the button
- **THEN** the previously loaded results SHALL remain visible

---

### Requirement: Results counter shows loaded vs total

The system SHALL display a counter indicating how many results are currently shown out of the total found (e.g. "Showing 40 of 2,115 results").

#### Scenario: First page loaded

- **WHEN** the first page of results is displayed
- **THEN** the counter SHALL show "Showing 20 of N results" (or fewer if total < 20)

#### Scenario: Multiple pages loaded

- **WHEN** the user has loaded additional pages
- **THEN** the counter SHALL update to reflect the total number of currently displayed results
