const express = require('express')
const router = express.Router()
const viewsController = require('../controllers/viewsController')
const { authentication } = require('../middlewares/authMiddleware')
const { homeView } = require('../controllers/authController')

// Página inicial
router.get('/', viewsController.index)

// Login e logout
router.post('/login', viewsController.login)
router.get('/logout', authentication, viewsController.logout)

// Home e busca
router.get('/home', authentication, viewsController.home)
router.get('/buscar/pratos', authentication, viewsController.buscarPratos)
router.get('/restaurante/:id', authentication, viewsController.verRestaurante)

// Carrinho
router.get('/cart', authentication, viewsController.verCarrinho)
router.post('/cart/adicionar', authentication, viewsController.adicionarAoCarrinho)
router.post('/orders/finalizar', authentication, viewsController.finalizarPedido)

module.exports = router
