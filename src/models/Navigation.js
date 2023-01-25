import mongoose from 'mongoose'

const NavigationSchema = new mongoose.Schema(
  {
    // создать схему таблицы
    id: { type: Number, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    filter: {type: Array},
    sort: {type: Array},
  },
  {
    timestamps: true, // автоматически добавить дату создания
  }
)

export default mongoose.model('Navigation', NavigationSchema) // возможность экспортировать бд
