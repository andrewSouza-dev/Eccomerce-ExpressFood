const authService = require('../services/authService')

const cadastroView = (req, res) => {
    res.render('auth/cadastro')
}

const loginView = (req, res) => {
    const success = req.session.success
    req.session.success = null
    res.render('auth/login', { success, error: null })
}

const cadastrar = async (req, res, next) => {
    try {
        const user = await authService.cadastrar(req.body)
        req.session.user = user
        req.session.success = 'Cadastro realizado com sucesso! Faça login.'
        res.render('auth/cadastroSucesso', { user })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { token, user } = await authService.login(req.body)

        // Salva sessão para views EJS
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            isAdmin: user.role === 'ADMIN',
        }
        req.session.token = token

        console.log('✅ Login bem-sucedido:', user.email)

        // Redireciona com base no papel
        if (user.role === 'ADMIN') {
            return res.redirect('/admin')
        } else {
            return res.redirect('/home')
        }
    } catch (error) {
        console.error('Erro no login:', error.message)
        return res.render('auth/login', {
            success: null,
            error: 'E-mail ou senha inválidos',
        })
    }
}

const logout = (req, res) => {
    req.session.destroy(() => res.redirect('/'))
}

module.exports = { cadastroView, loginView, cadastrar, login, logout }
