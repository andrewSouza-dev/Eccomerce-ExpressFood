const prisma = require('../database')

// Lista todos os produtos
listAll = async (req, res) => {

    const products = await prisma.product.findMany({
        include: { restaurant: true },
    })
    res.json(products)
}

// Buscar produto por ID
listById = async (req, res) => {
    const id = Number(req.params.id)
    const product = await prisma.product.findUnique({ where: { id } })
    res.json(product)
}

// Criar um produto
newProduct = async (req, res) => {
    const { name, description, price, image, restaurantId } = req.body

    const product = await prisma.product.create({
        data: {
            name, 
            description,
            price,
            image,
            restaurantId
        }
    })

    res.json(product)
}

// Atualizar produto
updateProduct = async (req, res) => {
    const id = Number(req.params.id)
    const updateProduct = await prisma.product.update({
        where: { id },
        data: { name, description, price }

    })
    res.json(updateProduct)
}


// Deletar um produto
deleteProduct = async (req, res) => {
    const id = Number(req.params.id)
    await prisma.product.delete({ where: { id } })
    res.json({ message: 'Produto excluído!'})
}

module.exports = { listAll, listById, newProduct, updateProduct, deleteProduct }
