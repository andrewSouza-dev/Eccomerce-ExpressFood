const productService = require('../services/productService')

// Lista todos os produtos
const listAll = async (req, res, next) => {
  try {
    const products = await productService.listAll()
    res.json(products)
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

// Criar um produto
const create = async (req, res, next) => {
  try {
    const newP = await productService.create(req.body)
    res.json(newP)
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

module.exports = { listAll, listById, create, update, remove }
