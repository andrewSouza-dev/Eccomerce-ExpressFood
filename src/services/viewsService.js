const prisma = require('../database')
const HttpError = require('../errors/HttpError')

// LISTAR TODOS OS RESTAURANTES
const listarRestaurantes = async () => {
    try {
        return await prisma.restaurant.findMany({ include: { products: true } })
    } catch (err) {
        throw new HttpError(500, 'Erro ao listar restaurantes')
    }
}

// BUSCAR PRODUTOS POR NOME
const buscarProdutosPorNome = async (nome) => {
    try {
        if (!nome || nome.trim() === '') {
            throw new HttpError(400, 'Termo de busca não informado')
        }
        return await prisma.product.findMany({
            where: {
                name: {
                    contains: nome,
                    mode: 'insensitive',
                },
            },
            include: { restaurant: true },
        })
    } catch (err) {
        throw new HttpError(500, 'Erro ao buscar produtos')
    }
}

// BUSCAR PRODUTOS DE UM RESTAURANTE
const buscarProdutosDoRestaurante = async (id) => {
    try {
        return await prisma.product.findMany({
            where: { restaurantId: Number(id) },
            include: { restaurant: true },
        })
    } catch (err) {
        throw new HttpError(500, 'Erro ao buscar produtos do restaurante')
    }
}

// BUSCAR PRODUTO POR ID
const buscarProdutoPorId = async (id) => {
    try {
        const produto = await prisma.product.findUnique({
            where: { id: Number(id) },
        })
        if (!produto) throw new HttpError(404, 'Produto não encontrado')
        return produto
    } catch (err) {
        if (err instanceof HttpError) throw err
        throw new HttpError(500, 'Erro ao buscar produto')
    }
}

// SALVAR PEDIDO
const salvarPedido = async (userId, cart) => {
    try {
        if (!cart || cart.length === 0)
            throw new HttpError(400, 'Carrinho vazio')

        const order = await prisma.order.create({
            data: {
                userId,
                status: 'PENDENTE',
                total: cart.reduce(
                    (s, i) => s + i.product.price * i.quantity,
                    0
                ),
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
    } catch (err) {
        if (err instanceof HttpError) throw err
        throw new HttpError(500, 'Erro ao salvar pedido')
    }
}

module.exports = {
    listarRestaurantes,
    buscarProdutosPorNome,
    buscarProdutosDoRestaurante,
    buscarProdutoPorId,
    salvarPedido,
}
