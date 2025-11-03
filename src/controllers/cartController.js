const cartService = require('../services/cartService')

const view = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.session.user.id)
    res.render('client/carrinho', { cart })
  } catch (error) {
    next(error)
  }
}

const add = async (req, res, next) => {
  try {
    await cartService.addItem(req.session.user.id, req.body.productId)
    res.redirect('/carrinho')
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    await cartService.removeItem(req.params.id)
    res.redirect('/carrinho')
  } catch (error) {
    next(error)
  }
}

const finalizar = async (req, res, next) => {
  try {
    await cartService.finalizarPedido(req.session.user.id)
    res.render('client/pedidoFinalizado')
  } catch (error) {
    next(error)
  }
}

module.exports = { view, add, remove, finalizar }
