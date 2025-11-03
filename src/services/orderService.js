const prisma = require('../database')
const HttpError = require('../errors/HttpError')

const listAll = async () => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: { include: { product: true } }
      }
    })
    return orders
  } catch (err) {
    throw new HttpError(500, 'Erro ao listar pedidos')
  }
}

const listById = async (id) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        items: { include: { product: true } }
      }
    })
    if (!order) throw new HttpError(404, 'Pedido não encontrado')
    return order
  } catch (err) {
    if (err instanceof HttpError) throw err
    throw new HttpError(500, 'Erro ao buscar pedido')
  }
}

const newOrder = async ({ userId, items }) => {
  try {
    if (!items || items.length === 0)
      throw new HttpError(400, 'Pedido deve conter pelo menos um item')

    const order = await prisma.order.create({
      data: {
        userId,
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity
          }))
        }
      },
      include: { items: { include: { product: true } } }
    })

    return order
  } catch (err) {
    if (err instanceof HttpError) throw err
    throw new HttpError(500, 'Erro ao criar pedido')
  }
}

const updateOrder = async (id, { status }) => {
  try {
    const order = await prisma.order.update({
      where: { id },
      data: { status }
    })
    return order
  } catch (err) {
    if (err.code === 'P2025') throw new HttpError(404, 'Pedido não encontrado')
    throw new HttpError(500, 'Erro ao atualizar pedido')
  }
}

const deleteOrder = async (id) => {
  try {
    await prisma.order.delete({ where: { id } })
    return { message: 'Pedido excluído com sucesso' }
  } catch (err) {
    if (err.code === 'P2025') throw new HttpError(404, 'Pedido não encontrado')
    throw new HttpError(500, 'Erro ao excluir pedido')
  }
}

module.exports = { listAll, listById, newOrder, updateOrder, deleteOrder }
