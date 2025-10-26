import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoute() {
  const token = localStorage.getItem('token') // ou use contexto de auth

  return token ? <Outlet /> : <Navigate to="/login" />
}
