## ADDED Requirements

### Requirement: Loading states use visual skeletons

The system SHALL display pulse-animated skeletons instead of "Loading..." text when fetching initial data for any page or result grid.

#### Scenario: Search results loading

- **WHEN** the user submits a search query and the fetch is in progress
- **THEN** the system SHALL display a grid of BookCard skeletons
- **THEN** the system SHALL NOT display "Searching..." text

#### Scenario: Book detail loading

- **WHEN** the user navigates to a book detail page and data is fetching
- **THEN** the system SHALL display a skeleton layout matching the detail page structure (large cover, title line, description lines)

#### Scenario: Author detail loading

- **WHEN** the user navigates to an author detail page and data is fetching
- **THEN** the system SHALL display a skeleton layout matching the author page structure (photo, name, bio lines, and a grid of work cards)

#### Scenario: Subject browse loading

- **WHEN** the user navigates to a subject browse page and data is fetching
- **THEN** the system SHALL display a grid of BookCard skeletons

---

### Requirement: Skeletons provide accessible loading feedback

The system SHALL ensure skeletons are correctly handled by assistive technologies.

#### Scenario: Skeletons are hidden from screen readers

- **WHEN** a skeleton is rendered
- **THEN** it SHALL have `aria-hidden="true"` or be contained within an `aria-busy="true"` element to prevent redundant announcements
