import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import Navbar from './components/navbar'

import Index from './pages/index'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import PainelComidas from './pages/painelComidas'
import PainelPedidos from './pages/pedido'
import Buscar from './pages/buscar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Rotas públicas */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Rotas privadas */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/painel" element={<PainelComidas />} />
          <Route path="/pedido" element={<PainelPedidos />} />
          <Route path="/buscar" element={<Buscar />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Routes>
    </>
  )
}

export default App
