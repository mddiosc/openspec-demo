## MODIFIED Requirements

### Requirement: Detail page displays author information

The system SHALL fetch and display the primary author of the work. Author data SHALL be fetched from `GET /authors/{authorId}.json` only after the work response is available and contains an author key. The author's name SHALL be a navigable link to `/authors/:authorId`.

#### Scenario: Work has an author with bio

- **WHEN** the work response includes an author key and the author has a bio
- **THEN** the system SHALL display the author's name as a link and bio text

#### Scenario: Work has an author without bio

- **WHEN** the work response includes an author key but the author has no bio
- **THEN** the system SHALL display the author's name as a link only, without a bio section

#### Scenario: Author fetch is loading

- **WHEN** the work has loaded but the author fetch is in progress
- **THEN** the system SHALL show a loading indicator in the author section
- **THEN** the rest of the page content SHALL already be visible

#### Scenario: User clicks author name

- **WHEN** the user clicks the author name link on the book detail page
- **THEN** the system SHALL navigate to `/authors/:authorId` for that author
