const authService = require('../services/authService')

// Exibe a view de cadastro
const cadastroView = (req, res) => {
  res.render('cadastro')
}

// Processa o cadastro e exibe a tela de sucesso
const cadastrar = async (req, res, next) => {
  try {
    const userData = {
      ...req.body
    }
    const user = await authService.cadastrar(userData)
    res.render('cadastroSucesso', { user })
  } catch (error) {
    next(error)
  }
}


// Exibe a view de login
const loginView = (req, res) => {
  const success = req.session.success
  req.session.success = null
  res.render('login', { success })
}

// Processa o login e redireciona para /home
const login = async (req, res, next) => {
  try {
    const { token, user } = await authService.login(req.body)
    req.session.token = token
    req.session.user = user
    res.redirect('/home')
  } catch (error) {
    next(error)
  }
}

module.exports = {
  cadastroView,
  cadastrar,
  loginView,
  login
}