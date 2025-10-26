const prisma = require('../database')

// Lista todos os pedidos
listAll = async (req, res) => {
    const orders = await prisma.order.findMany({ include: { user: true } })
    res.json(orders)
}

// Lista um pedido por ID
listById = async (req, res) => {
    const id = Number(req.params.id)
    const order = await prisma.order.findUnique({ where: { id } })
    res.json(order)
}

// Cria um pedido
newOrder = async (req, res) => {
    const { userId, status, total } = req.body
    const order = await prisma.order.create({
        data: { userId, status, total, createdAt: new Date() }
    })
    res.json(order)
}

// Atualiza pedido
updateOrder = async (req, res) => {
    const id = Number(req.params.id)
    const { userId, status, total } = req.body
    const updateOrder = await prisma.order.update({ 
        where: { id },
        data: { status, total }
    })
    res.json(order)
}

// Deleta um pedido
deleteOrder = async (req, res) => {
    const id = Number(req.params.id)
    await prisma.order.delete({ where: { id } })
    res.json({ message: 'Pedido excluído!'})
}

module.exports = { listAll, listById, newOrder, updateOrder, deleteOrder }
