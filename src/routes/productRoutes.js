const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/', productController.listAll)
router.get('/:id', productController.listById)
router.post('/', productController.newProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router