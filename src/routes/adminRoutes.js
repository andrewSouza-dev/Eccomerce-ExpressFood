const express = require('express')
const { authentication, isAdmin } = require('../middlewares/authMiddleware')
const restaurantController = require('../controllers/restaurantController')
const productController = require('../controllers/productController')
const userController = require('../controllers/userController')
const adminController = require('../controllers/adminController')

const router = express.Router()

// Dashboard do admin
router.get('/', authentication, isAdmin, adminController.dashboard)

// USERS CRUD
router.get('/users', authentication, isAdmin, userController.listAll)
router.get('/users/novo', authentication, isAdmin, userController.novoView)
router.get('/users/:id', authentication, isAdmin, userController.listById)
router.get('/users/:id/editar', authentication, isAdmin, userController.editarView)
router.post('/users', authentication, isAdmin, userController.create)
router.post('/users/:id/editar', authentication, isAdmin, userController.update)
router.post('/users/:id/excluir', authentication, isAdmin, userController.remove)

// RESTAURANTES CRUD
router.get('/restaurantes', authentication, isAdmin, restaurantController.listAll)
router.get('/restaurantes/novo', authentication, isAdmin, restaurantController.novoView)
router.get('/restaurantes/:id', authentication, isAdmin, restaurantController.listById)
router.get('/restaurantes/:id/editar', authentication, isAdmin, restaurantController.editarView)
router.post('/restaurantes', authentication, isAdmin, restaurantController.create)
router.post('/restaurantes/:id/editar', authentication, isAdmin, restaurantController.edit)
router.post('/restaurantes/:id/excluir', authentication, isAdmin, restaurantController.remove)

// PRODUTOS CRUD
router.get('/produtos', authentication, isAdmin, productController.listAll)
router.get('/produtos/novo', authentication, isAdmin, productController.novoView)
router.get('/produtos/:id', authentication, isAdmin, productController.listById)
router.get('/produtos/:id/editar', authentication, isAdmin, productController.editarView)
router.post('/produtos', authentication, isAdmin, productController.create)
router.post('/produtos/:id/editar', authentication, isAdmin, productController.update)
router.post('/produtos/:id/excluir', authentication, isAdmin, productController.remove)

module.exports = router
