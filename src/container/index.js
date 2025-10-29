const express = require('express')
const router = express.Router()

// Rotas de domínio
const userRoutes = require('../routes/userRoutes')
const productRoutes = require('../routes/productRoutes')
const orderRoutes = require('../routes/orderRoutes')
const restaurantRoutes = require('../routes/restaurantsRoutes')

// Funcionalidades
const searchRoutes = require('../routes/searchRoutes')
const authRoutes = require('../routes/authRoutes')
const viewsRoutes = require('../routes/viewsRoutes')

// Aplica prefixos
router.use('/users', userRoutes)
router.use('/products', productRoutes)
router.use('/orders', orderRoutes)
router.use('/restaurants', restaurantRoutes)

router.use('/buscar', searchRoutes)
router.use('/auth', authRoutes)
router.use('/', viewsRoutes)

module.exports = router
