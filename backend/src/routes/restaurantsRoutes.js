const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurantController')

router.get('/proximos', restaurantController.listarProximos)

module.exports = router
