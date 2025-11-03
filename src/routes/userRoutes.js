const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { authentication } = require('../middlewares/authMiddleware')

// PUBLICAS 
router.get('/:id', authentication, userController.listById)
router.post('/', userController.create)
router.put('/:id', authentication, userController.update)
router.delete('/:id', authentication, userController.remove)

module.exports = router

