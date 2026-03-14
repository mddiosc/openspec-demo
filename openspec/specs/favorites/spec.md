## ADDED Requirements

### Requirement: User can toggle a book as favorite

The system SHALL allow users to mark or unmark any book as a favorite from the search grid or the book detail page. The favorite status SHALL be indicated by a heart icon.

#### Scenario: Mark a book as favorite

- **WHEN** the user clicks the heart icon on a book that is NOT in favorites
- **THEN** the heart icon SHALL change to a filled state
- **THEN** the book SHALL be added to the persistent favorites list

#### Scenario: Unmark a book as favorite

- **WHEN** the user clicks the heart icon on a book that IS currently in favorites
- **THEN** the heart icon SHALL change to an outline state
- **THEN** the book SHALL be removed from the persistent favorites list

---

### Requirement: Favorites are persisted locally

The system SHALL save the list of favorite books to the browser's `localStorage` so they are available across sessions and page reloads.

#### Scenario: Favorites persist across reloads

- **WHEN** the user adds books to favorites and reloads the page
- **THEN** the favorited books SHALL still be marked as favorites in the UI
- **THEN** the favorites list SHALL still contain all previously added books

---

### Requirement: User can view all favorite books

The system SHALL provide a "Favorites" page that displays all currently saved books in a grid.

#### Scenario: View favorites list

- **WHEN** the user navigates to the Favorites page
- **THEN** the system SHALL display all favorited books in a grid layout
- **THEN** each book in the list SHALL allow navigation to its detail page

#### Scenario: Empty favorites state

- **WHEN** the user has no favorited books and navigates to the Favorites page
- **THEN** the system SHALL display a message indicating no favorites have been added yet
