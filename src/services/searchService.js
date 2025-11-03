const prisma = require('../database')
const HttpError = require('../errors/HttpError')

// Busca pratos (produtos) pelo nome
const buscarPrato = async (nome) => {
  try {
    if (!nome || nome.trim() === '') {
      throw new HttpError(400, 'Informe o nome do prato para buscar.')
    }

    const produtos = await prisma.product.findMany({
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

    if (!produtos || produtos.length === 0) {
      throw new HttpError(404, 'Nenhum prato encontrado com esse nome.')
    }

    return produtos
  } catch (error) {
    // Repassa erro já tratado ou cria um novo erro genérico
    if (error instanceof HttpError) throw error
    throw new HttpError(500, 'Erro ao buscar pratos no banco de dados.')
  }
}

module.exports = { buscarPrato }
