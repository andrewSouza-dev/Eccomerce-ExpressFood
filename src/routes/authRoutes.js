const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Credenciais inválidas' })
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
  res.json({ token })
})


router.post('/cadastro', async (req, res) => {
  const { email, password } = req.body
  const user = await User.create({ email, password })

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
  res.json({ token })
})
