import { test, expect } from '@playwright/test'
import { setupApiMocks } from './helpers/mockApi'

test.beforeEach(async ({ page }) => {
  await setupApiMocks(page)
})

test('subject tag on book detail links to subject page', async ({ page }) => {
  await page.goto('/works/OL27482W')
  const fantasyTag = page.getByRole('link', { name: 'Fantasy' })
  await expect(fantasyTag).toBeVisible()
  await expect(fantasyTag).toHaveAttribute('href', '/subjects/Fantasy')
})

test('navigate to subject page via tag click', async ({ page }) => {
  await page.goto('/works/OL27482W')
  await page.getByRole('link', { name: 'Fantasy' }).click()

  await expect(page).toHaveURL(/\/subjects\/Fantasy/)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('subject page shows work count and grid', async ({ page }) => {
  await page.goto('/subjects/fantasy')

  await expect(page.getByText(/14[,.]?328/)).toBeVisible()
  await expect(page.getByRole('listitem').first()).toBeVisible()
})

test('subject page shows book titles from fixture', async ({ page }) => {
  await page.goto('/subjects/fantasy')

  await expect(page.getByText("The Hobbit")).toBeVisible()
  await expect(page.getByText("Alice's Adventures in Wonderland")).toBeVisible()
})

test('subject page book cards link to work detail pages', async ({ page }) => {
  await page.goto('/subjects/fantasy')

  const hobbitItem = page.getByRole('listitem').filter({ hasText: 'The Hobbit' }).first()
  await expect(hobbitItem.getByRole('link')).toHaveAttribute('href', '/works/OL27482W')
})

test('subject page back button navigates to previous page', async ({ page }) => {
  await page.goto('/works/OL27482W')
  await page.getByRole('link', { name: 'Fantasy' }).click()
  await expect(page).toHaveURL(/\/subjects\//)

  await page.getByRole('button', { name: '← Back' }).click()
  await expect(page).toHaveURL(/\/works\/OL27482W/)
})
