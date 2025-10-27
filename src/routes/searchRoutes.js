const express = require('express')
const router = express.Router()
const { buscarPrato } = require('../controllers/searchController')
const { authentication } = require('../middlewares/authMiddleware')

// ROTA GET PARA BUSCAR PRATOS POR NOME
router.get('/pratos', authentication, buscarPrato)

module.exports = router
