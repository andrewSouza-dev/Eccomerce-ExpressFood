const errorHandler = (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Erro interno no servidor'

  console.error('Erro capturado:', err)

  if (req.accepts('html')) {
    // Renderiza diretamente a view de erro
    return res.status(status).render('error/error', { status, message })
  }

  // Se for API (JSON)
  return res.status(status).json({ status, error: message })
}

module.exports = errorHandler
