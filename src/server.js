const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();

/* ======================
   Middlewares globais
====================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ======================
   Sessão
====================== */
app.use(session({
  name: 'expressfood.sid',
  secret: process.env.SESSION_SECRET || 'expressfood_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'lax', // OK porque EJS é same-site
    maxAge: 1000 * 60 * 60 // 1 hora
  }
}));

/* ======================
   Static files
====================== */
app.use(express.static(path.join(__dirname, '../public')));

/* ======================
   Views
====================== */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

/* ======================
   Usuário disponível nas views
====================== */
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

/* ======================
   Rotas
====================== */
const routes = require('./container');
app.use(routes);

/* ======================
   404
====================== */
app.use((req, res) => {
  return res.status(404).render('error/error', {
    status: 404,
    message: 'Página não encontrada'
  });
});

/* ======================
   Porta (Render)
====================== */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
