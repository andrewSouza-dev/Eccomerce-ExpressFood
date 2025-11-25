const express = require('express')
const cors = require('cors')
const session = require('express-session')
const path = require('path')

// Dotenv
require('dotenv').config()

const app = express()

// Middlewares globais
app.use(cors({
  origin: 'http://localhost:3000', // ajuste para seu front
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: process.env.SESSION_SECRET || 'foodsecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // só HTTPS em produção
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 // 1h
  }
}))

// Pasta pública
app.use(express.static('public'))

// View engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Rotas
const routes = require('./container')
app.use(routes)

// Rota 404
app.use((req, res) => {
  if (req.accepts('html')) {
    return res.status(404).render('error/error', {
      status: 404,
      message: 'Página não encontrada',
      stack: null
    })
  }
  res.status(404).json({ message: 'Rota não encontrada' })
})

// Middleware de erro
const errorHandler = require('./middlewares/errorHandler')
app.use(errorHandler)

// Porta
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`))
