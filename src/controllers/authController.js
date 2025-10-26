const prisma = require('../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Função para cadastrar novo usuário
cadastrar = async (req, res, next) => {
    try {
        const { name, email, password } = req.body // Extrai dados do corpo da requisição
        const hash = await bcrypt.hash(password, 10) // Criptografa a senha com 10 rounds

        const user = await prisma.user.create({
            data: { name, email, password: hash }, // Cria usuário no banco com senha criptografada
        })

        res.json({ id: user.id, name: user.name, email: user.email })
    } catch (error) {
        next(error)
    }
}

// Função para login
login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await prisma.user.findUnique({ where: { email } })

        // Verifica se usuário existe e se a senha está correta
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Credenciais inválidas' })
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
            expiresIn: '1d',
        })
        res.json({ token })
    } catch (error) {
        next(error)
    }
}

module.exports = (cadastrar, login)
