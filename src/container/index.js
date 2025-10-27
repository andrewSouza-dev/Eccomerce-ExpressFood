const express = require('express')
const router = express.Router()

// Importa todas as rotas
const userRoutes = require('../routes/userRoutes')
const productRoutes = require('../routes/productRoutes')
const orderRoutes = require('../routes/orderRoutes')
const restaurantRoutes = require('../routes/restaurantsRoutes')
const searchRoutes = require('../routes/searchRoutes')
const adminRoutes = require('../routes/adminRoutes')
const authRoutes = require('../routes/authRoutes')
const viewsRoutes = require('../routes/viewsRoutes')

// Aplica prefixos
router.use('/users', userRoutes)
router.use('/products', productRoutes)
router.use('/orders', orderRoutes)
router.use('/restaurants', restaurantRoutes)
router.use('/buscar', searchRoutes)
router.use('/admin', adminRoutes)
router.use('/auth', authRoutes) // login e cadastro
router.use('/', viewsRoutes)

module.exports = router
