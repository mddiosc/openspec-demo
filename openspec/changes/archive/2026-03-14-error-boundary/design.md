## Context

React 19 still requires class components for Error Boundaries — there is no hook-based API yet. The app currently has no error boundaries. Each page handles its own API error states via react-query's `isError`, but render-time errors (bad prop types, null pointer dereferences, import failures) crash silently with a blank screen.

## Goals / Non-Goals

**Goals:**
- Single reusable `ErrorBoundary` class component accepting `fallback` prop or using a default fallback
- Global boundary in `main.tsx` wrapping the entire app (last resort)
- Per-route boundaries in `App.tsx` wrapping each `<Route>`'s element — isolated failures
- Default fallback UI: error message, "Try again" button (resets boundary via `key` prop), "← Back to search" link
- `NotFoundPage` at route `*` — simple message with link to `/`

**Non-Goals:**
- Error reporting to external services (Sentry, etc.) — deferred
- Error boundary for individual components within pages
- Custom fallback per page — one default fallback covers all cases

## Decisions

### 1. One `ErrorBoundary` component — key-based reset

**Decision**: `ErrorBoundary` is a class component with `state = { hasError: false, error: null }`. The "Try again" button calls `this.setState({ hasError: false, error: null })` to reset. Pages wrap their boundary in a `key={pathname}` so navigating to a different route automatically resets it.

**Rationale**: The `key` prop reset pattern is the React-recommended way to reset error boundaries on navigation. It requires no external library and zero configuration per page.

**Alternative considered**: `react-error-boundary` library — rejected to avoid adding a dependency for something straightforward.

---

### 2. Two levels: global (main.tsx) + per-route (App.tsx)

**Decision**:
- `main.tsx`: `<ErrorBoundary>` wraps `<QueryClientProvider><BrowserRouter><App/></BrowserRouter></QueryClientProvider>` — catches errors in providers
- `App.tsx`: each `<Route element={<ErrorBoundary key={path}><Page/></ErrorBoundary>}>` — catches page-level errors

**Rationale**: Per-route isolation means a broken `BookDetailPage` doesn't affect `SearchPage`. The global boundary is a safety net for errors outside route rendering (e.g. QueryClient setup).

---

### 3. `NotFoundPage` as a simple static page

**Decision**: Route `path="*"` renders `<NotFoundPage>` — plain message + link to `/`. No error boundary needed (it can't throw).

**Rationale**: Straightforward. Closes the UX gap where unknown URLs render nothing.

## Risks / Trade-offs

- **Error boundaries don't catch async errors** — react-query already handles those via `isError`. This covers render-time errors only.
- **`componentDidCatch` logging** — currently logs to console. Can be upgraded to a reporting service later without changing the component interface.
- **Per-route key reset** — using `key={route}` means the boundary resets on every navigation, even if the error was in a shared component. Acceptable for this app's scale.
