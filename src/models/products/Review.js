import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema(
  {
    id: { type: Number },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    rating: { type: Number },
    body: { type: String, required: true },
    created: { type: String },
    updated: { type: String },
    published: { type: String, default: 'На модерации' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  }
)

export default mongoose.model('Review', ReviewSchema)
