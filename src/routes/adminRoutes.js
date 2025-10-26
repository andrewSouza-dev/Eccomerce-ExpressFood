const express = require('express')
const router = express.Router()
const { listUsers, listOrder } = require('../controllers/adminController')
const { authentication, isAdmin } = require('../middlewares/authMiddleware')

// Todas as rotas abaixo exigem autenticação e perfil de administrador
router.use(authentication)
router.use(isAdmin)

router.get('/pedidos', listOrder)
router.get('/users', listUsers)

module.exports = router
