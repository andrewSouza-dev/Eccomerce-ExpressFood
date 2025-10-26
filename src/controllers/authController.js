const prisma = require('../generated/prisma')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


    cadastrar = async (req, res, next) => {
        try {
            const { name, email, password } = req.body
            const hash = await bcrypt.hash(password, 10)

            const user = await prisma.user.create({
                data: { name, email, password: hash }
        })
            res.json({ id: user.id, name: user.name, email: user.email })
        } catch (error) {
            next(error)
        } 
    }

    login = async (req, res, next) => { 
        try {
            const { email, password } = req.body
            const user = await prisma.user.findUnique({ where: { email } })

            if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Credenciais inválidas'})
        }
            const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: '1d' })
            res.json({ token })
        } catch (error) {
            next(error)
        }
    }


module.exports = (cadastrar, login)