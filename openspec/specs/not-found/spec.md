## ADDED Requirements

### Requirement: Unknown routes show a 404 page

The system SHALL render a dedicated Not Found page when the user navigates to a URL that does not match any defined route. The page SHALL provide a link back to the search page.

#### Scenario: User navigates to unknown URL

- **WHEN** the user navigates to a URL that does not match any route
- **THEN** the system SHALL display a Not Found message
- **THEN** the system SHALL provide a link to return to the search page

#### Scenario: Not Found page does not show blank screen

- **WHEN** an unmatched route is accessed
- **THEN** the system SHALL NOT render a blank page
