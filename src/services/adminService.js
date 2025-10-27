const prisma = require('../database')
const HttpError = require('../errors/HttpError')

const listUsers = async () => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, isAdmin: true }
  })
  if (!users || users.length === 0) throw new HttpError(404, 'Nenhum usuário encontrado')
  return users
}

const listOrder = async () => {
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
  if (!orders || orders.length === 0) throw new HttpError(404, 'Nenhum pedido encontrado')
  return orders
}

module.exports = { listUsers, listOrder }