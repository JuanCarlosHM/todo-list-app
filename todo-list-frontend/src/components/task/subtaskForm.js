'use client'

import { useState } from 'react'

export default function SubtaskForm ({ onSubmit }) {
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ title, status: 'pendiente' })
    setTitle('') // Limpia el formulario
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Nueva subtarea'
        required
      />
      <button type='submit'>Añadir</button>
    </form>
  )
}
