import { useEffect, useState } from "react"
import ContactForm from "./components/ContactForm"
import ContactItem from "./components/ContactItem"
import contactService from './services/contacts'
import { Container, Typography, List, Paper, Box } from "@mui/material"

/**
 * Componente principal de la aplicación Agenda de Contactos.
 * Administra el listado de contactos y coordina la comunicación con el backend.
 */

const App = () => {
  // Estado que almacena la lista completa de contactos
  const [contacts, setContacts] = useState([])

  // 🧩 TODO: implementar las siguientes mejoras
  // - Editar contacto (PUT)
  // - Notificaciones de éxito o error
  // - Buscador de contactos
  // - Mejoras de estilo con CSS/MUI

  /**
   * useEffect inicial:
   * Al montar el componente, obtiene la lista de contactos desde el backend.
   * Utiliza el servicio contactService.getAll() para realizar una petición HTTP GET.
   */
  useEffect(() => {
    contactService.getAll()
      .then(res => {setContacts(res)})
      .catch(err => console.error("Error cargando contactos:", err))
  }, [])

  /**
   * addContact:
   * Crea un nuevo contacto en el backend y actualiza el estado local.
   * @param {Object} newContact - Datos del nuevo contacto a agregar.
   */
  const addContact = async (newContact) => {
    try{
      const response = await contactService.create(newContact)
      setContacts(contacts.concat(response))
    }catch(err){
      console.error(err.message)
    }
  }

  /**
   * removeContact:
   * Elimina un contacto tanto del backend como del estado local.
   * @param {string} id - ID del contacto a eliminar.
   */
  const removeContact = async (id) => {
    try {
      await contactService.remove(id)      
      const updatedContacts = contacts.filter(c => c.id !== id)
      setContacts(updatedContacts)      
    }catch (err) {
      console.error(err.message)
    }
  }

  /**
   * Renderizado principal:
   * - Muestra el título de la app.
   * - Incluye el formulario para crear nuevos contactos.
   * - Lista los contactos existentes usando componentes ContactItem.
   */
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fff8e1",
        py: 4,
      }}
    >
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          📒 Agenda de Contactos
        </Typography>

        <ContactForm createContact={addContact} />

        <Paper>
          <List>
            {contacts.map((c) => (
              <ContactItem
                key={c.id}
                contact={c}
                removeContact={() => removeContact(c.id)}
              />
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  )
}

export default App

