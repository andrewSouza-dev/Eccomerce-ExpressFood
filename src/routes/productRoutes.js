const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const { authentication } = require('../middlewares/authMiddleware')

// ROTAS PUBLICAS
router.get('/', productController.listAll)
router.get('/:id', productController.listById)

// ROTAS PROTEGIDAS ADMIN
router.post('/', authentication, productController.newProduct)
router.put('/:id', authentication, productController.updateProduct)
router.delete('/:id', authentication, productController.deleteProduct)

module.exports = router
