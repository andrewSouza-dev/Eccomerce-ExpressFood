const productService = require('../services/productService')

// Lista todos os produtos
const listAll = async (req, res) => {
  try {
    const products = await productService.listAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
}

// Buscar produto por ID
const listById = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const product = await productService.listById(id)
    res.json(product)
  } catch (error) {
    next(error)
  }
}

// Criar um produto
const newProduct = async (req, res) => {
  try {
    const newP = await productService.newProduct(req.body)
    res.json(newP)
  } catch (error) {
    next(error)
  }
}

// Atualizar produto
const updateProduct = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const updateP = await productService.updateProduct(id, req.body)
    res.json(updateP)
  } catch (error) {
    next(error)
  }
}


// Deletar um produto
const deleteProduct = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const deleted = await productService.deleteProduct(id)
    res.json({ deleted })
  } catch (error) {
    next(error)
  }
}

module.exports = { listAll, listById, newProduct, updateProduct, deleteProduct }
