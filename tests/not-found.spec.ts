import { test, expect } from '@playwright/test'
import { setupApiMocks } from './helpers/mockApi'

test.beforeEach(async ({ page }) => {
  await setupApiMocks(page)
})

test('unknown route shows not found page', async ({ page }) => {
  await page.goto('/this-route-does-not-exist')
  
  await expect(page.getByRole('heading', { name: '404' })).toBeVisible()
  await expect(page.getByText("We couldn't find the page")).toBeVisible()
  
  await page.getByRole('link', { name: '← Back to search' }).click()
  await expect(page).toHaveURL('/')
})
