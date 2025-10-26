import React from 'react'
import { fetchAll } from '../../../src/lib/rm-api'
import { RMCharacter } from '../../../src/types/rm'
import ClientSearchWrapper from '../../components/ClientSearchWrapper'

export const revalidate = 864000 // 10 days

export default async function Page() {
	const data = await fetchAll(1)
	const characters: RMCharacter[] = data.results

	return (
		<div style={{ padding: 24 }}>
			<h1>Rick and Morty - Personajes</h1>
			<ClientSearchWrapper initial={characters} />
		</div>
	)
}

