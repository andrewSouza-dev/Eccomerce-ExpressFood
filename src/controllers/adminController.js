// src/controllers/adminController.js
const prisma = require('../database')

// Lista todos os usuários
const listUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, isAdmin: true }
  })
  res.json(users)
}

// Lista todos os pedidos com itens e produtos
const listOrder = async (req, res) => {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      items: {
        include: { product: true }
      }
    }
  })
  res.json(orders)
}

module.exports = { listUsers, listOrder }
