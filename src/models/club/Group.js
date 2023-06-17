import mongoose from 'mongoose'

const GroupSchema = new mongoose.Schema({
  id: { type: Number },
  title: { type: String, required: true },
  about: { type: String, required: true },
  interests: { type: Array, default: [] },
  location: { type: String },
  avatarUrl: { type: String, default: '' },
  subscribers: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
  private: { type: Boolean, default: false },
  created: { type: String },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

export default mongoose.model('Group', GroupSchema)
