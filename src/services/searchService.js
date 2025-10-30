const prisma = require('../database')
const HttpError = require('../errors/HttpError')
const { listarProximos } = require('./restaurantService')
const haversine = (lat1, lon1, lat2, lon2) => {
  const toRad = deg => (deg * Math.PI) / 180
  const R = 6371
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Busca pratos por nome + proximidade
const buscarPrato = async (nome, lat, lon) => {
  if (!nome) throw new HttpError(400, 'Informe o nome do prato')
  if (!lat || !lon) throw new HttpError(400, 'Coordenadas ausentes')

  const produtos = await prisma.product.findMany({
    where: {
      name: {
        contains: nome,
        mode: 'insensitive'
      }
    },
    include: { restaurant: true }
  })

  if (!produtos.length) throw new HttpError(404, 'Nenhum prato encontrado com esse nome')

  const resultados = produtos.map(p => ({
    ...p,
    distancia: haversine(lat, lon, p.restaurant.latitude, p.restaurant.longitude)
  }))

  return resultados.sort((a, b) => a.distancia - b.distancia)
}

module.exports = { buscarPrato }
