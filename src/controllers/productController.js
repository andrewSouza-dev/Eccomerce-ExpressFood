const productService = require('../services/productService')
const restaurantService = require('../services/restaurantService')

// Lista todos os produtos
const listAll = async (req, res, next) => {
  try {
    const products = await productService.listAll()
    res.render('admin/products/index', { 
      products, 
      user: req.session.user,
      msg: req.query.msg
    })
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
const novoView = async (req, res, next) => {
  try {
    const restaurantes = await restaurantService.listAll()
    res.render('admin/products/new', { 
      restaurantes,
      user: req.session.user 
    })
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      price: parseFloat(req.body.price),        // converter para número
      imagemURL: req.body.imagemURL,
      restaurantId: Number(req.body.restaurantId) // converter para inteiro
    }

    await productService.create(data)
    res.redirect('/admin/produtos?msg=Produto+criado+com+sucesso')
  } catch (error) {
    next(error)
  }
}


// Exibir formulário de edição
const editarView = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const produto = await productService.listById(id)
    const restaurantes = await restaurantService.listAll()
    res.render('admin/products/edit', { produto, restaurantes, user: req.session.user })
  } catch (error) {
    next(error)
  }
}

// Atualizar produto
const update = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const data = {
      name: req.body.name,
      price: parseFloat(req.body.price),
      imagemURL: req.body.imagemURL,
      restaurantId: Number(req.body.restaurantId)
    }
    await productService.update(id, data)
    res.redirect('/admin/produtos?msg=Produto+editado+com+sucesso')
  } catch (error) {
    next(error)
  }
}

// Deletar produto
const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    await productService.remove(id)
    res.redirect('/admin/produtos?msg=Produto+removido+com+sucesso')
  } catch (error) {
    next(error)
  }
}

module.exports = { listAll, listById, novoView, create, editarView, update, remove }
