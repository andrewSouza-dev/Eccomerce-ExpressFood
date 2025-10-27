const express = require('express')
const cors = require('cors')
const session = require('express-session') // <-- sessão
require('dotenv').config()

// Importando rotas
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const restaurantRoutes = require('./routes/restaurantsRoutes')
const orderRoutes = require('./routes/orderRoutes')
const searchRoutes = require('./routes/searchRoutes')
const adminRoutes = require('./routes/adminRoutes')
const viewsRoutes = require('./routes/viewsRoutes')

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // para capturar forms
app.use(session({ secret: 'foodsecret', resave: false, saveUninitialized: true }))

// Para tornar a pasta public estatica e facilitar o acesso
app.use(express.static('public'))

// Configuração do view engine
app.set('view engine', 'ejs')

// Container de rotas
const routes = require('./container')
app.use(routes)

// Middleware de erro
const errorHandler = require('./middlewares/errorHandler')
app.use(errorHandler)

// Rotas de views
app.use('/', viewsRoutes)

// Rota padrão 404
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' })
})

// Porta
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`))
