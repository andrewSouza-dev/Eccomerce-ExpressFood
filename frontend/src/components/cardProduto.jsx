import { useCarrinho } from '../context/CarrinhoContext'

function CardProduto({ produto }) {
  const { adicionarItem } = useCarrinho()

  return (
    <div>
      <h3>{produto.name}</h3>
      <p>R$ {produto.price.toFixed(2)}</p>
      <button onClick={() => adicionarItem(produto)}>Adicionar ao carrinho</button>
    </div>
  )
}
