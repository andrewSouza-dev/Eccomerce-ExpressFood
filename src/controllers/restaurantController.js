const prisma = require('../database')

// Lista todos os restaurantes com seus produtos
listAll = async (req, res) => {
    const restaurantes = await prisma.restaurant.findMany({
        include: { products: true }, // Inclui os produtos de cada restaurante
    })
    res.json(restaurantes)
}

// Lista o restaurante pelo ID
listById = async (req, res) => {
    const id = Number(req.params.id)
    const restaurant = await prisma.restaurant.findUnique({ where: { id } })
    res.json(restaurant)
}

// Cria um restaurante
newRestaurant = async (req, res) => {
    const { name, description, image } = req.body
    const restaurant = await prisma.restaurant.create({ 
        data: {
            name,
            description,
            image
         }})
    res.json(restaurant)
}

// Atualiza um restaurante
updateRestaurant = async (req, res) => {
    const id = Number(req.params.id)
    const { name, description } = req.body
    const updateRestaurant = await prisma.restaurant.update({ 
        where: { id },
        data: { name, description}
    })
    res.json(updateRestaurant)
}


// Deleta um restaurante
deleteRestaurant = async (req, res) => {
    const id = Number(req.params.id)
    await prisma.restaurant.delete({ where: { id }})
    res.json({ message: 'Restaurante excluído!'})
}

module.exports = { listAll, listById, newRestaurant, updateRestaurant, deleteRestaurant }
