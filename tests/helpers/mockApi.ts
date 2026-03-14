import type { Page } from '@playwright/test'
import { readFileSync } from 'fs'
import { join } from 'path'

function loadFixture(name: string) {
  return JSON.parse(readFileSync(join(import.meta.dirname, '../mocks', name), 'utf-8'))
}

type MockOverrides = {
  searchResponse?: object
  workResponse?: object
  authorResponse?: object
  authorWorksResponse?: object
}

export async function setupApiMocks(page: Page, overrides: MockOverrides = {}) {
  const searchTolkien = loadFixture('search-tolkien.json')
  const searchTolkienP2 = loadFixture('search-tolkien-p2.json')
  const searchEmpty = loadFixture('search-empty.json')
  const workHobbit = loadFixture('work-hobbit.json')
  const authorTolkien = loadFixture('author-tolkien.json')
  const authorTolkienWorks = loadFixture('author-tolkien-works.json')

  await page.route('https://openlibrary.org/search.json**', (route) => {
    const url = new URL(route.request().url())
    const q = url.searchParams.get('q') ?? ''
    const offset = Number(url.searchParams.get('offset') ?? 0)

    if (overrides.searchResponse) {
      return route.fulfill({ json: overrides.searchResponse })
    }
    if (q.toLowerCase().includes('zzznoresults')) {
      return route.fulfill({ json: searchEmpty })
    }
    if (offset > 0) {
      return route.fulfill({ json: searchTolkienP2 })
    }
    return route.fulfill({ json: searchTolkien })
  })

  await page.route('https://openlibrary.org/works/**', (route) => {
    return route.fulfill({ json: overrides.workResponse ?? workHobbit })
  })

  // Register works before authors — Playwright uses last-registered route first
  await page.route('https://openlibrary.org/authors/**', (route) => {
    if (route.request().url().includes('/works.json')) {
      return route.fulfill({ json: overrides.authorWorksResponse ?? authorTolkienWorks })
    }
    return route.fulfill({ json: overrides.authorResponse ?? authorTolkien })
  })

  // Block cover images to speed up tests
  await page.route('https://covers.openlibrary.org/**', (route) => {
    return route.abort()
  })
}
