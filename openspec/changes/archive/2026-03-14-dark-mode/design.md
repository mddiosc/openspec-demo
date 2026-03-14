## Context

The app currently uses a mix of hardcoded hex colors and some CSS variables in `index.css`. Most components have their own local colors in `.module.css` files. We need a centralized theme system using CSS variables that can be toggled by a global state.

## Goals / Non-Goals

**Goals:**
- Centralized CSS variable system for all colors.
- Theme persistence in `localStorage`.
- Support for system preference detection (`prefers-color-scheme`).
- Toggle in the global `Header`.
- Smooth transitions for color changes.

**Non-Goals:**
- Multiple custom themes (beyond just Light and Dark).
- Theme-specific assets (using SVG icons that can change color via CSS).
- High contrast mode (outside of standard Dark mode).

## Decisions

### 1. `data-theme` attribute on `document.documentElement`

**Decision**: The active theme ('light' or 'dark') will be applied as a `data-theme` attribute on the `<html>` element.

**Rationale**: This is the most efficient way to scope CSS variables. It allows using `:root[data-theme='dark']` to override variables without needing to pass classes down the React tree.

---

### 2. CSS Variables for ALL semantic colors

**Decision**: Instead of `background-color: #fff`, we will use `background-color: var(--color-bg)`. All components will be audited to use these variables.

**Rationale**: Ensures consistency and makes adding future themes easy. Semantic names (e.g., `--color-text-muted`) are clearer than color-based names (e.g., `--color-gray-500`).

---

### 3. Zustand `persist` for Theme state

**Decision**: Like the favorites store, we use Zustand with `persist`.

**Rationale**: Simple, consistent with the rest of the project, and provides easy initialization logic to check for system preference if no stored preference exists.

---

### 4. Initialization in `App.tsx` or `main.tsx`

**Decision**: A `useEffect` in the root component will listen to the `theme` state and update the `data-theme` attribute on the DOM.

**Rationale**: Keeps the DOM state in sync with the React state.

## Risks / Trade-offs

- **Flash of Unstyled Theme (FOUT)**: On initial load, the default theme (light) might show before the store hydrates from `localStorage`. Mitigation: a small blocking script in `index.html` could prevent this, but for a demo, a standard `useEffect` is acceptable.
- **Missing Variable audit**: With many components, some might be missed. Mitigation: strict use of a linter or manual check of all `.module.css` files.
