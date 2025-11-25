const viewsService = require('../services/viewsService')
const restaurantService = require('../services/restaurantService')
const HttpError = require('../errors/HttpError')

// PÁGINA INICIAL
const index = (req, res) => res.render('index', { user: req.session.user })

// LOGIN
const login = (req, res) => res.redirect('/auth/login')

// LOGOUT
const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid')
    res.redirect('/')
  })
}

// HOME
const home = async (req, res, next) => {
  try {
    const restaurantes = await viewsService.listarRestaurantes()
    res.render('client/home', { 
      user: req.session.user,
      restaurantes 
    })
  } catch (error) {
    next(error)
  }
}

// BUSCAR PRATOS
const buscarPratos = async (req, res, next) => {
  try {
    const { nome } = req.query
    const produtos = await viewsService.buscarProdutosPorNome(nome)
    res.render('client/search', { 
      user: req.session.user,
      query: nome, 
      produtos 
    })
  } catch (error) {
    next(error)
  }
}

// VER RESTAURANTE
const verRestaurante = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const restaurante = await restaurantService.listById(id)
    if (!restaurante) throw new HttpError(404, 'Restaurante não encontrado')

    res.render('client/restaurante', {
      restaurante,
      produtos: restaurante.products,
      user: req.session.user,
    })
  } catch (error) {
    next(error)
  }
}

// VER CARRINHO
const verCarrinho = (req, res) => {
  const cart = req.session.cart || []
  res.render('client/cart', { 
    user: req.session.user,
    cart 
  })
}

// ADICIONAR AO CARRINHO
const adicionarAoCarrinho = async (req, res, next) => {
  try {
    const productId = Number(req.body.productId)
    const quantity = Number(req.body.quantity) || 1

    const product = await viewsService.buscarProdutoPorId(productId)
    if (!req.session.cart) req.session.cart = []

    const idx = req.session.cart.findIndex(i => i.product.id === product.id)
    if (idx >= 0) {
      req.session.cart[idx].quantity += quantity
    } else {
      req.session.cart.push({ product, quantity })
    }

    res.redirect('/cart')
  } catch (error) {
    next(error)
  }
}

// REMOVER DO CARRINHO
const removerDoCarrinho = (req, res) => {
  const productId = Number(req.body.productId)
  if (!req.session.cart) return res.redirect('/cart')

  req.session.cart = req.session.cart.filter(i => i.product.id !== productId)
  res.redirect('/cart')
}

// FINALIZAR PEDIDO
const finalizarPedido = async (req, res, next) => {
  try {
    const user = req.session.user
    if (!user) return res.redirect('/auth/login')

    const cart = req.session.cart || []
    const order = await viewsService.salvarPedido(user.id, cart)

    req.session.cart = []

    res.render('client/confirmacao', {
      user: req.session.user,
      order,
      message: 'PEDIDO FINALIZADO!',
    })
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
  removerDoCarrinho,
  finalizarPedido,
}
