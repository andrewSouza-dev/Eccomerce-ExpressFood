const prisma = require('../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const HttpError = require('../errors/HttpError')

const cadastrar = async (req, res, next) => {
  try {
    const userData = {
      ...req.body,
      isAdmin: req.body.isAdmin === 'true' // converte string para boolean
    }

    const user = await authService.cadastrar(userData)
    res.render('cadastroSucesso', { user })
  } catch (error) {
    next(error)
  }
}

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    console.log('Usuário não encontrado')
    throw new HttpError(401, 'Credenciais inválidas')
  }

  const senhaValida = await bcrypt.compare(password, user.password)
  if (!senhaValida) {
    console.log('Senha inválida')
    throw new HttpError(401, 'Credenciais inválidas')
  }

  console.log('Usuário autenticado:', user)

  const token = jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    process.env.JWT_KEY,
    { expiresIn: '1d' }
  )

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    }
  }
}


module.exports = { cadastrar, login }
