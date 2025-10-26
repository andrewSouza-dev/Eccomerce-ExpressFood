const prisma = require('../database')

// Cria um novo pedido (rota protegida)
criarPedido = async (req, res) => {
    const { produtos, total } = req.body

    const pedido = await prisma.order.create({
        data: {
            userId: req.user.id, // Usa ID do usuário autenticado
            status: 'PENDENTE', // Define status inicial
            total,
            createdAt: new Date(), // Define data atual
        },
    })

    res.json(pedido)
}

module.exports = criarPedido
