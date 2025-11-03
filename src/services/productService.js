const prisma = require('../database')
const HttpError = require('../errors/HttpError')

const listAll = async () => {
  try {
    const produtos = await prisma.product.findMany({
      include: { restaurant: true }
    })
    return produtos
  } catch (err) {
    throw new HttpError(500, 'Erro ao listar produtos')
  }
}

const listById = async (id) => {
  try {
    const produto = await prisma.product.findUnique({
      where: { id },
      include: { restaurant: true }
    })
    if (!produto) throw new HttpError(404, 'Produto não encontrado')
    return produto
  } catch (err) {
    if (err instanceof HttpError) throw err
    throw new HttpError(500, 'Erro ao buscar produto')
  }
}

const create = async (data) => {
  try {
    if (!data.name || !data.price || !data.restaurantId)
      throw new HttpError(400, 'Campos obrigatórios não informados')

    const produto = await prisma.product.create({ data })
    return produto
  } catch (err) {
    if (err instanceof HttpError) throw err
    throw new HttpError(500, 'Erro ao criar produto')
  }
}

const update = async (id, data) => {
  try {
    const produto = await prisma.product.update({
      where: { id },
      data
    })
    return produto
  } catch (err) {
    if (err.code === 'P2025') throw new HttpError(404, 'Produto não encontrado')
    throw new HttpError(500, 'Erro ao atualizar produto')
  }
}

const remove = async (id) => {
  try {
    await prisma.product.delete({ where: { id } })
    return { message: 'Produto removido com sucesso' }
  } catch (err) {
    if (err.code === 'P2025') throw new HttpError(404, 'Produto não encontrado')
    throw new HttpError(500, 'Erro ao remover produto')
  }
}

module.exports = { listAll, listById, create, update, remove }
