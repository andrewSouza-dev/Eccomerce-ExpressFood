const authentication = (req, res, next) => {
  // Rotas públicas
  const publicPaths = [
    '/',
    '/auth/login',
    '/auth/cadastro',
    '/auth/logout'
  ];

  if (publicPaths.includes(req.path)) {
    return next();
  }

  // Se usuário está logado
  if (req.session && req.session.user) {
    req.user = req.session.user;
    return next();
  }

  // Não autenticado
  console.log('🚫 Usuário não autenticado — redirect login');
  return res.redirect('/auth/login');
};

const isAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'ADMIN') {
    return res.status(403).render('error/error', {
      status: 403,
      message: 'Acesso negado',
      stack: null
    });
  }

  next();
};

module.exports = { authentication, isAdmin };
