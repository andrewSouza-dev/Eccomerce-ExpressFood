const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurantController')

router.get('/', restaurantController.listAll)
router.get('/:id', restaurantController.listById)
router.post('/', restaurantController.newRestaurant)
router.put('/:id', restaurantController.updateRestaurant)
router.delete('/:id', restaurantController.deleteRestaurant)

module.exports = router