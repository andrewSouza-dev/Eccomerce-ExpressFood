const express = require('express')
const { authentication } = require('../middlewares/authMiddleware')
const clientController = require('../controllers/clientController')
const cartController = require('../controllers/cartController')
const searchController = require('../controllers/searchController')

const router = express.Router()

router.get('/home', authentication, clientController.home)
router.get('/buscar', authentication, searchController.buscarPrato)
router.get('/restaurante/:id', authentication, clientController.verRestaurante)

router.get('/carrinho', authentication, cartController.view)
router.post('/carrinho/adicionar', authentication, cartController.add)
router.post('/carrinho/remover/:id', authentication, cartController.remove)
router.post('/carrinho/finalizar', authentication, cartController.finalizar)

module.exports = router
