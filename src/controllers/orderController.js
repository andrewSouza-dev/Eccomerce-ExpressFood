const prisma = require('../database')

// Lista todos os pedidos
const listAll = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({ 
      where: { userId: req.user.id },
      include: { product: true } })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: 'Erro interno no servidor' })
  }
    
}

// Lista um pedido por ID
const listById = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const order = await prisma.order.findUnique({ where: { id } })
    if (!order || order.userId !== req.user.id) {
    return res.status(403).json({ error: 'Acesso negado ao pedido' })
    }
    res.json(order)
  } catch (error) {
    res.status(500).json({ error: 'Erro interno no servidor' })
  }
    
}

// Cria um pedido
const newOrder = async (req, res) => {
  try {
     const { items } = req.body // items = [{ productId, quantity }]
    const userId = req.user.id
  
  // Calcula o total com base nos produtos
  const produtos = await prisma.product.findMany({
    where: { id: { in: items.map(i => i.productId) } }
  })

  const total = produtos.reduce((acc, p) => {
    const item = items.find(i => i.productId === p.id)
    return acc + p.price * item.quantity
  }, 0)

  const order = await prisma.order.create({
    data: {
      userId,
      status: 'pendente',
      total,
      items: {
        create: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      }
    },
    include: { items: true }
  })

  res.json(order)
  } catch (error) {
    res.status(500).json({ error: 'Erro interno no servidor' })
  }
}

// Atualiza pedido
const updateOrder = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { userId, status, total } = req.body
    const updateOrder = await prisma.order.update({ 
        where: { id },
        data: { status, total }
    })
    if (!order || order.userId !== req.user.id) {
    return res.status(403).json({ error: 'Acesso negado ao pedido' })
}
    res.json(updateOrder)
  } catch (error) {
    res.status(500).json({ error: 'Erro interno no servidor' })
  }
    
}

// Deleta um pedido
const deleteOrder = async (req, res) => {
  try {
    const id = Number(req.params.id)
    await prisma.order.delete({ where: { id } })
    res.json({ message: 'Pedido excluído!'})
  } catch (error) {
    res.status(500).json({ error: 'Erro interno no servidor' })
  }
    
}

module.exports = { listAll, listById, newOrder, updateOrder, deleteOrder }
