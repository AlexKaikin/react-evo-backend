import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  avatarUrl: { type: String, default: null },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'user' },
  avatarUrl: String,
})

export default mongoose.model('User', UserSchema)
