import dotenv from 'dotenv'
dotenv.config()
export const {
  PORT = 3000,
  MONGO_URI = '',
  MONGO_USER = '',
  MONGO_PASSWORD = '',
  JWT_SECRET

} = process.env
