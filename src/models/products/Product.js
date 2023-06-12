import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    id: { type: Number },
    title: { type: String, required: true },
    text: { type: String, required: true },
    tags: { type: Array, default: [] },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    currency: { type: String, required: true },
    volume: { type: Number, required: true },
    volumeMeasurement: { type: String, required: true },
    imgUrl: { type: String, required: true },
    galleryUrl: { type: Array, default: [] },
    rating: { type: Number, default: 0 },
    category: { type: String, required: true },
    property: { country: String, town: String, year: Number },
    viewsCount: { type: Number, default: 0 },
    published: { type: Boolean, default: false },
    created: { type: String },
    updated: {type: String},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  }
)

export default mongoose.model('Product', ProductSchema)
