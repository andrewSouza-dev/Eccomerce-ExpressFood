const express = require('express')
const router = express.Router()
const { listUsers, listOrder } = require('./controllers/adminController')
const { autentication, isAdmin } = require('./middlewares/authMiddleware')

// Todas as rotas abaixo exigem autenticação e perfil de administrador
router.use(autentication)
router.use(isAdmin)

router.get('/pedidos', listOrder)
router.get('/usuarios', listUsers)

module.exports = {
    adminRoutes:router
}