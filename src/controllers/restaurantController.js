const prisma = require('../database')

// Lista todos os restaurantes com seus produtos
listarRestaurantes = async (req, res) => {
    const restaurantes = await prisma.restaurant.findMany({
        include: { products: true }, // Inclui os produtos de cada restaurante
    })
    res.json(restaurantes)
}


criarRestaurante = async (req, res) => {
    const { name, description, image } = req.body

    const restaurante = await prisma.restaurant.create({
        data: { name, description, image }
    })

    res.json(restaurante)
}

module.exports = listarRestaurantes
