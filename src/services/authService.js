const prisma = require('../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const HttpError = require('../errors/HttpError')

const cadastrar = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10)

  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role || 'CLIENTE'
    }
  })

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role ||  'CLIENTE'
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
    { id: user.id },
    process.env.JWT_KEY,
    { expiresIn: '1d' }
  )

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  }
}


module.exports = { cadastrar, login }
