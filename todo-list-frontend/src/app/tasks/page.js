'use client'

import { useState, useEffect } from 'react'
import styles from './tasks.module.css'
import { createTask, deleteTask, getTasks } from '@/services/taskApi'
import { logoutUser } from '@/services/authApi'
import { useRouter } from 'next/navigation'

export default function TasksPage () {
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [showModal, setShowModal] = useState(false)
  const [newTask, setNewTask] = useState({ title: '', description: '' })
  const router = useRouter()

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getTasks()
      setTasks(data)
      console.log(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleViewTask = (taskId) => {
    router.push(`/tasks/${taskId}`)
  }

  const handleDeleteTask = async (taskId) => {
    try {
      if (confirm('¿Segur@ que quieres eliminar la tarea?')) {
        const res = await deleteTask(taskId)
        console.log(res)
      } else {
        return
      }
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId))
    } catch (err) {
      setError(err.message)
    }
  }

  const handleCreateTask = async () => {
    if (!newTask.title.trim()) {
      alert('El título es obligatorio.')
      return
    }

    try {
      const createdTask = await createTask(newTask)
      setTasks((prevTasks) => [createdTask, ...prevTasks]) // Añade la nueva tarea a la lista
      setNewTask({ title: '', description: '' }) // Resetea el formulario
      setShowModal(false) // Cierra el modal
    } catch (err) {
      alert('Error al crear la tarea.')
    }
  }

  const handleLogout = async () => {
    try {
      await logoutUser()
      document.cookie = 'token=; Max-Age=0'
      localStorage.removeItem('token')
    } catch (err) {
      console.error('Error al cerrar sesión:', err.message)
    }
    router.push('/login')
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Lista de Tareas</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Cerrar Sesión
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {loading && <p className={styles.loading}>Cargando tareas...</p>}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.description || 'Sin descripción'}</td>
              <td>
                <span
                  className={`${styles.status} ${
                    task.status === 'completada' ? styles.completed : styles.pending
                  }`}
                >
                  {task.status}
                </span>
              </td>
              <td>
                <button className={styles.actionButton} onClick={() => handleViewTask(task._id)}>
                  Editar
                </button>
                <button className={styles.deleteButton} onClick={() => handleDeleteTask(task._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className={styles.floatingButton} onClick={() => setShowModal(true)}>
        +
      </button>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Crear Nueva Tarea</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleCreateTask()
              }}
              className={styles.form}
            >
              <div className={styles.formGroup}>
                <label htmlFor='title' className={styles.label}>
                  Título
                </label>
                <input
                  id='title'
                  type='text'
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask((prev) => ({ ...prev, title: e.target.value }))}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor='description' className={styles.label}>
                  Descripción
                </label>
                <textarea
                  id='description'
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask((prev) => ({ ...prev, description: e.target.value }))}
                  className={styles.textarea}
                />
              </div>
              <div className={styles.buttonGroup}>
                <button
                  type='button'
                  onClick={() => setShowModal(false)}
                  className={styles.cancelButton}
                >
                  Cancelar
                </button>
                <button type='submit' className={styles.createButton}>
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
