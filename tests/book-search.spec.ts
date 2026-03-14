import { test, expect } from '@playwright/test'
import { setupApiMocks } from './helpers/mockApi'

test.beforeEach(async ({ page }) => {
  await setupApiMocks(page)
})

test('search returns results — grid and counter visible', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('searchbox').fill('tolkien')
  await page.getByRole('button', { name: 'Search' }).click()

  await expect(page.getByRole('list', { name: 'Search results' })).toBeVisible()
  await expect(page.getByText(/Showing \d+ of \d+ results/)).toBeVisible()
  await expect(page.getByRole('listitem').first()).toBeVisible()
})

test('search shows book titles from fixture', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('searchbox').fill('tolkien')
  await page.getByRole('button', { name: 'Search' }).click()

  await expect(page.getByText('The Hobbit')).toBeVisible()
  await expect(page.getByText('The Lord of the Rings')).toBeVisible()
})

test('empty state — no results message shown', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('searchbox').fill('zzznoresults')
  await page.getByRole('button', { name: 'Search' }).click()

  await expect(page.getByText(/No books found/)).toBeVisible()
  await expect(page.getByRole('list', { name: 'Search results' })).not.toBeVisible()
})

test('empty query — no API request, hint remains', async ({ page }) => {
  const requests: string[] = []
  page.on('request', (req) => {
    if (req.url().includes('openlibrary.org/search')) requests.push(req.url())
  })

  await page.goto('/')
  await page.getByRole('button', { name: 'Search' }).click()

  await expect(page.getByText(/Type a title/)).toBeVisible()
  expect(requests).toHaveLength(0)
})
