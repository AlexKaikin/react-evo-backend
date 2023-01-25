import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
  {
    // создать схему таблицы
    idByTime: { type: Number },
    title: { type: String, required: true },
    text: { type: String, required: true },
    tags: { type: Array, default: [] }, // если нет тегов сохраним пустой массив
    imageUrl: { type: String },
    viewsCount: { type: Number, default: 0 },
    created: { type: String },
    updated: {type: String},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ссылать на модель user по id (связь между таблицами)
  }
)

export default mongoose.model('Post', PostSchema) // возможность экспортировать бд
