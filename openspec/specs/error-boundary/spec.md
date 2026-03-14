## ADDED Requirements

### Requirement: Render errors are caught and show a recovery UI

The system SHALL wrap each route-level page in a React Error Boundary. When an unexpected render error occurs, the boundary SHALL display a fallback UI instead of a blank screen. The fallback SHALL allow the user to recover without a full page reload.

#### Scenario: Render error in a page component

- **WHEN** an unexpected JavaScript error occurs during rendering of any page
- **THEN** the system SHALL display an error message instead of a blank screen
- **THEN** the system SHALL NOT crash the rest of the application

#### Scenario: User clicks Try again

- **WHEN** the error boundary fallback is visible and the user clicks "Try again"
- **THEN** the boundary SHALL reset and attempt to re-render the page

#### Scenario: User navigates away from errored page

- **WHEN** an error boundary is showing its fallback and the user navigates to a different route
- **THEN** the new route SHALL render normally without the error state

#### Scenario: Error boundary resets on route change

- **WHEN** the user navigates to a different route via the back link in the fallback
- **THEN** the error boundary for the new route SHALL start in a clean state

---

### Requirement: A global error boundary protects the app shell

The system SHALL wrap the entire application in a top-level error boundary. If an error occurs outside of route rendering (e.g. in providers), the global boundary SHALL catch it and display a fallback.

#### Scenario: Error outside route rendering

- **WHEN** an error occurs in the app shell (providers, router)
- **THEN** the global error boundary SHALL display a fallback message
- **THEN** the user SHALL see an error message rather than a blank page
