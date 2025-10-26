const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const { authentication } = require('../middlewares/authMiddleware')


router.get('/', authentication, orderController.listAll)
router.get('/:id', authentication, orderController.listById)
router.post('/', authentication, orderController.newOrder)
router.put('/:id', authentication, orderController.updateOrder)
router.delete('/:id', authentication, orderController.deleteOrder)


module.exports = router
