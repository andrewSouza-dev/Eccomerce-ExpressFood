import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [restaurantes, setRestaurantes] = useState([])

  useEffect(() => {
    fetch('/restaurants')
      .then(res => res.json())
      .then(setRestaurantes)
  }, [])

  return (
    <div>
      <h2>Restaurantes em destaque</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {restaurantes.map(r => (
          <div key={r.id} style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
            <img src={r.image} alt={r.name} style={{ width: '100%' }} />
            <h3>{r.name}</h3>
            <p>{r.description}</p>
            <p><strong>Preço médio:</strong> R$ {r.price.toFixed(2)}</p>
            <Link to="/painel">Ver pratos</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
