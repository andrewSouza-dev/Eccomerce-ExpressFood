const cartService = require('../services/cartService')

const view = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.session.user.id)
    res.render('client/cart', { 
      user: req.session.user,
      cart 
    })
  } catch (error) {
    next(error)
  }
}

const add = async (req, res, next) => {
  try {
    await cartService.addItem(req.session.user.id, req.body.productId)
    res.redirect('/cart')
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    await cartService.removeItem(req.params.id)
    res.redirect('/cart')
  } catch (error) {
    next(error)
  }
}

const finalizar = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.session.user.id)
    if (!cart || cart.length === 0) {
      return res.status(400).render('client/error', {
        user: req.session.user,
        message: 'Seu carrinho está vazio. Adicione itens antes de finalizar.',
      })
    }

    const order = await cartService.finalizarPedido(req.session.user.id)
    res.render('client/confirmacao', { 
      user: req.session.user,
      order,
      message: 'Pedido finalizado com sucesso!'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { view, add, remove, finalizar }
