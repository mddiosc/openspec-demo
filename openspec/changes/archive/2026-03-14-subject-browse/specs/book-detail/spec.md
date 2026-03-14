## MODIFIED Requirements

### Requirement: Subjects are displayed as tags

The system SHALL display the work's subjects as individual navigable tag elements, if the work has subjects. Each tag SHALL link to `/subjects/:subject` to browse books with that subject.

#### Scenario: Work has subjects

- **WHEN** the fetched work has a non-empty `subjects` array
- **THEN** the system SHALL render each subject as a tag element that is a link to `/subjects/:subject`

#### Scenario: Work has no subjects

- **WHEN** the fetched work has no `subjects` array or it is empty
- **THEN** the system SHALL NOT render a subjects section

#### Scenario: User clicks a subject tag

- **WHEN** the user clicks a subject tag on the book detail page
- **THEN** the system SHALL navigate to `/subjects/:subject` for that subject
