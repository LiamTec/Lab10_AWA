import React from 'react'
import { fetchById, fetchAllIds } from '../../../../src/lib/rm-api'
import { RMCharacter } from '../../../../src/types/rm'

export const revalidate = 864000 // 10 days

type Props = { params: { id: string } }

export async function generateStaticParams() {
  // get all ids and generate params
  const ids = await fetchAllIds()
  return ids.map(id => ({ id: String(id) }))
}

export default async function CharacterPage({ params }: Props) {
  const character: RMCharacter = await fetchById(params.id)

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
