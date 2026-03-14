## 1. Store

- [x] 1.1 Add `sort: "relevance" | "new" | "old"` and `setSort: (sort: ...) => void` to `src/store/searchStore.ts`, default `"relevance"`

## 2. Hook

- [x] 2.1 Update `src/hooks/useBookSearch.ts` — add `sort` param to query key: `["books", query, sort]`
- [x] 2.2 Pass `sort` to `searchBooks` queries — send `undefined` when sort is `"relevance"`, otherwise pass the value

## 3. SortControl component

- [x] 3.1 Create `src/components/SortControl.tsx` — `<select>` with options: Relevance (`relevance`), Newest first (`new`), Oldest first (`old`); reads and writes `useSearchStore`
- [x] 3.2 Create `src/components/SortControl.module.css` — inline label + select, minimal styling

## 4. SearchPage

- [x] 4.1 Import and render `<SortControl />` in `src/pages/SearchPage.tsx` next to the results counter, only when `docs.length > 0`
- [x] 4.2 Update `src/pages/SearchPage.module.css` — results header row with counter left, sort control right

## 5. Verification

- [x] 5.1 Run `npm run build` — zero TypeScript errors
- [x] 5.2 Search "tolkien", change sort to "Newest first" — verify results reorder and counter resets to "Showing 20 of N"
- [x] 5.3 Navigate to a book detail and back — verify sort selection is preserved
