import { RMResponse, RMCharacter } from '../types/rm'

const BASE = 'https://rickandmortyapi.com/api/character'

export async function fetchAll(page = 1): Promise<RMResponse> {
  const res = await fetch(`${BASE}?page=${page}`, { next: { revalidate: 864000 } }) // 10 days in seconds
  if (!res.ok) throw new Error('Failed to fetch characters')
  return res.json()
}

export async function fetchById(id: string | number): Promise<RMCharacter> {
  const res = await fetch(`${BASE}/${id}`, { next: { revalidate: 864000 } })
  if (!res.ok) throw new Error('Character not found')
  return res.json()
}

export async function searchByName(name: string): Promise<RMResponse> {
  const res = await fetch(`${BASE}/?name=${encodeURIComponent(name)}`, { next: { revalidate: 864000 } })
  if (!res.ok) throw new Error('No results')
  return res.json()
}

export async function fetchAllIds(): Promise<number[]> {
  // fetch first page to get count, then fetch all pages
  const first = await fetchAll(1)
  const total = first.info.count
  const pages = first.info.pages
  const ids: number[] = []
  // collect results from first
  first.results.forEach(r => ids.push(r.id))
  // fetch remaining pages
  for (let p = 2; p <= pages; p++) {
    const page = await fetchAll(p)
    page.results.forEach(r => ids.push(r.id))
  }
  return ids
}
