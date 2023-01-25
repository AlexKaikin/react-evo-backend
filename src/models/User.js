import mongoose from 'mongoose'
import { stringify } from 'querystring'

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
    },
    avatarUrl: String,
}, {
    timestamps: true, // дата создания и обновления
})

export default mongoose.model('User', UserSchema)