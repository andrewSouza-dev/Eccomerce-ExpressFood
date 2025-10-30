const prisma = require('../database')
const HttpError = require('../errors/HttpError')


// Haversine
const haversine = (lat1, lon1, lat2, lon2) => {
const toRad = deg => (deg * Math.PI) / 180
const R = 6371
const dLat = toRad(lat2 - lat1)
const dLon = toRad(lon2 - lon1)
const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
return R * c
}


const listarRestaurantesProximos = async (userLat, userLon, maxDist = 10) => {
const restaurantes = await prisma.restaurant.findMany({ include: { products: true } })


return restaurantes
.map(r => ({ ...r, distancia: haversine(userLat, userLon, r.latitude, r.longitude) }))
.filter(r => r.distancia <= maxDist)
.sort((a, b) => a.distancia - b.distancia)
}


const buscarPratos = async (nome, userLat, userLon, maxDist = 10) => {
if (!nome) return []


const produtos = await prisma.product.findMany({
where: { name: { contains: nome, mode: 'insensitive' } },
include: { restaurant: true }
})


const filtrados = produtos
.map(p => ({ ...p, distancia: haversine(userLat, userLon, p.restaurant.latitude, p.restaurant.longitude) }))
.filter(p => p.distancia <= maxDist)
.sort((a, b) => a.distancia - b.distancia)


return filtrados
}


const buscarProdutosDoRestaurante = async (id) => {
return await prisma.product.findMany({ where: { restaurantId: Number(id) }, include: { restaurant: true } })
}


const buscarProdutoPorId = async (id) => {
return await prisma.product.findUnique({ where: { id: Number(id) } })
}


const salvarPedido = async (userId, cart) => {
if (!cart || cart.length === 0) return null


const order = await prisma.order.create({
data: {
userId,
status: 'PENDENTE',
total: cart.reduce((s, i) => s + i.product.price * i.quantity, 0),
items: { create: cart.map(item => ({ productId: item.product.id, quantity: item.quantity })) }
},
include: { items: { include: { product: true } } }
})


return order
}


module.exports = {
listarRestaurantesProximos,
buscarPratos,
buscarProdutosDoRestaurante,
buscarProdutoPorId,
salvarPedido
}