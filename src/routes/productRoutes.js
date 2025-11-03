const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const { authentication } = require('../middlewares/authMiddleware')


// VER TODOS OS PRODUTOS E POR ID
router.get('/', authentication, productController.listAll)
router.get('/:id', authentication, productController.listById)

module.exports = router
