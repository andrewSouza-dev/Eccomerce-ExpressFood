const prisma = require('../database')

// Lista produtos com filtros opcionais
listarProdutos = async (req, res) => {
    const { categoria, busca } = req.query

    const produtos = await prisma.product.findMany({
        where: {
            ...(categoria && { categoria }), // Filtra por categoria se fornecida
            ...busca(
                busca && { name: { contains: busca, mode: 'insensitive' } }
            ), // Busca por nome parcial
        },
        include: { restaurant: true },
    })
    res.json(produtos)
}

criarProduto = async (req, res) => {
    const { name, description, price, image, restaurantId } = req.body

    const produto = await prisma.product.create({
        data: {
            name, 
            description,
            price: parseFloat(price),
            image,
            restaurantId
        }
    })

    res.json(produto)
}

module.exports = { listarProdutos, criarProduto }
