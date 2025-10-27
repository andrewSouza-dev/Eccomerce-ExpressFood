const prisma = require('../database')

// Home e busca
const listarRestaurantesProximos = async () => {
  return await prisma.restaurant.findMany()
}

const buscarPratos = async (nome) => {
  return await prisma.product.findMany({
    where: { name: { contains: nome, mode: 'insensitive' } },
    include: { restaurant: true }
  })
}

const buscarProdutosDoRestaurante = async (id) => {
  return await prisma.product.findMany({
    where: { restaurantId: Number(id) },
    include: { restaurant: true }
  })
}

const buscarProdutoPorId = async (id) => {
  return await prisma.product.findUnique({ where: { id: Number(id) } })
}

// Carrinho e pedidos
const salvarPedido = async (userId, cart) => {
  if (!cart || cart.length === 0) return null

  return await prisma.order.create({
    data: {
      userId,
      items: {
        create: cart.map(item => ({
          productId: item.product.id,
          quantity: item.quantity
        }))
      }
    }
  })
}

// Admin
const listarUsuarios = async () => {
  return await prisma.user.findMany()
}

const listarPedidos = async () => {
  return await prisma.order.findMany({
    include: {
      user: true,
      items: { include: { product: true } }
    }
  })
}

const atualizarPedido = async (id, status) => {
  return await prisma.order.update({
    where: { id: Number(id) },
    data: { status }
  })
}

const excluirPedido = async (id) => {
  return await prisma.order.delete({ where: { id: Number(id) } })
}

const criarUsuario = async (data) => {
  return await prisma.user.create({ data })
}

const atualizarUsuario = async (id, data) => {
  return await prisma.user.update({
    where: { id: Number(id) },
    data
  })
}

const excluirUsuario = async (id) => {
  return await prisma.user.delete({ where: { id: Number(id) } })
}

module.exports = {
  listarRestaurantesProximos,
  buscarPratos,
  buscarProdutosDoRestaurante,
  buscarProdutoPorId,
  salvarPedido,
  listarUsuarios,
  listarPedidos,
  atualizarPedido,
  excluirPedido,
  criarUsuario,
  atualizarUsuario,
  excluirUsuario
}
