const userService = require('../services/userService')

// Listar todos os usuários
const listAll = async (req, res, next) => {
  try {
    const users = await userService.listAll()
    res.render('admin/users/index', { users, user: req.session.user })
  } catch (error) {
    next(error)
  }
}

const listarView = async (req, res, next) => {
  try {
    const users = await userService.listAll()
    res.render('admin/users/show', { users, user: req.session.user })
  } catch (error) {
    next(error)
  }
}

// Buscar usuário por ID
const listById = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const user = await userService.listById(id)
    res.json(user)
  } catch (error) {
    next(error)
  }
}


// Exibir formulário de criação
const novoView = (req, res) => {
  res.render('admin/users/novo', { user: req.session.user })
}

// Criar usuário
const create = async (req, res, next) => {
  try {
    const newUser = await userService.create(req.body)
    res.json(newUser)
  } catch (error) {
    next(error)
  }
}


// Exibir formulário de edição
const editarView = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const usuario = await userService.listById(id)
    res.render('admin/users/editar', { usuario, user: req.session.user })
  } catch (error) {
    next(error)
  }
}


// Atualizar usuário
const update = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const updated = await userService.update(id, req.body)
    res.json(updated)
  } catch (error) {
    next(error)
  }
}

// Deletar usuário
const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const deleted = await userService.remove(id)
    res.json(deleted)
  } catch (error) {
    next(error)
  }
}

module.exports = { listAll, listarView, listById, novoView, create, editarView, update, remove }
