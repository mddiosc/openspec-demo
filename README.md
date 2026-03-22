# Open Library Books Explorer

A fully functional book search SPA built as a demonstration of **spec-driven development (SDD)** with the [OpenSpec](https://github.com/anomalyco/openspec) framework.

Browse and search millions of books from the [Open Library](https://openlibrary.org) public API — and explore how every feature in this project was designed, specified, and implemented using a structured AI-assisted workflow.

---

## What is this project?

This repo serves two purposes:

1. **A working application** — Search for books, view details, browse by author and subject, save favorites, toggle dark mode. All features are covered by Playwright E2E tests.

2. **A demo of spec-driven development with OpenSpec** — Every feature was built by following an explicit workflow: write a proposal → design the implementation → break it into tasks → implement with an AI agent → archive. The full history is preserved in [`openspec/changes/archive/`](./openspec/changes/archive/).

---

## The Application

### Features

| Feature | Description |
|---|---|
| **Book Search** | Full-text search via Open Library API with a responsive book grid |
| **Book Detail** | Cover, description, subjects, and author link for any work |
| **Author Detail** | Author photo, bio, birth/death dates, and their works |
| **Subject Browse** | Browse books by subject category |
| **Favorites** | Heart-icon toggle with `localStorage` persistence |
| **Dark Mode** | Theme toggle that persists across sessions and respects system preference |
| **Loading Skeletons** | Pulse-animated skeleton loaders instead of spinners |
| **Error Boundary** | Per-route and global React error boundaries |
| **Pagination** | Load-more button with results counter |
| **Search Filters** | Sort by relevance, newest, or oldest |

### Routes

| Path | Page |
|---|---|
| `/` | Search (home) |
| `/works/:workId` | Book detail |
| `/authors/:authorId` | Author detail |
| `/subjects/:subject` | Subject browse |
| `/favorites` | Saved favorites |

### Tech Stack

- **React 19** + **TypeScript 5** — UI layer with hooks
- **Vite 8** — Build tool and dev server
- **React Router DOM v7** — Client-side routing
- **TanStack React Query v5** — Server state, caching, loading/error states
- **Zustand v5** — Global client state (search query, filters, favorites, theme)
- **Zod + openapi-zod-client** — Auto-generated type-safe API client from the OpenAPI spec in [`src/api/openapi.yaml`](./src/api/openapi.yaml)
- **CSS Modules** — Scoped styles, no UI library
- **Playwright** — E2E tests with mock API fixtures

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install and run

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### Other commands

```bash
npm run build        # TypeScript check + production build
npm run preview      # Preview the production build
npm run lint         # ESLint
npm run test:e2e     # Run Playwright E2E tests
```

---

## Spec-Driven Development with OpenSpec

### What is OpenSpec?

[OpenSpec](https://github.com/anomalyco/openspec) is a CLI-based framework for **spec-driven development (SDD)** — a workflow where every change to a codebase is defined and tracked through structured artifacts before and during implementation.

The core idea: AI agents are most effective when they work from clear, structured specs rather than open-ended prompts. OpenSpec provides the scaffolding to make this repeatable.

### How it works

Every feature starts as a **change** — a directory under `openspec/changes/` containing:

| Artifact | Purpose |
|---|---|
| `proposal.md` | **What** and **why** — the feature rationale and user-facing capabilities |
| `design.md` | **How** — technical decisions, component structure, data flow |
| `tasks.md` | **Checklist** of implementation steps (the AI works through these) |
| `specs/` | Delta specs — updates to the capability spec files in `openspec/specs/` |
| `.openspec.yaml` | Schema and metadata for the change |

The workflow for each feature:

```
/opsx:propose  →  /opsx:apply  →  /opsx:archive
    ↑                  ↑               ↑
 Generate all      Implement        Archive when
 artifacts         tasks one        complete
                   by one
```

### The four OpenSpec commands

This project ships with four slash commands that work across **Claude Code**, **Gemini CLI**, and **GitHub Copilot**:

| Command | What it does |
|---|---|
| `/opsx:propose` | Scaffolds a new change and generates all artifacts (`proposal.md`, `design.md`, `tasks.md`) in one step |
| `/opsx:apply` | Reads `tasks.md` and implements each task, checking them off as it goes |
| `/opsx:archive` | Validates completion and archives the change to `openspec/changes/archive/` |
| `/opsx:explore` | Thinking-partner mode — explore ideas and capture insights without writing code |

The commands live in:

- `.claude/commands/opsx/` — Claude Code
- `.gemini/commands/opsx/` — Gemini CLI
- `.github/prompts/` — GitHub Copilot

### The specs directory

`openspec/specs/` contains the **living capability specs** for the project — one per feature area. These are written in a BDD-style format with WHEN/THEN scenarios and serve as the ground truth for what the app should do.

| Spec | Coverage |
|---|---|
| `book-search` | Search input, results grid, empty/error states, query persistence |
| `book-detail` | Work detail page, cover image, description, subjects, author link |
| `author-detail` | Author page, photo, bio, works list, back navigation |
| `subject-browse` | Subject page, book grid, navigation |
| `pagination` | Load-more behavior, results counter, exhaustion state |
| `search-filters` | Sort control options and persistence across navigation |
| `favorites` | Toggle behavior, localStorage persistence, favorites page |
| `dark-mode` | Theme toggle, persistence, system preference detection |
| `loading-skeletons` | Skeleton loader rendering and animation |
| `error-boundary` | Per-route and global error boundary behavior |
| `not-found` | 404 page on unmatched routes |
| `e2e-tests` | Playwright test requirements for all capabilities |

### The change archive

`openspec/changes/archive/` contains the full build history of this app — 11 completed changes, each with all their original artifacts intact:

```
openspec/changes/archive/
├── 2026-03-14-book-search/        # Greenfield: search page + API integration
├── 2026-03-14-book-detail/        # Work detail page
├── 2026-03-14-author-detail/      # Author detail page
├── 2026-03-14-pagination/         # Load-more + results counter
├── 2026-03-14-search-filters/     # Sort control
├── 2026-03-14-subject-browse/     # Subject browse page
├── 2026-03-14-favorites/          # Favorites store + page + toggle
├── 2026-03-14-dark-mode/          # Theme system + CSS variables
├── 2026-03-14-loading-skeletons/  # Skeleton loader components
├── 2026-03-14-error-boundary/     # React Error Boundary setup
└── 2026-03-14-playwright-tests/   # Full Playwright E2E test suite
```

Each directory is a snapshot of the spec-driven process: the proposal that defined the feature, the design that planned the implementation, and the tasks that guided the AI through execution.

---

## Project Structure

```
openspec-demo/
├── src/
│   ├── api/            # OpenAPI spec + generated Zodios client
│   ├── components/     # Reusable UI components
│   ├── hooks/          # React Query data-fetching hooks
│   ├── pages/          # Route-level components
│   └── store/          # Zustand stores (search, favorites, theme)
├── tests/              # Playwright E2E tests + mock fixtures
├── openspec/
│   ├── config.yaml     # Project context and conventions
│   ├── specs/          # Living capability specs (12 features)
│   └── changes/
│       └── archive/    # Completed changes (11 entries)
├── .claude/            # Claude Code commands + skills
├── .gemini/            # Gemini CLI commands + skills
└── .github/            # GitHub Copilot prompts + skills
```

---

## Conventions

- **Commits**: [Conventional Commits](https://www.conventionalcommits.org/) (`feat`, `fix`, `chore`, `refactor`, `docs`)
- **Exports**: Named exports everywhere; default exports only for page components
- **Styles**: CSS Modules for all components; no UI library
- **Data fetching**: All async operations through React Query — no raw `useEffect` for data fetching
- **State**: Zustand for global client state; React Query for server state

---

## License

MIT
