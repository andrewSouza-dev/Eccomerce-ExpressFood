const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

// Views
router.get('/cadastro', authController.cadastroView)
router.get('/login', authController.loginView)

// Ações
router.post('/cadastro', authController.cadastrar)
router.post('/login', authController.login)

module.exports = router