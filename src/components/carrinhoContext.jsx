import { createContext, useContext, useState } from 'react'

const CarrinhoContext = createContext()

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([])

  const adicionarItem = (produto) => {
    setItens(prev => {
      const existente = prev.find(i => i.id === produto.id)
      if (existente) {
        return prev.map(i =>
          i.id === produto.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...produto, quantity: 1 }]
    })
  }

  const removerItem = (id) => {
    setItens(prev => prev.filter(i => i.id !== id))
  }

  const limparCarrinho = () => setItens([])

  return (
    <CarrinhoContext.Provider value={{ itens, adicionarItem, removerItem, limparCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  )
}

export const useCarrinho = () => useContext(CarrinhoContext)
