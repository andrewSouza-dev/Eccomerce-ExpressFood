const viewsService = require('../services/viewsService')
const jwt = require('jsonwebtoken')

// Pagina de inicio
const index = (req, res) => {
  try {
    res.render('index')
  } catch (error) {
    console.error('Erro ao renderizar index:', error)
    next(error)
  }
}



// Login
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
    res.render('client/search', { produtos, query: nome })
  } catch (error) {
    next(error)
  }
}

const verRestaurante = async (req, res, next) => {
  try {
    const { id } = req.params
    const produtos = await viewsService.buscarProdutosDoRestaurante(id)
    res.render('client/restaurante', { produtos, user: req.user })
  } catch (error) {
    next(error)
  }
}



// Carrinho
const verCarrinho = (req, res) => {
  res.render('client/cart', { cart: req.session.cart || [], user: req.user })
}

const adicionarAoCarrinho = async (req, res, next) => {
  try {
    if (!req.session.cart) req.session.cart = []
    const { productId, quantity } = req.body
    const product = await viewsService.buscarProdutoPorId(productId)
    req.session.cart.push({ product, quantity: Number(quantity) })
    res.redirect('client/cart')
  } catch (error) {
    next(error)
  }
}

const finalizarPedido = async (req, res, next) => {
  try {
    await viewsService.salvarPedido(req.user.id, req.session.cart)
    req.session.cart = []
    res.render('client/confirmacao', { user: req.user })
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
  finalizarPedido
}
