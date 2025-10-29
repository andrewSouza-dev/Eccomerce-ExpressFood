const prisma = require('../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const autenticarUsuario = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return null
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_KEY)
  return { token, user }
}

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



module.exports = {
  autenticarUsuario,
  listarRestaurantesProximos,
  buscarPratos,
  buscarProdutosDoRestaurante,
  buscarProdutoPorId,
  salvarPedido
}
