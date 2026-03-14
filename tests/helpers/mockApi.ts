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
  subjectResponse?: object
  delay?: number
}

export async function setupApiMocks(page: Page, overrides: MockOverrides = {}) {
  const searchTolkien = loadFixture('search-tolkien.json')
  const searchTolkienP2 = loadFixture('search-tolkien-p2.json')
  const searchEmpty = loadFixture('search-empty.json')
  const workHobbit = loadFixture('work-hobbit.json')
  const authorTolkien = loadFixture('author-tolkien.json')
  const authorTolkienWorks = loadFixture('author-tolkien-works.json')
  const subjectFantasy = loadFixture('subject-fantasy.json')

  const fulfillWithDelay = async (route: any, json: object) => {
    if (overrides.delay) {
      await new Promise(f => setTimeout(f, overrides.delay))
    }
    return route.fulfill({ json })
  }

  await page.route('https://openlibrary.org/search.json**', (route) => {
    const url = new URL(route.request().url())
    const q = url.searchParams.get('q') ?? ''
    const offset = Number(url.searchParams.get('offset') ?? 0)

    let body = searchTolkien
    if (overrides.searchResponse) body = overrides.searchResponse
    else if (q.toLowerCase().includes('zzznoresults')) body = searchEmpty
    else if (offset > 0) body = searchTolkienP2

    return fulfillWithDelay(route, body)
  })

  await page.route('https://openlibrary.org/subjects/**', (route) => {
    return fulfillWithDelay(route, overrides.subjectResponse ?? subjectFantasy)
  })

  await page.route('https://openlibrary.org/works/**', (route) => {
    return fulfillWithDelay(route, overrides.workResponse ?? workHobbit)
  })

  await page.route('https://openlibrary.org/authors/**', (route) => {
    if (route.request().url().includes('/works.json')) {
      return fulfillWithDelay(route, overrides.authorWorksResponse ?? authorTolkienWorks)
    }
    return fulfillWithDelay(route, overrides.authorResponse ?? authorTolkien)
  })

  // Block cover images to speed up tests
  await page.route('https://covers.openlibrary.org/**', (route) => {
    return route.abort()
  })
}
