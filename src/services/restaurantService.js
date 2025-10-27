const prisma = require('../database')
const HttpError = require('../errors/HttpError')

// Função para calcular distância entre dois pontos (Haversine)
const haversine = (lat1, lon1, lat2, lon2) => {
  const toRad = deg => (deg * Math.PI) / 180
  const R = 6371 // km
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

const listarProximos = async (userLat, userLon) => {
  if (!userLat || !userLon) throw new HttpError(400, 'Coordenadas de localização ausentes')

  const restaurantes = await prisma.restaurant.findMany()

  const proximos = restaurantes
    .map(r => ({
      ...r,
      distancia: haversine(userLat, userLon, r.latitude, r.longitude)
    }))
    .filter(r => r.distancia <= 10) // Exemplo: até 10km
    .sort((a, b) => a.distancia - b.distancia)

  return proximos
}

module.exports = { listarProximos }