const express = require('express')
const { buscarPrato } = require('../controllers/searchController')
const { authentication } = require('../middlewares/authMiddleware')

const router = express.Router()

// ROTA GET PARA BUSCAR PRATOS POR NOME
router.get('/pratos', authentication, buscarPrato)

module.exports = router
