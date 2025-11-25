const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
  // Rotas públicas que não exigem login
  const publicPaths = ['/auth/login', '/auth/cadastro', '/auth/logout']

  if (publicPaths.includes(req.path)) {
    return next()
  }

  const sessionUser = req.session?.user
  const token = req.session?.token || req.headers.authorization?.split(' ')[1]

  if (sessionUser) {
    req.user = sessionUser
    return next()
  }

  if (!token) {
    console.log('🚫 Nenhum token/sessão encontrada — redirecionando para /auth/login')
    return res.redirect('/auth/login')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    req.user = decoded
    next()
  } catch (error) {
    console.log('❌ Token inválido:', error.message)
    return res.redirect('/auth/login')
  }
}

const isAdmin = (req, res, next) => {
  const user = req.session.user
  if (!user || user.role !== 'ADMIN') {
    return res.status(403).send('Acesso negado')
  }
  next()
}

module.exports = { authentication, isAdmin }
