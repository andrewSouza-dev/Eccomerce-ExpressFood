const prisma = require('../database')
const HttpError = require('../errors/HttpError')

const buscarPrato = async (nome) => {
  if (!nome) throw new HttpError(400, 'Informe o nome do prato para buscar')

  const pratos = await prisma.product.findMany({
    where: {
      name: {
        contains: nome,
        mode: 'insensitive'
      }
    },
    include: {
      restaurant: true
    }
  })

  if (pratos.length === 0) throw new HttpError(404, 'Nenhum prato encontrado com esse nome')

  return pratos
}

module.exports = { buscarPrato }