const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurantController')
const { authentication } = require('../middlewares/authMiddleware')

router.get('/proximos', authentication, restaurantController.listarProximos)

module.exports = router
