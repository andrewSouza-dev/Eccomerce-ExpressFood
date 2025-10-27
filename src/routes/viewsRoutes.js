const express = require('express')
const router = express.Router()
const viewsController = require('../controllers/viewsController')
const { authentication, isAdmin } = require('../middlewares/authMiddleware')

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

// Painel admin
router.get('/admin', authentication, isAdmin, viewsController.adminMenu)
router.get('/admin/users', authentication, isAdmin, viewsController.adminUsuarios)
router.post('/admin/users', authentication, isAdmin, viewsController.criarUsuario)
router.put('/admin/users/:id', authentication, isAdmin, viewsController.atualizarUsuario)
router.delete('/admin/users/:id', authentication, isAdmin, viewsController.excluirUsuario)

router.get('/admin/orders', authentication, isAdmin, viewsController.adminPedidos)
router.put('/admin/orders/:id', authentication, isAdmin, viewsController.atualizarPedido)
router.delete('/admin/orders/:id', authentication, isAdmin, viewsController.excluirPedido)

module.exports = router
