const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const contactsRouter = require('./controllers/contacts')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

// Configura Mongoose para evitar warnings del modo estricto
mongoose.set('strictQuery', false)

// Intento de conexión a MongoDB Atlas utilizando la URI del archivo de configuración
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((err) => {
    logger.error('error connecting to MongoDB:', err.message)
  })

// Middleware para convertir automáticamente JSON en objetos JS
app.use(express.json())

// Habilita CORS para permitir que el frontend acceda al backend
app.use(cors())

// Middleware personalizado para registrar las solicitudes entrantes
app.use(middleware.requestLogger)

// Ruta simple de prueba para verificar si el backend está activo
app.get("/api/ping", (req, res) => {
  res.json({ message: "pong" })
})

// Ruta raíz opcional (útil al entrar al backend desde el navegador)
app.get("/", (req, res) => {
  res.send("Bienvenido a la API Agenda de Contactos 🚀")
})

// Rutas principales del proyecto (controlador de contactos)
app.use('/api/contacts', contactsRouter)

// Middleware para manejar errores lanzados por rutas o controladores
app.use(middleware.errorHandler)

// Middleware que responde si la ruta no existe
app.use(middleware.unknownEndpoint)

module.exports = app