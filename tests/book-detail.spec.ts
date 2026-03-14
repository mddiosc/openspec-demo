import { test, expect } from '@playwright/test'
import { setupApiMocks } from './helpers/mockApi'

test.beforeEach(async ({ page }) => {
  await setupApiMocks(page)
})

test('clicking a book card navigates to detail page', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('searchbox').fill('tolkien')
  await page.getByRole('button', { name: 'Search' }).click()
  await expect(page.getByRole('list', { name: 'Search results' })).toBeVisible()

  const hobbitItem = page.getByRole('listitem').filter({ hasText: 'The Hobbit' }).first()
  await hobbitItem.click()

  await expect(page).toHaveURL(/\/works\/OL27482W/)
  await expect(page.getByRole('heading', { name: 'The Hobbit', level: 1 })).toBeVisible()
})

test('book detail shows description', async ({ page }) => {
  await page.goto('/works/OL27482W')
  await expect(page.getByText(/tale of high adventure/)).toBeVisible()
})

test('book detail shows subjects as tags', async ({ page }) => {
  await page.goto('/works/OL27482W')
  await expect(page.getByText('Fantasy')).toBeVisible()
  await expect(page.getByText('Dragons')).toBeVisible()
})

test('book detail shows author as a link to author page', async ({ page }) => {
  await page.goto('/works/OL27482W')
  const authorLink = page.getByRole('link', { name: 'J.R.R. Tolkien' })
  await expect(authorLink).toBeVisible()
  await expect(authorLink).toHaveAttribute('href', '/authors/OL26320A')
})

test('back to results preserves search query', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('searchbox').fill('tolkien')
  await page.getByRole('button', { name: 'Search' }).click()
  await expect(page.getByRole('list', { name: 'Search results' })).toBeVisible()

  const hobbitItem = page.getByRole('listitem').filter({ hasText: 'The Hobbit' }).first()
  await hobbitItem.click()
  await expect(page).toHaveURL(/\/works\//)

  await page.getByRole('link', { name: '← Back to results' }).click()
  await expect(page).toHaveURL('/')
  await expect(page.getByRole('searchbox')).toHaveValue('tolkien')
})
