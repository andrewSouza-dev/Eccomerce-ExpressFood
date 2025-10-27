const prisma = require('../database')
const userService = require('../services/userService')

// Lista todos os usuários
const listAll = async (req, res, next) => {
    try {
        const users = await userService.listAll()
        res.json(users)
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

// Criar um novo usuario 
const newUser = async (req, res) => {
    try {
    const user = await userService.newUser(req.body)
    res.json(user)
  } catch (error) {
    next(error)
  }
}

// Atualizar usuário
const updateUser = async (req, res) => {
    try {
    const id = Number(req.params.id)
    const updateUser = await userService.updateUser(id, req.body)
    res.json(updateUser)
  } catch (error) {
    next(error)
  }
}

// Exclui um usuário pelo ID
const deleteUser = async (req, res) => {
    try {
    const id = Number(req.params.id)
    const deletedUser = await userService.deleteUser(id)
    res.json({ deletedUser })
  } catch (error) {
    next(error)
  }
}

module.exports = { listAll, listById, newUser, updateUser, deleteUser }
