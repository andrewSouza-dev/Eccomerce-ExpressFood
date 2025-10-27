const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { authentication, isAdmin } = require('../middlewares/authMiddleware')

// SÓ ADMIN
router.get('/', authentication, isAdmin, userController.listAll)

// PUBLICAS 
router.get('/:id', authentication, userController.listById)
router.post('/', userController.newUser)
router.put('/:id', authentication, userController.updateUser)
router.delete('/:id', authentication, userController.deleteUser)

module.exports = router

