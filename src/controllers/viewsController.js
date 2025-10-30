const viewsService = require('../services/viewsService')

// PAGINA DE LOGIN E CADASTRO
const index = (req, res) => res.render('index')

// PAGINA DE LOGIN
const login = (req, res) => res.redirect('/auth/login')

// SAIR
const logout = (req, res) => {
    req.session.destroy(() => res.redirect('/'))
}

// Home: mostra restaurantes próximos e campo de busca
const home = async (req, res, next) => {
    try {
        const { lat, lon } = req.query
        const user = req.session.user
        let restaurantes = []

        if (lat && lon) {
            restaurantes = await restaurantService.listarProximos(
                parseFloat(lat),
                parseFloat(lon)
            )
        }

        res.render('client/home', { user, restaurantes })
    } catch (error) {
        next(error)
    }
}

const buscarPratos = async (req, res, next) => {
    try {
        const { nome, lat, lon } = req.query
        const produtos = await searchService.buscarPrato(
            nome,
            parseFloat(lat),
            parseFloat(lon)
        )
        res.render('client/busca', { query: nome, produtos })
    } catch (error) {
        next(error)
    }
}

const verRestaurante = async (req, res, next) => {
    try {
        const restaurante = await prisma.restaurant.findUnique({
            where: { id: Number(req.params.id) },
            include: { products: true },
        })

        if (!restaurante) throw new HttpError(404, 'Restaurante não encontrado')

        res.render('client/restaurante', { produtos: restaurante.products })
    } catch (error) {
        next(error)
    }
}

// Carrinho em sessão
const verCarrinho = (req, res) => {
    const cart = req.session.cart || []
    res.render('client/cart', { cart })
}

// ADICIONA AO CARRINHO
const adicionarAoCarrinho = async (req, res, next) => {
    try {
        const productId = Number(req.body.productId)
        const quantity = Number(req.body.quantity) || 1

        const product = await viewsService.buscarProdutoPorId(productId)
        if (!product) return res.status(404).send('Produto não encontrado')

        if (!req.session.cart) req.session.cart = []

        // se já existe, soma quantidade
        const idx = req.session.cart.findIndex(
            (i) => i.product.id === product.id
        )
        if (idx >= 0) {
            req.session.cart[idx].quantity += quantity
        } else {
            req.session.cart.push({ product, quantity })
        }

        return res.redirect('back')
    } catch (error) {
        next(error)
    }
}

// REMOVER DO CARRINHO
const removerDoCarrinho = (req, res) => {
    const productId = Number(req.body.productId)
    if (!req.session.cart) return res.redirect('/cart')

    req.session.cart = req.session.cart.filter(
        (i) => i.product.id !== productId
    )
    res.redirect('/cart')
}

const finalizarPedido = async (req, res, next) => {
    try {
        const user = req.session.user
        if (!user) return res.redirect('/auth/login')

        const cart = req.session.cart || []
        const order = await viewsService.salvarPedido(user.id, cart)

        // limpa carrinho e mostra página de confirmação
        req.session.cart = []
        res.render('client/confirmacao', {
            order,
            message: 'PEDIDO FINALIZADO!',
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    index,
    login,
    logout,
    home,
    buscarPratos,
    verRestaurante,
    verCarrinho,
    adicionarAoCarrinho,
    removerDoCarrinho,
    finalizarPedido,
}
