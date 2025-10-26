const prisma = require('../database')

// Busca pratos por nome e retorna os restaurantes onde estão disponiveis
const buscarPrato = async (req, res) => {
    const { nome } = req.query

    if (!nome) {
        return res.status(400).json({ error: 'Informe o nome do prato para buscar'})
    }

    const pratos = await prisma.product.findMany({
        where: {
            name: {
                contains: nome,
                mode: 'insensitive' // Ignora maiusculas e minusculas
            }
        },
        include: {
            restaurant: true
        }
    })
    res.json(pratos)
}

module.exports = { buscarPrato }