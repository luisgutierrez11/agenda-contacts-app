import { useState } from "react"
import { TextField, Button, Stack, Paper } from "@mui/material"

/**
 * Formulario para crear nuevos contactos.
 * Permite ingresar un nombre y un número, y enviar los datos al componente padre.
 *
 * @param {Function} createContact - Función pasada por props desde App.jsx
 *                                   que se encarga de agregar el contacto al backend y al estado global.
 */
const ContactForm = ({createContact}) => {
  // Estado controlado para los campos del formulario
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  /**
   * addContact:
   * Maneja el envío del formulario.
   * Evita el comportamiento por defecto del formulario,
   * valida los campos y llama a createContact con los datos ingresados.
   */
  const addContact = (event) => {
    event.preventDefault()

    // Evita crear contactos con campos vacíos o solo espacios
    if (!newName.trim() || !newNumber.trim()) return

    // Llama al método del componente padre (App.jsx)
    createContact({
        name: newName, 
        number: newNumber
    })

    // Limpia los campos del formulario después de agregar
    setNewName('')
    setNewNumber('')
  }

  /**
   * handleCancel:
   * Limpia los campos del formulario sin enviar datos.
   */
  const handleCancel = () => {
    setNewName('')
    setNewNumber('')
  }

  /**
   * Renderizado del formulario.
   * Utiliza componentes de Material UI para una interfaz limpia y responsiva.
   */
  return(
    <Paper sx={{ p: 2, mb: 3 }}>
      <form onSubmit={addContact}>
        <Stack spacing={2}>
          <TextField
            label="Nombre"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Número"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
            required
            fullWidth
          />
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained">
              Agregar
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  )
}

export default ContactForm