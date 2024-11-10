'use client'
import { useState, useEffect, use } from 'react'
import styles from './taskDetail.module.css'
import {
  createSubtask,
  deleteSubtask,
  updateSubtask,
  addComment,
  deleteComment,
  deleteTask,
  getTaskById,
  updateTask, updateComment
} from '@/services/taskApi'
import BreadcrumbHeader from '@/components/common/BreadcrumbHeader'
import SubtaskDetail from '@/components/task/subtaskdetail'
import CommentDetail from '@/components/task/CommentDetail'
import { redirect } from 'next/navigation'

export default function TaskDetailPage ({ params }) {
  const { id } = use(params)
  const [task, setTask] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState(false)

  const [newSubtask, setNewSubtask] = useState('')
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    fetchTask(id)
  }, [id])

  const fetchTask = async (id) => {
    setLoading(true)
    setError('')
    try {
      const data = await getTaskById(id)
      setTask(data)
      setTitle(data.title)
      setDescription(data.description || '')
      setStatus(data.status)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  const handleUpdateTask = async () => {
    try {
      await updateTask(id, { title, description, status })
      alert('Tarea actualizada con éxito')
    } catch (err) {
      setError(err.message)
    }
  }
  const handleDeleteTask = async () => {
    try {
      if (confirm('¿Segur@ que quieres eliminar la tarea?')) {
        await deleteTask(id)
      } else {
        return
      }
    } catch (err) {
      setError(err.message)
    }
    redirect('/tasks')
  }
  // subtaask
  const handleAddSubtask = async () => {
    if (!newSubtask.trim()) return
    try {
      const subtask = await createSubtask(id, { title: newSubtask })
      setTask((prevTask) => ({
        ...prevTask,
        subtasks: [...prevTask.subtasks, subtask]
      }))
      setNewSubtask('')
    } catch (err) {
      setError(err.message)
    }
  }
  const handleUpdateSubtaskTitle = async (subtaskId, newTitle) => {
    try {
      await updateSubtask(task._id, subtaskId, { title: newTitle })
      setTask((prevTask) => ({
        ...prevTask,
        subtasks: prevTask.subtasks.map((s) =>
          s._id === subtaskId ? { ...s, title: newTitle } : s
        )
      }))
      alert('Subtarea actualizada con éxito.')
    } catch (error) {
      alert('Error al actualizar la subtarea.')
    }
  }
  const handleToggleSubtaskStatus = async (subtaskId, status) => {
    try {
      await updateSubtask(task._id, subtaskId, { status })
      setTask((prevTask) => ({
        ...prevTask,
        subtasks: prevTask.subtasks.map((s) =>
          s._id === subtaskId ? { ...s, status } : s
        )
      }))
    } catch (error) {
      alert('Error al cambiar el estado de la subtarea.')
    }
  }
  const handleDeleteSubtask = async (subtaskId) => {
    try {
      await deleteSubtask(task._id, subtaskId)
      setTask((prevTask) => ({
        ...prevTask,
        subtasks: prevTask.subtasks.filter((s) => s._id !== subtaskId)
      }))
    } catch (error) {
      alert('Error al eliminar la subtarea.')
    }
  }

  // comments
  const handleUpdateComment = async (commentId, newContent) => {
    try {
      await updateComment(task._id, commentId, { text: newContent })
      setTask((prevTask) => ({
        ...prevTask,
        comments: prevTask.comments.map((c) =>
          c._id === commentId ? { ...c, content: newContent } : c
        )
      }))
      alert('Comentario actualizado con éxito.')
    } catch (error) {
      alert('Error al actualizar el comentario.')
    }
  }
  const handleAddComment = async () => {
    if (!newComment.trim()) return
    try {
      const comment = await addComment(id, { text: newComment })
      setTask((prevTask) => ({
        ...prevTask,
        comments: [...prevTask.comments, comment]
      }))
      setNewComment('')
    } catch (err) {
      setError(err.message)
    }
  }
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(task._id, commentId)
      setTask((prevTask) => ({
        ...prevTask,
        comments: prevTask.comments.filter((c) => c._id !== commentId)
      }))
      alert('Comentario eliminado con éxito.')
    } catch (error) {
      alert('Error al eliminar el comentario.')
    }
  }
  if (loading) {
    return <p className={styles.loading}>Cargando...</p>
  }

  if (error) {
    return <p className={styles.error}>{error}</p>
  }

  return (
    <>
      <BreadcrumbHeader
        breadcrumbs={[
          { label: 'Tareas', link: '/tasks' },
          { label: ` Detalle de Tarea - ${title}` }
        ]}
      />
      <div className={styles.container}>
        <h1 className={styles.title}>Detalle de la Tarea</h1>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formGroup}>
            <label htmlFor='title' className={styles.label}>
              Título
            </label>
            <input
              id='title'
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              placeholder='Ingresa el título de la tarea'
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='description' className={styles.label}>
              Descripción
            </label>
            <textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              rows='4'
              placeholder='Ingresa una descripción opcional'
            />
          </div>

          <div className={styles.formGroup}>
            <span className={styles.label}>Estado</span>
            <div className={styles.statusToggle}>
              <label className={styles.statusOption}>
                <input
                  type='radio'
                  name='status'
                  checked={status === 'pendiente'}
                  onChange={() => setStatus('pendiente')}
                />
                Pendiente
              </label>
              <label className={styles.statusOption}>
                <input
                  type='radio'
                  name='status'
                  checked={status === 'completada'}
                  onChange={() => setStatus('completada')}
                />
                Completada
              </label>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button
              type='button'
              onClick={handleDeleteTask}
              className={styles.cancelButton}
            >
              Eliminar
            </button>
            <button
              type='submit'
              onClick={handleUpdateTask}
              className={styles.createButton}
            >
              Guardar Cambios
            </button>
          </div>
        </form>

        <h2 className={styles.sectionTitle}>Subtareas</h2>
        <ul className={styles.subtaskList}>
          {task?.subtasks?.map((subtask) => (
            <SubtaskDetail
              key={subtask._id}
              subtask={subtask}
              onUpdateTitle={handleUpdateSubtaskTitle}
              onToggleStatus={handleToggleSubtaskStatus}
              onDelete={handleDeleteSubtask}
            />
          ))}
        </ul>
        <div className={styles.addSubtask}>
          <input
            type='text'
            placeholder='Nueva subtarea'
            value={newSubtask}
            onChange={(e) => setNewSubtask(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleAddSubtask} className={styles.createButton}>
            Agregar Subtarea
          </button>
        </div>

        <h2 className={styles.sectionTitle}>Comentarios</h2>
        <ul className={styles.commentList}>
          {task?.comments?.map((comment) => (
            <CommentDetail
              key={comment._id}
              comment={comment}
              onUpdateComment={handleUpdateComment}
              onDeleteComment={handleDeleteComment}
            />
          ))}
        </ul>
        <div className={styles.addComment}>
          <textarea
            placeholder='Escribe un comentario'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className={`${styles.textarea} ${styles.commentInput}`}
          />
          <button onClick={handleAddComment} className={styles.createButton}>
            Agregar Comentario
          </button>
        </div>
      </div>
    </>
  )
}
