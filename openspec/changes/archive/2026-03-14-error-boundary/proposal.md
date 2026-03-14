## Why

Currently, any unexpected JavaScript error in a component causes a blank white screen with no feedback to the user and no way to recover. React Error Boundaries catch render-time errors and display a fallback UI instead, allowing the rest of the app to continue working. This is standard practice for production React apps.

## What Changes

- Add a reusable `ErrorBoundary` class component that catches render errors and shows a fallback
- Wrap the entire app in a global error boundary as a last-resort catch
- Wrap each route-level page in its own error boundary so a failure in one page doesn't affect others
- Provide a "Try again" button that resets the boundary and a "Back to search" link
- Add a `NotFoundPage` for unmatched routes (`*`) — currently the app renders nothing for unknown URLs

## Capabilities

### New Capabilities

- `error-boundary`: React Error Boundaries at global and per-route level, preventing blank screens on unexpected render errors with a recovery UI
- `not-found`: 404 page for unmatched routes with a link back to search

### Modified Capabilities

_(none — wrapping existing pages is not a spec-level behavior change)_

## Impact

- **New files**: `src/components/ErrorBoundary.tsx`, `src/components/ErrorBoundary.module.css`, `src/pages/NotFoundPage.tsx`, `src/pages/NotFoundPage.module.css`
- **Modified files**: `src/App.tsx` (wrap routes in error boundaries, add `*` route), `src/main.tsx` (global error boundary)
- **No new dependencies** — React Error Boundaries are built into React
