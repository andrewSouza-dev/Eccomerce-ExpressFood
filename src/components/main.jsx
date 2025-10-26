import { CarrinhoProvider } from './context/CarrinhoContext'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/painel" element={
          <PrivateRoute>
            <PainelComidas />
          </PrivateRoute>
        } />
        <Route path="/carrinho" element={
          <PrivateRoute>
            <Carrinho userId={userId} />
          </PrivateRoute>
        } />
        <Route path="/pedidos" element={
          <PrivateRoute>
            <PainelPedidos />
          </PrivateRoute>
        } />
      </Routes>
    </>
  )
}

<CarrinhoProvider>
  <App />
</CarrinhoProvider>
