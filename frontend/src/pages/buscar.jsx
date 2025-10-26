import { useState } from 'react'

export default function Buscar() {
  const [termo, setTermo] = useState('')
  const [resultados, setResultados] = useState([])

  const handleBuscar = async () => {
    if (!termo.trim()) return
    const res = await fetch(`/buscar/pratos?nome=${encodeURIComponent(termo)}`)
    const data = await res.json()
    setResultados(data)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Buscar pratos</h2>
      <input
        type="text"
        value={termo}
        onChange={e => setTermo(e.target.value)}
        placeholder="Digite o nome do prato"
        style={{ padding: '0.5rem', width: '300px' }}
      />
      <button onClick={handleBuscar} style={{ marginLeft: '1rem' }}>
        Buscar
      </button>

      <div style={{ marginTop: '2rem' }}>
        {resultados.length === 0 ? (
          <p>Nenhum prato encontrado.</p>
        ) : (
          <ul>
            {resultados.map(prato => (
              <li key={prato.id} style={{ marginBottom: '1rem' }}>
                <strong>{prato.name}</strong> — R$ {prato.price.toFixed(2)}<br />
                <em>{prato.restaurant?.name}</em>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
