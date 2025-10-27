const adminService = require('../services/adminService')

const listUsers = async (req, res, next) => {
  try {
    const users = await adminService.listUsers()
    res.json(users)
  } catch (error) {
    next(error)
  }
}

const listOrder = async (req, res, next) => {
  try {
    const orders = await adminService.listOrder()
    res.json(orders)
  } catch (error) {
    next(error)
  }
}

module.exports = { listUsers, listOrder }