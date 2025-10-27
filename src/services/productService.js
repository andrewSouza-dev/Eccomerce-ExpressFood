const prisma = require('../database')
const HttpError = require('../errors/HttpError')

const listAll = async () => {
  const products = await prisma.product.findMany({
    include: { restaurant: true }
  })
  return products
}


const listById = async (id) => {
  const product = await prisma.product.findUnique({ where: { id } })
  if (!product) throw new HttpError(404, 'Produto não encontrado')
  return product
}


const newProduct = async ({ name, description, price, image, restaurantId }) => {
  try {
    const product = await prisma.product.create({
      data: { name, description, price, image, restaurantId }
    })
    return product
  } catch (error) {
    if (error.code === 'P2003') {
      throw new HttpError(400, 'Restaurante inválido ou inexistente')
    }
    throw error
  }
}


const updateProduct = async (id, { name, description, price }) => {
  const product = await prisma.product.update({
    where: { id },
    data: { name, description, price }
  })
  return product
}


const deleteProduct = async (id) => {
  await prisma.product.delete({ where: { id } })
  return { message: 'Produto excluído com sucesso' }
}


module.exports = { listAll, listById, newProduct, updateProduct, deleteProduct }