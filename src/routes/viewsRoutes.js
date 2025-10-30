const express = require('express')
const router = express.Router()
const viewsController = require('../controllers/viewsController')
const { authentication } = require('../middlewares/authMiddleware')


// Página inicial
router.get('/', viewsController.index)


// Alias para login (renderizado pelo authRoutes)
router.get('/login', (req, res) => res.redirect('/auth/login'))


// Login e logout
// POST /login removido para evitar conflito com /auth/login
router.get('/logout', authentication, viewsController.logout)


// Home e busca
router.get('/home', authentication, viewsController.home)
router.get('/buscar/pratos', authentication, viewsController.buscarPratos)
router.get('/restaurante/:id', authentication, viewsController.verRestaurante)


// Carrinho
router.get('/cart', authentication, viewsController.verCarrinho)
router.post('/cart/adicionar', authentication, viewsController.adicionarAoCarrinho)
router.post('/cart/remover', authentication, viewsController.removerDoCarrinho)
router.post('/orders/finalizar', authentication, viewsController.finalizarPedido)


module.exports = router