const prisma = require('../database')
const HttpError = require('../errors/HttpError')

const listAll = async () => {
  try {
    const restaurantes = await prisma.restaurant.findMany({
      include: { products: true }
    })
    return restaurantes
  } catch (err) {
    throw new HttpError(500, 'Erro ao listar restaurantes')
  }
}

const listById = async (id) => {
  try {
    const restaurante = await prisma.restaurant.findUnique({
      where: { id },
      include: { products: true }
    })
    if (!restaurante) throw new HttpError(404, 'Restaurante não encontrado')
    return restaurante
  } catch (err) {
    if (err instanceof HttpError) throw err
    throw new HttpError(500, 'Erro ao buscar restaurante')
  }
}

const create = async (data) => {
  try {
    if (!data.name) throw new HttpError(400, 'Nome é obrigatório')
    const restaurante = await prisma.restaurant.create({ data })
    return restaurante
  } catch (err) {
    if (err instanceof HttpError) throw err
    throw new HttpError(500, 'Erro ao criar restaurante')
  }
}

const update = async (id, data) => {
  try {
    const restaurante = await prisma.restaurant.update({
      where: { id },
      data
    })
    return restaurante
  } catch (err) {
    if (err.code === 'P2025') throw new HttpError(404, 'Restaurante não encontrado')
    throw new HttpError(500, 'Erro ao atualizar restaurante')
  }
}

const remove = async (id) => {
  try {
    await prisma.restaurant.delete({ where: { id } })
    return { message: 'Restaurante removido com sucesso' }
  } catch (err) {
    if (err.code === 'P2025') throw new HttpError(404, 'Restaurante não encontrado')
    throw new HttpError(500, 'Erro ao remover restaurante')
  }
}

module.exports = { listAll, listById, create, update, remove }
