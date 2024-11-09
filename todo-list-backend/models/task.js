import mongoose from 'mongoose'

const SubtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ['pendiente', 'completada'], default: 'pendiente' },
  description: { type: String }
})

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now }
})

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['pendiente', 'completada'], default: 'pendiente' },
  subtasks: [SubtaskSchema],
  comments: [CommentSchema],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})
export default mongoose.model('Task', TaskSchema)
