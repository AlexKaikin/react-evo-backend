import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  id: { type: Number },
  fullName: { type: String, required: true },
  avatarUrl: { type: String, default: '' },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'user' },
})

export default mongoose.model('User', UserSchema)
