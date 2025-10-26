const express = require('express')
const multer = require('multer')
const { storage } = require('../utils/cloudinary')
const router = express.Router()

const upload = multer({ storage })

// Rota para upload de imagem
router.post('/imagem', upload.single('file'), (req, res) => {
    res.json({ url: req.file.path }) // Retorna URL da imagem hospedada
})

module.exports = {
    uploadRoutes:router
}
