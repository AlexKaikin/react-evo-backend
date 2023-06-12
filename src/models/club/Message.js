import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
  id: { type: Number },
  room: { type: Array, default: [] },
  roomID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,},
  name: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: String },
  avatarUrl: { type: String, default: '' },
})

export default mongoose.model('Message', MessageSchema)
