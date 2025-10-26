"use client"

import React, { useEffect, useState } from 'react'
import { RMCharacter } from '../types/rm'

type Props = {
  onResults: (items: RMCharacter[]) => void
}

export default function RMSearch({ onResults }: Props) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [type, setType] = useState('')
  const [gender, setGender] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    async function run() {
      const params = new URLSearchParams()
      if (query) params.set('name', query)
      if (status) params.set('status', status)
      if (type) params.set('type', type)
      if (gender) params.set('gender', gender)
      if (!query && !status && !type && !gender) {
        // empty -> do nothing
        return
      }
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/?${params.toString()}`, { signal: controller.signal })
        if (!res.ok) {
          onResults([])
          return
        }
        const data = await res.json()
        onResults(data.results || [])
      } catch (err) {
        if ((err as any).name === 'AbortError') return
        onResults([])
      }
    }
    const t = setTimeout(run, 300)
    return () => {
      clearTimeout(t)
      controller.abort()
    }
  }, [query, status, type, gender, onResults])

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar por nombre" style={{ padding: 8, borderRadius: 6 }} />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="">Estado</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <input value={type} onChange={e => setType(e.target.value)} placeholder="Type" style={{ padding: 8, borderRadius: 6 }} />
      <select value={gender} onChange={e => setGender(e.target.value)}>
        <option value="">Género</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>
    </div>
  )
}
