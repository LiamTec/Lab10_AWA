"use client"

import React from 'react'
import { RMCharacter } from '../types/rm'
import RMSearch from './RMSearch'
import Link from 'next/link'

export default function ClientSearchWrapper({ initial }: { initial: RMCharacter[] }) {
  const [items, setItems] = React.useState<RMCharacter[]>(initial)

  return (
    <div>
      <RMSearch onResults={results => setItems(results.length ? results : initial)} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 12 }}>
        {items.map(p => (
          <Link key={p.id} href={`/rick-and-morty/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ background: '#fff', borderRadius: 8, padding: 8, textAlign: 'center' }}>
              <img src={p.image} alt={p.name} loading="lazy" style={{ width: '100%', borderRadius: 6 }} />
              <div style={{ marginTop: 8 }}>
                <strong>{p.name}</strong>
                <div style={{ fontSize: 12, color: '#555' }}>{p.species} — {p.status}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
