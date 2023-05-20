import NoteModel from '../../models/Note.js'

export const getAll = async (req, res) => {
  const _limit = req.query._limit ? parseInt(req.query._limit) : 0
  const _page = req.query._page ? parseInt(req.query._page) : 1

  try {
    console.log(req.userId)
    const noteAll = await NoteModel.find({ user: req.userId })
      .sort({ id: -1 })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .populate('user', 'fullName avatarUrl')
      .exec()

    res.append('x-total-count', noteAll.length)
    res.append('Access-Control-Expose-Headers', 'X-Total-Count')
    res.json(noteAll)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить заметки' })
  }
}

export const getOne = async (req, res) => {
  try {
    const noteId = parseInt(req.params.id)
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
    const noteId = req.params.id
    NoteModel.findOneAndDelete({ _id: noteId }, (err, doc) => {
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