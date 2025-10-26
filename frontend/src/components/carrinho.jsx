import { useCarrinho } from '../context/CarrinhoContext'

export default function Carrinho({ userId }) {
  const { itens, removerItem, limparCarrinho } = useCarrinho()

  const finalizarPedido = async () => {
    const token = localStorage.getItem('token')
    const res = await fetch('/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        userId,
        items: itens.map(i => ({
          productId: i.id,
          quantity: i.quantity
        }))
      })
    })

    if (res.ok) {
      alert('Pedido realizado com sucesso!')
      limparCarrinho()
    } else {
      alert('Erro ao finalizar pedido')
    }
  }

  return (
    <div>
      <h2>Carrinho</h2>
      {itens.map(i => (
        <div key={i.id}>
          <p>{i.name} x {i.quantity}</p>
          <button onClick={() => removerItem(i.id)}>Remover</button>
        </div>
      ))}
      <button onClick={finalizarPedido}>Finalizar pedido</button>
    </div>
  )
}
