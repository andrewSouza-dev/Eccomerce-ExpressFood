const viewsService = require('../services/viewsService')
const jwt = require('jsonwebtoken')

// Login
const index = (req, res) => {
  try {
    res.render('index')
  } catch (error) {
    console.error('Erro ao renderizar index:', error)
    next(error)
  }
}


const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const result = await viewsService.autenticarUsuario(email, password)

    if (!result) {
      return res.redirect('/login')
    }

    req.session.token = result.token
    req.session.user = result.user
    res.redirect(result.user.isAdmin ? '/admin' : '/home')
  } catch (error) {
    console.error('Erro no login:', error)
    next(error)
  }
}


const logout = (req, res) => {
  req.session.destroy(() => res.redirect('/'))
}

// Home
const home = (req, res) => {
  const user = req.user

  if (user.isAdmin) {
    res.render('auth/dashboardAdmin', { user })
  } else {
    res.render('auth/dashboardUser', { user })
  }
}

// Busca
const buscarPratos = async (req, res, next) => {
  try {
    const { nome } = req.query
    const produtos = await viewsService.buscarPratos(nome)
    res.render('search', { produtos, query: nome })
  } catch (error) {
    next(error)
  }
}

const verRestaurante = async (req, res, next) => {
  try {
    const { id } = req.params
    const produtos = await viewsService.buscarProdutosDoRestaurante(id)
    res.render('restaurante', { produtos, user: req.user })
  } catch (error) {
    next(error)
  }
}

// Carrinho
const verCarrinho = (req, res) => {
  res.render('cart', { cart: req.session.cart || [], user: req.user })
}

const adicionarAoCarrinho = async (req, res, next) => {
  try {
    if (!req.session.cart) req.session.cart = []
    const { productId, quantity } = req.body
    const product = await viewsService.buscarProdutoPorId(productId)
    req.session.cart.push({ product, quantity: Number(quantity) })
    res.redirect('/cart')
  } catch (error) {
    next(error)
  }
}

const finalizarPedido = async (req, res, next) => {
  try {
    await viewsService.salvarPedido(req.user.id, req.session.cart)
    req.session.cart = []
    res.render('confirmacao', { user: req.user })
  } catch (error) {
    next(error)
  }
}

// Admin
const adminMenu = (req, res) => res.render('admin', { user: req.user })

const adminUsuarios = async (req, res, next) => {
  try {
    const usuarios = await viewsService.listarUsuarios()
    res.render('adminUsers', { usuarios })
  } catch (error) {
    next(error)
  }
}

const criarUsuario = async (req, res, next) => {
  try {
    await viewsService.criarUsuario(req.body)
    res.redirect('/admin/users')
  } catch (error) {
    next(error)
  }
}

const atualizarUsuario = async (req, res, next) => {
  try {
    await viewsService.atualizarUsuario(req.params.id, req.body)
    res.redirect('/admin/users')
  } catch (error) {
    next(error)
  }
}

const excluirUsuario = async (req, res, next) => {
  try {
    await viewsService.excluirUsuario(req.params.id)
    res.redirect('/admin/users')
  } catch (error) {
    next(error)
  }
}

const adminPedidos = async (req, res, next) => {
  try {
    const pedidos = await viewsService.listarPedidos()
    res.render('adminOrders', { pedidos })
  } catch (error) {
    next(error)
  }
}

const atualizarPedido = async (req, res, next) => {
  try {
    await viewsService.atualizarPedido(req.params.id, req.body.status)
    res.redirect('/admin/orders')
  } catch (error) {
    next(error)
  }
}

const excluirPedido = async (req, res, next) => {
  try {
    await viewsService.excluirPedido(req.params.id)
    res.redirect('/admin/orders')
  } catch (error) {
    next(error)
  }
}

module.exports = {
  index,
  login,
  logout,
  home,
  buscarPratos,
  verRestaurante,
  verCarrinho,
  adicionarAoCarrinho,
  finalizarPedido,
  adminMenu,
  adminUsuarios,
  criarUsuario,
  atualizarUsuario,
  excluirUsuario,
  adminPedidos,
  atualizarPedido,
  excluirPedido
}
