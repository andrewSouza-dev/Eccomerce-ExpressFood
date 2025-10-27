// middlewares/errorHandler.js
const HttpError = require('../errors/HttpError')

const errorHandler = (err, req, res, next) => {
    if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message })
  }

  
  // Erro genérico
  res.status(500).json({ error: 'Erro interno no servidor' })
}

module.exports = errorHandler