"use client"

import React from "react"
import Link from "next/link"

type ErrorProps = {
  error: Error
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  // Registrar para debugging; en producción reemplazar por un servicio de reporte
  React.useEffect(() => {
    console.error("GlobalError caught:", error)
  }, [error])

  const [open, setOpen] = React.useState(false)

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
          <h2 style={{ margin: 0, fontSize: 20 }}>Error en Pokédex</h2>
          <p style={{ marginTop: 8, marginBottom: 0, color: '#d1d5db' }}>
            No pudimos cargar los datos de Pokémon. Intenta recargar o vuelve a la página principal.
          </p>

          <div style={{ marginTop: 12 }}>
            <button onClick={() => setOpen(s => !s)} style={{
              background: '#111827',
              color: '#d1d5db',
              border: '1px solid #374151',
              padding: '8px 12px',
              borderRadius: 6,
              cursor: 'pointer'
            }}>
              ▾ Ver errores
            </button>
            {open && (
              <div style={{
                marginTop: 8,
                background: '#111827',
                padding: 12,
                borderRadius: 6,
                color: '#f8fafc'
              }}>
                <strong>Detalles:</strong>
                <pre style={{ whiteSpace: 'pre-wrap', marginTop: 8, fontSize: 13 }}>
{error?.message ?? 'Error desconocido'}
{error?.stack ? '\n\n' + error.stack : ''}
                </pre>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <button onClick={() => reset()} style={{
              background: '#7c3aed',
              color: '#fff',
              border: 'none',
              padding: '10px 14px',
              borderRadius: 6,
              cursor: 'pointer'
            }}>
              Reintentar
            </button>

            <Link href="/pokemon" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'transparent',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.12)',
                padding: '10px 14px',
                borderRadius: 6,
                cursor: 'pointer'
              }}>
                Volver a Pokédex
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
