// Calcula distância entre dois pontos (Haversine formula)
function calcularDistancia(lat1, lng1, lat2, lng2) {
  const R = 6371 // km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Lista restaurantes próximos com base na localização do usuário
const listarProximos = async (req, res) => {
  const { lat, lng } = req.query
  const latitude = parseFloat(lat)
  const longitude = parseFloat(lng)

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude e longitude são obrigatórios' })
  }

  const restaurantes = await prisma.restaurant.findMany()

  // Filtra os restaurantes por distância (ex: até 10km)
  const proximos = restaurantes.filter(r => {
    const distancia = calcularDistancia(latitude, longitude, r.latitude, r.longitude)
    return distancia <= 10
  })

  res.json(proximos)
}

module.exports = { calcularDistancia ,listarProximos }