function PainelComidas() {
  const [produtos, setProdutos] = useState([])
  const [busca, setBusca] = useState('')

  useEffect(() => {
    fetch(`/buscar/pratos?nome=${busca}`)
      .then(res => res.json())
      .then(setProdutos)
  }, [busca])

  return (
    <>
      <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar prato..." />
      <MapaRestaurantes restaurantes={extrairRestaurantes(produtos)} />
      {produtos.map(p => <CardProduto key={p.id} produto={p} />)}
    </>
  )
}
