const prisma = require('../generated/prisma')

    listarRestaurantes = async (req, res) => {
        const restaurantes = await prisma.restaurant.findMany({
            include: { products: true }
        })
        res.json(restaurantes)
    }

module.exports = listarRestaurantes