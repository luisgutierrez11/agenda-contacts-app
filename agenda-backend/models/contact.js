const mongoose = require('mongoose')

// Definimos el esquema del documento "Contact"
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,      // Campo obligatorio
        minlength: 3         // Validación: mínimo 3 caracteres
    },
    number: {
        type: String,
        required: true,
        minlength: 3         // Podrías agregar más validaciones luego
    }
})

// Modificamos cómo se transforma el objeto cuando se envía como JSON
contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        // Convertimos _id a un string y lo renombramos a id
        returnedObject.id = returnedObject._id.toString()

        // Quitamos propiedades internas de MongoDB que no queremos exponer
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// Creamos el modelo basado en el esquema
const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
