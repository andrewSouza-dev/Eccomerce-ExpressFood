const authService = require('../services/authService')

const cadastrar = async (req, res, next) => {
  try {
    const user = await authService.cadastrar(req.body)
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = { cadastrar, login }
