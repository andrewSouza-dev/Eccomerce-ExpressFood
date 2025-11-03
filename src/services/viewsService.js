const prisma = require('../database')
const HttpError = require('../errors/HttpError')


// LISTAR TODOS OS RESTAURANTES
const listarRestaurantes = async () => {
  return await prisma.restaurant.findMany({ include: { products: true } })
}


// BUSCAR TODOS OS PRATOS DENTRO DE UM RESTAURANTE
const buscarProdutosDoRestaurante = async (id) => {
    return await prisma.product.findMany({
        where: { restaurantId: Number(id) },
        include: { restaurant: true },
    })
}


// BUSCAR UM PRATO EXCLUSIVO DENTRO DE UM RESTAURANTE
const buscarProdutoPorId = async (id) => {
    return await prisma.product.findUnique({ where: { id: Number(id) } })
}


// SALVAR O PEDIDO
const salvarPedido = async (userId, cart) => {
    if (!cart || cart.length === 0) return null

    const order = await prisma.order.create({
        data: {
            userId,
            status: 'PENDENTE',
            total: cart.reduce((s, i) => s + i.product.price * i.quantity, 0),
            items: {
                create: cart.map((item) => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                })),
            },
        },
        include: { items: { include: { product: true } } },
    })

    return order
}

module.exports = {
    listarRestaurantes,
    buscarProdutosDoRestaurante,
    buscarProdutoPorId,
    salvarPedido,
}
