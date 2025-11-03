const express = require('express')
const { authentication, isAdmin } = require('../middlewares/authMiddleware')
const restaurantController = require('../controllers/restaurantController')
const productController = require('../controllers/productController')
const userController = require('../controllers/userController')

const router = express.Router()

// USERS CRUD
router.get('/users', authentication, isAdmin, userController.list)
router.post('/users', authentication, isAdmin, userController.create)
router.post('/users/:id/editar', authentication, isAdmin, userController.edit)
router.post('/users/:id/excluir', authentication, isAdmin, userController.remove)

// RESTAURANTES CRUD
router.get('/restaurantes', authentication, isAdmin, restaurantController.list)
router.post('/restaurantes', authentication, isAdmin, restaurantController.create)
router.post('/restaurantes/:id/editar', authentication, isAdmin, restaurantController.edit)
router.post('/restaurantes/:id/excluir', authentication, isAdmin, restaurantController.remove)

// PRODUTOS CRUD
router.get('/produtos', authentication, isAdmin, productController.list)
router.post('/produtos', authentication, isAdmin, productController.create)
router.post('/produtos/:id/editar', authentication, isAdmin, productController.edit)
router.post('/produtos/:id/excluir', authentication, isAdmin, productController.remove)

module.exports = router
