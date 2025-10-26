const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

// Configura credenciais do Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
})

// Define storage para uploads
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'ifood', // Pasta onde as imagens serão salvas
        allowed_formats: ['jpg', 'png'], // Formatos permitidos
    },
})

module.exports = { cloudinary, storage }
