const errorHandler = (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Erro interno no servidor'

  console.error('Erro capturado:', err)

  // Se for requisição HTML (navegador), renderiza a view de erro
  if (req.accepts('html')) {
    return res.status(status).render('error/error', {
      status,
      message,
    })
  }

  // Se for requisição API (JSON)
  res.status(status).json({ error: message })
}

module.exports =  errorHandler 