## Why

A dark mode option is a standard feature in modern web applications. it improves accessibility for users with light sensitivity, reduces eye strain in low-light environments, and provides a sleek visual alternative. Supporting both a system preference and a manual toggle gives users the best control over their experience.

## What Changes

- Create a `useThemeStore` using Zustand with `persist` middleware to save the theme preference.
- Implement a `ThemeToggle` component in the `Header` to switch between 'light' and 'dark' themes.
- Define a comprehensive set of CSS variables for colors (backgrounds, text, borders, accents) in `index.css`.
- Update all existing components and pages to use these CSS variables instead of hardcoded hex values.
- Automatically apply the user's system theme preference on first visit.
- Smooth transitions between themes using CSS transitions.

## Capabilities

### New Capabilities

- `dark-mode`: Theme management system that supports light and dark modes, persists user preference, and respects system settings.

### Modified Capabilities

- `book-search`: UI elements (input, cards, text) adapt to the active theme.
- `book-detail`: Detail page layout and elements adapt to the active theme.
- `author-detail`: Author page and works grid adapt to the active theme.
- `subject-browse`: Subject page and grid adapt to the active theme.
- `favorites`: Favorites page and cards adapt to the active theme.

## Impact

- **New files**: `src/store/themeStore.ts`, `src/components/ThemeToggle.tsx`, `src/components/ThemeToggle.module.css`
- **Modified files**: `src/index.css` (CSS variables), `src/components/Header.tsx` (add toggle), all existing CSS Modules (use variables)
- **Dependencies**: None
