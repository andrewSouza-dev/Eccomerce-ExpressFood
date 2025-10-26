function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    const res = await fetch('/auth/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    localStorage.setItem('token', data.token)
    // Redireciona para painel
  }

  return (
    <form onSubmit={handleLogin}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
      <button type="submit">Entrar</button>
    </form>
  )
}