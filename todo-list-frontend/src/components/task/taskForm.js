'use client'

import { useState } from 'react'

export default function TaskForm ({ onSubmit, initialData = {} }) {
  const [title, setTitle] = useState(initialData.title || '')
  const [description, setDescription] = useState(initialData.description || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ title, description })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type='submit'>Guardar</button>
    </form>
  )
}
