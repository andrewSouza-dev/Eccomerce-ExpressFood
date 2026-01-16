const prisma = require('../database');
const bcrypt = require('bcrypt');
const HttpError = require('../errors/HttpError');

/* ======================
   Cadastro
====================== */
const cadastrar = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role || 'CLIENTE'
    }
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
};

/* ======================
   Login (SEM JWT)
====================== */
const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new HttpError(401, 'Credenciais inválidas');
  }

  const senhaValida = await bcrypt.compare(password, user.password);
  if (!senhaValida) {
    throw new HttpError(401, 'Credenciais inválidas');
  }

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};

module.exports = { cadastrar, login };
