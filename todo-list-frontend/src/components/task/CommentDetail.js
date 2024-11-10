import { useState } from 'react'
import styles from './CommentDetail.module.css'

export default function CommentDetail ({
  comment,
  onUpdateComment,
  onDeleteComment
}) {
  const [editedContent, setEditedContent] = useState(comment.text) // Estado del contenido editable
  const [isContentChanged, setIsContentChanged] = useState(false) // Rastrea si hay cambios

  const handleContentChange = (newContent) => {
    setEditedContent(newContent)
    setIsContentChanged(newContent !== comment.content) // Verifica si el contenido cambió
  }

  const handleSave = () => {
    if (!editedContent.trim()) {
      alert('El contenido no puede estar vacío.')
      return
    }
    onUpdateComment(comment._id, editedContent) // Actualiza el comentario
    setIsContentChanged(false) // Resetea el estado del botón
  }

  return (
    <li className={styles.comment}>
      <input
        type='text'
        value={editedContent}
        onChange={(e) => handleContentChange(e.target.value)}
        className={styles.editableContent}
        placeholder='Escribe un comentario'
      />

      {isContentChanged && (
        <button onClick={handleSave} className={styles.saveButton}>
          Guardar
        </button>
      )}

      <button
        onClick={() => onDeleteComment(comment._id)}
        className={styles.deleteButton}
      >
        Eliminar
      </button>
    </li>
  )
}
