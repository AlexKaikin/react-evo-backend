import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  id: { type: Number },
  fullName: { type: String, required: true },
  about: { type: String, default: '' },
  location: { type: String, default: '' },
  private: { type: Boolean, default: false },
  avatarUrl: { type: String, default: '' },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'user' },
  subscribers: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
  subscriptions: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
})

export default mongoose.model('User', UserSchema)
