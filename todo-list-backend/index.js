import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { PORT, MONGO_URI, MONGO_USER, MONGO_PASSWORD } from './config.js'
import taskRoutes from './routes/taskRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'JSON inválido en la solicitud' })
  }
  next()
})

app.use(cors({
  origin: true,
  credentials: true
}))

app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)

mongoose
  .connect(MONGO_URI, { user: MONGO_USER, pass: MONGO_PASSWORD })
  .then(() => {
    console.log('MongoDB conectado')
    app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
  })
  .catch((err) => console.error('Error conectando a MongoDB:', err))
