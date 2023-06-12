import mongoose from 'mongoose'

const RoomSchema = new mongoose.Schema({
  id: { type: Number },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: true,
    default: [],
  },
  lastMessage: { type: String, default: '' },
  created: { type: String },
  updated: { type: String },
})

export default mongoose.model('Room', RoomSchema)
