import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Index() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      navigate('/home')
    }
  }, [token])

  return (
    <div>
      <h1>Bem-vindo ao FoodExpress</h1>
      <p>Faça login ou registre-se para começar</p>
      <Link to="/login"><button>Login</button></Link>
      <Link to="/register"><button>Registrar</button></Link>
    </div>
  )
}
