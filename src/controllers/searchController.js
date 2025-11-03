const searchService = require('../services/searchService')

// Buscar pratos pelo nome
const buscarPrato = async (req, res, next) => {
  try {
    const { nome } = req.query

    if (!nome || nome.trim() === '') {
      return res.status(400).json({ message: 'O nome do prato é obrigatório para a busca.' })
    }

    const pratos = await searchService.buscarPrato(nome)
    res.json(pratos)
  } catch (error) {
    next(error)
  }
}

module.exports = { buscarPrato }
