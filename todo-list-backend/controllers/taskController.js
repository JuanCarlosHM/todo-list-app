import Task from '../models/task.js'

export const createTask = async (req, res) => {
  try {
    let { title, description } = req.body
    if (!description || description.length === 0) {
      description = ''
    }
    const newTask = new Task({
      title,
      description,
      userId: req.user.id
    })

    await newTask.save()
    res.status(201).json(newTask)
  } catch (error) {
    res.status(500).json({ error: 'Error: ' + error })
  }
}

export const getTasks = async (req, res) => {
  try {
    const { status } = req.query // Optional filter
    const query = { userId: req.user.id }
    if (status) query.status = status

    const tasks = await Task.find(query).populate('comments.author', 'email')
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo las tareas' })
  }
}
export const getTask = async (req, res) => {
  try {
    const { id } = req.params

    const task = await Task.findOne({ _id: id })

    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada o no tienes acceso' })
    }

    res.status(200).json(task)
  } catch (error) {
    console.error('Error al obtener la tarea:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, status, comments } = req.body

    const task = await Task.findOne({ _id: id, userId: req.user.id })
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' })

    if (title) task.title = title
    if (description) task.description = description
    if (comments) task.comments = comments

    if (task.subtasks.length > 0) {
      const hasPendingSubtasks = task.subtasks.some((subtask) => subtask.status === 'pendiente')
      if (hasPendingSubtasks) {
        task.status = 'pendiente'
      } else if (status) {
        task.status = status
      }
    } else if (status) {
      task.status = status
    }
    await task.save()
    res.json(task)
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando la tarea' })
  }
}

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params

    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id })
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' })

    res.json({ message: 'Tarea eliminada con éxito' })
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando la tarea' })
  }
}

// SUBSTASKS:
export const addSubtask = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description } = req.body

    const task = await Task.findOne({ _id: id, userId: req.user.id })
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' })

    const subtask = { title, description, status: 'pendiente' }
    task.subtasks.push(subtask)
    task.status = 'pendiente'
    await task.save()
    res.status(201).json(task.subtasks[task.subtasks.length - 1])
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar subtarea' })
  }
}

export const updateSubtask = async (req, res) => {
  try {
    const { id, subtaskId } = req.params
    const { title, description, status } = req.body

    const task = await Task.findOne({ _id: id, userId: req.user.id })
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' })

    const subtask = task.subtasks.id(subtaskId)
    if (!subtask) return res.status(404).json({ error: 'Subtarea no encontrada' })

    if (title) subtask.title = title
    if (status) subtask.status = status
    if (description) subtask.status = description

    const allCompleted = task.subtasks.every((subtask) => subtask.status === 'completada')
    task.status = allCompleted ? 'completada' : 'pendiente'

    await task.save()
    res.json(task)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar subtarea' })
  }
}

export const deleteSubtask = async (req, res) => {
  try {
    const { id, subtaskId } = req.params

    const task = await Task.findOne({ _id: id, userId: req.user.id })
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' })

    task.subtasks = task.subtasks.filter((subtask) => subtask._id.toString() !== subtaskId)

    const allCompleted = task.subtasks.every((subtask) => subtask.status === 'completada')
    task.status = allCompleted ? 'completada' : 'pendiente'

    await task.save()
    res.json(task)
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar subtarea' })
  }
}

// COMMENTS:
export const addComment = async (req, res) => {
  try {
    const { id } = req.params
    const { text } = req.body

    const task = await Task.findOne({ _id: id, userId: req.user.id })
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' })

    const comment = { text, author: req.user.id }
    task.comments.push(comment)

    await task.save()
    res.status(201).json(task.comments[task.comments.length - 1])
  } catch (error) {
    res.status(500).json({ error: 'Error al añadir el comentario' })
  }
}

export const editComment = async (req, res) => {
  try {
    const { id, commentId } = req.params
    const { text } = req.body

    const task = await Task.findOne({ _id: id, userId: req.user.id })
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' })

    const comment = task.comments.id(commentId)
    if (!comment) return res.status(404).json({ error: 'Comentario no encontrado' })

    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permiso para editar este comentario' })
    }

    comment.text = text
    await task.save()

    res.json(task)
  } catch (error) {
    res.status(500).json({ error: 'Error al editar el comentario' })
  }
}

export const deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params

    const task = await Task.findOne({ _id: id, userId: req.user.id })
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' })

    const comment = task.comments.id(commentId)
    if (!comment) return res.status(404).json({ error: 'Comentario no encontrado' })

    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permiso para eliminar este comentario' })
    }

    task.comments = task.comments.filter((comment) => comment._id.toString() !== commentId)

    await task.save()
    res.json(task)
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el comentario' })
  }
}
