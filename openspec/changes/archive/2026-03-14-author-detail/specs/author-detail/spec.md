## ADDED Requirements

### Requirement: User can view author details

The system SHALL provide a detail page at `/authors/:authorId` that fetches and displays the author's photo, name, bio, birth date, death date (if applicable), and a grid of their works.

#### Scenario: Successful author page load

- **WHEN** the user navigates to `/authors/:authorId`
- **THEN** the system SHALL fetch the author from `GET /authors/{authorId}.json`
- **THEN** the system SHALL display the author's name and any available photo, bio, and dates

#### Scenario: Author has no photo

- **WHEN** the author has no `photos` array or it is empty
- **THEN** the system SHALL render a placeholder in place of the photo

#### Scenario: Author has no bio

- **WHEN** the author has no `bio` field
- **THEN** the system SHALL NOT render a bio section
- **THEN** the rest of the page SHALL render normally

#### Scenario: API request fails

- **WHEN** the Open Library API returns an error
- **THEN** the system SHALL display an error message and a link back to the previous page

---

### Requirement: Author page displays a grid of works

The system SHALL fetch and display a grid of the author's works via `GET /authors/{authorId}/works.json`. Each work card SHALL show the cover (if available), title, and first publish date.

#### Scenario: Author has works

- **WHEN** the author works response contains entries
- **THEN** the system SHALL render each work as a card in a grid

#### Scenario: Author has no works

- **WHEN** the author works response is empty
- **THEN** the system SHALL display a message indicating no works are available

#### Scenario: Works fetch is loading

- **WHEN** the author has loaded but works are still fetching
- **THEN** the system SHALL show a loading indicator in the works section

---

### Requirement: User can navigate back from author page

The author detail page SHALL provide a back link to return to the previous page without losing navigation context.

#### Scenario: Back link is present

- **WHEN** the user is on the author detail page
- **THEN** the system SHALL display a "← Back" link
- **THEN** clicking it SHALL navigate to the previous page in history
