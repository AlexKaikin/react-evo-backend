import mongoose from 'mongoose'

const NavigationSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    filter: {type: Array},
    sort: {type: Array},
  }
)

export default mongoose.model('Navigation', NavigationSchema)
