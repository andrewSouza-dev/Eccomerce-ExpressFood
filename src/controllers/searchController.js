const searchService = require('../services/searchService')

const buscarPrato = async (req, res, next) => {
  try {
    const { nome } = req.query
    const pratos = await searchService.buscarPrato(nome)
    res.json(pratos)
  } catch (error) {
    next(error)
  }
}

module.exports = { buscarPrato }