const jwt = require('jsonwebtoken')
const prisma = require('../generated/prisma')

// Middleware para proteger as rotas
autentication = async (req, res, next) => {
    const token = req.headers.authorization?.split('')[1] // Extrai token do header Authorization
    if (!token) return res.status(401).json({ error: 'Token ausente' }) // Se não houver token, bloqueia

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY) // Verifica e decodifica o token
        req.user = await prisma.user.findUnique({ where: { id: decoded.id } })
        next()
    } catch {
        res.status(401).json({ error: 'Token inválido' }) // Se token for inválido, bloqueia
    }
}

isAdmin = async (req, res, next) => {
    if (!req.user?.isAdmin) {
        return res.status(403).json({ error: 'Acesso negado: apenas administradores!'})
    }
    next()
}

module.exports = { autentication, isAdmin }
