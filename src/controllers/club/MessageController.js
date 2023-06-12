import MessageModel from '../../models/club/Message.js'
import RoomModel from '../../models/club/Room.js'

export const getAll = async (req, res) => {
  const user_id = req.params.userId
  const my_id = req.userId
  const _limit = req.query._limit ? parseInt(req.query._limit) : 0
  const _page = req.query._page ? parseInt(req.query._page) : 1

  try {
    let messageAll = await MessageModel.find({
      room: { $all: [my_id, user_id] },
    })
    let messageQuery = null

    messageQuery = await MessageModel.find({
      room: { $all: [my_id, user_id] },
    })
      .sort({ id: -1 })
      .limit(_limit)
      .skip(_limit * (_page - 1))
      .exec()

    res.append('x-total-count', messageAll.length)
    res.append('Access-Control-Expose-Headers', 'X-Total-Count')
    res.json(messageQuery.reverse())
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось получить сообщения' })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new MessageModel({
      id: req.body.id,
      room: req.body.room,
      name: req.body.name,
      text: req.body.text,
      date: req.body.date,
      avatarUrl: req.body.avatarUrl,
      roomID: req.body.roomID,
    })

    await RoomModel.updateOne(
      { _id: req.body.roomID },
      { $set: { lastMessage: req.body.text, updated: new Date().getTime() } }
    )

    const message = await doc.save()
    res.json(message)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Не удалось создать сообщение' })
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
        updated: new Date().toLocaleString(),
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
