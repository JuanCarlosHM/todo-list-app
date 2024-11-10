import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado' })
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next()
  } catch (err) {
    res.status(400).json({ error: 'Token no válido' })
  }
}

export default authMiddleware
