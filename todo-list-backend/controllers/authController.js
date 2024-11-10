import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { JWT_SECRET, NODE_ENV } from '../config.js'

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!password) return res.status(400).json({ error: 'Credenciales incorrectas, se necesita el password' })
    if (!email) return res.status(400).json({ error: 'Credenciales incorrectas, se necesita el email' })
    const user = new User({ email, password })
    await user.save()
    res.status(201).json({ message: 'Usuario registrado con éxito', email })
  } catch (error) {
    res.status(500).json({ error: 'Error: ' + error })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!password) return res.status(400).json({ error: 'Credenciales incorrectas, se necesita el password' })
    if (!email) return res.status(400).json({ error: 'Credenciales incorrectas, se necesita el email' })

    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ error: 'Credenciales incorrectas' })

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' }) // <<<<< ----- for dev only but real value is 1h

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 60 * 60 * 10000, // <-- change this
    }).send({email, token})


  } catch (error) {
    res.status(500).json({ error: 'Error iniciando sesión' })
  }
}


export const logoutUser = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Sesión cerrada con éxito' });
}