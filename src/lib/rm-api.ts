import { RMResponse, RMCharacter } from '../types/rm'

const BASE = 'https://rickandmortyapi.com/api/character'
const REVALIDATE = 864000 // 10 days

async function fetchWithRetry(url: string, opts: RequestInit = {}, retries = 2, backoff = 300): Promise<Response> {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, opts)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res
    } catch (err) {
      if (i === retries) throw err
      // small backoff
      await new Promise(r => setTimeout(r, backoff * (i + 1)))
    }
  }
  throw new Error('Unreachable')
}

export async function fetchAll(page = 1): Promise<RMResponse> {
  const res = await fetchWithRetry(`${BASE}?page=${page}`, { next: { revalidate: REVALIDATE } })
  return res.json()
}

export async function fetchById(id?: string | number): Promise<RMCharacter> {
  // Defensive: ensure callers don't pass undefined/null which would call the API with
  // a path like `/character/undefined` and potentially receive 403/400 responses.
  if (id === undefined || id === null || String(id).trim() === '') {
    throw new Error(`fetchById called with invalid id: ${String(id)}`)
  }

  const res = await fetchWithRetry(`${BASE}/${id}`, { next: { revalidate: REVALIDATE } })
  return res.json()
}

export async function searchByName(name: string): Promise<RMResponse> {
  const res = await fetchWithRetry(`${BASE}/?name=${encodeURIComponent(name)}`, { next: { revalidate: REVALIDATE } })
  return res.json()
}

// Simple concurrency limiter for Promises
async function mapWithConcurrency<T, R>(items: T[], fn: (t: T) => Promise<R>, concurrency = 5): Promise<R[]> {
  const results: R[] = []
  const executing: Promise<void>[] = []

  for (const item of items) {
    const p = (async () => {
      const r = await fn(item)
      results.push(r)
    })()
    executing.push(p)
    if (executing.length >= concurrency) {
      await Promise.race(executing)
      // remove settled
      for (let i = executing.length - 1; i >= 0; i--) {
        if ((executing[i] as any).settled) executing.splice(i, 1)
      }
    }
  }
  await Promise.all(executing)
  return results
}

export async function fetchAllIds(): Promise<number[]> {
  // fetch first page to get count and pages
  const first = await fetchAll(1)
  const pages = first.info.pages
  const ids: number[] = []
  first.results.forEach(r => ids.push(r.id))

  if (pages <= 1) return ids

  const pageNumbers = [] as number[]
  for (let p = 2; p <= pages; p++) pageNumbers.push(p)

  // fetch pages in parallel with limited concurrency
  const pageResults = await mapWithConcurrency<number, RMResponse>(pageNumbers, async (p) => {
    return fetchAll(p)
  }, 5)

  pageResults.forEach(pr => pr.results.forEach(r => ids.push(r.id)))
  return ids
}
