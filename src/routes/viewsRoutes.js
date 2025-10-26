const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', (req, res) => res.render('index'))

router.get('/home', async (req, res) => {
  const restaurantes = await prisma.restaurant.findMany()
  res.render('home', { restaurantes })
})

router.get('/buscar/pratos', async (req, res) => {
  const { nome } = req.query
  const produtos = await prisma.product.findMany({
    where: { name: { contains: nome, mode: 'insensitive' } },
    include: { restaurant: true }
  })
  res.render('search', { produtos, query: nome })
})

router.post('/cart', async (req, res) => {
  if (!req.session.cart) req.session.cart = []
  const { productId, quantity } = req.body
  const product = await prisma.product.findUnique({ where: { id: Number(productId) }})
  req.session.cart.push({ product, quantity: Number(quantity) })
  res.redirect('/cart')
})

router.get('/cart', (req, res) => {
  res.render('cart', { cart: req.session.cart || [] })
})

router.post('/orders/finalizar', (req, res) => {
  req.session.cart = []
  res.send('<h1>Produto está sendo enviado!</h1><a href="/home">Voltar</a>')
})

module.exports = router
