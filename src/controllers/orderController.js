const orderService = require('../services/orderService')

// Listar todos os pedidos
const listAll = async (req, res, next) => {
  try {
    const orders = await orderService.listAll()
    res.json(orders)
  } catch (error) {
    next(error)
  }
}

// Buscar pedido por ID
const listById = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const order = await orderService.listById(id)
    res.json(order)
  } catch (error) {
    next(error)
  }
}

// Criar novo pedido
const newOrder = async (req, res, next) => {
  try {
    const order = await orderService.newOrder(req.body)
    res.json(order)
  } catch (error) {
    next(error)
  }
}

// Atualizar status do pedido
const updateOrder = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const updated = await orderService.updateOrder(id, req.body)
    res.json(updated)
  } catch (error) {
    next(error)
  }
}

// Deletar pedido
const deleteOrder = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const deleted = await orderService.deleteOrder(id)
    res.json(deleted)
  } catch (error) {
    next(error)
  }
}

module.exports = { listAll, listById, newOrder, updateOrder, deleteOrder }
