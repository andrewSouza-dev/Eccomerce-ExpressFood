const prisma = require('../database')
const HttpError = require('../errors/HttpError')

const newUser = async ({ name, email, password }) => {
  try {
    const user = await prisma.user.create({ data: { name, email, password } })
    return user
  } catch (error) {
    if (error.code === 'P2002') {
      throw new HttpError(409, 'E-mail já cadastrado')
    }
    throw error
  }
}




module.exports = { newUser }