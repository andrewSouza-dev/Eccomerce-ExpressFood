const express = require('express')
const router = express.Router()

// Rotas de domínio
const adminRoutes = require('../routes/adminRoutes')

// Funcionalidades
const authRoutes = require('../routes/authRoutes')
const viewsRoutes = require('../routes/viewsRoutes')

router.use('/auth', authRoutes)
router.use('/admin', adminRoutes)
router.use('/', viewsRoutes)

module.exports = router
