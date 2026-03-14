## ADDED Requirements

### Requirement: User can toggle between Light and Dark themes

The system SHALL provide a toggle button in the header that allows users to switch between light and dark visual modes.

#### Scenario: Switch to dark mode
- **WHEN** the user clicks the theme toggle while in light mode
- **THEN** the application's color scheme SHALL change to dark colors (dark background, light text)
- **THEN** the preference SHALL be saved

#### Scenario: Switch to light mode
- **WHEN** the user clicks the theme toggle while in dark mode
- **THEN** the application's color scheme SHALL change to light colors (light background, dark text)
- **THEN** the preference SHALL be saved

---

### Requirement: Theme preference is persistent

The system SHALL persist the user's theme selection in `localStorage` so it is restored on subsequent visits.

#### Scenario: Restore preference on reload
- **WHEN** the user selects dark mode and reloads the page
- **THEN** the application SHALL start in dark mode immediately

---

### Requirement: System preference is respected by default

If the user has not previously set a manual preference, the system SHALL default to the theme matching the user's operating system settings.

#### Scenario: Default to system dark mode
- **WHEN** a new user visits the app and their OS preference is dark
- **THEN** the application SHALL start in dark mode

#### Scenario: Default to system light mode
- **WHEN** a new user visits the app and their OS preference is light
- **THEN** the application SHALL start in light mode
