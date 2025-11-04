const productService = require('../services/productService')

// Lista todos os produtos
const listAll = async (req, res, next) => {
  try {
    const products = await productService.listAll()
    res.render('admin/')
  } catch (error) {
    next(error)
  }
}

// Buscar produto por ID
const listById = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const product = await productService.listById(id)
    res.json(product)
  } catch (error) {
    next(error)
  }
}


// Exibir formulário de criação
const novoView = async (req, res) => {
  const restaurantes = await productService.listarRestaurantes()
  res.render('admin/produtos/novo', { restaurantes, user: req.session.user })
}


// Criar um produto
const create = async (req, res, next) => {
  try {
    const newP = await productService.create(req.body)
    res.json(newP)
  } catch (error) {
    next(error)
  }
}


// Exibir formulário de edição
const editarView = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const produto = await productService.listById(id)
    const restaurantes = await productService.listarRestaurantes()
    res.render('admin/produtos/editar', { produto, restaurantes, user: req.session.user })
  } catch (error) {
    next(error)
  }
}


// Atualizar produto
const update = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const updateP = await productService.update(id, req.body)
    res.json(updateP)
  } catch (error) {
    next(error)
  }
}


// Deletar produto
const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const deleted = await productService.remove(id)
    res.json(deleted)
  } catch (error) {
    next(error)
  }
}

module.exports = { listAll, listById, novoView, create, editarView, update, remove }
