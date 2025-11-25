const errorHandler = (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Erro interno no servidor'

  console.error('Erro capturado:', err)

  if (req.accepts('html')) {
    // Renderiza diretamente a view de erro e passa também o usuário da sessão
    return res.status(status).render('error/error', { 
      status, 
      message, 
      user: req.session.user || null 
    })
  }

  // Se for API (JSON)
  return res.status(status).json({ status, error: message })
}

module.exports = errorHandler
