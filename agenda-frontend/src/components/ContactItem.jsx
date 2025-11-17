import { ListItem, ListItemText, ListItemAvatar, Avatar, IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import PersonIcon from "@mui/icons-material/Person"

/**
 * ContactItem:
 * Componente presentacional que muestra la información de un contacto individual.
 * Incluye nombre, número y un botón para eliminar el contacto.
 *
 * @param {Object} contact - Objeto con los datos del contacto (name, number, id, etc.)
 * @param {Function} removeContact - Función pasada por props desde el componente padre (App.jsx)
 *                                   que elimina el contacto seleccionado.
 */
const ContactItem = ({ contact, removeContact }) => {
    
    return(
         <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={removeContact}>
                <DeleteIcon color="error" />
                </IconButton>
            }
            >
            <ListItemAvatar>
                <Avatar>
                <PersonIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={contact.name}
                secondary={contact.number}
            />
        </ListItem>
    )
}

export default ContactItem