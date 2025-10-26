const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')

router.get('/', orderController.listAll)
router.get('/:id', orderController.listById)
router.post('/', orderController.newOrder)
router.put('/:id', orderController.updateOrder)
router.delete('/:id', orderController.deleteOrder)

module.exports = {
    orderRoutes: router
}