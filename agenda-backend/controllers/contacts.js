// Importamos el Router de Express y el modelo Contact
const contactsRouter = require('express').Router()
const Contact = require('../models/contact')

// Obtener todos los contactos
contactsRouter.get("/", async (req,res) => {
    try {
        // Trae todos los documentos de la colección "contacts"
        const contacts = await Contact.find({})
        res.json(contacts)
    } catch (err) {
        // Error inesperado del servidor
        res.status(500).json({ error: "Error al obtener los contactos" })
    }
})

// Obtener un contacto por id
contactsRouter.get("/:id", async (req,res) => {
    try {
        // Busca un documento por su _id en MongoDB
        const contact = await Contact.findById(req.params.id)

        // Si no existe, devolvemos 404
        if (!contact) 
            return res.status(404).json({ error: "Contacto no encontrado" });
        
        res.json(contact)
    } catch (err) {
        // Error general (id inválido u otros)
        res.status(500).json({ error: "Error al obtener el contacto" })
    }
})

// Crear un nuevo contacto
contactsRouter.post("/", async (req,res) => {
    try{
        const body = req.body
        
        // Crear instancia del modelo con los datos enviados
        const contact = new Contact ({ 
            name: body.name, 
            number: body.number 
        })

        // Guardar en MongoDB
        const savedContact = await contact.save()
        console.log(savedContact ? savedContact : "Fallo al guardar")

        // Devolver el contacto con status 201 (creado)
        res.status(201).json(savedContact)
    }catch(err){
        console.error("Error al guardar:", err.message)

        // Si falla una validación, devolvemos 400
        res.status(400).json({ error: "Error al guardar el contacto" })
    }
})

// Actualizar un contacto existente
contactsRouter.put("/:id", async (req,res) => {
    try{
        // findByIdAndUpdate actualiza y devuelve la versión nueva (new: true)
        // runValidators: true -> para que Mongoose valide también al hacer PUT
        const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name, number: req.body.number },
        { new: true, runValidators: true }
        )
        res.json(updatedContact)
    }catch(err){
        console.error("Error al actualizar: ", err.message)
        res.status(400).json({error: "Error al actualizar el contacto"})
    }
})

// Eliminar un contacto
contactsRouter.delete("/:id", async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id)

        // 204: No Content → operación exitosa sin devolver datos
        res.status(204).end()
    } catch (err) {
        console.error("Error al eliminar:", err.message)
        res.status(400).json({ error: "Error al eliminar el contacto" })
    }
})

module.exports = contactsRouter