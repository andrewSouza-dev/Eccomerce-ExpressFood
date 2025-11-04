const restaurantService = require('../services/restaurantService')

// Listar todos os restaurantes
const listAll = async (req, res, next) => {
  try {
    const restaurantes = await restaurantService.listAll()
    res.render('admin/restaurants/index', { restaurantes, user: req.session.user })
  } catch (error) {
    next(error)
  }
}

// Mostrar formulário de criação
const novoView = (req, res) => {
  res.render('admin/restaurants/new', { user: req.session.user })
}

// Criar restaurante
const create = async (req, res, next) => {
  try {
    await restaurantService.create(req.body)
    res.redirect('/admin/restaurantes')
  } catch (error) {
    next(error)
  }
}

// Mostrar restaurante por ID
const listById = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const restaurante = await restaurantService.listById(id)
    res.render('admin/restaurants/show', { restaurante, user: req.session.user })
  } catch (error) {
    next(error)
  }
}

// Mostrar formulário de edição
const editarView = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const restaurante = await restaurantService.listById(id)
    res.render('admin/restaurants/edit', { restaurante, user: req.session.user })
  } catch (error) {
    next(error)
  }
}

// Atualizar restaurante
const edit = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    await restaurantService.update(id, req.body)
    res.redirect('/admin/restaurantes')
  } catch (error) {
    next(error)
  }
}

// Remover restaurante
const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    await restaurantService.remove(id)
    res.redirect('/admin/restaurantes')
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listAll,
  novoView,
  create,
  listById,
  editarView,
  edit,
  remove
}
