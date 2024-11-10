'use client'

export default function SubtaskList ({ subtasks, onEdit, onDelete }) {
  return (
    <div>
      <h3>Subtareas</h3>
      <ul>
        {subtasks.map((subtask) => (
          <li key={subtask._id}>
            <input
              type='checkbox'
              checked={subtask.status === 'completada'}
              onChange={() => onEdit(subtask._id, { status: subtask.status === 'pendiente' ? 'completada' : 'pendiente' })}
            />
            <span>{subtask.title}</span>
            <button onClick={() => onDelete(subtask._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
