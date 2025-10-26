const prisma = require('../database')

// Busca pratos por nome e retorna os restaurantes onde estão disponiveis
const buscarPrato = async (req, res) => {
    const { name } = req.query

    if (!name) {
        return res.status(400).json({ error: 'Informe o nome do prato para buscar'})
    }

    const pratos = await prisma.product.findMany({
        where: {
            name: {
                contains: name,
                mode: 'insensitive' // Ignora maiusculas e minusculas
            }
        },
        include: {
            restaurant: true
        }
    })
    res.json(pratos)
}