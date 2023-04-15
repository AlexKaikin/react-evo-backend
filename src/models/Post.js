import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  id: { type: Number },
  title: { type: String, required: true },
  category: { type: String, required: true },
  text: { type: String, required: true },
  tags: { type: Array, default: [] },
  imgUrl: { type: String },
  galleryUrl: { type: Array, default: [] },
  viewsCount: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
  created: { type: String },
  updated: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

export default mongoose.model('Post', PostSchema)
