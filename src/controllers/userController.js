const prisma = require('../database')

// Lista todos os usuários
listAll = async (req, res) => {
    const users = await prisma.user.findMany({
        select: { id: true, name: true, email: true },
    })
    res.json(users)
}

// Buscar usuário por ID
listById = async (req, res) => {
    const id = Number(req.params.id)
    const user = await prisma.user.findUnique({ where: { id }})
    res.json(user)
}

// Criar um novo usuario 
newUser = async (req, res) => {
    const { name, email, password } = req.body
    const newUser = await prisma.user.create({ data: { name, email, password } })
    res.json(newUser)
}

// Atualizar usuário
updateUser = async (req, res) => {
    const id = Number(req.params.id)
    const { name, email } = req.body
    const updateUser = await prisma.user.update({
        where: { id },
        data: { name, email }
    })
    res.json(updateUser)
}

// Exclui um usuário pelo ID
deleteUser = async (req, res) => {
    const id = Number(req.params.id)
    await prisma.user.delete({ where: { id } })
    res.json({ message: 'Usuário excluído com sucesso' })
}

module.exports = { listAll, listById, newUser, updateUser, deleteUser }
