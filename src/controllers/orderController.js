const prisma = require('../generated/prisma')

    criarPedido = async (req, res) => {
        const { produtos, total } = req.body

        const pedido = await prisma.order.create({
            data: {
                userId: req.user.id,
                status: 'PENDENDTE',
                total,
                createdAt: new Date()
            }
        })

        res.json(pedido)
    }

module.exports = criarPedido