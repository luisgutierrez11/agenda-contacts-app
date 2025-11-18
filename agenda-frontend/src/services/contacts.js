import axios from "axios"

// URL base del backend para las operaciones relacionadas con los contactos.
// Durante el desarrollo apunta a localhost, pero en producción puede configurarse
// con una variable de entorno.
// const baseUrl = '/api/contacts'
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

/**
 * getAll:
 * Obtiene todos los contactos desde el backend.
 *
 * @returns {Promise<Array>} Promesa que resuelve con el array de contactos.
 */
const getAll = async () => {
    const response = await api.get('/api/contacts')
    return response.data
}

/**
 * create:
 * Envía un nuevo contacto al backend para ser agregado a la base de datos.
 *
 * @param {Object} newContact - Objeto con los datos del nuevo contacto (name, number).
 * @returns {Promise<Object>} Promesa que resuelve con el contacto creado.
 */
const create = async (newContact) => {
    const response = await api.post('/api/contacts', newContact)
    return response.data
}

/**
 * update:
 * Actualiza la información de un contacto existente en el backend.
 *
 * @param {string} id - ID del contacto a actualizar.
 * @param {Object} updatedContact - Objeto con los datos actualizados del contacto.
 * @returns {Promise<Object>} Promesa que resuelve con el contacto actualizado.
 */
const update = async (id, updatedContact) => {
    const response = await api.put(`/api/contacts/${id}`, updatedContact)
    return response.data
}

/**
 * remove:
 * Elimina un contacto de la base de datos por su ID.
 *
 * @param {string} id - ID del contacto a eliminar.
 * @returns {Promise<Object>} Promesa que resuelve con la respuesta del servidor.
 */
const remove = async id => {
    const response = await api.delete(`/api/contacts/${id}`)
    return response.data
}

// Exporta las funciones como un objeto para facilitar su importación.
export default { getAll, create, update, remove }