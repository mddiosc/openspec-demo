import { test, expect } from '@playwright/test'
import { setupApiMocks } from './helpers/mockApi'

test.beforeEach(async ({ page }) => {
  await setupApiMocks(page)
})

test('can favorite and unfavorite a book from search results', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('searchbox').fill('tolkien')
  await page.getByRole('button', { name: 'Search' }).click()
  await expect(page.getByRole('list', { name: 'Search results' })).toBeVisible()

  const firstBook = page.getByRole('listitem').first()
  const favoriteButton = firstBook.getByLabel('Add to favorites')
  
  // Favorite
  await favoriteButton.click()
  await expect(firstBook.getByLabel('Remove from favorites')).toBeVisible()

  // Verify in Favorites page
  await page.getByRole('link', { name: 'Favorites' }).click()
  await expect(page.getByRole('heading', { name: 'Your Favorites' })).toBeVisible()
  await expect(page.getByText('1 book saved')).toBeVisible()
  await expect(page.getByRole('listitem')).toHaveCount(1)

  // Unfavorite from Favorites page
  await page.getByLabel('Remove from favorites').click()
  await expect(page.getByText('0 books saved')).toBeVisible()
  await expect(page.getByText(/You haven't added any favorites yet/)).toBeVisible()
})

test('can favorite a book from detail page', async ({ page }) => {
  await page.goto('/works/OL27482W') // The Hobbit
  
  const favoriteButton = page.getByLabel('Add to favorites')
  await favoriteButton.click()
  await expect(page.getByLabel('Remove from favorites')).toBeVisible()

  // Verify persistence via reload
  await page.reload()
  await expect(page.getByLabel('Remove from favorites')).toBeVisible()

  // Verify in Favorites page
  await page.getByRole('link', { name: 'Favorites' }).click()
  await expect(page.getByRole('heading', { name: 'The Hobbit', level: 3 })).toBeVisible()
})

test('favorites persist across sessions', async ({ page, context }) => {
  await page.goto('/')
  await page.getByRole('searchbox').fill('tolkien')
  await page.getByRole('button', { name: 'Search' }).click()
  
  await page.getByLabel('Add to favorites').first().click()
  
  // Create a new page in the same context (shares localStorage)
  const newPage = await context.newPage()
  await newPage.goto('/favorites')
  await expect(newPage.getByText('1 book saved')).toBeVisible()
})
