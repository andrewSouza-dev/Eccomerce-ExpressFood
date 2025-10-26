const express = require('express')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const restaurantRoutes = require('./routes/restaurantsRoutes')
const orderRoutes = require('./routes/orderRoutes')
const searchRoutes = require('./routes/searchRoutes')
const adminRoutes = require('./routes/adminRoutes')

const app = express()

require('dotenv/config')

app.use(cors())
app.use(express.json())

// ROTAS PRINCIPAIS
app.use('/auth', route)
app.use('/users/', userRoutes)
app.use('/products', productRoutes)
app.use('/restaurants', restaurantRoutes)
app.use('/orders', orderRoutes)

// ROTA DE BUSCA DE PRATOS
app.use('/buscar', searchRoutes)


// ROTAS ADMIN
app.use('/admin', adminRoutes)

// PORTA DO SERVIDOR
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`)
})
