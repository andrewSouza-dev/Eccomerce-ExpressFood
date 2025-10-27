const jwt = require('jsonwebtoken')
const prisma = require('../database')

// Middleware para proteger as rotas
const authentication = async (req, res, next) => {
    const headerToken = req.headers.authorization?.split(' ')[1] // Extrai token do header Authorization
    const sessionToken = req.session?.token
    const token = headerToken || sessionToken

    if (!token) {
        // Se for rota de view, redireciona
    if (req.originalUrl.startsWith('/home') || req.originalUrl.startsWith('/cart')) {
        return res.redirect('/login')
    }
        return res.status(401).json({ error: 'Token ausente' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY) // Verifica e decodifica o token
        req.user = await prisma.user.findUnique({ where: { id: decoded.id } })
        if (!user) throw new Error('Usuário não encontrado')
        next()
    } catch {
        if (req.originalUrl.startsWith('/home') || req.originalUrl.startsWith('/cart')) {
        return res.redirect('/login')
        }

        return res.status(401).json({ error: 'Token inválido' })
    }
}

const isAdmin = async (req, res, next) => {
    if (!req.user?.isAdmin) {
        return res.status(403).json({ 
        error: `Acesso negado: ${req.user?.name} não é administrador`
        })
    }
    next()
}

module.exports = { authentication, isAdmin }
