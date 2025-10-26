import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
      <Link to="/">Início</Link>
      {token ? (
        <>
          <Link to="/painel">Painel de Comidas</Link>
          <Link to="/carrinho">Carrinho</Link>
          <Link to="/pedidos">Meus Pedidos</Link>
          <button onClick={handleLogout}>Sair</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Cadastro</Link>
        </>
      )}
    </nav>
  )
}
