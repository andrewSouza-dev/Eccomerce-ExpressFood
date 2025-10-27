const prisma = require('../database')
const HttpError = require('../errors/HttpError')

const listAll = async () => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true }
  })

  if (!users) throw new HttpError(404, 'Nenhum usuário encontrado')
  return users
}


const listById = async (id) => {
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) throw new HttpError(404, 'Usuário não encontrado')
  return user
}


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


const updateUser = async (id, { name, email }) => {
  const user = await prisma.user.update({
    where: { id },
    data: { name, email }
  })
  return user
}


const deleteUser = async (id) => {
  await prisma.user.delete({ where: { id } })
  return { message: 'Usuário excluído com sucesso' }
}










module.exports = { listAll, listById, newUser, updateUser, deleteUser }