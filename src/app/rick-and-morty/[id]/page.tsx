import React from 'react'
import { fetchById, fetchAllIds } from '../../../../src/lib/rm-api'
import { RMCharacter } from '../../../../src/types/rm'
import { notFound } from 'next/navigation'

export const revalidate = 864000 // 10 days

type Props = { params: { id: string } }

export async function generateStaticParams() {
  try {
    // get all ids and generate params
    const ids = await fetchAllIds()
    return ids.map(id => ({ id: String(id) }))
  } catch (err) {
    // If fetching ids fails during build, return an empty array to avoid breaking the build.
    console.error('generateStaticParams failed:', err)
    return []
  }
}

export default async function CharacterPage({ params }: Props) {
  // Guard params
  const id = params?.id
  if (!id) {
    console.error('CharacterPage: missing params.id, returning notFound()')
    return notFound()
  }

  let character: RMCharacter | null = null
  try {
    character = await fetchById(id)
  } catch (err) {
    // During prerender a fetch may fail (API down, rate limit, invalid id, etc.).
    // Return a 404 so the build doesn't crash on a single failing id.
    console.error('fetchById failed for id', id, err)
    return notFound()
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>{character.name}</h1>
      <div style={{ display: 'flex', gap: 20 }}>
        <img src={character.image} alt={character.name} width={300} height={300} loading="lazy" />
        <div>
          <p><strong>Status:</strong> {character.status}</p>
          <p><strong>Species:</strong> {character.species}</p>
          <p><strong>Type:</strong> {character.type || '—'}</p>
          <p><strong>Gender:</strong> {character.gender}</p>
          <p><strong>Origin:</strong> {character.origin?.name}</p>
          <p><strong>Location:</strong> {character.location?.name}</p>
          <p><strong>Episodes:</strong> {character.episode.length}</p>
          <p><strong>Created:</strong> {new Date(character.created).toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}
