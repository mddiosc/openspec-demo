import { test, expect } from '@playwright/test'
import { setupApiMocks } from './helpers/mockApi'

test.beforeEach(async ({ page }) => {
  await setupApiMocks(page)
})

test('render error is caught by boundary', async ({ page }) => {
  // Mock an error by injecting a script that forces a render error in SearchPage
  // Vite might add query params or use different paths, so we use a glob
  await page.route('**/src/pages/SearchPage.tsx*', async (route) => {
    const response = await route.fetch()
    const text = await response.text()
    
    // Inject a throw inside the component
    // We target the function body start
    const errorText = text.replace(
      /export default function SearchPage\(\) \{/,
      'export default function SearchPage() { throw new Error("Simulated render error");'
    )
    
    await route.fulfill({ response, body: errorText })
  })

  await page.goto('/')

  // Verify fallback UI from ErrorBoundary.tsx
  // Using heading by role might be tricky if it hasn't rendered yet or if the text is slightly different
  await expect(page.getByText('Something went wrong')).toBeVisible({ timeout: 10000 })
  await expect(page.getByText('Simulated render error')).toBeVisible()

  // Verify Try again button exists
  await expect(page.getByRole('button', { name: 'Try again' })).toBeVisible()
  
  // Verify back link exists
  await expect(page.getByRole('link', { name: '← Back to search' })).toBeVisible()
})
