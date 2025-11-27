const authService = require('../services/authService');

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

// Cadastro de usuário
const cadastrar = async (req, res, next) => {
  try {
    const user = await authService.cadastrar(req.body);

    // Salva sessão de usuário
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin: user.role === 'ADMIN',
    };

    // Mensagem flash
    req.session.success = 'Cadastro realizado com sucesso!';

    // Salva sessão e redireciona
    req.session.save(err => {
      if (err) {
        console.error('Erro ao salvar sessão:', err);
        return res.render('auth/cadastro', {
          error: 'Erro ao criar sessão. Tente novamente.',
        });
      }

      // Redireciona conforme o papel do usuário
      if (user.role === 'ADMIN') {
        return res.redirect('/admin');
      } else {
        return res.redirect('/home');
      }
    });
  } catch (error) {
    next(error);
  }
};



// Login de usuário
const login = async (req, res, next) => {
  try {
    const { token, user } = await authService.login(req.body);

    // Salva sessão de usuário
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin: user.role === 'ADMIN',
    };
    req.session.token = token;

    // Salva sessão antes de redirecionar
    req.session.save(err => {
      if (err) {
        console.error('Erro ao salvar sessão:', err);
        return res.render('auth/login', {
          success: null,
          error: 'Erro ao criar sessão. Tente novamente.',
        });
      }

      // Redireciona conforme o papel do usuário
      if (user.role === 'ADMIN') {
        return res.redirect('/admin');
      } else {
        return res.redirect('/home');
      }
    });
  } catch (error) {
    console.error('Erro no login:', error.message);
    return res.render('auth/login', {
      success: null,
      error: 'E-mail ou senha inválidos',
    });
  }
};

// Logout de usuário
const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) console.error('Erro ao destruir sessão:', err);
    res.redirect('/');
  });
};



module.exports = { cadastroView, loginView, cadastrar, login, logout };
