import { test, expect } from '@playwright/test'
import { setupApiMocks } from './helpers/mockApi'

test.beforeEach(async ({ page }) => {
  await setupApiMocks(page)
})

test('sort control hidden with no query', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByLabel('Sort:')).not.toBeVisible()
})

test('sort control visible after search returns results', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('searchbox').fill('tolkien')
  await page.getByRole('button', { name: 'Search' }).click()

  await expect(page.getByRole('list', { name: 'Search results' })).toBeVisible()
  await expect(page.getByLabel('Sort:')).toBeVisible()
})

test('sort control has correct options', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('searchbox').fill('tolkien')
  await page.getByRole('button', { name: 'Search' }).click()
  await expect(page.getByRole('list', { name: 'Search results' })).toBeVisible()

  const select = page.getByLabel('Sort:')
  await expect(select).toBeVisible()
  await expect(select.getByRole('option', { name: 'Relevance' })).toBeAttached()
  await expect(select.getByRole('option', { name: 'Newest first' })).toBeAttached()
  await expect(select.getByRole('option', { name: 'Oldest first' })).toBeAttached()
})

test('changing sort triggers new API request', async ({ page }) => {
  const sortRequests: string[] = []
  page.on('request', (req) => {
    if (req.url().includes('openlibrary.org/search') && req.url().includes('sort=')) {
      sortRequests.push(req.url())
    }
  })

  await page.goto('/')
  await page.getByRole('searchbox').fill('tolkien')
  await page.getByRole('button', { name: 'Search' }).click()
  await expect(page.getByRole('list', { name: 'Search results' })).toBeVisible()

  await page.getByLabel('Sort:').selectOption('new')
  await expect(page.getByRole('list', { name: 'Search results' })).toBeVisible()

  expect(sortRequests.some((url) => url.includes('sort=new'))).toBe(true)
})
