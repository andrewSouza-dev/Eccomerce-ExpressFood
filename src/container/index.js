const express = require('express');
const router = express.Router();

const authRoutes = require('../routes/authRoutes');
const adminRoutes = require('../routes/adminRoutes');
const viewsRoutes = require('../routes/viewsRoutes');

// Rotas públicas de autenticação
router.use('/auth', authRoutes);

// Rotas do admin (protegidas)
router.use('/admin', adminRoutes);

// Rotas gerais/views (algumas protegidas individualmente)
router.use('/', viewsRoutes);

module.exports = router;
