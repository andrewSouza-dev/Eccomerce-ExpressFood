const prisma = require('../database')
const bcrypt = require('bcrypt')
const HttpError = require('../errors/HttpError')

const listAll = async () => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true }
    })
    return users
  } catch (err) {
    throw new HttpError(500, 'Erro ao listar usuários')
  }
}

const listById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true }
    })
    if (!user) throw new HttpError(404, 'Usuário não encontrado')
    return user
  } catch (err) {
    if (err instanceof HttpError) throw err
    throw new HttpError(500, 'Erro ao buscar usuário')
  }
}

const create = async ({ name, email, password, role }) => {
  try {
    if (!name || !email || !password)
      throw new HttpError(400, 'Campos obrigatórios não informados')

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) throw new HttpError(400, 'E-mail já cadastrado')

    const hash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { name, email, password: hash, role: role || 'MEMBER' },
      select: { id: true, name: true, email: true, role: true }
    })
    return user
  } catch (err) {
    if (err instanceof HttpError) throw err
    throw new HttpError(500, 'Erro ao criar usuário')
  }
}

const update = async (id, data) => {
  try {
    if (data.email) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } })
    if (existing && existing.id !== id) throw new HttpError(400, 'E-mail já cadastrado')
    }

    if (data.password) data.password = await bcrypt.hash(data.password, 10)
    const user = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, role: true }
    })
    return user
  } catch (err) {
    if (err.code === 'P2025') throw new HttpError(404, 'Usuário não encontrado')
    throw new HttpError(500, 'Erro ao atualizar usuário')
  }
}

const remove = async (id) => {
  try {
    await prisma.user.delete({ where: { id } })
    return { message: 'Usuário removido com sucesso' }
  } catch (err) {
    if (err.code === 'P2025') throw new HttpError(404, 'Usuário não encontrado')
    throw new HttpError(500, 'Erro ao remover usuário')
  }
}

module.exports = { listAll, listById, create, update, remove }
