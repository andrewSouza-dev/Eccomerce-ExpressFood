const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

// Views públicas
router.get('/login', authController.loginView)
router.get('/cadastro', authController.cadastroView)

// Ações
router.post('/login', authController.login)
router.post('/cadastro', authController.cadastrar)

// Logout (público)
router.get('/logout', authController.logout)

module.exports = router
