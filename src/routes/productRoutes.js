const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const { authentication, isAdmin } = require('../middlewares/authMiddleware')

// ROTAS PUBLICAS
router.get('/', productController.listAll)
router.get('/:id', productController.listById)

// ROTAS PROTEGIDAS ADMIN
router.post('/', authentication, isAdmin, productController.newProduct)
router.put('/:id', authentication, isAdmin, productController.updateProduct)
router.delete('/:id', authentication, isAdmin, productController.deleteProduct)

module.exports = router
