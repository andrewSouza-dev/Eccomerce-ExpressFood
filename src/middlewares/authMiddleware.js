const jwt = require('jsonwebtoken')
const prisma = require('../generated/prisma')

module.exports = async (req, res, next) => {
    const token = req.headers.authorization?.split('')[1]
    if(!token) return res.status(401).json({ error: 'Token ausente' })

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.user = await prisma.user.findUnique({ where: { id: decoded.id } })
        next()
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' })
        next(error)
    }
}


