const express = require('express')
const router = express.Router()
const { buscarPrato } = require('../controllers/searchController')

// ROTA GET PARA BUSCAR PRATOS POR NOME
router.get('/pratos', buscarPrato)

module.exports = router
