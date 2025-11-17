## ⚙️ Agenda Contacts – Backend

Servidor Node.js + Express que gestiona la base de datos de contactos.
Provee una API REST para la aplicación Agenda Contacts, almacenando los datos en MongoDB Atlas.

## 🚀 Tecnologías principales

Node.js

Express

MongoDB Atlas

Mongoose

Cors, Dotenv

## ⚙️ Instalación y ejecución

1️⃣ Instalar dependencias:

npm install

2️⃣ Ejecutar en desarrollo (con nodemon):

npm run dev

3️⃣ Ejecutar en producción:

npm start

## 🌐 Variables de entorno

Archivo .env:

MONGODB_URI=tu_conexion_de_mongodb_atlas
PORT=3001

## 📡 Endpoints principales

GET /api/contacts → Listar contactos

POST /api/contacts → Crear nuevo contacto

DELETE /api/contacts/:id → Eliminar contacto

(PUT /api/contacts/:id → próximamente editar contacto)

## ☁️ Deploy

Backend desplegado en **Render**
🔗 https://agenda-contacts-api.onrender.com
