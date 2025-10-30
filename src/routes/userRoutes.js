const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { authentication } = require('../middlewares/authMiddleware')

// PUBLICAS 
router.get('/:id', authentication, userController.listById)
router.post('/', userController.newUser)
router.put('/:id', authentication, userController.updateUser)
router.delete('/:id', authentication, userController.deleteUser)

module.exports = router

