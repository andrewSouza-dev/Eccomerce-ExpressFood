const express = require('express')
const router = express.Router()
const viewsController = require('../controllers/viewsController')
const { authentication } = require('../middlewares/authMiddleware')

// Página inicial pública
router.get('/', viewsController.index)

// Home e busca (protegidas)
router.get('/home', authentication, viewsController.home)
router.get('/buscar/pratos', authentication, viewsController.buscarPratos)
router.get('/restaurante/:id', authentication, viewsController.verRestaurante)

// Carrinho (protegido)
router.get('/cart', authentication, viewsController.verCarrinho)
router.post('/cart/adicionar', authentication, viewsController.adicionarAoCarrinho)
router.post('/cart/remover', authentication, viewsController.removerDoCarrinho)
router.post('/orders/finalizar', authentication, viewsController.finalizarPedido)

module.exports = router
