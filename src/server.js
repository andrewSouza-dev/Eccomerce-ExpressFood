const express = require('express')
const cors = require('cors')
const session = require('express-session')
const path = require('path')
require('dotenv').config()

const app = express()

// Middlewares globais
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'foodsecret',
  resave: false,
  saveUninitialized: true
}))

// Pasta pública
app.use(express.static('public'))

// View engine
app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, '../views'))

// Rotas
const routes = require('./container')
app.use(routes)

// Rota 404 (deve vir antes do middleware de erro)
app.use((req, res) => {
  // Se for navegador, renderiza uma view
  if (req.accepts('html')) {
    return res.status(404).render('error/error', {
      status: 404,
      message: 'Página não encontrada',
      stack: null
    })
  }

  // Se for API, retorna JSON
  res.status(404).json({ message: 'Rota não encontrada' })
})

// Middleware de erro (deve ser o último)
const errorHandler = require('./middlewares/errorHandler')
app.use(errorHandler)

// Porta
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`))
