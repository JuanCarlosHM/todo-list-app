import express from 'express'
import {
  createTask,
  deleteSubtask,
  deleteTask,
  getTasks,
  addSubtask,
  updateSubtask,
  updateTask,
  addComment,
  editComment,
  deleteComment,
  getTask
} from '../controllers/taskController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(authMiddleware)

// tasks
router.get('/', getTasks)
router.post('/', createTask)
router.put('/:id', updateTask)
router.get('/:id', getTask)
router.delete('/:id', deleteTask)

// subtask
router.post('/:id/subtasks', addSubtask)
router.put('/:id/subtasks/:subtaskId', updateSubtask)
router.delete('/:id/subtasks/:subtaskId', deleteSubtask)

// comments
router.post('/:id/comments', addComment)
router.put('/:id/comments/:commentId', editComment)
router.delete('/:id/comments/:commentId', deleteComment)

export default router
