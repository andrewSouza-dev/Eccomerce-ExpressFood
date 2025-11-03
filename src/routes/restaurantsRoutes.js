const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurantController')
const { authentication } = require('../middlewares/authMiddleware')


// Listar todos os restaurantes na tela 'HOME'
router.get('/', authentication, restaurantController.listAll)


module.exports = router
