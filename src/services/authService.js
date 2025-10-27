const prisma = require('../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const HttpError = require('../errors/HttpError')

const cadastrar = async ({ name, email, password }) => {
  const hash = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: { name, email, password: hash }
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    }
  } catch (error) {
    if (error.code === 'P2002') {
      throw new HttpError(409, 'E-mail já cadastrado')
    }
    throw error
  }
}

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new HttpError(401, 'Credenciais inválidas')
  }

  const token = jwt.sign({ 
    id: user.id, isAdmin: user.isAdmin },
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
