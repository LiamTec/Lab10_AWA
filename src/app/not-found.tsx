import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg,#2b0e4a,#4b0e6a)',
      padding: 24,
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: 680,
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          background: '#0b0b0b',
          color: '#fff',
          padding: 24,
          borderRadius: 8,
          boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
          width: '100%'
        }}>
          <h2 style={{ margin: 0, fontSize: 22 }}>Página no encontrada</h2>
          <p style={{ marginTop: 8, marginBottom: 0, color: '#d1d5db' }}>
            No encontramos la página que buscas. Puede que el enlace esté roto o que el recurso ya no exista.
          </p>

          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <Link href="/pokemon" style={{ textDecoration: 'none' }}>
              <button style={{
                background: '#7c3aed',
                color: '#fff',
                border: 'none',
                padding: '10px 14px',
                borderRadius: 6,
                cursor: 'pointer'
              }}>
                Volver a Pokédex
              </button>
            </Link>

            <Link href="/" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'transparent',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.12)',
                padding: '10px 14px',
                borderRadius: 6,
                cursor: 'pointer'
              }}>
                Ir al inicio
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
