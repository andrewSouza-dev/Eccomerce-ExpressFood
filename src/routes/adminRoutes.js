const expres = require('express')
const router = expres.Router()
const autenticar = require('../middlewares/authMiddleware')
const { listarUsuarios, deleteUser }  = require('../controllers/userController')
const { listarRestaurantes, criarRestaurante } = require('../controllers/restaurantController')
const { listarProdutos, criarProduto } =  require('../controllers/productController')

// Middleware de autenticação (pode ser expandido para verificar se é admin)
router.use(autenticar)

// Usuarios
router.get('/usuarios', listarUsuarios)
router.delete('/usuarios/:id', deleteUser)

// Restaurantes
router.get('/restaurantes', listarRestaurantes)
router.post('/restaurantes', criarRestaurante)

// Produtos 
router.get('/produtos', listarProdutos)
router.post('/produtos', criarProduto)

module.exports = router