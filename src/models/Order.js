import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
  {
    id: { type: Number },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    middleName: { type: String, required: true }, // если нет тегов сохраним пустой массив
    region: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    home: { type: String, required: true },
    index: { type: String, required: true },
    created: { type: String },
    updated: {type: String},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  }
)

export default mongoose.model('Order', OrderSchema)
