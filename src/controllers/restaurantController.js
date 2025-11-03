const restaurantService = require('../services/restaurantService')

// Listar todos os restaurantes
const listAll = async (req, res, next) => {
  try {
    const restaurants = await restaurantService.listAll()
    res.json(restaurants)
  } catch (error) {
    next(error)
  }
}

// Buscar restaurante por ID
const listById = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const restaurant = await restaurantService.listById(id)
    res.json(restaurant)
  } catch (error) {
    next(error)
  }
}

// Criar restaurante
const create = async (req, res, next) => {
  try {
    const restaurant = await restaurantService.create(req.body)
    res.json(restaurant)
  } catch (error) {
    next(error)
  }
}

// Atualizar restaurante
const update = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const updated = await restaurantService.update(id, req.body)
    res.json(updated)
  } catch (error) {
    next(error)
  }
}

// Deletar restaurante
const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const deleted = await restaurantService.remove(id)
    res.json(deleted)
  } catch (error) {
    next(error)
  }
}

module.exports = { listAll, listById, create, update, remove }
