const prisma = require('../generated/prisma')

    listarProdutos = async (req, res) => {
        const { categoria, busca } = req.query

        const produtos = await prisma.product.findMany({
            where: {
                ...(categoria && { categoria }),
                ...busca(busca && { name: { contains: busca, mode: 'insensitive' } })

            },
            include: { restaurant: true }
        })
        res.json(produtos)
    }

module.exports = listarProdutos