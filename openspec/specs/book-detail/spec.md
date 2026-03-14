# Capability: book-detail

### Requirement: User can view full book details

The system SHALL provide a detail page at `/works/:workId` that fetches and displays the full work data from the Open Library API. The page SHALL show a loading state while fetching and an error state if the request fails.

#### Scenario: Successful detail page load

- **WHEN** the user navigates to `/works/:workId`
- **THEN** the system SHALL fetch the work from `GET /works/{workId}.json`
- **THEN** the system SHALL display the large cover image (or placeholder), title, description (if available), first publish date (if available), and subjects (if available)

#### Scenario: Work has no description

- **WHEN** the fetched work has no description field
- **THEN** the system SHALL NOT render a description section
- **THEN** the rest of the page SHALL render normally

#### Scenario: Work has no cover

- **WHEN** the fetched work has no `covers` array or it is empty
- **THEN** the system SHALL render a large placeholder in place of the cover image

#### Scenario: API request fails

- **WHEN** the Open Library API returns an error or is unreachable
- **THEN** the system SHALL display an error message
- **THEN** the system SHALL provide a link back to the search page

---

### Requirement: Detail page displays author information

The system SHALL fetch and display the primary author of the work. Author data SHALL be fetched from `GET /authors/{authorId}.json` only after the work response is available and contains an author key.

#### Scenario: Work has an author with bio

- **WHEN** the work response includes an author key and the author has a bio
- **THEN** the system SHALL display the author's name and bio text

#### Scenario: Work has an author without bio

- **WHEN** the work response includes an author key but the author has no bio
- **THEN** the system SHALL display the author's name only, without a bio section

#### Scenario: Author fetch is loading

- **WHEN** the work has loaded but the author fetch is in progress
- **THEN** the system SHALL show a loading indicator in the author section
- **THEN** the rest of the page content SHALL already be visible

---

### Requirement: Subjects are displayed as tags

The system SHALL display the work's subjects as individual tag elements, if the work has subjects.

#### Scenario: Work has subjects

- **WHEN** the fetched work has a non-empty `subjects` array
- **THEN** the system SHALL render each subject as a tag element

#### Scenario: Work has no subjects

- **WHEN** the fetched work has no `subjects` array or it is empty
- **THEN** the system SHALL NOT render a subjects section

---

### Requirement: User can return to search results

The detail page SHALL provide a link that navigates back to the search page (`/`) without clearing the active search query from the Zustand store.

#### Scenario: Back link preserves search state

- **WHEN** the user clicks the back link on the detail page
- **THEN** the system SHALL navigate to `/`
- **THEN** the search input SHALL still contain the previous query
- **THEN** the search results grid SHALL be visible (from react-query cache)
