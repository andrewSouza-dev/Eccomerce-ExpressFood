const prisma = require('../database')
const HttpError = require('../errors/HttpError')

const listAll = async () => {
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { id: true, name: true, email: true } },
      items: {
        include: {
          product: true
        }
      }
    }
  })
  return orders
}


const listById = async (id) => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      items: { include: { product: true } }
    }
  })
  if (!order) throw new HttpError(404, 'Pedido não encontrado')
  return order
}


const newOrder = async ({ userId, items }) => {
  if (!items || items.length === 0) {
    throw new HttpError(400, 'Pedido deve conter pelo menos um item')
  }

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
    include: {
      items: { include: { product: true } }
    }
  })

  return order
}


const updateOrder = async (id, { status }) => {
  const order = await prisma.order.update({
    where: { id },
    data: { status }
  })
  return order
}

const deleteOrder = async (id) => {
  await prisma.order.delete({ where: { id } })
  return { message: 'Pedido excluído com sucesso' }
}

module.exports = { listAll, listById, newOrder, updateOrder, deleteOrder }