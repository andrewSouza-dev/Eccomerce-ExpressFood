const authService = require('../services/authService');

/* ======================
   Views
====================== */
const cadastroView = (req, res) => {
  res.render('auth/cadastro');
};

const loginView = (req, res) => {
  const success = req.session.success;
  const error = req.session.error;

  req.session.success = null;
  req.session.error = null;

  res.render('auth/login', { success, error });
};

/* ======================
   Cadastro
====================== */
const cadastrar = async (req, res, next) => {
  try {
    const user = await authService.cadastrar(req.body);

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin: user.role === 'ADMIN'
    };

    req.session.success = 'Cadastro realizado com sucesso!';

    req.session.save(err => {
      if (err) {
        console.error('Erro ao salvar sessão:', err);
        return res.render('auth/cadastro', {
          error: 'Erro ao criar sessão. Tente novamente.'
        });
      }

      return user.role === 'ADMIN'
        ? res.redirect('/admin')
        : res.redirect('/home');
    });
  } catch (error) {
    next(error);
  }
};

/* ======================
   Login (SEM JWT)
====================== */
const login = async (req, res) => {
  try {
    const { user } = await authService.login(req.body);

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin: user.role === 'ADMIN'
    };

    req.session.save(err => {
      if (err) {
        console.error('Erro ao salvar sessão:', err);
        return res.render('auth/login', {
          success: null,
          error: 'Erro ao criar sessão. Tente novamente.'
        });
      }

      return user.role === 'ADMIN'
        ? res.redirect('/admin')
        : res.redirect('/home');
    });
  } catch (error) {
    return res.render('auth/login', {
      success: null,
      error: 'E-mail ou senha inválidos'
    });
  }
};

/* ======================
   Logout
====================== */
const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) console.error('Erro ao destruir sessão:', err);
    res.redirect('/');
  });
};

module.exports = {
  cadastroView,
  loginView,
  cadastrar,
  login,
  logout
};
