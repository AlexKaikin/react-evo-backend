import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
  id: { type: Number },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  body: { type: String, required: true },
  created: { type: String },
  updated: { type: String },
  published: { type: String, default: 'На модерации' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

export default mongoose.model('Comment', CommentSchema)
