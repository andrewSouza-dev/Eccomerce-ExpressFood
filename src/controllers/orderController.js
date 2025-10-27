const orderService = require('../services/orderService')

const listAll = async (req, res, next) => {
  try {
    const orders = await orderService.listAll()
    res.json(orders)
  } catch (error) {
    next(error)
  }
}

const listById = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const order = await orderService.listById(id)
    res.json(order)
  } catch (error) {
    next(error)
  }
}

const newOrder = async (req, res, next) => {
  try {
    const userId = req.user.id
    const newO = await orderService.newOrder({ userId, items: req.body.items })
    res.status(201).json(newO)
  } catch (error) {
    next(error)
  }
}

const updateOrder = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const updateO = await orderService.updateOrder(id, req.body)
    res.json(updateO)
  } catch (error) {
    next(error)
  }
}

const deleteOrder = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const deleted = await orderService.deleteOrder(id)
    res.json({ deleted })
  } catch (error) {
    next(error)
  }
}

module.exports = { listAll, listById, newOrder, updateOrder, deleteOrder }