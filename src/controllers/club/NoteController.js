import mongoose from 'mongoose'
import NoteModel from '../../models/Note.js'

export const getAll = async (req, res) => {
  const userId = req.params.userId
  const _limit = req.query._limit ? parseInt(req.query._limit) : 0
  const _page = req.query._page ? parseInt(req.query._page) : 1

  try {
    let noteAll = await NoteModel.find({
      user: mongoose.Types.ObjectId(userId),
    })
    let noteQuery = null

    noteQuery = await NoteModel.find({ user: mongoose.Types.ObjectId(userId) })
      .sort({ id: -1 })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .populate('user', 'fullName avatarUrl')
      .exec()

    res.append('x-total-count', noteAll.length)
    res.append('Access-Control-Expose-Headers', 'X-Total-Count')
    res.json(noteQuery)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить заметки' })
  }
}

// export const getByUser = async (req, res) => {
//   const user = req.query.user
//   const _limit = req.query._limit ? parseInt(req.query._limit) : 0
//   const _page = req.query._page ? parseInt(req.query._page) : 1

//   try {
//     let noteByUserAll = await NoteModel.find({ user: user })
//     let noteByUserQuery = null

//     noteQuery = await NoteModel.find({ user: user })
//       .sort({ id: -1 })
//       .limit(_limit)
//       .skip(_limit * (_page - 1))
//       .populate('user', 'fullName avatarUrl')
//       .exec()

//     res.append('x-total-count', noteByUserAll.length)
//     res.append('Access-Control-Expose-Headers', 'X-Total-Count')
//     res.json(noteByUserQuery)
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ message: 'Не удалось получить заметки' })
//   }
// }

export const getOne = async (req, res) => {
  try {
    const noteId = parseInt(req.params.noteId)
    NoteModel.findOneAndUpdate(
      { id: noteId },
      (err, doc) => {
        if (err) {
          console.log(err)
          return res.status(500).json({ message: 'Не удалось получить заметку' })
        }
        if (!doc) {
          return res.status(404).json({ message: 'Заметка не найдена' })
        }
        res.json(doc)
      }
    )
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить заметку' })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new NoteModel({
      id: +new Date().getTime(),
      text: req.body.text,
      tags: req.body.tags,
      galleryUrl: req.body.galleryUrl,
      published: req.body.published,
      created: new Date().getTime(),
      user: req.userId,
    })

    const note = await doc.save()
    res.json(note)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось создать заметку' })
  }
}

export const update = async (req, res) => {
  try {
    await NoteModel.updateOne(
      { id: req.body.id },
      {
        text: req.body.text,
        tags: req.body.tags,
        galleryUrl: req.body.galleryUrl,
        published: req.body.published,
        updated: new Date().toLocaleString()
      }
    )
    res.json({ success: true })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось обновить заметку' })
  }
}

export const remove = async (req, res) => {
  try {
    const noteId = req.params.noteId
    NoteModel.findOneAndDelete({ id: noteId }, (err, doc) => {
      if (err) {
        console.log(err)
        res.status(500).json({ message: 'Не удалось удалить заметку' })
      }
      if (!doc) {
        return res.status(404).json({ message: 'Заметка не найдена' })
      }
      res.json({ success: true })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось удалить заметку' })
  }
}
