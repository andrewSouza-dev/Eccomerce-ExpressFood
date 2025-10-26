const prisma = require('../database')

// Listar todos os pedidos
const listOrders = async (req, res) => {
  const pedidos = await prisma.order.findMany({ include: { user: true } })
  res.json(pedidos)
}

// Listar todos os usuários
const listUsers = async (req, res) => {
  const usuarios = await prisma.user.findMany({
    select: { id: true, name: true, email: true, isAdmin: true }
  })
  res.json(usuarios)
}

module.exports = { listOrders, listUsers }