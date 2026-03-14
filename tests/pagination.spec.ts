import { test, expect } from '@playwright/test'
import { setupApiMocks } from './helpers/mockApi'

test.beforeEach(async ({ page }) => {
  await setupApiMocks(page)
})

async function searchAndWaitForResults(page: Parameters<typeof setupApiMocks>[0]) {
  await page.goto('/')
  await page.getByRole('searchbox').fill('tolkien')
  await page.getByRole('button', { name: 'Search' }).click()
  await expect(page.getByRole('list', { name: 'Search results' })).toBeVisible()
}

test('load more appends results and counter updates', async ({ page }) => {
  await searchAndWaitForResults(page)

  const initialCount = await page.getByRole('listitem').count()
  await expect(page.getByText(`Showing ${initialCount} of 100 results`)).toBeVisible()

  await page.getByRole('button', { name: 'Load more' }).click()
  // Wait for new results to appear
  await expect(page.getByRole('listitem')).toHaveCount(initialCount + 2, { timeout: 10000 })

  const newCount = await page.getByRole('listitem').count()
  expect(newCount).toBeGreaterThan(initialCount)
  await expect(page.getByText(`Showing ${newCount} of 100 results`)).toBeVisible()
})

test('load more button visible when more results available', async ({ page }) => {
  await searchAndWaitForResults(page)
  await expect(page.getByRole('button', { name: 'Load more' })).toBeVisible()
})

test('load more button hidden when all results loaded', async ({ page }) => {
  await setupApiMocks(page, {
    searchResponse: {
      numFound: 2,
      start: 0,
      numFoundExact: true,
      docs: [
        { key: '/works/OL1W', title: 'Book One', author_name: ['Author A'], cover_i: null, first_publish_year: 2000 },
        { key: '/works/OL2W', title: 'Book Two', author_name: ['Author B'], cover_i: null, first_publish_year: 2001 },
      ],
    },
  })

  await page.goto('/')
  await page.getByRole('searchbox').fill('tolkien')
  await page.getByRole('button', { name: 'Search' }).click()
  await expect(page.getByText('Book One')).toBeVisible()

  await expect(page.getByRole('button', { name: 'Load more' })).not.toBeVisible()
})
