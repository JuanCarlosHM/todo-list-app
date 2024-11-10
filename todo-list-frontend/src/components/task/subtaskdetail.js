import styles from './SubtaskDetail.module.css'
import { useState } from 'react'

export default function SubtaskDetail ({
  subtask,
  onUpdateTitle,
  onToggleStatus,
  onDelete
}) {
  const [editedTitle, setEditedTitle] = useState(subtask.title) // Título editable
  const [isTitleChanged, setIsTitleChanged] = useState(false) // Rastrea si hay cambios

  const handleTitleChange = (newTitle) => {
    setEditedTitle(newTitle)
    setIsTitleChanged(newTitle !== subtask.title) // Verifica si el título cambió
  }

  const handleSave = () => {
    if (!editedTitle.trim()) {
      alert('El título no puede estar vacío.')
      return
    }
    onUpdateTitle(subtask._id, editedTitle) // Actualiza el título
    setIsTitleChanged(false) // Resetea el estado del botón
  }

  return (
    <li className={styles.subtask}>

      <input
        type='text'
        value={editedTitle}
        onChange={(e) => handleTitleChange(e.target.value)}
        className={styles.editableTitle}
        placeholder='Escribe el título de la subtarea'
      />

      {isTitleChanged && (
        <button onClick={handleSave} className={styles.saveButton}>
          Guardar
        </button>
      )}

      <select
        value={subtask.status}
        onChange={(e) =>
          onToggleStatus(subtask._id, e.target.value)}
        className={styles.statusSelect}
      >
        <option value='pendiente'>Pendiente</option>
        <option value='completada'>Completada</option>
      </select>

      <button
        onClick={() => onDelete(subtask._id)}
        className={styles.deleteButton}
      >
        Eliminar
      </button>
    </li>
  )
}
