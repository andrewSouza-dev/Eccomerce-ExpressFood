const restaurantService = require('../services/restaurantService')

const listarProximos = async (req, res, next) => {
  try {
    const { lat, lon } = req.query
    const userLat = parseFloat(lat)
    const userLon = parseFloat(lon)
    const restaurantes = await restaurantService.listarProximos(userLat, userLon)
    res.json(restaurantes)
  } catch (error) {
    next(error)
  }
}

module.exports = { listarProximos }