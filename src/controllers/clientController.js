const restaurantService = require('../services/restaurantService')
const productService = require('../services/productService')

const home = async (req, res, next) => {
  try {
    const restaurantes = await restaurantService.listAll()
    res.render('client/home', { user: req.session.user, restaurantes })
  } catch (error) {
    next(error)
  }
}

const verRestaurante = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const restaurante = await restaurantService.listById(id)
    const produtos = await productService.listByRestaurant(id)
    res.render('client/restaurante', { restaurante, produtos })
  } catch (error) {
    next(error)
  }
}

module.exports = { home, verRestaurante }
