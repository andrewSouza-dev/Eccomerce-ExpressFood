const jwt = require('jsonwebtoken')
const prisma = require('../database')

// Middleware para proteger rotas autenticadas
const authentication = async (req, res, next) => {
  const headerToken = req.headers.authorization?.split(' ')[1] // Token via header
  const sessionToken = req.session?.token // Token via sessão
  const token = headerToken || sessionToken

  if (!token) {
    // Se for rota de view, redireciona para login
    if (req.originalUrl.startsWith('/home') || req.originalUrl.startsWith('/cart')) {
      return res.redirect('/login')
    }

    return res.status(401).json({ error: 'Token ausente' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY) // Verifica token
    req.user = await prisma.user.findUnique({ where: { id: decoded.id } })

    if (!req.user) throw new Error('Usuário não encontrado')

    next()
  } catch (error) {
    console.error('Erro na autenticação:', error)

    if (req.originalUrl.startsWith('/home') || req.originalUrl.startsWith('/cart')) {
      return res.redirect('/login')
    }

    return res.status(401).json({ error: 'Token inválido' })
  }
}

// Middleware para verificar se o usuário é administrador
const isAdmin = async (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({
      error: `Acesso negado: ${req.user?.name || 'Usuário'} não é administrador`
    })
  }
  next()
}

module.exports = { authentication, isAdmin }
