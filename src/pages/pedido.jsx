import { useEffect, useState } from 'react'

export default function PainelPedidos() {
  const [pedidos, setPedidos] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch('/orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setPedidos)
  }, [])

  return (
    <div>
      <h2>Meus pedidos</h2>
      {pedidos.map(p => (
        <div key={p.id} style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}>
          <p><strong>Status:</strong> {p.status}</p>
          <p><strong>Total:</strong> R$ {p.total.toFixed(2)}</p>
          <p><strong>Data:</strong> {new Date(p.createdAt).toLocaleDateString()}</p>
          <h4>Itens:</h4>
          <ul>
            {p.items.map(item => (
              <li key={item.id}>
                {item.product.name} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
