import { test, expect } from '@playwright/test'
import { setupApiMocks } from './helpers/mockApi'

test.beforeEach(async ({ page }) => {
  await setupApiMocks(page)
})

test('can toggle theme between light and dark', async ({ page }) => {
  await page.goto('/')
  
  const html = page.locator('html')
  const toggle = page.getByLabel(/Switch to (dark|light) mode/)
  
  const initialTheme = await html.getAttribute('data-theme')
  await toggle.click()
  
  const newTheme = await html.getAttribute('data-theme')
  expect(newTheme).not.toBe(initialTheme)
  
  // Verify colors changed (smoke test)
  if (newTheme === 'dark') {
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(15, 23, 42)') // --bg-secondary in dark
  } else {
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(249, 250, 251)') // --bg-secondary in light
  }
})

test('theme preference persists across reloads', async ({ page }) => {
  await page.goto('/')
  const html = page.locator('html')
  const toggle = page.getByLabel(/Switch to (dark|light) mode/)
  
  // Ensure we are in light mode to start the test deterministically
  const initial = await html.getAttribute('data-theme')
  if (initial === 'dark') {
    await toggle.click()
  }
  await expect(html).toHaveAttribute('data-theme', 'light')
  
  // Click toggle to go dark
  await toggle.click()
  await expect(html).toHaveAttribute('data-theme', 'dark')
  
  // Reload
  await page.reload()
  await expect(html).toHaveAttribute('data-theme', 'dark')
})
