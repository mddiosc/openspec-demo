## ADDED Requirements

### Requirement: User can browse books by subject

The system SHALL provide a page at `/subjects/:subject` that fetches and displays books tagged with that subject from the Open Library API. The page SHALL show the subject name, total work count, and a grid of book cards.

#### Scenario: Successful subject page load

- **WHEN** the user navigates to `/subjects/:subject`
- **THEN** the system SHALL fetch books from `GET /subjects/{subject}.json`
- **THEN** the system SHALL display the subject name as a heading
- **THEN** the system SHALL display the total work count
- **THEN** the system SHALL render a grid of book cards

#### Scenario: Subject has no works

- **WHEN** the subject API returns an empty works array
- **THEN** the system SHALL display a message indicating no books are available for that subject

#### Scenario: API request fails

- **WHEN** the Open Library API returns an error
- **THEN** the system SHALL display an error message and a link back

#### Scenario: Book cards link to detail pages

- **WHEN** the subject page displays book cards
- **THEN** each card SHALL be a link to `/works/:workId`

---

### Requirement: User can navigate back from subject page

The subject page SHALL provide a back link to return to the previous page.

#### Scenario: Back link navigates to previous page

- **WHEN** the user clicks the back link on the subject page
- **THEN** the system SHALL navigate to the previous page in history
