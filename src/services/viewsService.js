const prisma = require('../database')
const HttpError = require('../errors/HttpError')

// LISTAR TODOS OS RESTAURANTES
const listarRestaurantes = async () => {
    try {
        const restaurantes = await prisma.restaurant.findMany({
            include: { products: true }
        })
        return restaurantes
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

        const produtos = await prisma.product.findMany({
            where: {
                name: {
                    contains: nome,
                    mode: 'insensitive',
                },
            },
            include: { restaurant: true },
        })

        if (produtos.length === 0) {
            throw new HttpError(404, 'Nenhum produto encontrado')
        }

        return produtos
    } catch (err) {
        if (err instanceof HttpError) throw err
        throw new HttpError(500, 'Erro ao buscar produtos')
    }
}

// BUSCAR PRODUTOS DE UM RESTAURANTE
const buscarProdutosDoRestaurante = async (id) => {
    try {
        const restauranteId = Number(id)
        if (isNaN(restauranteId)) {
            throw new HttpError(400, 'ID inválido')
        }

        const produtos = await prisma.product.findMany({
            where: { restaurantId: restauranteId },
            include: { restaurant: true },
        })

        return produtos
    } catch (err) {
        if (err instanceof HttpError) throw err
        throw new HttpError(500, 'Erro ao buscar produtos do restaurante')
    }
}

// BUSCAR PRODUTO POR ID
const buscarProdutoPorId = async (id) => {
    try {
        const produtoId = Number(id)
        if (isNaN(produtoId)) {
            throw new HttpError(400, 'ID inválido')
        }

        const produto = await prisma.product.findUnique({
            where: { id: produtoId },
            include: { restaurant: true }
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
        if (!cart || cart.length === 0) {
            throw new HttpError(400, 'Carrinho vazio')
        }

        const total = cart.reduce((sum, item) => {
            if (!item.product || !item.product.price) {
                throw new HttpError(400, 'Produto inválido no carrinho')
            }
            return sum + item.product.price * item.quantity
        }, 0)

        const order = await prisma.order.create({
            data: {
                userId,
                status: 'PENDENTE',
                total,
                items: {
                    create: cart.map((item) => ({
                        productId: item.product.id,
                        quantity: item.quantity,
                    })),
                },
            },
            include: {
                items: { include: { product: true } }
            },
        })

        return order
    } catch (err) {
        if (err instanceof HttpError) throw err
        console.error(err)
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
