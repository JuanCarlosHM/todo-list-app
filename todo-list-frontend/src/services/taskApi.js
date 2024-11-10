const API = process.env.URL_API || 'http://localhost:5000/api'

// TAREAS
export const getTasks = async () => {
  const response = await fetch(`${API}/tasks`, {
    credentials: 'include' // Enviar cookies automáticamente
  })

  if (!response.ok) {
    throw new Error('Error al obtener tareas')
  }

  return response.json()
}

export const getTaskById = async (id) => {
  const response = await fetch(`${API}/tasks/${id}`, {
    credentials: 'include' // Enviar cookies automáticamente
  })

  if (!response.ok) {
    throw new Error('Error al obtener la tarea')
  }

  return response.json()
}

export const createTask = async (task) => {
  const response = await fetch(`${API}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Enviar cookies automáticamente
    body: JSON.stringify(task)
  })

  if (!response.ok) {
    throw new Error('Error al crear la tarea')
  }

  return response.json()
}

export const updateTask = async (id, task) => {
  const response = await fetch(`${API}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Enviar cookies automáticamente
    body: JSON.stringify(task)
  })

  if (!response.ok) {
    throw new Error('Error al actualizar la tarea')
  }

  return response.json()
}

export const deleteTask = async (id) => {
  const response = await fetch(`${API}/tasks/${id}`, {
    method: 'DELETE',
    credentials: 'include' // Enviar cookies automáticamente
  })

  if (!response.ok) {
    throw new Error('Error al eliminar la tarea')
  }

  return response.json()
}

// SUBTASKS
export const createSubtask = async (taskId, subtask) => {
  const response = await fetch(`${API}/tasks/${taskId}/subtasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Enviar cookies automáticamente
    body: JSON.stringify(subtask)
  })

  if (!response.ok) {
    throw new Error('Error al crear la subtarea')
  }

  return response.json()
}

export const updateSubtask = async (taskId, subtaskId, subtask) => {
  const response = await fetch(`${API}/tasks/${taskId}/subtasks/${subtaskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Enviar cookies automáticamente
    body: JSON.stringify(subtask)
  })

  if (!response.ok) {
    throw new Error('Error al actualizar la subtarea')
  }

  return response.json()
}

export const deleteSubtask = async (taskId, subtaskId) => {
  const response = await fetch(`${API}/tasks/${taskId}/subtasks/${subtaskId}`, {
    method: 'DELETE',
    credentials: 'include' // Enviar cookies automáticamente
  })

  if (!response.ok) {
    throw new Error('Error al eliminar la subtarea')
  }

  return response.json()
}

// Comments
export const addComment = async (taskId, comment) => {
  const response = await fetch(`${API}/tasks/${taskId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Enviar cookies automáticamente
    body: JSON.stringify(comment)
  })

  if (!response.ok) {
    throw new Error('Error al agregar el comentario')
  }

  return response.json()
}

export const updateComment = async (taskId, commentId, comment) => {
  const response = await fetch(`${API}/tasks/${taskId}/comments/${commentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Enviar cookies automáticamente
    body: JSON.stringify(comment)
  })

  if (!response.ok) {
    throw new Error('Error al actualizar el comentario')
  }

  return response.json()
}

export const deleteComment = async (taskId, commentId) => {
  const response = await fetch(`${API}/tasks/${taskId}/comments/${commentId}`, {
    method: 'DELETE',
    credentials: 'include' // Enviar cookies automáticamente
  })

  if (!response.ok) {
    throw new Error('Error al eliminar el comentario')
  }

  return response.json()
}
