const express = require('express')
const cors = require('cors')
const app = express()

require('dotenv/config')

app.use(cors())
app.use(express.json())

// ROTAS PRINCIPAIS
app.use('/auth', require('./routes/authRoutes'))
app.use('/users/', require('./routes/userRoutes'))
app.use('/products', require('./routes/productRoutes'))
app.use('/restaurants', require('./routes/restaurantsRoutes'))
app.use('/orders', require('./routes/orderRoutes'))

// ROTAS ADMIN
app.use('/admin', require('./routes/adminRoutes'))

// PORTA DO SERVIDOR
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`)
})
