import { test, expect } from '@playwright/test'
import { setupApiMocks } from './helpers/mockApi'

test.beforeEach(async ({ page }) => {
  await setupApiMocks(page)
})

test('clicking author link navigates to author page', async ({ page }) => {
  await page.goto('/works/OL27482W')
  await page.getByRole('link', { name: 'J.R.R. Tolkien' }).click()

  await expect(page).toHaveURL(/\/authors\/OL26320A/)
  await expect(page.getByRole('heading', { name: 'J.R.R. Tolkien', level: 1 })).toBeVisible()
})

test('author page shows bio', async ({ page }) => {
  await page.goto('/authors/OL26320A')
  await expect(page.getByText(/English writer, poet, philologist/)).toBeVisible()
})

test('author page shows birth and death dates', async ({ page }) => {
  await page.goto('/authors/OL26320A')
  await expect(page.getByText(/3 January 1892/)).toBeVisible()
  await expect(page.getByText(/2 September 1973/)).toBeVisible()
})

test('author page shows works grid', async ({ page }) => {
  await page.goto('/authors/OL26320A')
  const worksSection = page.getByRole('heading', { name: 'Works' })
  await expect(worksSection).toBeVisible()
  // works grid items are listitem elements
  await expect(page.getByRole('listitem').first()).toBeVisible()
  // check fixture titles appear somewhere on page
  await expect(page.getByRole('heading', { name: 'The Hobbit', level: 3 }).first()).toBeVisible()
})

test('author page — work cards link to detail pages', async ({ page }) => {
  await page.goto('/authors/OL26320A')
  await expect(page.getByRole('heading', { name: 'The Hobbit', level: 3 }).first()).toBeVisible()
  const hobbitItem = page.getByRole('listitem').filter({ hasText: 'The Hobbit' }).first()
  const hobbitLink = hobbitItem.getByRole('link')
  await expect(hobbitLink).toHaveAttribute('href', '/works/OL27482W')
})

test('back button returns to book detail', async ({ page }) => {
  await page.goto('/works/OL27482W')
  await page.getByRole('link', { name: 'J.R.R. Tolkien' }).click()
  await expect(page).toHaveURL(/\/authors\//)

  await page.getByRole('button', { name: '← Back' }).click()
  await expect(page).toHaveURL(/\/works\/OL27482W/)
})
