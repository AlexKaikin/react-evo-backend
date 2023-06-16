import mongoose from 'mongoose'

const NoteSchema = new mongoose.Schema({
  id: { type: Number },
  text: { type: String, required: true },
  tags: { type: Array, default: [] },
  galleryUrl: { type: Array, default: [] },
  published: { type: Boolean, default: true },
  created: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
})

export default mongoose.model('Note', NoteSchema)
